'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { tasksApi, Task } from '@/lib/api';
import { useAuthStore, useAuthHydrated } from '@/lib/store';

export default function TodayTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const hasHydrated = useAuthHydrated();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // Load tasks from backend - wait for hydration first
  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadTasks = async () => {
      try {
        const fetchedTasks = await tasksApi.getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [hasHydrated, isAuthenticated, router]);

  // Get the week dates for display
  const getWeekDates = (date: Date) => {
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates(selectedDate);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Filter tasks for selected date - use local date format to avoid timezone issues
  const getTasksForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await tasksApi.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(t => t.taskId === taskId ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-300 text-gray-700';
      case 'in-progress':
        return 'bg-blue-200 text-blue-700';
      case 'completed':
        return 'bg-green-200 text-green-700';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-auto md:ml-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Today</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* This Week Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week</h2>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePreviousWeek}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &lt;
                </button>
                <span className="text-purple-600 font-semibold">{formatWeekRange()}</span>
                <button
                  onClick={handleNextWeek}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &gt;
                </button>
              </div>

              {/* Day Columns */}
              <div className="grid grid-cols-7 gap-3">
                {weekDates.map((date, idx) => {
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  const isToday = date.toDateString() === today.toDateString();
                  return (
                    <div key={idx} className="text-center">
                      <p className="text-gray-500 text-sm font-medium mb-2">{daysOfWeek[idx]}</p>
                      <button
                        onClick={() => setSelectedDate(date)}
                        className={`w-full py-8 rounded-xl font-semibold transition ${isSelected
                          ? 'bg-purple-600 text-white'
                          : isToday
                            ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Today Tasks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedDate.toDateString() === today.toDateString() ? 'Today' : formatDate(selectedDate)}
            </h2>

            <div className="space-y-3">
              {selectedDateTasks.map(task => (
                <div
                  key={task.taskId}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(task.taskId, task.status)}
                      className="w-6 h-6 accent-purple-600 cursor-pointer"
                    />
                    <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              ))}
              {selectedDateTasks.length === 0 && (
                <p className="text-center text-gray-500 py-8">No tasks for this date</p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-gray-600 text-sm font-semibold">
                  {selectedDateTasks.length === 0
                    ? '0'
                    : Math.round((selectedDateTasks.filter(t => t.status === 'completed').length / selectedDateTasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: selectedDateTasks.length === 0
                      ? '0%'
                      : `${(selectedDateTasks.filter(t => t.status === 'completed').length / selectedDateTasks.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

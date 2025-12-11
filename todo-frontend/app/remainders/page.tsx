'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { tasksApi, Task } from '@/lib/api';
import { useAuthStore, useAuthHydrated } from '@/lib/store';

export default function RemindersPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const hasHydrated = useAuthHydrated();

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
        // Filter only tasks that have reminder enabled
        setTasks(fetchedTasks.filter(t => t.reminder === true));
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [hasHydrated, isAuthenticated, router]);

  const deleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId);
      setTasks(tasks.filter(task => task.taskId !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format date as YYYY-MM-DD using local timezone
  const formatDateStr = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const groupTasksByCategory = () => {
    const todayStr = formatDateStr(today);
    const tomorrowStr = formatDateStr(tomorrow);

    const todayTasks = tasks.filter(t => t.dueDate === todayStr);
    const tomorrowTasks = tasks.filter(t => t.dueDate === tomorrowStr);
    const upcomingTasks = tasks.filter(t => {
      if (!t.dueDate) return false;
      return t.dueDate !== todayStr && t.dueDate !== tomorrowStr && t.dueDate > todayStr;
    });
    const overdueTasks = tasks.filter(t => {
      if (!t.dueDate) return false;
      return t.dueDate < todayStr && t.status !== 'completed';
    });

    return { todayTasks, tomorrowTasks, upcomingTasks, overdueTasks };
  };

  const { todayTasks, tomorrowTasks, upcomingTasks, overdueTasks } = groupTasksByCategory();

  const TaskGroup = ({ category, categoryTasks, bgColor = 'bg-gray-400' }: { category: string; categoryTasks: Task[]; bgColor?: string }) => {
    if (categoryTasks.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">
            {category} ({categoryTasks.length})
          </h3>
        </div>
        <div className="space-y-3">
          {categoryTasks.map(task => (
            <div
              key={task.taskId}
              className={`${bgColor} rounded-lg p-4 flex items-center justify-between hover:shadow-md transition`}
            >
              <div className="flex-1">
                <span className="text-white font-medium text-lg">{task.title}</span>
                {task.definition && (
                  <p className="text-white/80 text-sm mt-1">{task.definition}</p>
                )}
                <p className="text-white/70 text-xs mt-1">
                  Due: {task.dueDate ? task.dueDate.split('-').slice(1).join('/') + '/' + task.dueDate.split('-')[0] : 'No date'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => deleteTask(task.taskId)}
                  className="text-white hover:opacity-80 transition p-2"
                  title="Delete task"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h16zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading reminders...</div>
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
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Reminders</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl">
          <TaskGroup category="Overdue" categoryTasks={overdueTasks} bgColor="bg-red-400" />
          <TaskGroup category="Today" categoryTasks={todayTasks} bgColor="bg-purple-500" />
          <TaskGroup category="Tomorrow" categoryTasks={tomorrowTasks} bgColor="bg-blue-400" />
          <TaskGroup category="Upcoming" categoryTasks={upcomingTasks} bgColor="bg-gray-400" />

          {tasks.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <p className="text-gray-500 text-lg">No reminders yet. Create tasks with due dates to see them here!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

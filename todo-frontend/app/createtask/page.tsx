'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Sidebar from '@/components/Sidebar';
import { tasksApi } from '@/lib/api';
import { useAuthStore, useAuthHydrated } from '@/lib/store';
import { useTasksStore } from '@/lib/tasksStore';

// Zod validation schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  definition: z.string().optional(),
  dueDate: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function CreateTaskPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reminder, setReminder] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const hasHydrated = useAuthHydrated();
  const { addTask } = useTasksStore();

  // Check auth after hydration
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const newTask = await tasksApi.createTask({
        title: data.title,
        definition: data.definition,
        dueDate: data.dueDate,
        status: 'pending',
        reminder: reminder,
      });
      addTask(newTask);
      router.push('/AllTasks');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Add New Task</span>
            </div>
          </div>
        </header>

        <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create New Task</h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="Enter task title"
                  className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('definition')}
                  placeholder="Add details about your task"
                  rows={3}
                  className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  {...register('dueDate')}
                  className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* Set Reminder Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Set Reminder</h4>
                  <p className="text-sm text-gray-500">Show this task in Reminders</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReminder(!reminder)}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${reminder ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gray-300'
                    }`}
                >
                  <div
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${reminder ? 'translate-x-6' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Task'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
 React.FormEvent) => {
    e.preventDefault();
    const task: TaskData = { title: taskTitle, description, dueDate, reminder };
    console.log(task);
    alert('Task Created Successfully!');
    setTaskTitle('');
    setDescription('');
    setDueDate('');
    setReminder(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <button className="text-gray-600 hover:text-gray-900 text-2xl">☰</button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Add New Task</span>
            </div>
          </div>
        </header>
        {/* Create Task Form */}
        <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create New Task</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your task"
              rows={3}
              className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-200 bg-gray-100 text-black rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800">Set Reminder</h4>
              <p className="text-sm text-gray-500">Get notified about this task</p>
            </div>
            <button
              type="button"
              onClick={() => setReminder(!reminder)}
              className={`w-12 h-6 rounded-full p-1 transition-all ${
                reminder ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full transform transition ${
                  reminder ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Task
          </button>
        </form>
          </div>
        </div>
      </main>
    </div>
  );
}



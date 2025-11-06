'use client';

import { useState } from 'react';

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'complete';
  completed: boolean;
}

export default function TodayTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Task 01', status: 'pending', completed: false },
    { id: '2', name: 'Task 02', status: 'in-progress', completed: false },
    { id: '3', name: 'Task 03', status: 'complete', completed: true }
  ]);

  const [selectedDate, setSelectedDate] = useState(6); // November 6, 2025
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeksStart = 2; // November 2, 2025
  const weekDates = Array.from({ length: 7 }, (_, i) => weeksStart + i);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-300 text-gray-700';
      case 'in-progress':
        return 'bg-blue-200 text-blue-700';
      case 'complete':
        return 'bg-green-200 text-green-700';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'complete':
        return 'Complete';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-500 to-purple-600 text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#a855f7" strokeWidth="2" />
              <path d="M9 12l3 3 5-6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold">ToDo.</span>
        </div>

        {/* Add New Button */}
        <button className="w-full bg-white text-purple-600 font-semibold py-2.5 rounded-full mb-8 hover:bg-gray-100 transition flex items-center justify-center gap-2">
          <span className="text-lg">+</span>
          Add New
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-4 flex-1">
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <span className="text-xl">≡</span>
            <span className="font-medium">All Tasks</span>
          </div>
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Today</span>
          </div>
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M12 22h0m-4-2h8M10 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Reminders</span>
          </div>
        </nav>

        {/* Logout */}
        <div className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-lg cursor-pointer hover:bg-black/30 transition">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-medium">Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
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
              <span className="text-xl font-bold text-gray-900">ToDo.</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* This Week Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week</h2>
            
            {/* Week Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <button className="text-gray-400 hover:text-gray-600">&lt;</button>
                <span className="text-purple-600 font-semibold">November 2 - 8 2025</span>
                <button className="text-gray-400 hover:text-gray-600">&gt;</button>
              </div>

              {/* Day Columns */}
              <div className="grid grid-cols-7 gap-3">
                {daysOfWeek.map((day, idx) => {
                  const date = weekDates[idx];
                  const isSelected = date === selectedDate;
                  return (
                    <div key={idx} className="text-center">
                      <p className="text-gray-500 text-sm font-medium mb-2">{day}</p>
                      <button
                        onClick={() => setSelectedDate(date)}
                        className={`w-full py-8 rounded-xl font-semibold transition ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {date}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Today Tasks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today : 6 November 2025</h2>
            
            <div className="space-y-3">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="w-6 h-6 accent-purple-600 cursor-pointer"
                    />
                    <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.name}
                    </span>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-gray-600 text-sm font-semibold">
                  {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`
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

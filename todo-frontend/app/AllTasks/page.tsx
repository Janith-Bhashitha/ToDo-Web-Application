"use client";

import { useState } from "react";
import Link from "next/link"; // <-- Removed this import to fix a build error

// ---
// ** 1. ICON COMPONENTS (SVGs) **
// ---

// This is your correct LogoIcon, styled to match the sidebar
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Purple box */}
    <rect x="1" y="1" width="90" height="90" rx="9" fill="#7C3AED" stroke="none"/>
    {/* White checkmark */}
    <g clipPath="url(#clip0_214_39)">
    <path d="M83 40.9V75.6667C83 77.8768 82.122 79.9964 80.5592 81.5592C78.9964 83.122 76.8768 84 74.6667 84H16.3333C14.1232 84 12.0036 83.122 10.4408 81.5592C8.87797 79.9964 8 77.8768 8 75.6667V17.3333C8 15.1232 8.87797 13.0036 10.4408 11.4408C12.0036 9.87797 14.1232 9 16.3333 9H67.7667M33 42.3333L45.5 54.8333L87.1667 13.1667" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_214_39">
    <rect width="82" height="77" fill="white" transform="translate(7 8)"/>
    </clipPath>
    </defs>
  </svg>
);

const AddIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
  </svg>
);

const AllTasksIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z" />
  </svg>
);

const TodayIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V3Zm1 1v1h4V4H7Zm-3 5h12v7H4v-7Z" clipRule="evenodd" />
  </svg>
);

const RemindersIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 0 0-6 6v3.58a1 1 0 0 1-.29.7l-1.42 1.42A1 1 0 0 0 3 15h14a1 1 0 0 0 .71-1.29l-1.42-1.42a1 1 0 0 1-.29-.7V8a6 6 0 0 0-6-6Zm0 16a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3Z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 1 1.5 0v2.5A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M16.78 9.97a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L14.94 11.5H8.25a.75.75 0 0 1 0-1.5h6.69L11.47 6.78a.75.75 0 0 1 1.06-1.06l4.25 4.25Z" clipRule="evenodd" />
  </svg>
);

const HamburgerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ---
// ** 1.5. NEW DELETE ICON **
// ---
// Added your new SVG icon here
const DeleteIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* I changed fill="black" to "currentColor" so we can style it with text-red-500 */}
    <path d="M31.25 8.33333H41.6667V12.5H37.5V39.5833C37.5 40.734 36.5673 41.6667 35.4167 41.6667H6.25C5.09942 41.6667 4.16667 40.734 4.16667 39.5833V12.5H0V8.33333H10.4167V2.08333C10.4167 0.93275 11.3494 0 12.5 0H29.1667C30.3173 0 31.25 0.93275 31.25 2.08333V8.33333ZM33.3333 12.5H8.33333V37.5H33.3333V12.5ZM14.5833 18.75H18.75V31.25H14.5833V18.75ZM22.9167 18.75H27.0833V31.25H22.9167V18.75ZM14.5833 4.16667V8.33333H27.0833V4.16667H14.5833Z" fill="currentColor"/>
  </svg>
);


// ---
// ** 2. TASK ITEM COMPONENT **
// ---

// First, let's define what a "Task" object looks like for TypeScript
type Task = {
  id: number;
  title: string;
  subTitle: string;
  dueDate: string;
};

// A small component to render a single task
const TaskItem = ({ task, checked, onToggle, onDelete }: { 
  task: Task; // <-- Use the new Task type
  checked: boolean;
  onToggle: (id: number) => void; 
  onDelete: (id: number) => void;
}) => (
  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onToggle(task.id)} // <-- Triggers the toggle function
      className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
    />
    <div className="flex-1">
      <p className={`text-sm font-medium text-slate-900 ${checked ? 'line-through text-slate-500' : ''}`}>
        {task.title}
      </p>
      <p className={`text-xs text-slate-500 ${checked ? 'line-through' : ''}`}>{task.subTitle}</p>
      <p className={`text-xs text-slate-500 mt-1 ${checked ? 'line-through' : ''}`}>Due: {task.dueDate}</p>
    </div>
    {/* Added Delete Button */}
    <button 
      onClick={() => onDelete(task.id)}
      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
      aria-label="Delete task"
    >
      <DeleteIcon />
    </button>
  </div>
);

// ---
// ** 3. ALL TASKS PAGE COMPONENT **
// ---
export default function AllTasksPage() {
  
  // Mock data for the tasks
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([ // <-- Use Task[] type
    { id: 1, title: "test 3", subTitle: "task 3", dueDate: "11/10/2025" },
    { id: 2, title: "test 2", subTitle: "task 2", dueDate: "11/6/2025" },
    { id: 3, title: "test", subTitle: "task 1", dueDate: "11/5/2025" },
  ]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]); // <-- Use Task[] type

  // State for the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("All Tasks");

  // Function to move tasks between lists
  const handleTaskToggle = (taskId: number) => {
    // First, check if the task is in the 'inProgress' list
    const taskToMove = inProgressTasks.find(t => t.id === taskId);

    if (taskToMove) {
      // It's in progress, so move it to completed
      setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
      setCompletedTasks([taskToMove, ...completedTasks]);
    } else {
      // It's not in progress, so it must be in 'completed'
      const taskToReopen = completedTasks.find(t => t.id === taskId);
      if (taskToReopen) {
        setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
        setInProgressTasks([taskToReopen, ...inProgressTasks]);
      }
    }
  };

  // ---
  // ** NEW DELETE FUNCTION **
  // ---
  const handleTaskDelete = (taskId: number) => {
    // This will remove the task from whichever list it's in
    setInProgressTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setCompletedTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  // This is the Sidebar JSX. We make it a variable to keep the return clean.
  const Sidebar = () => (
    <div className="flex flex-col flex-1">
      {/* Logo/Header */}
      <div className="flex items-center justify-between gap-3 p-6">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-2xl font-bold">ToDo.</h1>
        </div>
        {/* Close button (only for mobile overlay) */}
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="lg:hidden p-1 text-purple-200 hover:text-white"
        >
          <CloseIcon />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-2">
        <a 
          href="/createtask"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeNav === 'Add New' ? 'bg-purple-800' : 'hover:bg-purple-800/50'}`} 
          onClick={() => setActiveNav('Add New')}
        >
          <AddIcon />
          <span className="font-medium">Add New</span>
        </a>
        <a 
          href="/AllTasks" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeNav === 'All Tasks' ? 'bg-white text-purple-700' : 'hover:bg-purple-800/50'}`} 
          onClick={() => setActiveNav('All Tasks')}
        >
          <AllTasksIcon />
          <span className="font-medium">All Tasks</span>
        </a>
        <a 
          href="/today" // <-- Assuming this is the future page
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeNav === 'Today' ? 'bg-purple-800' : 'hover:bg-purple-800/50'}`} 
          onClick={() => setActiveNav('Today')}
        >
          <TodayIcon />
          <span className="font-medium">Today</span>
        </a>
        <a 
          href="/remainders" 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeNav === 'Reminders' ? 'bg-purple-800' : 'hover:bg-purple-800/5Only'}`} 
          onClick={() => setActiveNav('Reminders')}
        >
          <RemindersIcon />
          <span className="font-medium">Reminders</span>
        </a>
      </nav>
      
      {/* Logout  */}
      <div className="p-4 border-t border-purple-800/50">
        <a 
          href="/login" 
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-purple-200 hover:bg-purple-800/50 hover:text-white"
        >
          <LogoutIcon />
          <span className="font-medium">Logout</span>
        </a>
      </div>
    </div>
  );


  return (
    <div className="h-screen w-full bg-slate-50 font-sans">
      
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#7C3AED] text-white
                    transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    transition-transform duration-300 ease-in-out
                    lg:hidden flex`} 
      >
        <Sidebar />
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="hidden w-[280px] flex-col bg-[#7C3AED] text-white lg:flex lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>
            <div className="flex-1 flex flex-col lg:ml-[280px]">
        
        <header className="flex items-center justify-between p-4 lg:p-8">
          <div className="flex items-center gap-4">
            {/* Hamburger button*/}
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-1 text-slate-800"
            >
              <HamburgerIcon />
            </button>
            <h2 className="text-3xl font-bold text-slate-900">All Tasks</h2>
          </div>
        </header>
                <main className="flex-1 p-4 lg:p-8 pt-0 overflow-y-auto">
          {/* Columns for tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* In Progress Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">In Progress ({inProgressTasks.length})</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 border border-slate-200">
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      checked={false} 
                      onToggle={handleTaskToggle} 
                      onDelete={handleTaskDelete}
                    />
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No tasks in progress.</p>
                )}
              </div>
            </div>
            
            {/* Completed  */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Completed ({completedTasks.length})</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 h-full">
                {completedTasks.length > 0 ? (
                  completedTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      checked={true} 
                      onToggle={handleTaskToggle} 
                      onDelete={handleTaskDelete} 
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <p className="text-sm text-slate-500">No completed tasks</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

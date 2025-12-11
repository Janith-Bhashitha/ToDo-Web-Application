import { create } from 'zustand';

export interface Task {
    taskId: string;
    title: string;
    definition: string;
    dueDate: string;
    status: string;
    reminder: boolean;
    createdAt: string;
}

interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    deleteTask: (taskId: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,

    setTasks: (tasks) => set({ tasks }),

    addTask: (task) =>
        set((state) => ({
            tasks: [task, ...state.tasks],
        })),

    updateTask: (taskId, updates) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.taskId === taskId ? { ...task, ...updates } : task
            ),
        })),

    deleteTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.taskId !== taskId),
        })),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),
}));

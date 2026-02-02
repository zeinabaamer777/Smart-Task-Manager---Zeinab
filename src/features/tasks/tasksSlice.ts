import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  userId: number;
};

const seedTasks: Task[] = [
  {
    id: "1",
    title: "Setup project",
    status: "Pending",
    userId: 1,
  },
  {
    id: "2",
    title: "Design UI",
    status: "In Progress",
    userId: 2,
  },
];

const STORAGE_KEY = "smart_tasks";

const getInitialTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTasks));
    return seedTasks;
  } catch {
    return seedTasks;
  }
};

const initialState: Task[] = getInitialTasks();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    editTask(state, action: PayloadAction<Task>) {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.status = action.payload.status;
        task.userId = action.payload.userId;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      const updated = state.filter((t) => t.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;

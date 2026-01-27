import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  userId: number;
};

const initialState: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    editTask(state, action: PayloadAction<Task>) {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.status = action.payload.status;
        task.userId = action.payload.userId;
        saveToLocalStorage(state);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;

const saveToLocalStorage = (state: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(state));
};

export default tasksSlice.reducer;

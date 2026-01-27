import { Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import UserDetailsPage from "../pages/UserDetailsPage";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* to have the navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      {/* to not have the navbar */}
      <Route path="/users/:id" element={<UserDetailsPage />} />
    </Routes>
  );
}

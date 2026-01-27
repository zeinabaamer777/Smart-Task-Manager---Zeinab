import { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import AddTaskModal from "../components/add-task-modal/AddTaskModal";
import TasksTable from "../components/tasks-table/TasksTable";
import { deleteTask, type Task } from "../features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import DeleteTaskModal from "../components/delete-task-modal/DeleteTaskModal";
import { useGetUsersQuery } from "../features/users/usersApi";

export default function TasksPage() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filter, setFilter] = useState<
    "ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED"
  >("ALL");

  const tasks = useAppSelector((state) => state.tasks);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const dispatch = useAppDispatch();

  const [selectedUserId, setSelectedUserId] = useState<number | "ALL">("ALL");

  const { data: users = [] } = useGetUsersQuery();

  const filteredTasks = tasks.filter((task) => {
    // filter by status
    const statusMatch =
      filter === "ALL" ||
      (filter === "PENDING" && task.status === "Pending") ||
      (filter === "IN_PROGRESS" && task.status === "In Progress") ||
      (filter === "COMPLETED" && task.status === "Completed");

    // filter by user
    const userMatch =
      selectedUserId === "ALL" || task.userId === selectedUserId;

    return statusMatch && userMatch;
  });

  return (
    <>
      <Button
        className="float-end"
        onClick={() => {
          setTaskToEdit(null);
          setOpenAddTask(true);
        }}
      >
        + Add Task
      </Button>

      <div className="d-flex align-items-center gap-3 my-5">
        <div className="d-flex justify-content-between">
          <ButtonGroup>
            <Button
              variant={filter === "ALL" ? "primary" : "outline-primary"}
              onClick={() => setFilter("ALL")}
            >
              All
            </Button>
            <Button
              variant={filter === "PENDING" ? "primary" : "outline-primary"}
              onClick={() => setFilter("PENDING")}
            >
              Pending
            </Button>

            <Button
              variant={filter === "IN_PROGRESS" ? "primary" : "outline-primary"}
              onClick={() => setFilter("IN_PROGRESS")}
            >
              In progress
            </Button>

            <Button
              variant={filter === "COMPLETED" ? "primary" : "outline-primary"}
              onClick={() => setFilter("COMPLETED")}
            >
              Completed
            </Button>
          </ButtonGroup>
        </div>

        <Form.Select
          style={{ maxWidth: "220px" }}
          value={selectedUserId}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedUserId(value === "ALL" ? "ALL" : Number(value));
          }}
        >
          <option value="ALL">All Users</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <TasksTable
        tasks={filteredTasks}
        onEdit={(task) => {
          setTaskToEdit(task);
          setOpenAddTask(true);
        }}
        onDelete={(task) => {
          setTaskToDelete(task);
        }}
      />

      <AddTaskModal
        show={openAddTask}
        onClose={() => setOpenAddTask(false)}
        task={taskToEdit}
      />

      <DeleteTaskModal
        show={!!taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          if (taskToDelete) {
            dispatch(deleteTask(taskToDelete.id));
            setTaskToDelete(null);
            setFilter("ALL"); // reset to all if we have filtered tasks and delete all of them
          }
        }}
      />
    </>
  );
}

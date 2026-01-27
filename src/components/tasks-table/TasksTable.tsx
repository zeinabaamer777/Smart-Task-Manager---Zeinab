import { Table, Button, Badge } from "react-bootstrap";
import type { Task } from "../../features/tasks/tasksSlice";
import { useGetUsersQuery } from "../../features/users/usersApi";

// returns variant for badge based on task status
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "In Progress":
      return "info";
    case "Completed":
      return "success";
    default:
      return "secondary";
  }
};

export default function TasksTable({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  const { data: users = [] } = useGetUsersQuery();

  if (!tasks.length) {
    return (
      <p className="text-muted">
        No tasks, you can change the filter/search, or add a new task
      </p>
    );
  }

  const getUserName = (userId: number) => {
    return users?.find((user) => user.id === userId)?.name || "Unknown";
  };
  return (
    <Table striped hover className="mt-5">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Assignee</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>

            <td>
              <Badge bg={getStatusVariant(task.status)} className="px-3 py-2">
                {task.status}
              </Badge>
            </td>

            <td>{getUserName(task.userId)}</td>

            <td className="d-flex gap-3">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(task)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

import { Table, Button } from "react-bootstrap";
import type { User } from "../../features/users/userTypes";

export default function UsersTable({
  users,
  onDetails,
}: {
  users: User[];
  onDetails: (userId: number) => void;
}) {
  if (!users.length) {
    return <p className="text-muted">No users</p>;
  }

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.company?.name ?? "—"}</td>
            <td>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => onDetails(user.id)}
              >
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

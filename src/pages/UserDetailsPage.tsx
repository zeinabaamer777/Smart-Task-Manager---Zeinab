import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../features/users/usersApi";

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(id));

  // Loading state
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert variant="danger" className="mt-4">
        Failed to load user details.
      </Alert>
    );
  }

  // Empty state
  if (!user) {
    return (
      <Alert variant="warning" className="mt-4">
        User not found.
      </Alert>
    );
  }

  return (
    <>
      <Button
        variant="link"
        className="mb-3 mt-5 px-0 text-decoration-none"
        onClick={() => navigate(-1)}
      >
        ← Back to dashboard
      </Button>

      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>

          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>

          <Card.Text>
            <strong>Company:</strong> {user.company?.name ?? "—"}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

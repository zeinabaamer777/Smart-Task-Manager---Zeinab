import { useState } from "react";
import { Form, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UsersTable from "../components/users-table/UserTable";
import { useGetUsersQuery } from "../features/users/usersApi";

export default function UsersPage() {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useGetUsersQuery();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;

  if (isLoading) return <p>Loading...</p>;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  return (
    <>
      <div style={{ position: "relative", maxWidth: "300px" }}>
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ paddingRight: "32px" }}
          className="mb-3"
        />

        {search && (
          <span
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
              fontSize: "16px",
            }}
          >
            ✕
          </span>
        )}
      </div>

      <UsersTable
        users={paginatedUsers}
        onDetails={(id) => navigate(`/users/${id}`)}
      />

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          />

          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          />
        </Pagination>
      )}
    </>
  );
}

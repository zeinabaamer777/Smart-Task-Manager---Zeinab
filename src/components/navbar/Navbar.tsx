import { NavLink, Link } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar.css";
import { useTheme } from "../../theme/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <BsNavbar expand="lg" className="mb-4">
        <Container className="flex-column align-items-stretch">
          <div className="d-flex align-items-center justify-content-between">
            <BsNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
              TaskFlow
            </BsNavbar.Brand>

            <Button
              className="float-end my-5"
              variant={theme === "dark" ? "outline-light" : "dark"}
              size="sm"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </div>

          <div className="d-flex justify-content-between align-items-center w-100 mb-4">
            <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={NavLink} to="/tasks">
                Tasks
              </Nav.Link>
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </>
  );
}

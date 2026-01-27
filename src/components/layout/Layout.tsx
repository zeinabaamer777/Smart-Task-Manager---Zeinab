import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </>
  );
}

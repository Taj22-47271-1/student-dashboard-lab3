import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DashboardHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="dashboard-header">
      <h1>Student Dashboard</h1>
      <p>React Lab 03 — Context API, Form Validation and localStorage</p>

      <nav>
        <a href="#">Home</a>
        <a href="#">Students</a>
        <a href="#">Courses</a>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default DashboardHeader;
import { useContext } from "react";
import DashboardHeader from "./components/DashboardHeader";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import StudentCard from "./components/StudentCard";
import AddStudentForm from "./components/AddStudentForm";
import StatBadge from "./components/StatBadge";
import { StudentContext } from "./context/StudentContext";

function App() {
  const { students, filteredStudents, favoriteIds, loading } =
    useContext(StudentContext);

  return (
    <main className="container">
      <DashboardHeader />

      <section className="summary">
        <StatBadge label="Total Students" value={students.length} />
        <StatBadge label="Showing" value={filteredStudents.length} />
        <StatBadge label="Favorites" value={favoriteIds.length} />
      </section>

      <section className="controls">
        <SearchBar />
        <SortControls />
      </section>

      <AddStudentForm />

      {loading ? (
        <div className="loader">Loading students...</div>
      ) : (
        <section className="student-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          ) : (
            <p>No student found.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
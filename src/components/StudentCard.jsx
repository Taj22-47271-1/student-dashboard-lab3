import { useContext } from "react";
import PropTypes from "prop-types";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import { StudentContext } from "../context/StudentContext";

function StudentCard({ student }) {
  const { favoriteIds, toggleFavorite, removeStudent } =
    useContext(StudentContext);

  const isFavorite = favoriteIds.includes(student.id);
  const colors = ["#4f46e5", "#0891b2", "#16a34a", "#ea580c"];

  return (
    <div className="student-card">
      <img src={student.avatar} alt={student.name} />

      <h2>{student.name}</h2>
      <p>ID: {student.id}</p>
      <p>Major: {student.major}</p>

      <div className="card-stats">
        <StatBadge label="GPA" value={student.gpa} />
        <StatBadge label="Courses" value={student.courses.length} />
      </div>

      <div className="course-list">
        {student.courses.map((course, index) => (
          <CourseTag
            key={course}
            courseName={course}
            color={colors[index % colors.length]}
          />
        ))}
      </div>

      <button
        className={isFavorite ? "favorite-btn active" : "favorite-btn"}
        onClick={() => toggleFavorite(student.id)}
      >
        {isFavorite ? "★ Favorite" : "☆ Add Favorite"}
      </button>

      <button className="remove-btn" onClick={() => removeStudent(student.id)}>
        Remove Student
      </button>
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    gpa: PropTypes.number.isRequired,
    major: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default StudentCard;
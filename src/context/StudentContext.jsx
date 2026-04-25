import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import tajImage from "../assets/taj.png";
export const StudentContext = createContext();

  const defaultStudents = [
  {
    id: "47271",
    name: "M.H.Taj",
    avatar: tajImage, 
    gpa: 3.8,
    major: "Computer Science",
    courses: ["React", "JavaScript", "CSS"],
  },
  {
    id: "47272",
    name: "Rahim Ahmed",
    avatar: "https://i.pravatar.cc/150?img=5",
    gpa: 3.6,
    major: "Software Engineering",
    courses: ["Java", "Database", "HTML"],
  },
  {
    id: "47273",
    name: "Nusrat Jahan",
    avatar: "https://i.pravatar.cc/150?img=6",
    gpa: 3.9,
    major: "Data Science",
    courses: ["Python", "AI", "Statistics"],
  },
  {
    id: "47274",
    name: "Karim Hasan",
    avatar: "https://i.pravatar.cc/150?img=7",
    gpa: 3.5,
    major: "Web Development",
    courses: ["React", "Node.js", "MongoDB"],
  },
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("default");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");

    setTimeout(() => {
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      } else {
        setStudents(defaultStudents);
      }

      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);

  function toggleFavorite(id) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }

  function addStudent(newStudent) {
    setStudents([...students, newStudent]);
  }

  function removeStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
    setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
  }

  let filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.major.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (sortType === "name") {
    filteredStudents = [...filteredStudents].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortType === "gpa") {
    filteredStudents = [...filteredStudents].sort((a, b) => b.gpa - a.gpa);
  }

  useEffect(() => {
    document.title = `Dashboard — ${filteredStudents.length} Students`;
  }, [filteredStudents.length]);

  return (
    <StudentContext.Provider
      value={{
        students,
        filteredStudents,
        searchText,
        setSearchText,
        sortType,
        setSortType,
        favoriteIds,
        toggleFavorite,
        addStudent,
        removeStudent,
        loading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function SortControls() {
  const { sortType, setSortType } = useContext(StudentContext);

  return (
    <div className="sort-controls">
      <button
        className={sortType === "default" ? "active" : ""}
        onClick={() => setSortType("default")}
      >
        Default
      </button>

      <button
        className={sortType === "name" ? "active" : ""}
        onClick={() => setSortType("name")}
      >
        Name A-Z
      </button>

      <button
        className={sortType === "gpa" ? "active" : ""}
        onClick={() => setSortType("gpa")}
      >
        GPA High-Low
      </button>
    </div>
  );
}

export default SortControls;
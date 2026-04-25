import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function SearchBar() {
  const { searchText, setSearchText } = useContext(StudentContext);

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search by name or major..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}

export default SearchBar;
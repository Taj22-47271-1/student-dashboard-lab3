import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/StudentContext";

function AddStudentForm() {
  const { students, addStudent } = useContext(StudentContext);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    const newErrors = {};
    const gpaNumber = Number(formData.gpa);

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.id.trim()) {
      newErrors.id = "Student ID is required";
    } else if (!/^\d+$/.test(formData.id)) {
      newErrors.id = "Student ID must be numeric";
    } else if (students.some((student) => student.id === formData.id)) {
      newErrors.id = "Student ID must be unique";
    }

    if (!formData.major.trim()) {
      newErrors.major = "Major is required";
    }

    if (formData.gpa === "") {
      newErrors.gpa = "GPA is required";
    } else if (gpaNumber < 0 || gpaNumber > 4) {
      newErrors.gpa = "GPA must be between 0 and 4.0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newStudent = {
      id: formData.id,
      name: formData.name,
      major: formData.major,
      gpa: Number(formData.gpa),
      avatar: `https://i.pravatar.cc/150?u=${formData.id}`,
      courses: formData.courses
        .split(",")
        .map((course) => course.trim())
        .filter((course) => course !== ""),
    };

    addStudent(newStudent);

    setFormData({
      name: "",
      id: "",
      major: "",
      gpa: "",
      courses: "",
    });

    setSuccess(true);
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <section className="form-section">
      <h2>Add New Student</h2>

      {success && <p className="success-message">Student added successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input name="id" value={formData.id} onChange={handleChange} />
          {errors.id && <small>{errors.id}</small>}
        </div>

        <div className="form-group">
          <label>Major</label>
          <input name="major" value={formData.major} onChange={handleChange} />
          {errors.major && <small>{errors.major}</small>}
        </div>

        <div className="form-group">
          <label>GPA</label>
          <input
            type="number"
            step="0.01"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
          />
          {errors.gpa && <small>{errors.gpa}</small>}
        </div>

        <div className="form-group full">
          <label>Courses</label>
          <input
            name="courses"
            placeholder="React, Java, SQL"
            value={formData.courses}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Student</button>
      </form>
    </section>
  );
}

export default AddStudentForm;
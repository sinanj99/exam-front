import React, { useState } from "react";

function MyCourses({ facade: { getCoursesByStudent } }) {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const [courses, setCourses] = useState([]);
  const handleChange = evt => {
    setName(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    getCoursesByStudent(name).then(res => {
      console.log(res);

      setCourses(res);
      setSearched(true);
    });
  };
  return searched === false ? (
    <div className="container">
      <div className="form-group">
        <h1>See your courses</h1>
        <label>Type your name</label>
        <input
          className="form-control"
          placeholder="Insert name ..."
          onChange={handleChange}
          id="name"
        ></input>
        <label>Search</label>
        <button className="btn btn-primary" onClick={handleSubmit}>
          See Courses
        </button>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>All attended courses and results</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((res, i) => {
            return (
              <tr key={res.id}>
                <td>{res.courseDTO.courseName}</td>
                <td>{res.courseDTO.description}</td>
                <td>{res.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default MyCourses;

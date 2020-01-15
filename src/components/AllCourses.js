import React, { useEffect, useState } from "react";

function AllCourses({ facade: { allCourses } }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    allCourses()
      .then(res => {
        setCourses(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1>All Courses Available</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((res, i) => {
            return (
              <tr key={res.id}>
                <td>{res.courseName}</td>
                <td>{res.description}</td>
                <td>spring2020</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AllCourses;

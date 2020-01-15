import React, { useState } from "react";
function AddCourse({ facade: { addCourse } }) {
  const initState = { courseName: "", description: "" };
  const [course, setCourse] = useState({ ...initState });
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);
  const handleChange = evt => {
    course[evt.target.id] = evt.target.value;
    setCourse({ ...course });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    addCourse(course)
      .then(res => {
        console.log(res);
        setCourse({ ...initState });
        setAdded(true);
      })
      .catch(err =>
        err.fullError.then(fullError => setMessage(fullError.message))
      );
  };
  return added === false ? (
    <div className="container">
      <form onChange={handleChange}>
        <h1>Add a new course</h1>
        <div className="form-group">
          <label>Name of course</label>
          <input
            className="form-control"
            placeholder="Name of course ..."
            id="courseName"
            value={course.courseName}
          ></input>
          <label>Description of course</label>
          <input
            className="form-control"
            placeholder="Description of course ..."
            id="description"
            value={course.description}
          ></input>
          <br></br>
          <button onClick={handleSubmit} className="btn btn-primary">
            Add course
          </button>
          <h4 className="error">{message}</h4>
        </div>
        {JSON.stringify(course)}
      </form>
    </div>
  ) : (
    <div className="container">
      <h1>Course has been added!</h1>
      <button onClick={() => setAdded(false)} className="btn btn-primary">
        Add another one!
      </button>
    </div>
  );
}
export default AddCourse;

import React, { useState } from "react";

function EditClass({ facade: { editClass, removeClass, getClass } }) {
  const [id, setId] = useState();
  const [class_, setClass_] = useState({});
  const [loaded, setLoaded] = useState(false);

  const changeClass = evt => {
    class_[evt.target.id] = evt.target.value;
    setClass_({ ...class_ });
  };
  const handleChange = evt => {
    setId(evt.target.value);
  };
  const handleSubmit = evt => {
    getClass(id).then(res => {
      setClass_(res);
      setLoaded(true);
      console.log(res);
    });
  };
  const deleteClass = evt => {
    removeClass(id).then(res => console.log(res));
  };

  const editClassSubmit = evt => {
    evt.preventDefault();
    editClass(class_);
    setClass_({});
  };
  return loaded === false ? (
    <div className="container">
      <h1>Edit Class</h1>
      <div className="form-group">
        <label>Type id of class to edit</label>
        <input
          className="form-control"
          placeholder="Type id ..."
          type="number"
          onChange={handleChange}
        ></input>
        <button
          style={{ margin: "20px 0px" }}
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Find Class
        </button>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="form-group">
        <h1>Class with id {class_.id}</h1>

        <label>Change semester</label>
        <input
          onChange={changeClass}
          className="form-control"
          placeholder="Semester ..."
          value={class_.semester}
          id="semester"
        ></input>
        <label>Change max number of students</label>
        <input
          onChange={changeClass}
          className="form-control"
          placeholder="Max number of students ..."
          value={class_.maxNumbOfStudents}
          id="maxNumbOfStudents"
        ></input>
        <button onClick={deleteClass} className="btn btn-danger">
          Delete class
        </button>
        <button onClick={editClassSubmit} className="btn btn-primary">
          Edit class
        </button>
      </div>
      {JSON.stringify(class_)}
    </div>
  );
}
export default EditClass;

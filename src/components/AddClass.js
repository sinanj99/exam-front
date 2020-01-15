import React, { useState, useEffect } from "react";

function AddClass({
  facade: { getCourses, getTeachers, getStudents, addClass }
}) {
  useEffect(() => {
    getCourses().then(res => {
      setCourses(res);
    });
    getTeachers().then(res => setTeachers(res));
    getStudents().then(res => setStudents(res));
  }, []);
  const initial = {
    semester: "",
    maxNumbOfStudents: 0,
    courseDTO: {},
    teacherDTOs: [],
    signedUpDTOs: []
  };
  const [courses, setCourses] = useState();
  const [teachers, setTeachers] = useState();
  const [students, setStudents] = useState([]);
  const [class_, setClass_] = useState({ ...initial });
  const [added, setAdded] = useState(false);
  const handleClass = evt => {
    class_[evt.target.id] = evt.target.value;
    setClass_({ ...class_ });
  };
  const submitClass = evt => {
    evt.preventDefault();
    const categories = ["teachers", "students", "courses"];
    categories.forEach(category => {
      const checkedBoxes = Array.from(
        document.querySelectorAll("." + category)
      );
      switch (category) {
        case "teachers":
          class_.teacherDTOs = checkedBoxes
            .filter(ch => ch.checked)
            .map(ch => teachers[ch.value]);
          setClass_({ ...class_ });

          break;
        case "students":
          const selectedStuds = checkedBoxes
            .filter(ch => ch.checked)
            .map(ch => students[ch.value]);
          const signedUps = [];
          selectedStuds.forEach(stud => signedUps.push({ studentDTO: stud }));
          class_.signedUpDTOs = signedUps;
          setClass_({ ...class_ });
          break;
        default:
          const id = checkedBoxes.filter(ch => ch.checked)[0].value;
          const course = courses.filter(course => course.id == id)[0];
          class_.courseDTO = course;
          setClass_({ ...class_ });
      }
    });
    addClass(class_).then(res => console.log(res));
    setClass_({ ...initial });
    setAdded(true);
  };
  return !added ? (
    <div className="container">
      <form>
        <h1>Add A New Class</h1>
        <div onChange={handleClass} className="form-group">
          <label>Type a semester name:</label>
          <input
            placeholder="Semester name ..."
            value={class_.semester}
            className="form-control"
            id="semester"
          ></input>
          <label>Type max number of students:</label>
          <input
            type="number"
            placeholder="Max number of students ..."
            value={class_.maxNumbOfStudents}
            className="form-control"
            id="maxNumbOfStudents"
          ></input>
        </div>
        <h2>Select teachers</h2>
        <div className="form-gr8oup">
          {teachers
            ? teachers.map((t, i) => {
                return (
                  <div key={i} className="form-check">
                    <input
                      className="form-check-input teachers"
                      type="checkbox"
                      value={t.id}
                    ></input>
                    <label className="form-check-label">{t.name}</label>
                  </div>
                );
              })
            : ""}
          <h2>Select course</h2>
          {courses
            ? courses.map((c, i) => {
                return (
                  <div key={i} className="form-check">
                    <input
                      className="form-check-input courses"
                      type="checkbox"
                      value={c.id}
                      name=""
                    ></input>
                    <label className="form-check-label">{c.courseName}</label>
                  </div>
                );
              })
            : ""}
          <h2>Select students</h2>
          {students
            ? students.map((s, i) => {
                return (
                  <div key={i} className="form-check">
                    <input
                      className="form-check-input students"
                      type="checkbox"
                      value={s.id}
                    ></input>
                    <label className="form-check-label">{s.email}</label>
                  </div>
                );
              })
            : ""}
        </div>
      </form>
      {JSON.stringify(class_)}
      <button
        style={{ width: "50%", margin: "20px" }}
        className="btn btn-primary"
        onClick={submitClass}
      >
        Add class
      </button>
    </div>
  ) : (
    <div className="container">
      <h1>Class has been added ! </h1>
      <button onClick={() => setAdded(false)} className="btn btn-primary">
        Add another one!
      </button>
    </div>
  );
}

export default AddClass;

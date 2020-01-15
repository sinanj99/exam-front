function ApiFacade() {
  const URL = "https://sinanjasar.dk/exam/api/";
  let roles = [];
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }
  const setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    return getToken() != null;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };
  function makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  const login = (user, pass) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch("https://sinanjasar.dk/exam/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        roles = res.roles;
        return res;
      });
  };

  const getTeachers = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "teacher/all", options).then(handleHttpErrors);
  };
  const getCourses = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "course/all/", options).then(handleHttpErrors);
  };
  const getStudents = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "student/all/", options).then(handleHttpErrors);
  };
  const addClass = class_ => {
    const options = makeOptions("POST", true, class_);
    return fetch(URL + "class/add", options).then(handleHttpErrors);
  };
  const addCourse = course => {
    const options = makeOptions("POST", true, course);
    return fetch(URL + "course/add", options).then(handleHttpErrors);
  };
  const allCourses = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "course/all", options).then(handleHttpErrors);
  };
  const removeClass = id => {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "class/delete/" + id, options).then(handleHttpErrors);
  };
  const getClass = id => {
    const options = makeOptions("GET", true);
    return fetch(URL + "class/id/" + id, options).then(handleHttpErrors);
  };
  const editClass = class_ => {
    const options = makeOptions("PUT", true, class_);
    return fetch(URL + "class/edit", options).then(handleHttpErrors);
  };
  const getCoursesByStudent = name => {
    const options = makeOptions("GET", true);
    return fetch(URL + "signedup/" + name, options).then(handleHttpErrors);
  };
  return {
    getCoursesByStudent,
    removeClass,
    editClass,
    getClass,
    allCourses,
    addCourse,
    getStudents,
    addClass,
    getCourses,
    getTeachers,
    login,
    logout
  };
}

export default ApiFacade();

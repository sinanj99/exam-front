import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import "./App.css";
import facade from "./apiFacade";
import LogIn from "./components/LogIn";
import AllCourses from "./components/AllCourses";
import MyCourses from "./components/MyCourses";
import AddClass from "./components/AddClass.js";
import AddCourse from "./components/AddCourse";
import EditClass from "./components/EditClass";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState();
  const [userMessage, setUserMessage] = useState("Hello anonymous");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const Header = () => {
    return (
      <ul className="menu">
        <React.Fragment>
          <li>
            <NavLink to="/all-courses" exact activeClassName="active">
              All courses
            </NavLink>
          </li>
          {loggedIn ? (
            <React.Fragment>
              <li onClick={logout} style={{ float: "right" }}>
                <NavLink to="/login" exact activeClassName="active">
                  Log out
                </NavLink>
              </li>
              <li style={{ float: "right" }}>
                <a>{userMessage}</a>
              </li>
              {roles && roles.includes("admin") ? (
                <React.Fragment>
                  <li>
                    <NavLink to="/add-class" exact activeClassName="active">
                      Add Class
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-course" exact activeClassName="active">
                      Add Course
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/edit-class" exact activeClassName="active">
                      Edit Class
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <li>
                  <NavLink to="/my-courses" exact activeClassName="active">
                    My Courses
                  </NavLink>
                </li>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li style={{ float: "right" }}>
                <NavLink to="/login">Log in</NavLink>
              </li>
            </React.Fragment>
          )}
        </React.Fragment>
      </ul>
    );
  };

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <React.Fragment>
            <Route exact path="/">
              <Redirect to="/all-courses"></Redirect>
            </Route>
            <Route path="/login">
              <LogIn
                facade={facade}
                setUserMessage={setUserMessage}
                setLoggedIn={setLoggedIn}
                setRoles={setRoles}
              />
            </Route>
            <Route path="/all-courses">
              <AllCourses facade={facade} />
            </Route>
            <Route path="/my-courses">
              {roles && roles.includes("user") ? (
                <MyCourses facade={facade} />
              ) : (
                <Redirect to=""></Redirect>
              )}
            </Route>
            <Route path="/add-class">
              {roles && roles.includes("admin") ? (
                <AddClass facade={facade} />
              ) : (
                <Redirect to=""></Redirect>
              )}
            </Route>
            <Route path="/add-course">
              {roles && roles.includes("admin") ? (
                <AddCourse facade={facade} />
              ) : (
                <Redirect to=""></Redirect>
              )}
            </Route>
            <Route path="/edit-class">
              {roles && roles.includes("admin") ? (
                <EditClass facade={facade} />
              ) : (
                <Redirect to=""></Redirect>
              )}
            </Route>
          </React.Fragment>
        </Switch>
      </Router>
    </div>
  );
}
export default App;

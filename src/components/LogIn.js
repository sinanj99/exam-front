import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function LogIn({ facade, setUserMessage, setLoggedIn, setRoles }) {
  const history = useHistory();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState();
  const login = evt => {
    evt.preventDefault();
    facade
      .login(user.username, user.password)
      .then(res => {
        setUserMessage("Hello " + res.username);
        setLoggedIn(true);
        setRoles(res.roles);
        history.push("/all-courses");
      })
      .catch(err => {
        setError("Wrong credentials!");
      });
  };
  const onChange = evt => {
    user[evt.target.id] = evt.target.value;
    setUser({ ...user });
  };

  return (
    <div className="container">
      <form onChange={onChange}>
        <div className="form-group">
          <h1>Login</h1>
          <input
            className="form-control"
            placeholder="User Name"
            id="username"
          />
          <br />
          <input
            className="form-control"
            placeholder="Password"
            id="password"
          />
          <br />
          <button onClick={login} className="btn btn-primary">
            Login
          </button>
          {error ? <h2>{error}</h2> : ""}
        </div>
      </form>
    </div>
  );
}
export default LogIn;

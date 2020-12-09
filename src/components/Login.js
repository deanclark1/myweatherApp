import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import weather from "../images/weather.png";

function Login({ handleLoginstate }) {
  const [userName, setUserName] = useState(""),
    [alert, setAlert] = useState(""),
    [password, setPassword] = useState(""),
    history = useHistory();

  function handleName(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleLoginClick(e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if (users !== null) {
      let user = users[userName];
      if (user && user.password === password) {
        handleLoginstate(true, user);
        history.push("/");
      } else setAlert("Wrong user name or password");
    } else setAlert("Unknown user..Signup");
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2 pt-5">
            <img src={weather} alt="img1" />
          </div>

          <div className="col-2">
            <form className="pt-5">
              <h2>Log In</h2>

              <div>
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={handleName}
                />
              </div>

              <div>
                <input
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              <div>
                <button className="btn btn-dark" type="submit" onClick={handleLoginClick}>
                  Login
                </button>
              </div>
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

              <div>
                <span>{alert}</span>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

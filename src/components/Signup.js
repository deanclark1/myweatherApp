import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [msg, setMsg] = useState(""),
    history = useHistory();

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleMsg() {
    return msg;
  }

  const onSignUp = (e) => {
    e.preventDefault();
    if (name && email && password) {
      let thisUser = { name, email, password },
        usersJSON = localStorage.getItem("users"),
        users = usersJSON ? JSON.parse(usersJSON) : {};

      //    !users && users={}
      users[name] = thisUser;
      localStorage.setItem("users", JSON.stringify(users));
      setMsg("Successfully Signed up..You will be redirected to login page");
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } else {
      setMsg("Invalid input");
    }
  };
  return (
    <>
    
      <div className="main ">
        <form className="form-container">
          <h2 className="heading pb-2">Sign Up</h2>

          <div>
            <input
              className="form-control mb-2"
              type="text"
              value={name}
              placeholder="User Name"
              onChange={handleName}
              required
            />
          </div>

          <div>
            <input className="form-control mb-2"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmail}
              required
            />
          </div>

          <div>
            <input
              className="form-control mb-2"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
              required
            />
            
          </div>
          <div>
            {/* <Link to='/login'>  */}
            <button className="btn btn-dark pb-1" onClick={onSignUp}>Sign Up</button>
            {msg ? <span>{handleMsg()}</span> : null}
            {/* </Link> */}
          </div>
          
          <div>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

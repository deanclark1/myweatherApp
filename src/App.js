import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './components/HomePage'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

function App() {
  const [isLogin, setLoginState] = useState(false);
  const [authUser, setAuthUser] = useState("");
  const [history, setHistory] = useState("");

  function handleLoginstate(isLogin, user) {
    setLoginState(isLogin);
    setAuthUser(user);
  }
  const getSearchHistory = () => {
    let results = JSON.parse(localStorage.getItem("searchHistory"));
    // paln A (difficulty : easy)
    // if(results!==null) setHistory(results[authUser.name])
    // plan b (difficulty: High)
    results && setHistory(results[authUser.name]);
  };
  return (
    <div>
      <Router>
        <Navbar {...{ handleLoginstate, getSearchHistory, isLogin }} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Homepage
                isLogin={isLogin}
                username={typeof authUser === "object" ? authUser.name : null}
                history={history}
              />
            )}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            component={() => <Login handleLoginstate={handleLoginstate} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

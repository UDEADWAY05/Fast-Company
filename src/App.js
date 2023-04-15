import React from "react";
// import Users from "./components/users";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./components/usersApp";

function App() {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex ml-10">
        <h4>
          <Link style={{ textDecoration: "none" }} className="m-2" to="/main">main</Link>
        </h4>
        <h4>
          <Link style={{ textDecoration: "none" }} className="m-2" to="/login">login</Link>
        </h4>
        <h4>
          <Link style={{ textDecoration: "none" }} className="m-2" to="/users">users</Link>
        </h4>
      </div>
      <Switch>
        <Route path="/users/:userId?" component={UsersApp} />
        <Redirect exact from="/" to="/users" />
        <Route exact path="/login" component={Login}></Route>
        <Route path="/main" component={Main}></Route>
       </Switch>
    </div>
  );
}

export default App;

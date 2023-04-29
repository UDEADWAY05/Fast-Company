import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./layouts/usersApp";
import NavBar from "./components/navbar";
function App() {
  return (
    <div className="d-flex flex-column">
        <NavBar></NavBar>
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

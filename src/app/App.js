import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./layouts/usersApp";
import NavBar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
function App() {
  return (
    <div className="d-flex flex-column">
        <AppLoader/>
        <AuthProvider>
          <NavBar></NavBar>
              <Switch>
                <ProtectedRoute path="/users/:userId?/:edit?" component={UsersApp} />
                <Route exact path="/login/:type?" component={Login} />
                <Route path="/main" component={Main} />
                <Route path="/logout" component={LogOut} />
                <Redirect exact from="/" to="/main" />
              </Switch>
        </AuthProvider>
        <ToastContainer />
        <AppLoader/>
    </div>
  );
}

export default App;

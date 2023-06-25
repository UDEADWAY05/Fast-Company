import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./layouts/usersApp";
import NavBar from "./components/ui/navbar";
import { ProfessionProvider } from "./hooks/useProfession";
import { ToastContainer } from "react-toastify";
import { QualitiesProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
function App() {
  return (
    <div className="d-flex flex-column">
        <AuthProvider>
          <NavBar></NavBar>
          <QualitiesProvider>
            <ProfessionProvider>
              <Switch>
                <ProtectedRoute path="/users/:userId?/:edit?" component={UsersApp} />
                <Route exact path="/login/:type?" component={Login} />
                <Route path="/main" component={Main} />
                <Route path="/logout" component={LogOut} />
                <Redirect exact from="/" to="/main" />
              </Switch>
            </ProfessionProvider>
          </QualitiesProvider>
        </AuthProvider>
        <ToastContainer />
    </div>
  );
}

export default App;

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./layouts/usersApp";
import NavBar from "./components/ui/navbar";
import { ProfessionProvider } from "./hooks/useProfession";
import { ToastContainer } from "react-toastify";
import { QualitiesProvider } from "./hooks/useQuality";
function App() {
  return (
    <div className="d-flex flex-column">
        <NavBar></NavBar>
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/users/:userId?/:edit?" component={UsersApp} />
              <Route exact path="/login/:type?" component={Login} />
              <Redirect exact from="/" to="/users" />
              <Route path="/main" component={Main} />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
        <ToastContainer />
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersApp from "./layouts/usersApp";
import NavBar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/profession";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);
  return (
    <div className="d-flex flex-column">
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
    </div>
  );
}

export default App;

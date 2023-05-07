import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserInfo from "../components/page/userPage";

const UsersApp = () => {
  const params = useParams();
  const { userId } = params;
  return userId ? <UserInfo id={userId} /> : <UsersListPage></UsersListPage>;
};

export default UsersApp;

import React from "react";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserInfo from "../components/page/userPage";
import UserForm from "../components/ui/userform";

const UsersApp = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;
  return userId ? (edit ? <UserForm userId={userId}/> : <UserInfo id={userId}/>) : <UsersListPage></UsersListPage>;
};

export default UsersApp;

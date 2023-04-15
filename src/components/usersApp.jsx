import React from "react";
import Users from "../layouts/users";
import { useParams } from "react-router-dom";
import UserInfo from "./userInfo";

const UsersApp = () => {
  const params = useParams();
  const { userId } = params;
  return userId ? <UserInfo id={userId} /> : <Users></Users>;
};

export default UsersApp;

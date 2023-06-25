import React from "react";
import UserBody from "../../common/userBody";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";

const UserInfo = ({ id }) => {
  const { users, getUserById } = useUser()
  const user = getUserById(id)
  if (user) {
    return <UserBody user={user} users={users}/>;
  }
  return "loading...";
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;

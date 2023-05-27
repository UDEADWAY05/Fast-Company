import React, { useState, useEffect } from "react";
import UserBody from "../../common/userBody";
import PropTypes from "prop-types";
import API from "../../../API";

const UserInfo = ({ id }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.getById(id).then((data) => setUser(data));
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);
  if (user) {
    return <UserBody user={user} users={users}/>;
  }
  return "loading...";
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;

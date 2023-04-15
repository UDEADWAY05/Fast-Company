import React, { useState, useEffect } from "react";
import UserBody from "./userBody";
import PropTypes from "prop-types";

import API from "../API";

const UserInfo = ({ id }) => {
  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  if (users) {
    const myUser = users.filter((user) => user._id === id);
    return <UserBody user={myUser[0]}/>;
  }
  return "loading...";
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;

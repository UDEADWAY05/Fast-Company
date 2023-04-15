import React, { useState, useEffect } from "react";
import UserBody from "./userBody";
import PropTypes from "prop-types";

import API from "../API";

const UserInfo = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(id).then((data) => setUser(data));
  }, []);

  if (user) {
    return <UserBody user={user}/>;
  }
  return "loading...";
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;

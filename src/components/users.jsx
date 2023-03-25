import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, func, onFolow }) => {
  const usersEl = users.map((user) => (
    <User user={user} funcFolow={onFolow} key={user._id} onFunc={func} />
  ));
  return usersEl;
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  func: PropTypes.func.isRequired,
  onFolow: PropTypes.func.isRequired
};

export default Users;

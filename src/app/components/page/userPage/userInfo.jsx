import React, { useState, useEffect } from "react";
import UserBody from "../../common/userBody";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import API from "../../../API"
import UserForm from "../../ui/userform";

const UserInfo = ({ id }) => {
  const params = useParams();
  const { edit } = params;
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(id).then((data) => setUser(data));
  }, []);
  if (user && edit) {
    return <UserForm userId={id} user={user}></UserForm>
  } else if (user) {
    return <UserBody user={user}/>;
  }
  return "loading...";
};

UserInfo.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserInfo;

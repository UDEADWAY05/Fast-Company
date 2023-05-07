import React from "react";
import Qualities from "../ui/qualities"
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserBody = ({ user }) => {
  const history = useHistory();
  const HandleSave = () => {
    history.push(history.location.pathname + "/edit");
  };
  return <div>
    <h1>{user.name}</h1>
    <h1>{"Профессия: " + user.profession.name}</h1>
    <Qualities qualities={user.qualities} ></Qualities>
    <h5>{"completedMeetings: " + user.completedMeetings}</h5>
    <h1>{"Rate: " + user.rate}</h1>
    <button className="" onClick={() => HandleSave()}>Редактировать</button>
  </div>;
};

UserBody.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserBody;

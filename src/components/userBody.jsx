import React from "react";
import QualitiesList from "./qualituesList";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserBody = ({ user }) => {
  const history = useHistory();
  const HandleSave = () => {
    history.push("/users");
  };
  return <div>
    <h1>{user.name}</h1>
    <h1>{"Профессия: " + user.profession.name}</h1>
    <QualitiesList qualities={user.qualities} ></QualitiesList>
    <h5>{"completedMeetings: " + user.completedMeetings}</h5>
    <h1>{"Rate: " + user.rate}</h1>
    <button className="" onClick={() => HandleSave()}>сохранить</button>
  </div>;
};

UserBody.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserBody;

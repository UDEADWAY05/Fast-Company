import React from "react";
import PropTypes from "prop-types";

const MeatingCard = ({ user }) => {
  return <div className="card">
    <div className="card-body">
      <div className="d-flex flex-column align-items-center text-center position-relative">
        <h4>Completed meetings</h4>
        <h1 className="display-1">{user.completedMeetings}</h1>
      </div>
    </div>
  </div>;
};

MeatingCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default MeatingCard;

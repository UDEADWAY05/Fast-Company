import React from "react";
import PropTypes from "prop-types";
import UserCard from "./userPage/userCard";
import QualitiesCard from "./userPage/qualitiesCard";
import MeatingCard from "./userPage/meatingCard";
import CommentsCard from "./userPage/commentsCard";

const UserBody = ({ user }) => {
    
  return <div className="container">
    <div className="row gutters-sm">
    <div className="col-md-4 mb-3">
        <UserCard user={user} />
        <QualitiesCard qualities ={user.qualities} />
        <MeatingCard user={user} />
    </div>
    <div className="col-md-8">
        <CommentsCard />
    </div>
    </div>
  </div>;
};

UserBody.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserBody;

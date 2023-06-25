import React from "react";
import PropTypes from "prop-types";
import UserCard from "./userPage/userCard";
import QualitiesCard from "./userPage/qualitiesCard";
import MeatingCard from "./userPage/meatingCard";
import CommentsCard from "./userPage/commentsCard";
import { useQualities } from "../../hooks/useQuality";
import { CommentsProvider } from "../../hooks/useComents";

const UserBody = ({ user }) => {
    
  return <div className="container">
    <div className="row gutters-sm">
    <div className="col-md-4 mb-3">
        <UserCard user={user} />
        <QualitiesCard qualities ={user.qualities} />
        <MeatingCard user={user} />
    </div>
    <div className="col-md-8">
      <CommentsProvider>
        <CommentsCard />
      </CommentsProvider>
    </div>
    </div>
  </div>;
};

UserBody.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserBody;

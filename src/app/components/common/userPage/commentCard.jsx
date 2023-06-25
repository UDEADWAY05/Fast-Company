import React from "react";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const CommentCard = ({ comment, onRemove }) => {
  const { getUserById } = useUser()
  const {currentUser} = useAuth()
  const user = getUserById(comment.userId)
  return <div className="bg-light card-body mb-3">
    <div className="row" >
      <div className="col" >
          <div className="d-flex flex-start" >
              <img
                src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                        {user && user.name}{" "}
                        <span className="small"> - {displayDate(comment.created_at)}</span>
                    </p>
                    { currentUser._id === user._id && 
                    <button className=" btn btn-sm text-primary d-flex align-items-center" onClick={() => onRemove(comment._id)}>
                        <i className="bi bi-x-lg"></i>
                    </button>}
                </div>
                <p>{comment.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

CommentCard.propTypes = {
  onRemove: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
};

export default CommentCard;

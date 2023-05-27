import React, { useEffect, useState } from "react";
import API from "../../../API";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";

const CommentCard = ({ comment, onRemove }) => {
  const [user, setUser] = useState();
  const [isLoding, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    API.users.getById(comment.userId).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return <div className="bg-light card-body mb-3">
    <div className="row" >
      <div className="col" >
        {isLoding
          ? ("Loaging...")
          : (
          <div className="d-flex flex-start" >
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
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
                    <button className=" btn btn-sm text-primary d-flex align-items-center" onClick={() => onRemove(comment._id)}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <p>{comment.content}</p>
            </div>
          </div>)}
        </div>
      </div>
    </div>;
};

CommentCard.propTypes = {
  onRemove: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
};

export default CommentCard;

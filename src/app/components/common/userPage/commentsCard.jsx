import React from "react";
import CommentCard from "./commentCard";
import { orderBy } from "lodash";
import AddComentForm from "./addCommentForm";
import { useComments } from "../../../hooks/useComents";

const CommentsCard = () => {
  const { createComment, comments, removeComment } = useComments() 
  const handleRemove = (id) => {
    removeComment(id)
  };
  const handleSubmit = (comment) => {
    // API.comments.add(comment).then((data) => (setCommentsArr([...commentsArr, data])));
      createComment(comment)
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return <div className="d-flex flex-column position-relative" >
      <AddComentForm onChange={handleSubmit} />
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
             {sortedComments.map((com) => <CommentCard key={com._id} comment={com} onRemove={handleRemove}/>)}
          </div>
        </div>
      )}
  </div>;
};

export default CommentsCard;

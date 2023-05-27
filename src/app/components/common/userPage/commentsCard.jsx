import React, { useEffect, useState } from "react";
import CommentCard from "./commentCard";
import API from "../../../API";
import { orderBy } from "lodash";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AddComentForm from "./addCommentForm";

const CommentsCard = () => {
  const { userId } = useParams();
  const [commentsArr, setCommentsArr] = useState();
  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setCommentsArr(data));
  }, []);
  const handleRemove = (id) => {
    API.comments.remove(id).then((id) => setCommentsArr(commentsArr.filter((x) => x._id !== id)));
  };
  const handleSubmit = (comment) => {
    API.comments.add(comment).then((data) => (setCommentsArr([...commentsArr, data])));
  };
  const sortedComments = orderBy(commentsArr, ["created_at"], ["desc"]);

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

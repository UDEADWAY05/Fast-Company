import React, { useEffect } from "react";
import CommentCard from "./commentCard";
import { orderBy } from "lodash";
import AddComentForm from "./addCommentForm";
import { useComments } from "../../../hooks/useComents";
import { useDispatch, useSelector } from "react-redux";
import { createComment, removeComment, getComments, getCommentsLoadingStatus, loadCommentsList } from "../../../store/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserData } from "../../../store/users";

const CommentsCard = () => {
  const params = useParams()
  const {userId} = params
  const currentUser = useSelector(getCurrentUserData())
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(loadCommentsList(userId))
  },[userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments()) 
  const handleRemove = (id) => {
    dispatch(removeComment(id))
  };
  const handleSubmit = (comment) => {
      dispatch(createComment({ ...comment, pageId: userId, userId: currentUser._id }))
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return <div className="d-flex flex-column position-relative" >
      <AddComentForm onChange={handleSubmit} />
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {!isLoading 
                ? sortedComments.map((com) => <CommentCard key={com._id} comment={com} onRemove={handleRemove} />)
                : "Loading..."
            }
          </div>
        </div>
      )}
  </div>;
};

export default CommentsCard;

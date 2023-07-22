import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { nanoid } from "nanoid";
import commentServise from "../services/comment.service";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData())
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments()    
  }, [userId])

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  }, [error]);

  async function createComment(data) {
    const comment = {
        ...data,
        pageId: userId,
        created_at: Date.now(),
        userId: currentUser._id,
        _id: nanoid()
    }
    try {
        const { content } =  commentServise.createComment(comment)
        setComments(prevState => [...prevState, comment])
    } catch (error) {
        const {message} = error.response.data
        setError(message)
    }
  }
  async function getComments() {
    try {
      const { content } = await commentServise.getComments(userId)
      setComments(content)
    } catch (error) {
      setError(error)
    } finally {
        setLoading(false)
    }
  }
  async function removeComment(id) {
    try {
        const { content } = await commentServise.removeComment(id)
        if (content === null) {
            setComments((prevState) => prevState.filter((com) => com._id !== id))
        }
    } catch (error) {
        setError(error)
    }
  }
  return (
    <CommentsContext.Provider value={{ isLoading, comments, createComment, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
}


CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
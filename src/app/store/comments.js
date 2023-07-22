import { createSlice } from "@reduxjs/toolkit"
import commentServise from "../services/comment.service"
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        commentsRequesFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        commentCreatedFailed: (state, action) => {
            state.error = action.payload
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter((com) => com._id !== action.payload )
        },
        commentRemoveFailed: (state, action) => {
            state.error = action.payload
        },
    }
})

const { reducer: commentsReducer, actions } = commentsSlice;

const { commentsReceved, commentRemoveFailed, commentRemove, commentCreatedFailed, commentCreated, commentsRequested, commentsRequesFailed } = actions


export const loadCommentsList = (userId) => async (dispatch, getState) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentServise.getComments(userId);
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequesFailed(error.message))
    };
};

export const createComment = (data) => async(dispatch, getState) => {
    const comment = {
        ...data,
        created_at: Date.now(),
        _id: nanoid()
    }
    try {
        const { content } = await commentServise.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentCreatedFailed(error))
    }
}

export const removeComment = (id) => async(dispatch, getState) => {
    try {
        const { content } = await commentServise.removeComment(id)
        console.log(content)
        if (content === null) dispatch(commentRemove(id))
    } catch (error) {
        dispatch(commentRemoveFailed(error))
    }
  }

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer;

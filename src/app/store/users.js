import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.servise";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdate: (state, action) => {
            state.entities = [...state.entities.filter(u => u._id !== action.payload._id), action.payload];
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        authRequested: (state, action) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const { usersReceved, userUpdateFailed, userUpdate, usersRequested, userLoggedOut, usersRequesFailed, authRequestSuccess, authRequestFailed } = actions;

const authRequested = createAction("users/authRequested");

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        console.log({ code, message });
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            console.log(error);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/users");
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const updateUser = (user) => async (dispatch) => {
    try {
        const { content } = await userService.updateUser(user);
        console.log(content);
        dispatch(userUpdate(content));
        history.push(`/users/${user._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error));
    }
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequesFailed(error.message));
    };
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => state.users.entities.find((user) => user._id === id);

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((user) => user._id === state.users.auth.userId)
        : null;
};
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;

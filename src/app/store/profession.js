import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;

const { professionsReceved, professionsRequested, professionsRequesFailed } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequesFailed(error.message));
        };
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionById = (professionId) => state => {
    if (state.professions.entities) {
        return state.professions.entities.find((q) => q._id === professionId);
    }
};

export default professionsReducer;

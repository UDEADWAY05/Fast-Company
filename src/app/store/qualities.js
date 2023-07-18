import { createSlice} from "@reduxjs/toolkit"
import qualityServise from "../services/quality.servise"


const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequesFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice;

const {qualitiesReceved, qualitiesRequested, qualitiesRequesFailed} = actions

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityServise.get();
            dispatch(qualitiesReceved(content))
        } catch (error) {
            dispatch(qualitiesRequesFailed(error.message))
        };
    }
};

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading
export const getQualitiesById = (qualitieslId) => state => {
    if (state.qualities.entities) {
        const qualitiesArray = []
        for (const qualid of qualitieslId) {
            for (const qual of state.qualities.entities) {
                if (qual._id === qualid) {
                    qualitiesArray.push(qual)
                    break
                }
            }
        }
        return qualitiesArray
    }
}

export default qualitiesReducer;

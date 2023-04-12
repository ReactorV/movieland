import {createSlice, PayloadAction } from "@reduxjs/toolkit"

import { StarredState, Movie } from "../types"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: []
    } as StarredState,
    reducers: {
        starMovie: (state, action: PayloadAction<Movie>) => {
            state.starredMovies = [action.payload, ...state.starredMovies]
        },
        unstarMovie: (state, action: PayloadAction<Movie>) => {
            const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)
            state.starredMovies.splice(indexOfId, 1)
        },
        clearAllStarred: (state) => {
            state.starredMovies = []
        },
    },
})

export default starredSlice

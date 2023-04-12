import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { WatchLaterState, Movie } from "../types"

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: []
    } as WatchLaterState,
    reducers: {
        addToWatchLater: (state, action: PayloadAction<Movie>) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
        },
        removeFromWatchLater: (state, action) => {
            const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)
            state.watchLaterMovies.splice(indexOfId, 1)
        },
        removeAllWatchLater: (state) => {
            state.watchLaterMovies = []
        },
    },
})

export default watchLaterSlice

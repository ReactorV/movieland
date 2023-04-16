import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IMoviesState } from "../types"
export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl: string) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const initialState: IMoviesState = {
    movies: [],
    fetchStatus: '',
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export const moviesSliceReducer = moviesSlice.reducer
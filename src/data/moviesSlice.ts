import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IMoviesState } from '../types'
export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl: string) => {
  const response = await fetch(apiUrl).catch((error) => console.error(error))

  return response?.json()
})

const initialState: IMoviesState = {
  movies: [],
  fetchStatus: '',
  errorMessage: '',
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const isFalseStatus = action.payload?.success === false
        state.movies = isFalseStatus ? [] : [...state.movies, ...action.payload?.results]
        state.fetchStatus = isFalseStatus ? 'error' : 'success'
        state.errorMessage = isFalseStatus ? 'Request has been fulfilled, but something went wrong...' : ''
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error'
        state.errorMessage = 'Request is rejected, something went wrong...'
      })
  },
})

export const moviesSliceReducer = moviesSlice.reducer

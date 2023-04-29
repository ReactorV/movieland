import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IStarredState, IMovie } from '../types'

const initialState: IStarredState = {
  starredMovies: [],
}

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    starMovie: (state, action: PayloadAction<Partial<IMovie>>) => {
      state.starredMovies = [action.payload, ...state.starredMovies]
    },
    unstarMovie: (state, action: PayloadAction<Partial<IMovie>>) => {
      const indexOfId = state.starredMovies.findIndex((key) => key.id === action.payload.id)
      state.starredMovies.splice(indexOfId, 1)
    },
    clearAllStarred: (state) => {
      state.starredMovies = []
    },
  },
})

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions

export const starredSliceReducer = starredSlice.reducer

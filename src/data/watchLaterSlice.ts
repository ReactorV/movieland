import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IWatchLaterState, IMovie } from '../types'

const initialState: IWatchLaterState = {
  watchLaterMovies: [],
}

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState,
  reducers: {
    addToWatchLater: (state, action: PayloadAction<Partial<IMovie>>) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
    },
    removeFromWatchLater: (state, action: PayloadAction<Partial<IMovie>>) => {
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id)
      state.watchLaterMovies.splice(indexOfId, 1)
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = []
    },
  },
})

export const { addToWatchLater, removeFromWatchLater, removeAllWatchLater } = watchLaterSlice.actions

export const watchLaterSliceReducer = watchLaterSlice.reducer

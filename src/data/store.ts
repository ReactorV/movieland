import { configureStore } from '@reduxjs/toolkit'
import { moviesSliceReducer } from './moviesSlice'
import { starredSliceReducer } from './starredSlice'
import { watchLaterSliceReducer } from './watchLaterSlice'

export const store = configureStore({
  reducer: {
    movies: moviesSliceReducer,
    starred: starredSliceReducer,
    watchLater: watchLaterSliceReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

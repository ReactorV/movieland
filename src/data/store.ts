import { configureStore } from "@reduxjs/toolkit"
import moviesSlice from './moviesSlice'
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

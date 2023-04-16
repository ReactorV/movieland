import type { AppState } from './store'
export const getStarredMovies = (state: AppState) => state.starred
export const getWatchLaterMovies = (state: AppState) => state.watchLater
export const getMoviesSelector = (state: AppState) => state.movies

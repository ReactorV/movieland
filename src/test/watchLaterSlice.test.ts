import {
  watchLaterSliceReducer,
  addToWatchLater,
  removeFromWatchLater,
  removeAllWatchLater,
} from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {
  const state = { watchLaterMovies: [] }

  it('should set initial state', () => {
    const initialState = state
    const action = { type: '' }
    const result = watchLaterSliceReducer(initialState, action)
    expect(result).toEqual({ watchLaterMovies: [] })
  })

  it('should add movie to watch later', () => {
    const initialState = { ...state, watchLaterMovies: [] }
    const action = addToWatchLater(moviesMock[0])
    const result = watchLaterSliceReducer(initialState, action)
    expect(result.watchLaterMovies[0]).toBe(moviesMock[0])
  })

  it('should remove movie from watch later', () => {
    const initialState = { ...state, watchLaterMovies: moviesMock }
    const action = removeFromWatchLater(moviesMock[0])
    const result = watchLaterSliceReducer(initialState, action)
    expect(result.watchLaterMovies[0]).toBe(moviesMock[1])
  })

  it('should remove all movies', () => {
    const initialState = { ...state, watchLaterMovies: moviesMock }
    const result = watchLaterSliceReducer(initialState, removeAllWatchLater)

    expect(Object.keys(result.watchLaterMovies).length).toEqual(0)
  })
})

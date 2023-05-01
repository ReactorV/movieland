import { fetchMovies, moviesSliceReducer } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'
import { IMoviesState } from '../types'

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending }
    const initialState = moviesSliceReducer(
      {
        movies: [],
        fetchStatus: '',
          errorMessage: '',
      } as IMoviesState,
      action
    )
    expect(action).toEqual({ type: fetchMovies.pending })
  })

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: { results: moviesMock },
    }
    const initialState = moviesSliceReducer(
      {
        movies: [],
        fetchStatus: '',
          errorMessage: '',
      } as IMoviesState,
      action
    )
    expect(action.payload).toBeTruthy()
  })

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected }
    const initialState = moviesSliceReducer(
      {
        movies: [],
        fetchStatus: '',
        errorMessage: '',
      } as IMoviesState,
      action
    )
    expect(action).toEqual({ type: fetchMovies.rejected })
  })
})

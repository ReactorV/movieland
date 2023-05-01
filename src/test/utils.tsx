import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { moviesSliceReducer } from '../data/moviesSlice'
import { starredSliceReducer } from '../data/starredSlice'
import { watchLaterSliceReducer } from '../data/watchLaterSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {
        movies: { movies: [],  fetchStatus: 'success', errorMessage: '' },
        starred: { starredMovies: [] },
        watchLater: { watchLaterMovies: [] }
    },
    store = configureStore({
      reducer: {
        movies: moviesSliceReducer,
        starred: starredSliceReducer,
        watchLater: watchLaterSliceReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch)

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

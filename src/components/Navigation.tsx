import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../data/hooks'
import { getStarredMovies } from "../data/selectors";

import '../styles/header.scss'

export const Navigation = memo(() => {
  const { starredMovies } = useAppSelector(getStarredMovies)

  return (
    <nav>
      <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
        {starredMovies.length > 0 ? (
          <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
          </>
        ) : (
          <i className="bi bi-star" />
        )}
      </NavLink>
      <NavLink to="/watch-later" className="nav-fav">
        watch later
      </NavLink>
    </nav>
  )
})

Navigation.displayName = 'Navigation'

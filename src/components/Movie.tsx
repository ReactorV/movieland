import { memo, RefObject } from 'react'

import { useAppDispatch, useAppSelector } from '../data/hooks'
import { starMovie, unstarMovie } from '../data/starredSlice'
import { addToWatchLater, removeFromWatchLater } from '../data/watchLaterSlice'
import { getStarredMovies, getWatchLaterMovies } from '../data/selectors'

// @ts-ignore
import placeholder from '../assets/not-found-500X750.jpeg'
import { IMovie } from '../types'

interface Props {
  movie: Partial<IMovie>
  viewTrailer: (movie: Partial<IMovie>) => void
  closeCard?: () => void
  observerRef?: RefObject<HTMLDivElement> | null
  id?: string
}

export const Movie = memo(({ movie, viewTrailer, closeCard, observerRef, id }: Props) => {
  const starred = useAppSelector(getStarredMovies)
  const watchLater = useAppSelector(getWatchLaterMovies)
  const dispatch = useAppDispatch()

  const myClickHandler = (event) => {
    event.stopPropagation()
    event.target.parentElement.parentElement.classList.remove('opened')
  }

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2" id={id} ref={observerRef}>
      <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')}>
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies.map((movie) => movie.id).includes(movie.id) ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies.map((movie) => movie.id).includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className="bi bi-check"></i>
              </button>
            )}
            <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder}
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
})

import { memo, RefObject, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../data/hooks'
import { starMovie, unstarMovie } from '../data/starredSlice'
import { addToWatchLater, removeFromWatchLater } from '../data/watchLaterSlice'
import { getStarredMovies, getWatchLaterMovies } from '../data/selectors'
import { StarButton } from './StarButton'
import { WatchLaterButton } from './WatchLaterButton'

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

export const Movie = memo(({ movie, viewTrailer, closeCard, observerRef }: Props) => {
  const starred = useAppSelector(getStarredMovies)
  const watchLater = useAppSelector(getWatchLaterMovies)
  const dispatch = useAppDispatch()

  const [isOpened, setIsOpened] = useState(false)

  const isStarred = !starred.starredMovies.map((movie) => movie.id).includes(movie.id)
  const isWatchLater = !watchLater.watchLaterMovies.map((movie) => movie.id).includes(movie.id)

  const handleCloseClick = () => setIsOpened(false)

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      setIsOpened(true)
    }
  }

  const handleStarMovieClick = (movie: Partial<IMovie>) =>
    dispatch(
      starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    )

  const handleUnstarMovieClick = (movie) => dispatch(unstarMovie(movie))

  const handleAddToWatchLaterClick = (movie: Partial<IMovie>) =>
    dispatch(
      addToWatchLater({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      })
    )

  const handleRemoveFromWatchLaterClick = (movie) => dispatch(removeFromWatchLater(movie))

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2" ref={observerRef}>
      <div className={`card ${isOpened ? 'opened' : ''}`} onClick={handleCardClick}>
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <StarButton
              isStarred={isStarred}
              onStarMovieClick={() => handleStarMovieClick(movie)}
              onUnstarMovieClick={() => handleUnstarMovieClick(movie)}
            />
            <WatchLaterButton
              isWatchLater={isWatchLater}
              onAddToWatchLater={() => handleAddToWatchLaterClick(movie)}
              onRemoveFromWatchLater={() => handleRemoveFromWatchLaterClick(movie)}
            />
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
        <button type="button" className="close" onClick={handleCloseClick} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
})

Movie.displayName = 'Movie'

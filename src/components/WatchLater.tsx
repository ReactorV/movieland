import { Link } from 'react-router-dom'

import { removeAllWatchLater } from '../data/watchLaterSlice'
import { useAppDispatch, useAppSelector } from '../data/hooks'
import { getWatchLaterMovies } from '../data/selectors'
import { Movie } from './Movie'

import '../styles/starred.scss'

const WatchLater = ({ viewTrailer }) => {
  const watchLater = useAppSelector(getWatchLaterMovies)
  const dispatch = useAppDispatch()

  const handleRemoveAllWatchLaterClick = () => dispatch(removeAllWatchLater())

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={handleRemoveAllWatchLaterClick}>
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default WatchLater

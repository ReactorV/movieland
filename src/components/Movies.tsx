import { memo, RefObject } from 'react'

import { Movie } from './Movie'
import { Loader } from './Loader'
import { IMovie } from '../types'
import '../styles/movies.scss'

interface Props {
  movies: IMovie[]
  viewTrailer: (movie: Partial<IMovie>) => void
  closeCard: () => void
  observerRef: RefObject<HTMLDivElement>
  isLoading: boolean
  errorMessage: string
}

export const Movies = memo(
  ({ movies, viewTrailer, closeCard, observerRef, isLoading, errorMessage }: Props) => {
    return (
      <div className="movies" data-testid="movies">
        {movies.map((movie, index) => {
          const isLastMovie = index === movies.length - 1

          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              closeCard={closeCard}
              observerRef={isLastMovie ? observerRef : null}
            />
          )
        })}
        {errorMessage && <div>{errorMessage}</div>}
        {isLoading && <Loader />}
      </div>
    )
  }
)

Movies.displayName = 'Movies'

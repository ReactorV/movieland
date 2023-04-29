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
  currentPage: number
  errorMessage: string
}

export const Movies = memo(
  ({ movies, viewTrailer, closeCard, observerRef, isLoading, currentPage, errorMessage }: Props) => {
    return (
      <div data-testid="movies" style={{ paddingBottom: '60px' }}>
        {movies.map((movie, index) => {
          const isLastMovie = index === movies.length - 1

          return (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
              closeCard={closeCard}
              observerRef={isLastMovie ? observerRef : null}
              id={isLastMovie ? `end-of-movies-list-${currentPage}` : String(index)}
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

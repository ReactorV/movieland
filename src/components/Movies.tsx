import { memo, RefObject } from 'react'
import Movie from './Movie'
import '../styles/movies.scss'
import { IMovie } from "../types";

interface Props {
    movies: IMovie[],
    viewTrailer: (movie: Partial<IMovie>) => void
    closeCard: () => void
    observerRef: RefObject<HTMLDivElement>
    isLoading: boolean
    currentPage: number
}

const Movies = memo(({ movies, viewTrailer, closeCard, observerRef, isLoading, currentPage }: Props) => {

    return (
        <div data-testid="movies" style={{ paddingBottom: '60px' }}>
            {movies.map((movie, index) => {
                const isLastMovie = index === movies.length - 1;

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
            {isLoading && <div>Loading...</div>}
        </div>
    )
})

export default Movies

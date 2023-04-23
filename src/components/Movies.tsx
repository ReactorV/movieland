import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard, observer }) => {

    return (
        <div data-testid="movies" style={{ paddingBottom: '60px' }}>
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
            <div ref={observer} id="end-of-movies-list" style={{ paddingBottom: '20px' }} />
        </div>
    )
}

export default Movies

export interface IWatchLaterState {
    watchLaterMovies:  Partial<IMovie>[]
}

export interface IStarredState {
    starredMovies: Partial<IMovie>[]
}

export interface IMoviesState {
    movies: IMovie[]
    fetchStatus: string
}

export interface IMovie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

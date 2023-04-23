import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { getMoviesSelector } from './data/selectors'
import { useAppDispatch, useAppSelector } from './data/hooks'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import { useInfiniteScroll } from './hooks';
import './app.scss'

const App = () => {
  const movies = useAppSelector(getMoviesSelector)
  const dispatch = useAppDispatch()

  const [videoKey, setVideoKey] = useState(null)
  const [isOpen, setOpen] = useState(false)

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [debouncedFetchMovies, currentPage, observer] = useInfiniteScroll(fetchMovies, movies?.fetchStatus);
  console.log("movies :", movies);
  console.log("currentPage :", currentPage);
  const handleCloseClick = () => setOpen(false)

  const closeCard = () => {

  }

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())
      .catch(error => console.error(error))

    if (videoData?.videos?.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      // @ts-ignore
      debouncedFetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${currentPage}`)
    } else {
      // @ts-ignore
      debouncedFetchMovies(`${ENDPOINT_DISCOVER}&page=${currentPage}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage])

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {isOpen && (
            <Popup open={isOpen} closeOnDocumentClick={false} onClose={handleCloseClick}>
              <div className="player-container">
                <button className="btn-close" onClick={handleCloseClick} />
                {videoKey ? (
                    <YouTubePlayer videoKey={videoKey} />
                ) : (
                  <div className="player-plug">
                    <h6>No trailer available. Try another movie</h6>
                  </div>
                )}
              </div>
            </Popup>
        )}

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} observer={observer}/>} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

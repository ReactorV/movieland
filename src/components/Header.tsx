import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Search } from './Search'
import { Navigation } from './Navigation'

import '../styles/header.scss'

interface Props {
  searchMovies: (query: string) => void
  searchParams?: URLSearchParams
  setSearchParams: (params: URLSearchParams) => void
}

export const Header = memo(({ searchMovies }: Props) => {
  const handleHomeClick = () => searchMovies('')

  return (
    <header className="header">
      <Link to="/" data-testid="home" onClick={handleHomeClick}>
        <i className="bi bi-film" />
      </Link>
      <div className="header-right">
        <Search search={searchMovies} />
        <Navigation />
      </div>
    </header>
  )
})

Header.displayName = 'Header'

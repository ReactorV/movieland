import { memo, useState, ChangeEvent } from 'react'

interface Props {
  search: (text: string) => void
}
export const Search = memo(({ search }: Props) => {
  const [searchText, setSearchText] = useState('')
  const handleSearchClick = (event: ChangeEvent) => {
    const newSearchText = (event.target as HTMLInputElement).value ?? ''

    setSearchText(newSearchText)
    search(newSearchText)
  }

  return (
    <div className="input-group rounded">
      <input
        type="search"
        data-testid="search-movies"
        className="form-control rounded"
        onChange={handleSearchClick}
        placeholder="Search movies..."
        aria-label="Search movies"
        aria-describedby="search-addon"
        value={searchText}
      />
    </div>
  )
})

Search.displayName = 'Search'

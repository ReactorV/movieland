export const StarButton = ({ isStarred, onStarMovieClick, onUnstarMovieClick }) => {
  return isStarred ? (
    <span className="btn-star" data-testid="starred-link" onClick={onStarMovieClick}>
      <i className="bi bi-star" />
    </span>
  ) : (
    <span className="btn-star" data-testid="unstar-link" onClick={onUnstarMovieClick}>
      <i className="bi bi-star-fill" data-testid="star-fill" />
    </span>
  )
}

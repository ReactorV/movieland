export const WatchLaterButton = ({ isWatchLater, onAddToWatchLater, onRemoveFromWatchLater }) => {
  return isWatchLater ? (
    <button
      type="button"
      data-testid="watch-later"
      className="btn btn-light btn-watch-later"
      onClick={onAddToWatchLater}
    >
      Watch Later
    </button>
  ) : (
    <button
      type="button"
      data-testid="remove-watch-later"
      className="btn btn-light btn-watch-later blue"
      onClick={onRemoveFromWatchLater}
    >
      <i className="bi bi-check"></i>
    </button>
  )
}

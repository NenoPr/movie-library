import "../App.css";

function MovieCard({ movie, onToggleWatched, onRatingChange, onRemove }) {
  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            className="poster-image"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "/no_poster.png"
            }
            alt={movie.title}
          />
        </div>
        <div className="movie-details">
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <div>
            <p>
              Click to set show as{" "}
              {movie.watched ? "not watched:" : "as watched:"}
            </p>
            <button onClick={() => onToggleWatched(movie.id)}>
              {movie.watched ? "Completed" : "Not watched"}
            </button>
          </div>
          <div>Change your rating:</div>
          <p>Your Rating:</p>
          <select
            value={movie.user_rating}
            onChange={(event) => onRatingChange(movie.id, event.target.value)}
          >
            <option value="0">Not rated</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <p></p>
          <button onClick={() => onRemove(movie.id)}>
            Remove from watchlist
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieCard;

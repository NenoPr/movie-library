import { useState, useEffect } from "react";
import Watchlist from "./components/watchlist";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);

  const handleSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    });

    const data = await response.json();
    console.log(data.results);

    setMovies(data.results);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
      handleSearch();
    }
  };

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prewatchlist) => [
      ...prewatchlist,
      { ...movie, watched: false, user_rating: 0 },
    ]);
  };

  return (
    <div className="main">
      <div className="search-holder">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
        />

        <button onClick={handleSearch}>Search</button>
      </div>
      <div
        className="watchlist-button"
        onClick={() => setToggleWatchlist(!toggleWatchlist)}
      >
        My Watchlist
      </div>

      {toggleWatchlist ? (
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      ) : (
        <div className="movies-card-holder">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
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
                <p>Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
                <button onClick={() => addToWatchlist(movie)}>
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

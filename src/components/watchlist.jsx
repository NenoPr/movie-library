import { useState, useEffect } from "react";
import "../App.css";

function Watchlist({ watchlist, setWatchlist }) {
  const [currentTab, setCurrentTab] = useState("all");
  useEffect(() => {
    console.log(watchlist);
  }, []);
  const removeWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== movieId),
    );
  };
  const updateWatchlistWatched = (movieId) => {
    setWatchlist((prevlist) =>
      prevlist.map((movie) =>
        movie.id === movieId ? { ...movie, watched: !movie.watched } : movie,
      ),
    );
  };
  const updateWatchlistRating = (movieId, rating) => {
    setWatchlist((prevList) =>
      prevList.map((movie) =>
        movie.id === movieId ? { ...movie, user_rating: rating } : movie,
      ),
    );
  };
  const filteredWatchlist = watchlist.filter((movie) => {
    if (currentTab === "watched") {
      return movie.watched === true;
    }

    if (currentTab === "not-watched") {
      return movie.watched === false;
    }

    return true;
  });
  return (
    <>
      <div className="watched-tabs">
        <button
          className={`all-watchlist watchlist-tab ${currentTab === "all" ? "watchlist-tab-selected" : ""}`}
          onClick={() => setCurrentTab("all")}
        >
          All
        </button>
        <button
          className={`watched-watchlist watchlist-tab ${currentTab === "watched" ? "watchlist-tab-selected" : ""}`}
          onClick={() => setCurrentTab("watched")}
        >
          Watched
        </button>
        <button
          className={`not-watched-watchlist watchlist-tab ${currentTab === "not-watched" ? "watchlist-tab-selected" : ""}`}
          onClick={() => setCurrentTab("not-watched")}
        >
          Not Watched
        </button>
      </div>
      <div className="movies-card-holder">
        {filteredWatchlist.map((movie) => {
          return (
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
                <div>
                  <p>
                    Click to set show as{" "}
                    {movie.watched ? "not watched:" : "as watched:"}
                  </p>
                  <button onClick={() => updateWatchlistWatched(movie.id)}>
                    {movie.watched ? "Completed" : "Not watched"}
                  </button>
                </div>
                <div>Change your rating:</div>
                <p>Your Rating:</p>
                <select
                  name="rating"
                  id="rating"
                  value={movie.user_rating}
                  onChange={(event) =>
                    updateWatchlistRating(movie.id, event.target.value)
                  }
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
                <button onClick={() => removeWatchlist(movie.id)}>
                  Remove from watchlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Watchlist;

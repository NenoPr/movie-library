import { useState, useEffect } from "react";
import "../App.css";
import MovieCard from "./MovieCard.jsx";

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

  const watchedFilms = watchlist.filter((movie) => {
    if (movie.watched === true) return movie;
  });
  const unwatchedFilms = watchlist.filter((movie) => {
    if (movie.watched === false) return movie;
  });
  const completionPercentage =
    watchlist.length > 0
      ? Math.round((watchedFilms.length / watchlist.length) * 100)
      : 0;
  return (
    <>
      <div className="watchlist-stats">
        <div>{watchlist.length} movies total</div>
        <div>{watchedFilms.length} watched</div>
        <div>{unwatchedFilms.length} unwatched</div>
        <div>{completionPercentage}% complete</div>
      </div>
      <div className="progress-bar-container">
        <div
          style={{
            width: `${completionPercentage}%`,
          }}
          className="progress-bar"
        >
          {watchedFilms.length}/{watchlist.length}
        </div>
      </div>
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
        {filteredWatchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleWatched={updateWatchlistWatched}
            onRatingChange={updateWatchlistRating}
            onRemove={removeWatchlist}
          ></MovieCard>
        ))}
      </div>
    </>
  );
}

export default Watchlist;

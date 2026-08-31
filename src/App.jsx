import { useState, useEffect } from "react";
import Watchlist from "./components/watchlist";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const [toggletime, setToggleTime] = useState("all-years");

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
    setWatchlist((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev
        : [...prev, { ...movie, watched: false, user_rating: 0 }],
    );
  };

  const filteredTime = movies.filter((movie) => {
    if (toggletime === "all-years") {
      return movie;
    } else if (toggletime === "2020+") {
      if (movie.release_date.slice(0, 4) > 2020) {
        return movie;
      }
    } else if (toggletime === "2010+") {
      if (
        movie.release_date.slice(0, 4) < 2020 &&
        movie.release_date.slice(0, 4) > 2009
      ) {
        return movie;
      }
    } else if (toggletime === "2000+") {
      if (
        movie.release_date.slice(0, 4) < 2010 &&
        movie.release_date.slice(0, 4) > 1999
      ) {
        return movie;
      }
    } else if (toggletime === "before-2000") {
      if (movie.release_date.slice(0, 4) < 2000) {
        return movie;
      }
    }
  });

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
      <button
        className="watchlist-button"
        onClick={() => setToggleWatchlist(!toggleWatchlist)}
      >
        {toggleWatchlist ? "<-- Search Results" : "My Watchlist -->"}
      </button>

      {toggleWatchlist ? (
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      ) : (
        <>
          <div className="age-range-container">
            <button
              className="all-years"
              onClick={() => setToggleTime("all-years")}
            >
              All Years
            </button>
            <button className="2020+" onClick={() => setToggleTime("2020+")}>
              2020+
            </button>
            <button className="2010+" onClick={() => setToggleTime("2010+")}>
              2010+
            </button>
            <button className="2000+" onClick={() => setToggleTime("2000+")}>
              2000+
            </button>
            <button
              className="before-2000"
              onClick={() => setToggleTime("before-2000")}
            >
              Before 2000
            </button>
          </div>
          <div className="movies-card-holder">
            {filteredTime.map((movie) => (
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
                  {watchlist.some((item) => item.id === movie.id) ? (
                    <button disabled>Added</button>
                  ) : (
                    <button onClick={() => addToWatchlist(movie)}>
                      Add to Watchlist
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Watchlist from "./components/watchlist";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const [toggletime, setToggleTime] = useState("all-years");
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");

    return saved ? JSON.parse(saved) : [];
  });

  const [status, setStatus] = useState("Nothing here yet...");

  const handleSearch = async () => {
    setStatus("Loading...");
    setMovies([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;

      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      if (response.length < 1) setStatus("No movies found by that name...");

      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
      setStatus(error);
    }

    setStatus("Nothing here yet...");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
      handleSearch();
    }
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
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
              className={`all-years ${toggletime === "all-years" ? "search-filter-tab-selected" : ""}`}
              onClick={() => setToggleTime("all-years")}
            >
              All Years
            </button>
            <button
              className={`2020+ ${toggletime === "2020+" ? "search-filter-tab-selected" : ""}`}
              onClick={() => setToggleTime("2020+")}
            >
              2020+
            </button>
            <button
              className={`2010+ ${toggletime === "2010+" ? "search-filter-tab-selected" : ""}`}
              onClick={() => setToggleTime("2010+")}
            >
              2010+
            </button>
            <button
              className={`2000+ ${toggletime === "2000+" ? "search-filter-tab-selected" : ""}`}
              onClick={() => setToggleTime("2000+")}
            >
              2000+
            </button>
            <button
              className={`before-2000 ${toggletime === "before-2000" ? "search-filter-tab-selected" : ""}`}
              onClick={() => setToggleTime("before-2000")}
            >
              Before 2000
            </button>
          </div>
          <div className="movies-card-holder">
            {movies.length > 0 ? (
              filteredTime.map((movie) => (
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
                    <p>
                      <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                      <strong>Rating:</strong> {movie.vote_average}
                    </p>
                    <p>
                      <strong>Summary: </strong>
                      {movie.overview}
                    </p>
                    {watchlist.some((item) => item.id === movie.id) ? (
                      <button disabled>Added</button>
                    ) : (
                      <button
                        className="add-button"
                        onClick={() => addToWatchlist(movie)}
                      >
                        Add to Watchlist
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>{status}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

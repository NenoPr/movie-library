import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="main">
      <div className="search-holder">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies..."
        />

        <button onClick={handleSearch}>Search</button>
      </div>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

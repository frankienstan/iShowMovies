import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoviesByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchMoviesByCategory = async (category) => {
    try {
      let endpoint = "";
      if (category === "trending") {
        endpoint = "trending/movie/week";
      } else if (category === "topRated") {
        endpoint = "movie/top_rated";
      } else if (category === "newReleases") {
        endpoint = "movie/upcoming";
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="content">
          <SearchBar onSearch={handleSearch} />
          <Sidebar fetchMoviesByCategory={fetchMoviesByCategory} />
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./MovieCard.css";
const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;
const API_KEY = import.meta.env.VITE_API_KEY;
const MovieCard = ({ movie }) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for movie posters
  const [genres, setGenres] = useState([]);
  const { title, poster_path } = movie;
  const [imdbId, setImdbId] = useState(null);
  const [imdbUrl, setImdbUrl] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenreNames = () => {
    return movie.genre_ids
      .map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .filter((genreName) => genreName !== "");
  };

  const getReleaseYear = () => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate.getFullYear();
  };

  useEffect(() => {
    fetchImdbDetails();
  }, []);

  const fetchImdbDetails = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=${OMDB_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch IMDb details");
      }

      const data = await response.json();
      setImdbId(data.imdbID);
      setImdbUrl(`https://www.imdb.com/title/${data.imdbID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = () => {
    if (imdbUrl) {
      window.open(imdbUrl, "_blank");
    }
  };
  const imgStyle = {
    backgroundImage: `url(${posterBaseUrl}${movie.poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    width: "100%",
    height: "auto",
    paddingTop: "150%", // Adjust the padding-top to control the aspect ratio of the background image
  };
  return (
    <div className="card">
      <div className="card__info-hover">
        <div className="card__year">{getReleaseYear()}</div>
      </div>
      <div className="card__img"></div>
      <a className="card_link">
        <div
          className="card__img--hover"
          style={{
            backgroundImage: `url(${posterBaseUrl}${movie.poster_path})`,
          }}
        >
          {movie.poster_path ? "" : "Image not found"}
        </div>
      </a>
      <div className="card__info">
        <div className="card__head">
          <h3 className="card__title">{movie.title}</h3>
          <div className="card__link" onClick={handleCardClick}>
            <svg
              fill="#fcd719"
              height="20px"
              width="20px"
              viewBox="0 0 330 330"
            >
              {" "}
              <path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605 l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396 l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998 c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"></path>
            </svg>
          </div>
        </div>
        <div className="card__disc">
          <div className="card__rating">
            {" "}
            <svg fill="#FCD719" width="16px" height="16px" viewBox="0,0,50,50">
              <path d="M10.2,48.6c-0.2,0 -0.4,-0.1 -0.6,-0.2c-0.3,-0.2 -0.5,-0.7 -0.4,-1.1l4.4,-16.4l-13.2,-10.7c-0.4,-0.2 -0.5,-0.7 -0.4,-1.1c0.1,-0.4 0.5,-0.7 0.9,-0.7l17,-0.9l6.1,-15.9c0.2,-0.3 0.6,-0.6 1,-0.6c0.4,0 0.8,0.3 0.9,0.6l6.1,15.9l17,0.9c0.4,0 0.8,0.3 0.9,0.7c0.1,0.4 0,0.8 -0.3,1.1l-13.2,10.7l4.4,16.4c0.1,0.4 0,0.8 -0.4,1.1c-0.3,0.2 -0.8,0.3 -1.1,0l-14.3,-9.2l-14.3,9.2c-0.2,0.2 -0.3,0.2 -0.5,0.2z"></path>
            </svg>
            {movie.vote_average}
          </div>
          <a className="card__genre">{getGenreNames().join(", ")}</a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

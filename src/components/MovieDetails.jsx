import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetails;

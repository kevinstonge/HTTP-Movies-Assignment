import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`).then((r) => {
      if (r.status === 202) {
        setMovieList(movieList.filter((m) => m.id !== movie.id));
        push("/");
      }
    });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <div className="movie-details">
        <MovieCard movie={movie} />
      </div>
      <div className="buttons">
        <button className="save-button" onClick={saveMovie}>
          Save
        </button>

        <button
          className="edit-button"
          onClick={() => push(`/update-movie/${movie.id}`)}
        >
          Edit
        </button>
        <button className="delete-button" onClick={() => deleteMovie()}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Movie;

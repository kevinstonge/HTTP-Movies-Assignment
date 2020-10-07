import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const UpdateMovie = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: [],
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((r) => setMovie(r.data));
  }, [id]);
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((r) => {
        props.setMovieList(
          props.movieList.map((m) => (m.id === movie.id ? movie : m))
        );
        push("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <form className="update-movie" onSubmit={onSubmit}>
      {["title", "director", "metascore"].map((item) => {
        return (
          <label htmlFor={item}>
            {item}:
            <input
              type="text"
              id={item}
              name={item}
              value={movie[item]}
              onChange={handleChange}
            />
          </label>
        );
      })}
      <button type="submit">Save</button>
    </form>
  );
};
export default UpdateMovie;

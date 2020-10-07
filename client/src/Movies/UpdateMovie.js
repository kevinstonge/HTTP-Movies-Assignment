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
    stars: [],
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((r) => setMovie(r.data));
  }, [id]);
  const handleChange = (e) => {
    const value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
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
      {["title", "director", "metascore", "stars"].map((item) => {
        const value = item === "actors" ? movie.actors.split(",") : movie[item];
        return (
          <label htmlFor={item}>
            {item}:
            <input
              type="text"
              id={item}
              name={item}
              value={value}
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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddMovie = (props) => {
  const { push } = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const handleChange = (e) => {
    const value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies`, movie).then((r) => {
      if (r.status === 201) {
        props.setMovieList(r.data);
        push("/");
      }
    });
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
export default AddMovie;

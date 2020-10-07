import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";
import axios from "axios";
import "./App.scss";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { push } = useHistory();
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <button onClick={() => push("/add-movie")}>add movie</button>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          movieList={movieList}
          setMovieList={setMovieList}
        />
      </Route>

      <Route
        path="/update-movie/:id"
        render={() => (
          <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
        )}
      />

      <Route
        path="/add-movie"
        render={() => (
          <AddMovie movieList={movieList} setMovieList={setMovieList} />
        )}
      />
    </>
  );
};

export default App;

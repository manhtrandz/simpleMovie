import { Fragment } from "react";
import "./App.css";
import "./fontawasome.js";

import { Route, Routes } from "react-router-dom";

import "swiper/css";

import Banner from "./components/banner/Banner.js";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import MoviePage from "./page/MoviePage";
import MovieDetails from "./page/MovieDetails";

function App() {
  return (
    <Routes>
      <Route element={<Main></Main>}>
        <Route
          path="/"
          element={
            <Fragment>
              <Banner></Banner>
              <HomePage></HomePage>
            </Fragment>
          }></Route>
        <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
        <Route
          path="/movies/:movieId"
          element={<MovieDetails></MovieDetails>}></Route>
      </Route>
    </Routes>
  );
}

export default App;

import React from "react";
import MainNav from "./component/mainNav";
import HeaderHome from "./componentHome/HeaderHome";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Movies from "./Moives";
import MainFooter from "./component/mainFooter";
import Series from "./Series";
import ContactUs from "./contactUs";
import MoviesDetails from "./moviesDetails";
import SeriesDetails from "./seriesDetails";
const App = () => {
  return(
    <div className="bg-black">
      <MainNav/>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/series" element={<Series/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/movie/:movieId/title/:title" element={<MoviesDetails/>}/>
        <Route path="/series/:seriesId/name/:name" element={<SeriesDetails/>}/>
      </Routes>
      <MainFooter/>
    </div>
  )
}

export default App;
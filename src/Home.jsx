import React from "react";
import HeaderHome from "./componentHome/HeaderHome";
import PopularMovies from "./componentHome/PopularMovies";
import PopularSeries from "./componentHome/PopularSeries";
import TopMovies from "./componentHome/TopMovies";
import TopSeries from "./componentHome/TopSeries";
import MainFooter from "./component/mainFooter";
const Home = () => {
    return(
        <div className=" container mx-auto ">
            <HeaderHome/>
            <PopularMovies/>
            <PopularSeries/>
            <TopMovies/>
            <TopSeries/>
        </div>
    )
}

export default Home;
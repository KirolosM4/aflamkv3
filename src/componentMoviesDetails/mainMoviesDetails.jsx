import React, { use, useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import { FaRegHandPointRight,FaRegHandPointLeft } from "react-icons/fa6";
import { MdNoteAdd,MdStarBorder } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { Button } from "@material-tailwind/react";

const MainMoviesDetails = () => {
    const navigate = useNavigate();
    const {movieId} = useParams()
    const [movieDetails,setMovieDetails] = useState({})
    const [casting,setCasting] = useState({cast:[{name:" ",known_for_department:" "},{name:" ",known_for_department:" "}],crew:[{name:" ",department:" "},{name:" ",department:" "},{name:" ",department:" "}]});
    const getMoviesDetails = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovieDetails(res))
            .catch(err => console.error(err));
    }
    const getCasting = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(res => setCasting(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        getMoviesDetails();
        getCasting();
        console.log(casting)
    },[])
    return(
        <div>
            {
                (movieDetails && casting)
                ?
                <div className={` bg-no-repeat bg-cover bg-center relative before:absolute before:content-[" "] before:w-full before:h-full before:top-0 before:bg-gradient-to-b from-black via-transparent  to-black before:opacity-70`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.backdrop_path})`}}>
                    <div className="container mx-auto">
                        <p className="text-[#0dcaf0] text-center text-4xl py-11 font-bold relative">Movie Details</p>
                        <div className="flex flex-col xl:flex-row">
                            <div className="flex relative w-full justify-center">
                                <img className="w-1/3 xl:w-[75%] relative" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`} alt="" />
                            </div>
                            <div className="col-start-2 col-span-2 text-white relative flex flex-col gap-3 text-center xl:text-left">
                                <p className="text-2xl xl:text-4xl">{movieDetails.original_title}</p>
                                <div className="flex flex-col xl:flex-row gap-2 items-center">
                                    <div className="flex items-center">
                                        <p>{movieDetails.release_date}</p>
                                        <p>({movieDetails.original_language})</p>
                                    </div>
                                    <div className="flex items-center text-sm flex-wrap">
                                        <FaRegHandPointRight color="yellow"/>
                                        {
                                            movieDetails.genres?.map((genre)=>(
                                                <p>{genre.name},</p>
                                            ))
                                        }
                                        <FaRegHandPointLeft color="yellow"/>
                                    </div>
                                </div>
                                <p><span className="text-[#0dcaf0] text-center text-4xl py-11">OverView : </span>{movieDetails.overview}</p>
                                <p className="text-[#0dcaf0] text-4xl">Casting : </p>
                                <div className="flex flex-col gap-7 justify-center">
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col text-center text-xl"><span>{casting.cast[0]?.name}</span><span className="text-yellow-700">{casting.cast[0]?.known_for_department}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{casting.cast[1]?.name}</span><span className="text-yellow-700">{casting.cast[1]?.known_for_department}</span></p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col text-center text-xl"><span>{casting.crew[0]?.name}</span><span className="text-yellow-700">{casting.crew[0]?.department}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{casting.crew[1]?.name}</span><span className="text-yellow-700">{casting.crew[1]?.department}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{casting.crew[2]?.name}</span><span className="text-yellow-700">{casting.crew[2]?.department}</span></p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col items-center gap-3"><span><MdNoteAdd color="green" className="text-2xl" /> </span><span>Add whatchList</span></p>
                                        <p className="flex flex-col items-center gap-3"><span><MdStarBorder color="yellow" className="text-2xl" /> </span><span>Rate Movies</span></p>
                                        <p className="flex flex-col items-center gap-3"><span><SiYoutubemusic color="red" className="text-2xl" /> </span><span>Play Trailor</span></p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button className="bg-transparent border-2 border-[#0DCAF0] text-[#0DCAF0] hover:bg-[#0DCAF0] hover:text-black w-fit" onClick={()=>navigate(-1)}>Back a Step</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="loader h-screen"></div>
            }
        </div>
    )
}

export default MainMoviesDetails;
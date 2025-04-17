import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom"
import { FaRegHandPointRight,FaRegHandPointLeft } from "react-icons/fa6";
import { MdNoteAdd,MdStarBorder } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { Button } from "@material-tailwind/react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react"

const MainMoviesDetails = () => {
    const navigate = useNavigate();
    const {movieId} = useParams();
    const [movieDetails,setMovieDetails] = useState({});
    const [loadingDetails,setLoadingDetails] = useState(true);
    const [err,setError] = useState(false);
    const [casting,setCasting] = useState({});
    const [loadTrailar,setLoadTrailar] = useState(false);
    const [keyVideo,setKeyVideo] = useState("");
    const [showTrailar,setShowTrailar] = useState(false);
    const [errTrailar,setErrorTrailar] = useState(false);
    //get details of movies
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
    //get casting of movies
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
            .then(res => {setCasting(res);setLoadingDetails(false);setError(false)})
            .catch(() => {setLoadingDetails(false);setError(true)});
    }
    //get trailare of movies
    const getTrailer = () => {
        setLoadTrailar(true);
        setShowTrailar(true);
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res =>{ setKeyVideo(res.results[0].key);setLoadTrailar(false);setErrorTrailar(false)})
            .catch(() => {setLoadTrailar(false);setErrorTrailar(true);});
            console.log(errTrailar)
    }
    useEffect(()=>{
        getMoviesDetails();
        getCasting();
    },[])
    return(
        <div>
            {/* loading details movie */}
            {
                loadingDetails
                ?
                <div className="h-screen flex items-center justify-center">
                    <div className="loader"></div>
                </div>
                :
            // error details movie 
                err
                ?
                <div className='flex justify-center items-center h-screen text-red-500 text-3xl'>
                    Not Found
                    <DotLottieReact
                    src="https://lottie.host/3f1a2a1b-4c5d-41bf-a513-2e6ebc2630b8/xRMGEMLGLh.lottie"
                    loop
                    autoplay
                    className='w-[2em]'
                    />
                </div>
                :
                // page details 
                <div className={`bg-no-repeat bg-cover bg-center relative before:absolute before:content-[" "] before:w-full before:h-full before:top-0 before:bg-gradient-to-b from-black via-transparent  to-black before:opacity-70`} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.backdrop_path})`}}>
                    {/*start trailar movies  */}
                    {
                        showTrailar
                        &&
                        <div className={`fixed z-10 top-0 flex justify-center h-screen w-screen ${loadTrailar ? "bg-black items-center" : "bg-[#00000063]"}`} onClick={()=>setShowTrailar(false)}>
                            {
                                loadTrailar
                                ?
                                <div className="loader"></div>
                                :
                                errTrailar
                                ?
                                <div className={`flex justify-center items-center text-red-500 text-xl lg:text-3xl bg-black w-full h-[40%] lg:w-[30%] border-[20px] border-gray-900 ${errTrailar && "trailAnimation"}`}>
                                    Not Found
                                    <DotLottieReact
                                    src="https://lottie.host/3f1a2a1b-4c5d-41bf-a513-2e6ebc2630b8/xRMGEMLGLh.lottie"
                                    loop
                                    autoplay
                                    className='w-[2em]'
                                />
                                </div>
                                :
                                <iframe className={`absolute border-[20px] border-gray-900 w-full h-[50%] lg:w-[40%]  ${loadTrailar==false && "trailAnimation"}`} src={`https://www.youtube.com/embed/${keyVideo}`} title="YouTube video player" ></iframe>
                            }
                        </div>
                    }
                    {/* end trailar movies  */}
                    <div className="container mx-auto">
                        <p className="text-[#0dcaf0] text-center text-4xl py-11 font-bold relative">Movie Details</p>
                        <div className="flex flex-col xl:flex-row pb-7">
                            <div className="flex relative w-full justify-center">
                                <img className="w-[65%] relative" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`} alt="" />
                            </div>
                            <div className="grow col-start-2 col-span-2 text-white relative flex flex-col gap-3 text-center xl:text-left">
                                <p className="text-2xl xl:text-4xl">{movieDetails.original_title}</p>
                                <div className="flex flex-col xl:flex-row gap-2 items-center">
                                    <div className="flex  gap-3 items-center">
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
                                    <div>{Math.trunc(movieDetails.runtime / 60) + " h"} {Math.round(movieDetails.runtime % 60) + " min "}</div>
                                    <div>this is my edite</div>
                                </div>
                                <p className="text-[1em]"><span className="text-[#0dcaf0] text-center text-4xl py-11">OverView : </span>{movieDetails.overview?.split(".").slice(0,3).join(".")}</p>
                                <p className="text-[#0dcaf0] text-4xl">Casting : </p>
                                <div className="flex flex-col gap-7 justify-center">
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col text-center text-xl"><span>{(casting.cast[0]?.name  || " ")}</span><span className="text-yellow-700">{(casting.cast[0]?.known_for_department || " ")}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{(casting.cast[1]?.name || " ")}</span><span className="text-yellow-700">{(casting.cast[1]?.known_for_department || " ")}</span></p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col text-center text-xl"><span>{(casting.crew[0]?.name || " ")}</span><span className="text-yellow-700">{(casting.crew[0]?.department || "production" || " ")}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{(casting.crew[1]?.name || " ")}</span><span className="text-yellow-700">{(casting.crew[1]?.department|| "production" || " ")}</span></p>
                                        <p>||</p>
                                        <p className="flex flex-col text-center text-xl"><span>{(casting.crew[2]?.name || " ")}</span><span className="text-yellow-700">{(casting.crew[2]?.department|| "production" || " ")}</span></p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row justify-around items-center">
                                        <p className="flex flex-col items-center gap-3"><span><MdNoteAdd color="green" className="text-2xl" /> </span><span>Add whatchList</span></p>
                                        <p className="flex flex-col items-center gap-3"><span><MdStarBorder color="yellow" className="text-2xl" /> </span><span>Rate Movies</span></p>
                                        <p className="flex flex-col items-center gap-3"><span><SiYoutubemusic color="red" className="text-2xl cursor-pointer" onClick={()=>getTrailer()} /> </span><span>Play Trailor</span></p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button className="bg-transparent border-2 border-[#0DCAF0] text-[#0DCAF0] hover:bg-[#0DCAF0] hover:text-black w-fit" onClick={()=>navigate(-1)}>Back a Step</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MainMoviesDetails;
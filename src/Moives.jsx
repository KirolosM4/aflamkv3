import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight,MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton
  } from "@material-tailwind/react";
  import ReactStars from 'react-stars'
  import {Link} from "react-router-dom";

const Movies = () => {
    const [active, setActive] = useState(1);
    const [allMovies,setAllMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const [err,setErr] = useState(false);
    const getAllMovies = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${active}`, options)
            .then(res => res.json())
            .then(res => {setAllMovies(res.results);setLoading(false)})
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        setLoading(true);
        getAllMovies()
    },[active])
    const next = () => {
      if (active === 500) return;
      setActive(active + 1);
      getAllMovies()
    };
    const nextAll = () => {
      setActive(500);
      getAllMovies()
    };
   
    const prev = () => {
      if (active === 1) return;
   
      setActive(active - 1);
      getAllMovies()
    };
    const prevAll = () => {   
      setActive(1);
      getAllMovies()
    };

    return(
        <div className="container mx-auto flex flex-col items-center">
            <div className="text-center text-xl md:text-4xl py-5 font-bold text-white">
                <p className="my-5">MOVIES</p>
                <p className="my-5">PAGE NUMBER <span className="text-[#0d6efd]">{active}</span> FROM <span className="text-[#0d6efd]">500</span></p>
            </div>
            <div className={`grid items-center ${loading ? "grid-cols-1 h-screen" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 py-7"}`}>
                {
                    loading
                    ?
                    <div className="loader"></div>
                    :

                    allMovies.map(({poster_path,title,vote_average},index)=>(
                        <Card className={`bg-[#212529] h-[80vh] w-full`} key={index}>
                            <CardHeader
                            className="m-0 rounded h-[65%]"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}
                                    alt="ui/ux review check"
                                    className="h-full bg-cover w-full"
                                />
                            </CardHeader>
                            <CardBody className="h-[20%] text-center md:text-left">
                                <Typography variant="p" color="white" className="text-sm md:text-xl">
                                    TITLE : {title}
                                </Typography>
                                <div className="flex flex-col items-center text-white md:flex-row md:justify-between">
                                    <p>Rate:{vote_average.toFixed(1)}</p>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    value={vote_average/2}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className="text-center h-[10%]">
                                <Button className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                                    <Link>DETAILS</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
            <div className="flex items-center text-[#0d6efd] bg-white">
                <IconButton
                size="sm"
                onClick={prevAll}
                disabled={active === 1}
                className="rounded-none bg-white"
                >
                    <MdKeyboardDoubleArrowLeft className="h-4  text-[#0d6efd]" />
                </IconButton>
                <IconButton
                size="sm"
                onClick={prev}
                disabled={active === 1}
                className="rounded-none bg-white"
                >
                    <MdKeyboardArrowLeft className="h-4 text-[#0d6efd]" />
                </IconButton>
                <Typography className="font-normal h-full px-5">
                        {active}
                </Typography>
                <IconButton
                size="sm"
                onClick={next}
                disabled={active === 500}
                className="rounded-none bg-white"
                >
                    <MdKeyboardArrowRight className="h-4 text-[#0d6efd]" />
                </IconButton>
                <IconButton
                size="sm"
                onClick={nextAll}
                disabled={active === 500}
                className="rounded-none bg-white"
                >
                    <MdKeyboardDoubleArrowRight className="h-4 text-[#0d6efd]" />
                </IconButton>

            </div>
        </div>
    )
}

export default Movies;
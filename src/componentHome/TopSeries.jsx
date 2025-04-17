import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import ReactStars from 'react-stars'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
const TopSeries = () => {
    const [tSeries,setTSeries] = useState([]);
    const [loading,setLoading] = useState(true);
    const [err,setErr] = useState(false);
    const topSeries = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
          
          fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {setTSeries(res.results);setLoading(false)})
            .catch(() => {setErr(true);setLoading(false)});
    }
    useEffect(()=>{
        topSeries();
    },[])
    return(
        <div className={(err || loading) && "h-[60vh]"}>
            <p className="text-[#0DCAF0] text-center text-4xl py-11 font-bold md:text-left">TOP SERIES</p>
            <div className={`${err || loading ? "grid-cols-1 items-center h-[60%]" : " md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 "} grid grid-cols-1 px-3 justify-items-center  gap-11`}>
                {
                    loading
                    ?
                    <div className="loader"></div>
                    :
                    err
                    ?
                    <div className='flex justify-center items-center h-[60%] text-red-500 text-3xl'>
                        Not Found
                        <DotLottieReact
                        src="https://lottie.host/3f1a2a1b-4c5d-41bf-a513-2e6ebc2630b8/xRMGEMLGLh.lottie"
                        loop
                        autoplay
                        className='w-[2em]'
                        />
                    </div>
                    :
                    tSeries.map(({poster_path,name,vote_average,id},index)=>(
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
                                <Typography variant="p" color="white">
                                    TITLE : {name}
                                </Typography>
                                <div className="flex flex-col items-center text-white md:flex-row md:justify-between">
                                    <p>Rate:{vote_average}</p>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    value={vote_average/2}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className="text-center h-[10%]">
                                <Button className="bg-transparent border-2 border-[#0DCAF0] text-[#0DCAF0] hover:bg-[#0DCAF0] hover:text-black">
                                    <Link to={`/series/${id}/name/${name}`}>DETAILS</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default TopSeries;
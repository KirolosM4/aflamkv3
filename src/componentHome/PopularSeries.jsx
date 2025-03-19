import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import {Link} from "react-router-dom"
const PopularSeries = () => {
    const [popSeries,setPopSeries] = useState([]);
    const [loading,setLoading] = useState(true)
    const [err,setError] = useState(false);
    const popularSeries = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
            }
          };
        fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {setPopSeries(res.results);setLoading(!loading);setError(false)})
            .catch(() => {setError(!err);setLoading(!loading)});
        }
        useEffect(()=>{
            popularSeries();
        },[])
    return(
        <div className='h-[80vh]'>
            <p className="text-[#0d6efd] text-center md:text-left text-4xl py-11 font-bold">SERIES</p>
            {
                loading
                ?
                <div className='flex justify-center items-center h-[60%]'>
                    <div className="loader"></div>
                </div>
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
                <Swiper
                slidesPerView={window.innerWidth > 1280 ? 4 : window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1}
                spaceBetween={30}
                loop={true}

                navigation={true}
                modules={[Pagination, Navigation]}
                className={`px-4 ${window.innerWidth < 720 ? "w-[60%]" : "w-full"}`}
                >
                {
                    popSeries.map(({poster_path},index)=>(
                        <SwiperSlide key={index}>
                            <Link> <img className='bg-cover' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" /></Link>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
                
            }
        </div>
    )
}

export default PopularSeries;


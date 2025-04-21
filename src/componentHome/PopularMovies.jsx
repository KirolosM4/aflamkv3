import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Link} from "react-router-dom"
import ErrorComp from '../component/error';
const PopularMovies = () => {
    const [popMovies,setPopMovies] = useState([]);
    const [loading,setLoading] = useState(true)
    const [err,setError] = useState(false);
    const popularMovies = () => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTViOWNkYTliYWQwOTg1MGNjNTk4ZjMzYzIxMmYyNyIsIm5iZiI6MTcyODA1MDcwOS41NDEsInN1YiI6IjY2ZmZmNjE1MTU5MmVmMWJhOTg1MWM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BLDzvE3JjpnDnXJp65L2ww7pclm633QVmw5K1JssZEY'
                }
              };
              fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                .then(res => res.json())
                .then(res => {setPopMovies(res.results);setLoading(!loading);setError(false)})
                .catch(() => {setError(!err);setLoading(false)});
        }
        useEffect(()=>{ 
            popularMovies();
        },[])
    return(
        <div className='h-[80vh]'>
            <p className="text-[#0DCAF0] text-center md:text-left text-4xl py-11 font-bold">MOVIES</p>
            {
                loading
                ?
                <div className="h-[60%] flex items-center justify-center">
                    <div className="loader"></div>
                </div>
                :
                err
                ?
                <div className='h-[60%]'>
                    <ErrorComp/>
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
                    popMovies.map(({poster_path,id,original_title},index)=>(
                        <SwiperSlide key={index}>
                            <Link to={`/movie/${id}/title/${original_title}`}><img className='bg-cover' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt="" /></Link>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
                
            }
        </div>
    )
}

export default PopularMovies;


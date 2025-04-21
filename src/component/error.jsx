import React from "react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react"

const ErrorComp = () => {
    return(
        <div className='flex justify-center items-center h-full text-red-500 text-3xl'>
            Not Found
            <DotLottieReact
            src="https://lottie.host/3f1a2a1b-4c5d-41bf-a513-2e6ebc2630b8/xRMGEMLGLh.lottie"
            loop
            autoplay
            className='w-[2em]'
            />
        </div>
    )
}

export default ErrorComp
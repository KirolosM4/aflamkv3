import React from "react";
import { Button } from "@material-tailwind/react";

const HeaderHome = () => {
    return(
        <div className="container mx-auto py-6 text-center bg-black">
            <p className="text-[#0d6efd] text-4xl p-3 font-bold">Home</p>
            <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between">
                <div className="flex flex-col text-white gap-5 text-2xl font-bold">
                    <p>SORT BY</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Title</Button>
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Poplarity</Button>
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Date</Button>
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Ratin</Button>
                    </div>
                </div>
                <div  className="flex flex-col text-white gap-5 text-2xl font-bold">
                    <p>SORT ORDER</p>
                    <div className="flex gap-3">
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Descingin</Button>
                         <Button className="bg-transparent border-2 text-white hover:bg-white hover:text-black">Ascending</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderHome;
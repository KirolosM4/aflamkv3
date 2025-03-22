import React, { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Input,
    Button
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
function NavList() {
    return (
        <div className="flex flex-col items-center xl:flex-row xl:justify-between">
            <ul className="my-2 flex flex-col gap-2 xl:mb-0 xl:mt-0 xl:flex-row xl:items-center xl:gap-6">
                <Typography
                as="li"
                variant="small"
                className="p-1 font-medium"
                >
                    <Link to="/" className="flex items-center text-gray-400 hover:text-white">
                        Home
                    </Link>
                </Typography>
                <Typography
                as="li"
                variant="small"
                className="p-1 font-medium"
                >
                    <Link to="/movies" className="flex items-center  text-gray-400 hover:text-white">
                        Movies
                    </Link>
                </Typography>
                <Typography
                as="li"
                variant="small"
                className="p-1 font-medium"
                >
                    <Link to="" className="flex items-center  text-gray-400 hover:text-white">
                        Series
                    </Link>
                </Typography>
                <Typography
                as="li"
                variant="small"
                className="p-1 font-medium"
                >
                    <Link to="" className="flex items-center  text-gray-400 hover:text-white">
                        Contact Us
                    </Link>
                </Typography>
            </ul>
            <ul className="my-2 flex flex-col gap-2 xl:mb-0 xl:mt-0 xl:flex-row xl:items-center xl:gap-2">
                <Typography
                as="li"
                variant="small"
                className="p-1"
                >
                    <Input label="Search" className="bg-white" />
                </Typography>
                <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
                >
                    <Button className="w-full bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">Search</Button>
                </Typography>
                <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
                >
                    <Button className="w-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Movies</Button>
                </Typography>
                <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
                >
                    <Button className="w-full bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Log in</Button>
                </Typography>
            </ul>
        </div>
    );
}


const MainNav = () => {
    const [openNav, setOpenNav] = useState(false);
    return(
        <Navbar className="mx-auto max-w-screen-3xl px-6 py-3 bg-[#212529] rounded-none border-0">
            <div className="container mx-auto  flex items-center justify-between text-blue-gray-900">
            <Typography
                as="a"
                href="#"
                variant="p"
                className="mr-4 cursor-pointer text-white py-1.5"
            >
                Redux Movies
            </Typography>
            <div className="hidden grow xl:block">
                <NavList />
            </div>
            <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
            >
                {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                )}
            </IconButton>
            </div>
            <Collapse open={openNav}>
            <NavList />
            </Collapse>
        </Navbar>
    )
}

export default MainNav;
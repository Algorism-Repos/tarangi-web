import React from "react";
import { Link } from "react-router";

// assets import
import logo from "../assets/logo.png"


function Navbar(){
    return(
        <>
            <div className="bg-primary flex flex-row justify-between w-full py-2 px-7">
                <img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" />

                <div className="font-poppins text-white text-[16px] leading-normal font-normal flex flex-row gap-x-[77px] items-center">
                    <Link to="/home"><p>Home</p></Link>
                    <Link to="/about"><p>About Us</p></Link> 
                </div>

                <div className="flex flex-row items-center gap-x-2.5">
                    <button className="border-[1px] border-[#CFA266] rounded-[32px] bg-transparent w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer ">Sign Up</button>
                    <button className=" rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">Log In</button>
                </div>
            </div>
        </>
    )
}

export default Navbar
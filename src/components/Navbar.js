import React, {useState} from "react";
import { Link } from "react-router";

// assets import
import logo from "../assets/logo.png"
import menu from "../assets/menu_icon.png"
import close from "../assets/close_icon.png"


function Navbar(){
    const [menuVisible, setMenuVisible] = useState(false);
    return(
        <>
            {/* Navbar - large screens */}
            <div className="bg-primary sm:flex flex-row justify-between w-full py-2 px-7 hidden">
                <Link to ="/home"><img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" /></Link>

                <div className="font-poppins text-white text-[16px] leading-normal font-normal flex flex-row gap-x-[77px] items-center">
                    <Link to="/home"><p>Home</p></Link>
                    <Link to="/about"><p>About Us</p></Link> 
                </div>

                <div className="flex flex-row items-center gap-x-2.5">
                    <button className="border-[1px] border-[#CFA266] rounded-[32px] bg-transparent w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer ">Sign Up</button>
                    <button className=" rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">Log In</button>
                </div>
            </div>

            {/* Navbar -small screens */}
            <div className="bg-primary flex flex-row justify-between w-full p-7 sm:hidden ">
                <img src={logo} alt="brand-logo" className="w-[68px] h-[45px]" />
                <img src={menu} alt="menu_icon" className="w-[37px] h-[37px] cursor-pointer" onClick={() => {setMenuVisible(true)}}/>

                <div className={menuVisible === true ? "bg-[#4B001A] h-full inset-y-0 w-full fixed right-0  z-20 p-7" :"hidden"}>
                    <div className="flex flex-row items-center justify-between w-full">
                        <img src={logo} className="w-[68px] h-[45px] cursor-pointer" />
                        <img src={close} className="w-[37px] h-[37px] cursor-pointer" onClick={() => {setMenuVisible(false)}}/> 
                    </div>

                    <div className="flex flex-col items-center mt-10 gap-y-12">
                        <Link to= "/home"><h2 className="font-poppins text-[16px] font-normal leading-normal text-center text-white" onClick={() => {setMenuVisible(false)}}>Home</h2></Link>
                        <Link to= "/home"><h2 className="font-poppins text-[16px] font-normal leading-normal text-center text-white" onClick={() => {setMenuVisible(false)}}>About Us</h2></Link>

                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Navbar
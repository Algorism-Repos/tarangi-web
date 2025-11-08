import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ useLocation to detect active route

import Modal from "./Modal";

// assets import
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import close from "../assets/close_iconwhite.png";
import favourite_icon from '../assets/Favorites_icon.png'
import cart_icon from '../assets/Cart_white.png'
import profile_icon from '../assets/profile_icon.png'

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);

  const location = useLocation(); // ✅ get current path

  const toggle = () => setModalToggle(!modalToggle);
  // Helper function to determine active link
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-white " // active
      : "text-white opacity-[0.5]"; // inactive gray

  return (
    <>
      {/* Navbar - large screens */}
      <div className="bg-primary lg:flex flex-row justify-between items-center w-full py-5 px-7 hidden">
        <Link to="/home">
          <img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" />
        </Link>

        <div className="font-poppins text-[16px] leading-normal flex flex-row gap-x-[20px] xl:gap-x-[50px] items-center ">
          <Link className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4" to="/home">
            <p className={getLinkClass("/home")}>Home</p>
          </Link>
          <Link className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4" to="/about">
            <p className={getLinkClass("/about")}>About Us</p>
          </Link>
          <Link className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4" to="/products">
            <p className={getLinkClass("/products")}>Products</p>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-x-[20px]">
          {/* <buttonclassName="rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">Get in Touch</button> */}
          <Link to="/login" >
            <button className="rounded-[32px] border border-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">Log In</button>
          </Link>
          <Link to="/favourites">
            <img className="w-[42px] h-[42px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={favourite_icon} alt="favourite icon" />
          </Link>
          <Link to="/cart">
            <img className="w-[42px] h-[42px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={cart_icon} alt="Cart icon" />
          </Link>
          <Link to="/profile">
            <img className="w-[50px] h-[50px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={profile_icon} alt="profile icon" />
          </Link>
        </div>
      </div>

      {/* Navbar - small screens */}
      <div className="relative bg-[#680F26] flex flex-row justify-between w-full px-[20px] py-[30px] lg:hidden">
        <img
          src={menu}
          alt="menu_icon"
          className="w-[37px] h-[37px] cursor-pointer"
          onClick={() => setMenuVisible(true)}
        />

        <img src={logo} alt="brand-logo" className="w-[85px] h-[55px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex">
          <img className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={favourite_icon} alt="favourite icon" />
          <img className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={cart_icon} alt="Cart icon" />
        </div>


        <div
          className={
            menuVisible
              ? "bg-[#4B001A] h-full inset-y-0 w-full fixed right-0 z-20 p-[20px]"
              : "hidden"
          }
        >
          <div className="flex flex-row items-center justify-between w-full">
            <img
              src={close}
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => setMenuVisible(false)}
            />

            <img src={logo} className="w-[85px] h-[55px] cursor-pointer" />

            <div className="flex">
              <img className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={favourite_icon} alt="favourite icon" />
              <img className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F] focus:bg-[#CFA266]" src={cart_icon} alt="Cart icon" />
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 gap-y-12">
            <Link to="/home">
              <h2
                className={`font-poppins text-[16px] leading-normal text-center ${location.pathname === "/home"
                  ? "text-white font-semibold"
                  : "text-[#A0A0A0]"
                  }`}
                onClick={() => setMenuVisible(false)}
              >
                Home
              </h2>
            </Link>
            <Link to="/about">
              <h2
                className={`font-poppins text-[16px] leading-normal text-center ${location.pathname === "/about"
                  ? "text-white font-semibold"
                  : "text-[#A0A0A0]"
                  }`}
                onClick={() => setMenuVisible(false)}
              >
                About Us
              </h2>
            </Link>
            <Link to="/products">
              <h2
                className={`font-poppins text-[16px] leading-normal text-center ${location.pathname === "/products"
                  ? "text-white font-semibold"
                  : "text-[#A0A0A0]"
                  }`}
                onClick={() => setMenuVisible(false)}
              >
                Products
              </h2>
            </Link>
            {/* buttons */}

            <div className="flex flex-col items-center gap-y-[25px]">
              <button className="rounded-[32px] border border-[#CFA266] w-[319px] h-[52px] font-poppins text-[16px] font-normal text-white">Sign Up</button>
              <button className="rounded-[32px] bg-[#CFA266] w-[319px] h-[52px] font-poppins text-[16px] font-normal text-white">Log In</button>
            </div>

          </div>
        </div>
      </div>

      <Modal modal={modalToggle} active={toggle} />
    </>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ useLocation to detect active route

import Modal from "./Modal";

// assets import
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import close from "../assets/close_icon.png";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);

  const location = useLocation(); // ✅ get current path

  const toggle = () => setModalToggle(!modalToggle);

  // Helper function to determine active link
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-white font-semibold" // active
      : "text-[#A0A0A0] font-normal"; // inactive gray

  return (
    <>
      {/* Navbar - large screens */}
      <div className="bg-primary sm:flex flex-row justify-between w-full py-2 px-7 hidden">
        <Link to="/home">
          <img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" />
        </Link>

        <div className="font-poppins text-[16px] leading-normal flex flex-row gap-x-[60px] items-center">
          <Link to="/home">
            <p className={getLinkClass("/home")}>Home</p>
          </Link>
          <Link to="/about">
            <p className={getLinkClass("/about")}>About Us</p>
          </Link>
          <Link to="/products">
            <p className={getLinkClass("/products")}>Products</p>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-x-2.5">
          <button
            className="rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer"
            onClick={toggle}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Navbar - small screens */}
      <div className="bg-primary flex flex-row justify-between w-full p-7 sm:hidden">
        <img src={logo} alt="brand-logo" className="w-[68px] h-[45px]" />
        <img
          src={menu}
          alt="menu_icon"
          className="w-[37px] h-[37px] cursor-pointer"
          onClick={() => setMenuVisible(true)}
        />

        <div
          className={
            menuVisible
              ? "bg-[#4B001A] h-full inset-y-0 w-full fixed right-0 z-20 p-7"
              : "hidden"
          }
        >
          <div className="flex flex-row items-center justify-between w-full">
            <img src={logo} className="w-[68px] h-[45px] cursor-pointer" />
            <img
              src={close}
              className="w-[37px] h-[37px] cursor-pointer"
              onClick={() => setMenuVisible(false)}
            />
          </div>

          <div className="flex flex-col items-center mt-10 gap-y-12">
            <Link to="/home">
              <h2
                className={`font-poppins text-[16px] leading-normal text-center ${
                  location.pathname === "/home"
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
                className={`font-poppins text-[16px] leading-normal text-center ${
                  location.pathname === "/about"
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
                className={`font-poppins text-[16px] leading-normal text-center ${
                  location.pathname === "/products"
                    ? "text-white font-semibold"
                    : "text-[#A0A0A0]"
                }`}
                onClick={() => setMenuVisible(false)}
              >
                Products
              </h2>
            </Link>
          </div>
        </div>
      </div>

      <Modal modal={modalToggle} active={toggle} />
    </>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";

// assets import
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import close from "../assets/close_iconwhite.png";
import favourite_icon from "../assets/Favorites_icon.png";
import cart_icon_empty from "../assets/Cart_white.png"; // 🆕 empty cart icon
import cart_icon_filled from "../assets/cart_filled.png"; // 🆕 filled cart icon
import profile_icon from "../assets/profile_icon.png";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => setModalToggle(!modalToggle);

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userStatus);

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);

    // ✅ update in real-time if cart changes elsewhere
    const updateCart = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(updatedCart);
    };
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const getLinkClass = (path) =>
    location.pathname === path ? "text-white" : "text-white opacity-[0.5]";

  const cartIcon = cartItems.length > 0 ? cart_icon_filled : cart_icon_empty;

  return (
    <>
      {/* Navbar - large screens */}
      <div className="bg-primary lg:flex flex-row justify-between items-center w-full py-5 px-7 hidden">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" />
        </Link>

        {/* Links */}
        <div className="font-poppins text-[16px] leading-normal flex flex-row gap-x-[40px] ml-[70px] xl:gap-x-[77px] items-center xl:ml-[170px] ">
          <Link
            className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4"
            to="/home"
          >
            <p className={getLinkClass("/home")}>Home</p>
          </Link>
          <Link
            className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4"
            to="/about"
          >
            <p className={getLinkClass("/about")}>About Us</p>
          </Link>
          <Link
            className="hover:bg-[#D6A76F4F] rounded-full py-2.5 px-4"
            to="/products"
          >
            <p className={getLinkClass("/products")}>Products</p>
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-row items-center gap-x-[20px]">
          {/* ✅ Logged in: show all three icons */}
          {isLoggedIn ? (
            <>
              <Link to="/favourites">
                <img
                  className="w-[42px] h-[42px] rounded-[8px] hover:bg-[#D6A76F4F]"
                  src={favourite_icon}
                  alt="favourite icon"
                />
              </Link>

              <Link to="/cart">
                <img
                  className="w-[42px] h-[42px] rounded-[8px] hover:bg-[#D6A76F4F]"
                  src={cartIcon}
                  alt="Cart icon"
                />
              </Link>

              <Link to="/profile">
                <img
                  src={profile_icon}
                  className="w-[42px] h-[42px] rounded-[8px] hover:bg-[#D6A76F4F]"
                  alt="profile"
                />
              </Link>
            </>
          ) : (
            // ✅ Not logged in: show buttons
            <>
              <Link to="/signup">
                <button className="rounded-[32px] border border-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="rounded-[32px] bg-[#CFA266] w-[137px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer">
                  Log In
                </button>
              </Link>
            </>
          )}
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

        <img
          src={logo}
          alt="brand-logo"
          className="w-[85px] h-[55px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div className="flex gap-x-2">
          <Link to="/favourites">
            <img
              className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F]"
              src={favourite_icon}
              alt="favourite icon"
            />
          </Link>

          {/* ✅ Show all icons if logged in */}
          {isLoggedIn && (
            <>
              <Link to="/cart">
                <img
                  className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F]"
                  src={cartIcon}
                  alt="Cart icon"
                />
              </Link>
              <Link to="/profile">
                <img
                  src={profile_icon}
                  className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F]"
                  alt="profile"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {menuVisible && (
          <div className="bg-[#4B001A] h-full inset-y-0 w-full fixed right-0 z-20 p-[20px]">
            <div className="flex flex-row items-center justify-between w-full">
              <img
                src={close}
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={() => setMenuVisible(false)}
              />
              <img src={logo} className="w-[85px] h-[55px] cursor-pointer" />

              <div className="flex gap-x-2">
                <Link to="/favourites">
                  <img
                    className="w-[34px] h-[34px] rounded-[8px]"
                    src={favourite_icon}
                    alt="favourite icon"
                  />
                </Link>

                {/* ✅ Show all icons when logged in */}
                {isLoggedIn && (
                  <>
                    <Link to="/cart">
                      <img
                        className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F]"
                        src={cartIcon}
                        alt="Cart icon"
                      />
                    </Link>
                    <Link to="/profile">
                      <img
                        src={profile_icon}
                        className="w-[34px] h-[34px] rounded-[8px] hover:bg-[#D6A76F4F]"
                        alt="profile"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mt-10 gap-y-12">
              {["/home", "/about", "/products"].map((path) => (
                <Link to={path} key={path}>
                  <h2
                    className={`font-poppins text-[16px] leading-normal text-center ${
                      location.pathname === path
                        ? "text-white font-semibold"
                        : "text-[#A0A0A0]"
                    }`}
                    onClick={() => setMenuVisible(false)}
                  >
                    {path === "/home"
                      ? "Home"
                      : path === "/about"
                      ? "About Us"
                      : "Products"}
                  </h2>
                </Link>
              ))}

              {/* Auth buttons for mobile */}
              {!isLoggedIn && (
                <div className="flex flex-col items-center gap-y-[25px]">
                  <button
                    onClick={() => navigate("/signup")}
                    className="rounded-[32px] border border-[#CFA266] w-[319px] h-[52px] font-poppins text-[16px] text-white"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="rounded-[32px] bg-[#CFA266] w-[319px] h-[52px] font-poppins text-[16px] text-white"
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal modal={modalToggle} active={toggle} />
    </>
  );
}

export default Navbar;

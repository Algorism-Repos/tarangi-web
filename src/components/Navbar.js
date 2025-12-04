import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { Swiper, SwiperSlide } from "swiper/react";

import Trending_up from "../assets/Trending_up.png";
import Search_icon from "../assets/search_icon.png";
import Search_icon_white from "../assets/search_icon_white.png";
import Back_Arrow from "../assets/close_iconwhite.png";
import logout from "../assets/logout.png";

// Assets
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import close from "../assets/close_iconwhite.png";
import favouriteFilled from "../assets/favourites_filled_icon.png";
import favouriteUnfilled from "../assets/Favorites_icon.png";
import cart_icon_empty from "../assets/Cart_white.png";
import cart_icon_filled from "../assets/cart_filled.png";
import profile_icon from "../assets/profile_icon.png";
import new_product_1 from "../assets/Frame 29.png";

import down_arrow from "../assets/down_arrow.png";
import up_arrow from "../assets/up_arrow.png";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { collection } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [hasCartItems, setHasCartItems] = useState(true);

  const [favourites, setFavourites] = useState([]);
  const [hasFavourites, setHasFavourites] = useState(true);

  // Product dropdown - desktop
  const [productDropdown, setProductDropdown] = useState(false);

  // console.log(collection);

  // Timer function
  const closeTimer = useRef(null);
  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setProductDropdown(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setProductDropdown(false);
    }, 500);
  };
  const handleClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setProductDropdown(false);
  };
  const handleSubMenuClick = () => {
    handleClose();
  };

  const location = useLocation();
  const navigate = useNavigate();

  const mobileSearchRef = useRef(null);

  // mobile products dropdown
  const [mobileProductDropdown, setMobileProductDropdown] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState("men"); // for mobile pills

  // Product dropdown datas
  const mobileCategories = ["men", "women", "couples"]; // to match your design

  const TRENDING_PRODUCTS = [
    { img: new_product_1, name: "Emerald Pendant" },
    { img: new_product_1, name: "Diamond Necklace" },
    { img: new_product_1, name: "Tulip Brooch" },
    { img: new_product_1, name: "Tulip Brooch" },
    { img: new_product_1, name: "Tulip Brooch" },
    { img: new_product_1, name: "Tulip Brooch" },
  ];

  const isActive = (path) => location.pathname === path;
  const cartIcon = hasCartItems ? cart_icon_filled : cart_icon_empty;
  const isProductsRoute = location.pathname.startsWith("/products");

  useEffect(() => {
    const syncFromStorage = () => {
      // login check
      const storedLogin = localStorage.getItem("isLoggedIn") === "false";
      setIsLoggedIn(storedLogin);

      // // cart
      // const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      // setCartItems(storedCart);

      // // favourites
      // const storedFav = JSON.parse(localStorage.getItem("favourites")) || [];
      // setFavourites(storedFav);
    };

    syncFromStorage();

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("favouritesUpdated", syncFromStorage);
    window.addEventListener("cartUpdated", syncFromStorage);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("favouritesUpdated", syncFromStorage);
      window.removeEventListener("cartUpdated", syncFromStorage);
    };
  }, []);

  useEffect(() => {
    const closeSearch = (e) => {
      if (
        !e.target.closest(".search-dropdown") &&
        !e.target.closest(".search-icon")
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("click", closeSearch);
    return () => document.removeEventListener("click", closeSearch);
  }, []);

  // Mobile search dropdown close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (menuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuVisible]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setMenuVisible(false);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar - large screens */}
      <div className="bg-[#6E0027] xl:flex flex-row justify-between items-center w-full py-5 px-7 hidden ">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="brand-logo" className="w-[106px] h-[71px]" />
        </Link>

        {/* Nav Links */}
        <div className="font-poppins text-[16px] flex flex-row gap-x-[40px] ml-[70px] xl:gap-x-[55px] items-center xl:ml-[170px] ">
          <Link
            to="/home"
            className={`rounded-full py-2.5 px-4 text-white ${
              isActive("/home")
                ? "bg-[#CFA266] cursor-default "
                : "hover:bg-[#D6A76F] opacity-[0.5]"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`rounded-full py-2.5 px-4 text-white ${
              isActive("/about")
                ? "bg-[#CFA266] cursor-default"
                : "hover:bg-[#D6A76F] opacity-[0.5]"
            }`}
          >
            About Us
          </Link>

          {/* Product dropdown */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link
              to=""
              className={`rounded-full py-2.5 px-4 text-white transition-all duration-200 flex items-center ${
                isActive("/products")
                  ? "bg-[#CFA266]"
                  : "hover:bg-[#D6A76F] opacity-50"
              }`}
            >
              Products
              <img className="w-[28px] h-[28px]" src={down_arrow} alt="" />
            </Link>
            {/* Dropdown */}
            {productDropdown && (
              <div className="absolute top-[111px] left-1/2 transform -translate-x-1/2 min-w-[1000px] h-fit bg-[#FFF5E8] px-10 py-8 shadow-2xl z-30 rounded-lg">
                <h2 className="font-atteron text-primary text-[32px] text-center mb-8">
                  Product Caterogry
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {collection &&
                    collection
                      ?.filter((item) => item.handle !== "best_seller")
                      .map((item) => (
                        <Link
                          to={`/products/${item.handle}`}
                          state={{
                            category: item.handle,
                            collectionId: item.id,
                          }}
                          onClick={handleSubMenuClick}
                          className="group transition-transform duration-300 hover:scale-105 "
                        >
                          <div className="w-[200px] h-fit text-center">
                            <img
                              className="w-[200px] h-[200px] rounded-[8px] object-cover"
                              src={item.image?.src}
                              
                            />
                            <p className="capitalize text-[18px] text-[#6D6D6D] font-poppins mt-2 font-normal group-hover:text-primary group-hover:font-medium">
                              {item.handle}
                            </p>
                          </div>
                        </Link>
                      ))}
                </div>
                {/* <Link className="w-full  text-center border" to="/products">View All Products</Link> */}
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className={`rounded-full py-2.5 px-4 text-white ${
              isActive("/blog")
                ? "bg-[#CFA266] cursor-default"
                : "hover:bg-[#D6A76F] opacity-[0.5]"
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-row items-center gap-x-[20px]">
          {/* Search Button */}
          <div
            onClick={() => setShowSearch((prev) => !prev)}
            className={`cursor-pointer w-[42px] h-[42px] flex items-center justify-center rounded-[8px] transition search-icon
                      ${showSearch ? "bg-[#CFA266]" : "hover:bg-[#D6A76F4F]"}
        `}
          >
            <img src={Search_icon_white} className="w-[42px] h-[42px]" />
          </div>

          <Link to="/favourites">
            <img
              className={`w-[42px] h-[42px] rounded-[8px] transition ${
                isActive("/favourites")
                  ? "bg-[#CFA266]"
                  : "hover:bg-[#D6A76F4F]"
              }`}
              src={hasFavourites ? favouriteFilled : favouriteUnfilled}
              alt="favourite icon"
            />
          </Link>

          <Link to="/cart">
            <img
              className={`w-[42px] h-[42px] rounded-[8px] transition ${
                isActive("/cart") ? "bg-[#CFA266]" : "hover:bg-[#D6A76F4F]"
              }`}
              src={cartIcon}
              alt="cart"
            />
          </Link>

          {isLoggedIn ? (
            <Link to="/profile">
              <img
                className={`w-[48px] h-[48px] rounded-[8px] transition ${
                  isActive("/profile") ? "bg-[#CFA266]" : "hover:bg-[#D6A76F4F]"
                }`}
                src={profile_icon}
                alt="profile"
              />
            </Link>
          ) : (
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

        {/* Search Dropdown (desktop) */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[100px] left-0 w-full bg-[#680F26] px-10 py-8 shadow-lg z-30 search-dropdown"
            >
              <div className="max-w-[1100px] mx-auto relative ">
                <div className="flex items-center gap-6 w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search for Products"
                      className="w-full bg-white rounded-[12px] py-4 pl-5 pr-12 font-poppins text-[16px] placeholder:font-medium placeholder:text-[#ABABAB] outline-none"
                    />
                    <img
                      src={Search_icon}
                      alt="search icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-[42px] h-[42px]"
                    />
                  </div>
                  <img
                    src={Back_Arrow}
                    className="w-[42px] h-[42px] cursor-pointer hover:scale-110 duration-300 bg-[#D6A76F4F] p-1 hover:bg-[#CFA266] rounded-full"
                    onClick={() => setShowSearch(false)}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-white font-poppins text-[16px] mb-3">
                    Popular Searches
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <button className="flex items-center gap-2 bg-white text-[#4B001A] px-4 py-2 rounded-[10px] font-poppins">
                      <img
                        src={Trending_up}
                        className="w-[20px] h-[20px]"
                        alt=""
                      />
                      Diwali Jewelry
                    </button>
                    <button className="flex items-center gap-2 bg-white text-[#4B001A] px-4 py-2 rounded-[10px] font-poppins">
                      <img
                        src={Trending_up}
                        className="w-[20px] h-[20px]"
                        alt=""
                      />
                      Pendants
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-white font-poppins text-[16px] mb-3">
                    Trending Products
                  </h3>
                  <div className="flex gap-6 overflow-x-auto text-white text-[14px] items-center object-contain">
                    {TRENDING_PRODUCTS.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center min-w-[121px]"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-[121px] h-[78px] object-contain"
                        />
                        <span className="mt-2 text-[14px] font-poppins">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navbar - Mobile */}
      <div className="relative bg-[#680F26] flex flex-row justify-between w-full z-50 px-[20px] py-[30px] xl:hidden">
        <img
          src={menu}
          alt="menu_icon"
          className="w-[37px] h-[37px] cursor-pointer"
          onClick={() => setMenuVisible(true)}
        />

        <Link to="/home">
          <img
            src={logo}
            alt="brand-logo"
            className="w-[85px] h-[55px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </Link>

        <div className="flex gap-x-2">
          <Link to="/favourites">
            <img
              className={`w-[32px] h-[32px] rounded-[8px] transition ${
                isActive("/favourites")
                  ? "bg-[#CFA266]"
                  : "hover:bg-[#D6A76F4F]"
              }`}
              src={hasFavourites ? favouriteFilled : favouriteUnfilled}
              alt="favourite icon"
            />
          </Link>

          <Link to="/cart">
            <img
              className={`w-[32px] h-[32px] rounded-[8px] transition ${
                isActive("/cart") ? "bg-[#CFA266]" : "hover:bg-[#D6A76F4F]"
              }`}
              src={cartIcon}
              alt="Cart icon"
            />
          </Link>

          {isLoggedIn && (
            <Link to="/profile">
              <img
                className={`w-[32px] h-[32px] rounded-[8px] transition ${
                  isActive("/profile") ? "bg-[#CFA266]" : "hover:bg-[#D6A76F4F]"
                }`}
                src={profile_icon}
                alt="profile"
              />
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {menuVisible && (
          <div className="bg-[#4B001A] h-full inset-y-0 w-full fixed right-0 z-20 p-[20px] overflow-y-auto">
            <div className="flex flex-row items-center justify-between w-full">
              <img
                src={close}
                className="w-[30px] h-[30px] cursor-pointer "
                onClick={() => setMenuVisible(false)}
              />
              <Link to="/home">
                <img
                  src={logo}
                  className="w-[85px] h-[55px] cursor-pointer absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => setMenuVisible(false)}
                />
              </Link>

              <div className="flex gap-x-2">
                <Link to="/favourites">
                  <img
                    className={`w-[32px] h-[32px] rounded-[8px] transition ${
                      isActive("/favourites")
                        ? "bg-[#CFA266]"
                        : "hover:bg-[#D6A76F4F]"
                    }`}
                    src={hasFavourites ? favouriteFilled : favouriteUnfilled}
                    alt="favourite icon"
                    onClick={() => setMenuVisible(false)}
                  />
                </Link>

                <Link to="/cart">
                  <img
                    className={`w-[32px] h-[32px] rounded-[8px] transition ${
                      isActive("/cart")
                        ? "bg-[#CFA266]"
                        : "hover:bg-[#D6A76F4F]"
                    }`}
                    src={cartIcon}
                    alt="Cart icon"
                    onClick={() => setMenuVisible(false)}
                  />
                </Link>

                {/* {isLoggedIn && (
                  <Link to="/profile">
                    <img
                      className={`w-[32px] h-[32px] rounded-[8px] transition ${
                        isActive("/profile")
                          ? "bg-[#CFA266]"
                          : "hover:bg-[#D6A76F4F]"
                      }`}
                      src={profile_icon}
                      alt="profile"
                      onClick={() => setMenuVisible(false)}
                    />
                  </Link>
                )} */}
              </div>
            </div>

            <div className="flex flex-col items-center mt-10 gap-y-12 ">
              {/* Search Input */}
              <div className="w-full px-0 py-2 mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for Products"
                    onClick={() => setShowSearchDropdown(true)}
                    className="w-full h-[48px] py-4 pl-5 pr-12 font-poppins text-[16px] outline-none placeholder:text-[#B0B0B0] placeholder:font-normal rounded-[12px]"
                  />
                  <img
                    src={Search_icon}
                    alt="Search"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[42px] h-[42px]"
                  />
                </div>

                {/* Search Dropdown (mobile) */}
                <div ref={mobileSearchRef} className="relative w-full">
                  <AnimatePresence>
                    {showSearchDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="w-full py-6 "
                      >
                        <h3 className="text-white font-poppins text-[16px] mb-3">
                          Popular Searches
                        </h3>

                        <div className="flex gap-3 flex-wrap mb-6">
                          <button className="flex items-center gap-2 bg-white text-[#4B001A] px-4 py-2 rounded-[10px] font-poppins text-[14px]">
                            <img src={Trending_up} className="w-[16px]" />
                            Diwali Jewelry
                          </button>

                          <button className="flex items-center gap-2 bg-white text-[#4B001A] px-4 py-2 rounded-[10px] font-poppins text-[14px]">
                            <img src={Trending_up} className="w-[16px]" />
                            Pendants
                          </button>
                        </div>

                        <h3 className="text-white font-poppins text-[16px] mb-3">
                          Trending Products
                        </h3>

                        <Swiper
                          spaceBetween={20}
                          slidesPerView={2.4}
                          className="trending-swiper"
                          breakpoints={{
                            640: {
                              slidesPerView: 2.5,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                          }}
                        >
                          {TRENDING_PRODUCTS.map((item, index) => (
                            <SwiperSlide key={index}>
                              <div className="flex flex-col items-center">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  className="w-[121px] h-[109px] object-contain rounded-[12px] shadow-md"
                                />
                                <span className="mt-2 text-white text-[14px] font-poppins font-normal">
                                  {item.name}
                                </span>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* PAGE LINKS + MOBILE PRODUCTS DROPDOWN */}
              <div className="w-full flex flex-col items-center  gap-y-[40px]">
                {/* Simple page links (Home, About) */}
                {["/home", "/about"].map((path) => (
                  <Link
                    to={path}
                    key={path}
                    onClick={() => setMenuVisible(false)}
                  >
                    <h2
                      className={`font-poppins text-[18px] leading-normal text-center ${
                        location.pathname === path
                          ? "text-white font-semibold"
                          : "text-[#A0A0A0]"
                      }`}
                    >
                      {path === "/home" ? "Home" : "About Us"}
                    </h2>
                  </Link>
                ))}

                {/* Products dropdown (mobile) */}
                <div className="w-full">
                  <button
                    onClick={() => setMobileProductDropdown((prev) => !prev)}
                    className="w-full flex items-center justify-center relative px-1 ml-2"
                  >
                    <span
                      className={`font-poppins text-[18px] ${
                        mobileProductDropdown || isProductsRoute
                          ? "text-white font-semibold"
                          : "text-[#A0A0A0]"
                      }`}
                    >
                      Products
                    </span>

                    <img
                      src={mobileProductDropdown ? up_arrow : down_arrow}
                      alt="dropdown arrow"
                      className="w-6 h-6  top-0 left-0"
                    />
                  </button>

                  <AnimatePresence>
                    {mobileProductDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 flex flex-col items-center"
                      >
                        {/* Pills */}
                        <div className="flex flex-col gap-3 mt-2 w-full max-w-[260px]">
                          {collection &&
                            collection
                              ?.filter((item) => item.handle !== "best_seller")
                              .map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setMobileActiveTab(item);
                                    navigate(`/products/${item.handle}`, {
                                      state: {
                                        category: item.handle,
                                        collectionId: item.id,
                                      },
                                    });
                                    setMenuVisible(false);
                                    setMobileProductDropdown(true);
                                  }}
                                  className={`w-full py-3 rounded-[999px] font-poppins text-[15px] capitalize ${
                                    mobileActiveTab === item.handle
                                      ? "bg-[#CFA266] text-white"
                                      : "bg-[#FFEFE0] text-[#4B001A]"
                                  }`}
                                >
                                  {item.handle}
                                </button>
                              ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Blog */}
                <Link to="/blog" onClick={() => setMenuVisible(false)}>
                  <h2
                    className={`font-poppins text-[18px] leading-normal text-center ${
                      location.pathname === "/blog"
                        ? "text-white font-semibold"
                        : "text-[#A0A0A0]"
                    }`}
                  >
                    Blog
                  </h2>
                </Link>

                {/* User Profile text link (like your design) */}
                {isLoggedIn && (
                  <Link to="/profile" onClick={() => setMenuVisible(false)}>
                    <h2
                      className={`font-poppins text-[18px] leading-normal text-center ${
                        location.pathname === "/profile"
                          ? "text-white font-semibold"
                          : "text-[#A0A0A0]"
                      }`}
                    >
                      User Profile
                    </h2>
                  </Link>
                )}
              </div>

              {/* LOGOUT BUTTON */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="mt-36 mb-4 rounded-[32px] bg-[#CFA266] w-[319px] h-[52px] font-poppins text-[18px] text-white flex items-center justify-center gap-2"
                >
                  <img
                    src={logout}
                    alt="logout_icon"
                    className="w-[30px] h-[30px]"
                  />
                  Logout
                </button>
              )}

              {/* LOGIN / SIGNUP */}
              {!isLoggedIn && (
                <div
                  className="flex flex-col mt-32 items-center gap-y-[25px]"
                  onClick={() => setMenuVisible(false)}
                >
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

      <Modal modal={modalToggle} active={() => setModalToggle(!modalToggle)} />
    </>
  );
}

export default Navbar;

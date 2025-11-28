import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";
import Modal from "../components/Modal";
//asset import
import fast_selling_1 from "../assets/fast_selling_1.png";
import fast_selling_2 from "../assets/fast_selling_2.png";
import fast_selling_3 from "../assets/fast_selling_3.png";
import offer_product_1 from "../assets/offer_product_1.png";
import offer_product_2 from "../assets/offer_product_2.png";
import offer_product_3 from "../assets/offer_product_3.png";
import pink_collection from "../assets/pink_collection_design.png";
import statement_earrings from "../assets/statement_earrings_design.png";
import dangers from "../assets/dangers_design.png";
import jaguar_bracelet from "../assets/jaguar_bracelets_design.png";
import watch_charms from "../assets/watch_charms_design.png";
import bullet_icon from "../assets/bullet_point.png";
import silver_jewel from "../assets/silver_jewel.jpg";
import gold_jewel from "../assets/gold_jewel.jpg";
import whatsapp_floating from "../assets/whatsapp_icon.svg";
import before_img from "../assets/before.png";
import after_img from "../assets/after.png";
import slider_button from "../assets/slider_button.png";
import refresh_icon from "../assets/Refresh_icon.png";
import right_arrow from "../assets/right_arrow.png";
import left_arrow from "../assets/left_arrow.png";

import {
  FetchAllCollectionsFromShopify,
  FetchAllProductByCollections,
  FetchAllProductFromShopify,
} from "../handler/api Handler";
import { AppContext } from "../context/AppContext";

function Home() {
  const [silverPrice, SetSilverPrice] = useState();
  const [silverPriceUpdatedTime, setSilverPriceUpdatedTime] = useState();
  const [animate, setAnimate] = useState(false);
  const [collection, setCollections] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [FestiveFiltered, setFestiveFiltered] = useState([]);
  function toggle(product) {
    setSelectedType(product);
    setModalToggle(!modalToggle);
  }
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const showNavigation = FestiveFiltered.length > 1;
  const collectionsList = async () => {
    try {
      const response = await FetchAllCollectionsFromShopify();
      setCollections(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!collection) return;
    const bestSeller = collection.find((item) => item.handle === "best_seller");
    if (!bestSeller) return;
    const fetchBestSellerProducts = async () => {
      try {
        const response = await FetchAllProductByCollections(bestSeller.id);

        const edges = response?.data?.collection?.products?.edges || [];

        const formattedProducts = edges.map(({ node }) => ({
          title: node.title,
          image: { src: node.featuredImage?.url },
          variants: node.variants.edges.map((v) => ({
            price: v.node.price,
          })),
        }));

        setFestiveFiltered(formattedProducts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBestSellerProducts();
  }, [collection]);

  async function fetchMetalRates() {
    const url =
      "https://api.metals.dev/v1/latest?api_key=TNJIKPQ4AYPHZUDTT0BS619DTT0BS&currency=INR&unit=g&symbols=XAG-COIM";

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    const date = new Date(result.timestamps.metal);
    setSilverPriceUpdatedTime(
      date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/kolkata",
      })
    );

    const price = result.metals.silver;
    const silver_rate = price * 0.925;
    console.log(silver_rate);
    SetSilverPrice(silver_rate);
  }

  const specials = [
    { img: pink_collection, title: "Pink Collection" },
    { img: statement_earrings, title: "Statement Earrings" },
    { img: dangers, title: "Danglers" },
    { img: jaguar_bracelet, title: "Jaguar Bracelets" },
    { img: watch_charms, title: "Watch Charms" },
  ];
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;

    if (!container || !slider) return;

    const imageAfter = container.querySelector(".image-after");
    const sliderLine = container.querySelector(".slider-line");
    const sliderButton = container.querySelector(".slider-button");

    const updateSlider = (value) => {
      // Set the --position variable (controls the clipping width)
      container.style.setProperty("--position", `${value}%`);
    };

    // Initial position (centered at 50%)
    updateSlider(50);
    slider.value = 50;

    slider.addEventListener("input", (e) => {
      const value = e.target.value;
      updateSlider(value);
    });

    return () => {
      slider.removeEventListener("input", updateSlider);
    };
  }, []);
  useEffect(() => {
    collectionsList();
    // fetchMetalRates();
  }, []);

// Silvar prices logic
  const [pricePerGram, setPricePerGram] = useState(169.9);
  const [pricePerKg, setPricePerKg] = useState(169900);
  const [lastUpdated, setLastUpdated] = useState("27 Oct 2025, 11:00 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return; 

    setIsRefreshing(true);

    setTimeout(() => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setLastUpdated(formatted);
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Floating Whatsapp icon */}
      <a href="https://wa.me/919003058300/?text=Hi," target="_blank">
        <img
          src={whatsapp_floating}
          alt="Whatsapp_Icon"
          className="w-[50px] sm:w-[70px] h-fit fixed bottom-3 right-3 sm:bottom-9 sm:right-7 animate-bounce hover:scale-125 duration-300 transition-transform z-50"
        />
      </a>

      {/* Silver price */}
      {/* Mobile */}
      {/* <div className="w-full bg-[#FCE8CD] font-poppins lg:hidden">
        <p className="bg-[#CFA266] text-white font-medium text-center py-4 text-[18px]">
          Silver Price Today
        </p>

        <div className="flex justify-between p-3">
          <div className="flex items-center w-[161px] sm:w-[175px]">
            <p className="text-[#28040E] text-[15px] font-normal  sm:text-[16px]">
              <span className="font-semibold">₹ {silverPrice}</span> /g <br />{" "}
              <span className="font-semibold">₹ 1,69,900</span>/ kilogram.
            </p>
          </div>

          <div className="flex items-center gap-x-1 w-[155px] sm:w-[170px]">
            <img
              className={`w-[15px] h-[15px] cursor-pointer ${isRefreshing ? "animate-spin" : ""
                }`}
              src={refresh_icon}
              alt="Refresh icon"
              onClick={fetchMetalRates}
            />
            <p className="text-[14px] text-right sm:text-[16px]">
              Last Updated {silverPriceUpdatedTime}
            </p>
          </div>
        </div>
      </div> */}

      {/* Desktop */}
      {/* <div className="w-full bg-[#FCE8CD] font-poppins hidden lg:block">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-[25px]">
            <p className="bg-[#CFA266] px-8 py-3 w-fit text-white font-medium">
              Silver Price Today
            </p>
            <p className="text-[#28040E] text-[18px] font-normal">
              <span className="font-semibold">₹ {silverPrice?.toFixed(2)}</span>{" "}
              per gram and{" "}
              <span className="font-semibold">
                ₹{silverPrice?.toFixed(2) * 1000}
              </span>{" "}
              per kilogram.
            </p>
          </div>

          <div className="flex items-center gap-x-2 mr-6">
            <img
              className={`w-[15px] h-[15px] cursor-pointer ${isRefreshing ? "animate-spin" : ""
                }`}
              src={refresh_icon}
              alt="Refresh icon"
              onClick={fetchMetalRates}
            />
            <p>Last Updated {silverPriceUpdatedTime}</p>
          </div>
        </div>
      </div> */}

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //     clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <div className="festive-banner relative">
            <a
              href="#launchOffers"
              className="hover:scale-110 transition duration-300 absolute bottom-8 sm:bottom-16 sm:left-[24%]  "
            >
              <button className="rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">
                View our Best Sellers
              </button>
            </a>
          </div>
        </SwiperSlide> */}
        <SwiperSlide>
          <div className="banner-section">
            <h1 className="font-atteron uppercase text-[45px] leading-[60px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[720px] tracking-[1px]">
              Born from tradition Designed for today
            </h1>
            <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">
              Because exculsive 925 silver jewelry should feel as unique as the
              one who wears it.
            </h4>
            <a
              href="#launchOffers"
              className="w-fit hover:scale-110 transition duration-300"
            >
              <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">
                View our Best Sellers
              </button>
            </a>
          </div>
        </SwiperSlide>

        {/* Women banner */}
        <SwiperSlide>
          <div className="banner-2">
            <h1 className="font-atteron uppercase text-[40px] leading-[60px] text-center sm:text-left sm:text-[65px] text-[#5B3A09] sm:leading-[80px] font-normal w-full sm:max-w-[780px] tracking-[1px]">
              Embrace your beauty Shine with Elegance
            </h1>
            <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-[#5B3A09] text-center sm:text-left mt-3 sm:mt-8 max-w-[640px]">
              Because every exquisite 925 silver jewelry should perfectly reflect the grace of its wearer.
            </h4>
            <a
              href="#launchOffers"
              className="w-fit hover:scale-110 transition duration-300"
            >
              <button className=" mt-4 sm:mt-12 rounded-[32px] bg-[#5B3A09] font-poppins text-[16px] font-normal text-white py-[16px] px-[25px] cursor-pointer">
                View our womens Collections
              </button>
            </a>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
          <div className="banner-4">
            <h1 className="font-atteron uppercase text-[45px] leading-[60px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[720px] tracking-[1px]">
              Born from tradition Designed for today
            </h1>
            <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </h4>
            <a
              href="#launchOffers"
              className="w-fit hover:scale-110 transition duration-300"
            >
              <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">
                View our Collections
              </button>
            </a>
          </div>
        </SwiperSlide> */}

        <SwiperSlide>
          <div className="banner-5">
            <h1 className="font-atteron uppercase text-[45px] leading-[60px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[850px] tracking-[1px]">
              Heritage of Strength Crafted for Character
            </h1>
            <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">
              Because distinguished 925 silver jewelry should feel as commanding as the one who wears it.
            </h4>
            <a
              href="#launchOffers"
              className="w-fit hover:scale-110 transition duration-300"
            >
              <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#8F103B] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">
                View our mens Collections
              </button>
            </a>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Home Banner */}
      {/* <div className="banner-section">
                <h1 className="font-atteron uppercase text-[52px] leading-[70px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[720px]">Born from tradition Designed for today</h1>
                <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">Because exculsive 925 silver jewelry should feel as unique as the one who wears it.</h4>
                <a href="#launchOffers" className="w-fit">
                    <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[16px] cursor-pointer">View our Collection</button>
                </a>
            </div> */}

      <div className="whyus">
        <h1 className="font-atteron text-[52px] sm:text-[72px] text-center text-[#5C0A1F] leading-normal">
          WHY US?
        </h1>

        <div className="font-poppins text-center text-[16px] sm:text-[20px] font-normal text-[#28040E] max-w-[318px] sm:max-w-[1035px] mt-5 sm:mt-9 ">
          <p>
            With nearly 60 years of heritage, Tarangi carries forward the
            craftsmanship and trust of their family's tradition, reimagined for
            today by the siblings. Each piece blends timeless artistry with a
            modern sensibility, creating jewelry that feels rooted and
            refreshingly new. The handmade silver jewelry designs celebrate
            everyone, including women, men and couples, making inclusivity our
            defining hallmark. Tarangi offers fine 925 silver jewelry.{" "}
          </p>
        </div>
      </div>

      {/* Collections - Section */}
      <div className="design-section py-40 relative">
        <div className="max-w-7xl mx-auto tracking-[1px]">
          <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white ">
            Our Curations
          </h1>

          <div className="flex flex-col gap-y-[160px] sm:gap-y-0 sm:flex-row items-center justify-center gap-x-12 relative my-36 sm:my-56">
            {collection &&
              collection
                .filter(
                  (type) =>
                    type.handle?.toLowerCase().includes("men") ||
                    type.handle?.toLowerCase().includes("women") ||
                    type.handle?.toLowerCase().includes("gifts") ||
                    type.handle?.toLowerCase().includes("couples")
                )
                .map((type) => (
                  <Link
                    to="/products"
                    state={{ category: type.handle, collectionId: type.id }}
                  >
                    <div className="border-2 border-white w-[360px] h-[374px] relative z-0 overflow-hidden">
                      <img
                        src={type.image?.src}
                        alt="men-image"
                        className="w-[359px] h-[539px] sm:w-[373px] sm:h-[459px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute bottom-[-0px] z-10"
                      />
                      <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-0 left-1/3 ">
                        {type.handle}
                      </h2>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Best Sellers */}
          <div id="launchOffers" className="max-w-full">
            <h1 className="section-heading !text-white tracking-[1px] text-center">
              Best Sellers
            </h1>

            <div className="flex flex-col flex-wrap sm:flex-row gap-y-20 items-center justify-between mt-20 sm:mt-36">
              {FestiveFiltered.map((type) => (
                <Link
                  to={`/productdescription/${type.title.replace(/\s+/g, "-")}`}
                  state={{ product: type }}
                >
                  <div
                    className="flex flex-col items-center gap-y-1 transform transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                    onClick={() => {
                      toggle(type?.title);
                    }}
                  >
                    <img
                      src={type?.image?.src}
                      alt={type?.name}
                      className="px-2 sm:px-0 w-[360px] h-fit sm:w-[395px] sm:h-[395px] "
                    />
                    <h5 className="font-poppins text-[22px] font-normal leading-normal text-white mt-6">
                      {type?.title}
                    </h5>
                    <h4 className="font-poppins text-[20px] font-semibold leading-normal text-[#FCD99F]">
                      ₹
                      {Number(type.variants[0]?.price).toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View slider */}
            <div className="relative mt-14 sm:mt-20 md:mt-28 px-4 sm:px-6 md:px-10 lg:px-0  sm:hidden">
              {/* Custom navigation buttons */}
              {showNavigation && (
                <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-between px-6 sm:px-0">
                  <div className="">
                    <button
                      ref={prevRef}
                      className="swiper-button-prev-custom bg-[#D9B16F] opacity-70 rounded-full p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#d9b577] transition"
                    >
                      <img
                        src={left_arrow}
                        alt="Previous"
                        className="w-[42px] h-[42px] sm:w-[34px] sm:h-[34px] md:w-[42px] md:h-[42px] lg:w-[46px] lg:h-[46px]"
                      />
                    </button>
                  </div>
                  <div className="">
                    <button
                      ref={nextRef}
                      className="swiper-button-next-custom bg-[#D9B16F] opacity-70 rounded-full p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#d9b577] transition"
                    >
                      <img
                        src={right_arrow}
                        alt="Next"
                        className="w-[42px] h-[42px] sm:w-[34px] sm:h-[34px] md:w-[42px] md:h-[42px] lg:w-[46px] lg:h-[46px]"
                      />
                    </button>
                  </div>
                </div>
              )}

              <Swiper
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={1.1}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 12 },
                  480: { slidesPerView: 1, spaceBetween: 16 },
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 2, spaceBetween: 28 },
                  1280: { slidesPerView: 3, spaceBetween: 32 },
                  1536: { slidesPerView: 3, spaceBetween: 36 },
                  1920: { slidesPerView: 3, spaceBetween: 40 },
                }}
                onBeforeInit={(swiper) => {
                  if (showNavigation) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                }}
                className="!overflow-hidden  !h-[515px]"
              >
                {FestiveFiltered.length > 0 ? (
                  FestiveFiltered.map((type, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="w-[360px] h-[450px] mx-auto flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
                        onClick={() => toggle(type?.title)}
                      >
                        <img
                          src={type?.image?.src}
                          alt={type?.name}
                          className="px-2 sm:px-0 w-[360px] h-[460px]"
                        />
                        <h5 className="font-poppins text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-normal text-white mt-4 sm:mt-6">
                          {type?.title}
                        </h5>
                        <h4 className="font-poppins text-[16px] sm:text-[18px] md:text-[20px] font-semibold leading-normal text-[#FCD99F]">
                          ₹
                          {Number(type.variants[0]?.price).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 0,
                            }
                          )}
                        </h4>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <div className="text-white text-center py-10">
                    No products available
                  </div>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Gold vs Gold Plated Silver Section */}
      <div className="bg-secondary">
        <div className="max-w-[1220px] mx-auto py-20 sm:pt-40 sm:pb-20  px-3 ">
          <h1 className="section-heading lg:w-[846px] w-[336px] mx-auto tracking-[1px]">
            Gold vs Silver Jewellery
          </h1>
          <p className="section-content text-center sm:max-w-[1034px] mx-auto mt-14">
            Gold jewelry has always been cherished for its permanence, but often
            feels out of reach for everyday style. Gold-plated silver brings the
            same timeless look with the ease and affordability to make elegance
            part of daily life.
          </p>
          {/* <p className="section-content text-center sm:w-[1034px] w-[330px] mx-auto mt-9">At Tarangi, each gold-plated silver piece fuses the richness of gold with the strength of sterling silver. </p> */}

          {/* Images */}

          <h1 className="max-w-[340px] sm:max-w-[680px] mx-auto text-center font-atteron text-[#5C0A1F] text-[26px] sm:text-[40px] font-semibold tracking-[1px] sm:tracking-[1px] mt-16 sm:mt-20">
            Enjoy stunning designs without the heavy price tag
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-y-12 sm:gap-y-28 w-full mt-16 sm:mt-20">
            <div className="relative border">
              <img
                src={silver_jewel}
                alt="silver_jewel"
                className="sm:w-[542px] sm:h-[645px]"
              />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute top-[100px] sm:top-[150px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                Gold
              </h2>
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                ₹ 4<span className="font-[poppins]">,</span>00
                <span className="font-[poppins]">,</span>000
              </h2>
            </div>

            <div className="relative">
              <img
                src={gold_jewel}
                alt="silver_jewel"
                className="sm:w-[542px] sm:h-[645px]"
              />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute top-[100px] sm:top-[150px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                Silver
              </h2>
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                ₹ 12<span className="font-[poppins]">,</span>000
              </h2>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-8 sm:mt-28 px-4 py-12">
            <h1 className="font-atteron text-[30px] font-bold text-[#5C0A1F] text-center tracking-[2px] sm:text-[48px]">
              Why choose Tarangi’s
              <br className="hidden md:block" /> silver jewelry?
            </h1>

            <div className="flex flex-col w-fit mx-auto gap-y-7 mt-16 px-4 sm:px-0">
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[22px]">
                  The luminous beauty of gold, made affordable.
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[22px]">
                  Lightweight and comfortable for everyday wear.
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[22px]">
                  Versatile, from casual looks to special occasions.
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[22px]">
                  Crafted with lasting artistry and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarangi Specials */}
      <div className="newproducts-section tracking-[1px]">
        <div className="max-w-7xl mx-auto py-20 sm:py-40 px-3 sm:px-0">
          <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white mt-10 sm:mt-0  overflow-x-hidden">
            Tarangi Specials
          </h1>

          <div className="hidden sm:flex flex-col sm:flex-row items-center sm:gap-x-12 gap-y-24 sm:flex-wrap justify-center mt-10 sm:mt-44">
            {specials.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                onClick={() => {
                  setSelectedType(item.title);
                  toggle();
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white"
                />
                <h3 className="font-atteron text-[32px] font-normal leading-normal text-white mt-2 sm:text-[34px]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
        {/* ----------- MOBILE VIEW (Swiper) ----------- */}
        <div className="relative mt-14 sm:mt-20 md:mt-28 px-4 sm:px-6 md:px-10 lg:px-0 sm:hidden">
          {/* Custom navigation buttons */}
          {showNavigation && (
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-between px-6 sm:px-0">
              <div>
                <button
                  ref={prevRef}
                  className="swiper-button-prev-custom bg-[#D9B16F] opacity-70 rounded-full p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#d9b577] transition"
                >
                  <img
                    src={left_arrow}
                    alt="Previous"
                    className="w-[42px] h-[42px] sm:w-[34px] sm:h-[34px] md:w-[42px] md:h-[42px] lg:w-[46px] lg:h-[46px]"
                  />
                </button>
              </div>
              <div>
                <button
                  ref={nextRef}
                  className="swiper-button-next-custom bg-[#D9B16F] opacity-70 rounded-full p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#d9b577] transition"
                >
                  <img
                    src={right_arrow}
                    alt="Next"
                    className="w-[42px] h-[42px] sm:w-[34px] sm:h-[34px] md:w-[42px] md:h-[42px] lg:w-[46px] lg:h-[46px]"
                  />
                </button>
              </div>
            </div>
          )}

          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={1.1}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 12 },
              480: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1, spaceBetween: 20 },
            }}
            onBeforeInit={(swiper) => {
              if (showNavigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className="!overflow-hidden !h-[620px]"
          >
            {specials.length > 0 ? (
              specials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
                    onClick={() => {
                      setSelectedType(item.title);
                      toggle();
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-[357px] h-[380px] border-[2px] border-white"
                    />
                    <h3 className="font-atteron text-[30px] font-normal leading-normal text-white mt-2">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-white text-center py-10">
                No specials available
              </div>
            )}
          </Swiper>
        </div>
      </div>

      {/* Fast Selling Products - Section */}
      <div className="fastselling-section hidden">
        <div className="max-w-7xl mx-auto py-40 px-3 sm:px-0">
          <h1 className="section-heading !text-white">Fast Selling Products</h1>

          <div className="flex flex-col gap-y-20 sm:gap-y-0 sm:flex-row items-center justify-between mt-20">
            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={fast_selling_1}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">2 more in Stock</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Earings
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹2,000.00
              </h4>
            </div>

            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={fast_selling_2}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">Selling Fast</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Nose pin
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹8,000.00
              </h4>
            </div>

            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={fast_selling_3}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">Only 1 left</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Chain
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹5,500.00
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Product with Offers - Section */}
      <div className="newproducts-section hidden">
        <div className="max-w-7xl mx-auto py-40 px-3 sm:px-0">
          <h1 className="section-heading !text-white">Products with Offers</h1>

          <div className="flex flex-col gap-y-20 sm:flex-row items-center justify-between mt-20 ">
            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={offer_product_1}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Bugadi
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹2,000.00
              </h4>
            </div>

            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={offer_product_2}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Ring
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹8,000.00
              </h4>
            </div>

            <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
              <div className="relative">
                <img
                  src={offer_product_3}
                  alt="new_product_image"
                  className="w-[395px] h-[395px]"
                />
                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
              </div>
              <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">
                Bangle
              </h5>
              <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                ₹5,500.00
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Before After Slider */}
      <div className="before-after-section ">
        <div className="max-w-7xl mx-auto py-20 sm:py-40 px-3 sm:px-0">
          <h1 className="font-atteron section-heading text-[26px]  sm:text-[64px] text-center text-[#5C0A1F] mb-16">
            <span className="text-[28px] sm:text-[64px]">
              {" "}
              Enhance Your Look With
            </span>{" "}
            <br /> Tarangi
          </h1>

          <div className="container" ref={containerRef}>
            <div className="image-container">
              <img
                className="image-before slider-image"
                src={before_img}
                alt="before_img"
              />
              <img
                className="image-after slider-image"
                src={after_img}
                alt="after_img"
              />
            </div>
            <input
              ref={sliderRef}
              type="range"
              min={2}
              max={98}
              defaultValue={50}
              className="slider"
            />
            <div className="slider-line"></div>
            <div className="slider-button" aria-hidden="true">
              <img src={slider_button} alt="slider button" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal modal={modalToggle} active={toggle} productName={selectedType} />
    </>
  );
}

export default Home;

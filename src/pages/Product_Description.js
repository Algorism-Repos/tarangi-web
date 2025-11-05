import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router";

// images
import grey_arrow from "../assets/Products/grey_arrow.png";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import shopping_bag from "../assets/Products/shopping_bag.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import shopping_cart from "../assets/Products/shopping_cart.png";
import favorie_icon from "../assets/Products/favorite_icon.png";

// components
import PincodeInput from "../components/Pincode_Input";
import Recently_Viewed from "../components/Recently-Viewed";

function Product_Description() {
  const Products = [
    {
      product_img: product_1,
      alt: "Necklace",
      price: "₹10,000",
      product_name: "Stone Necklace",
    },
    {
      product_img: product_2,
      alt: "Silver Kada",
      price: "₹4,000",
      product_name: "Stone Necklace",
    },
    {
      product_img: product_1,
      alt: "Necklace",
      price: "₹10,000",
      product_name: "Stone Necklace",
    },
    {
      product_img: product_2,
      alt: "Silver Kada",
      price: "₹4,000",
      product_name: "Stone Necklace",
    },
  ];

  return (
    <>
      {/* Backgound */}
      <div className="bg-light-sandal font-poppins py-[30px] sm:py-[70px]">
        {/* Container */}
        <div className="max-w-[1300px] mx-auto px-5 sm:px-0">
          {/* Product path */}
          <div className="flex items-center justify-center gap-x-[8px] text-[#6F6F6F] text-[16px] xl:justify-start">
            <p>Necklace</p>
            <img
              className="w-[30px] h-[30px]"
              src={grey_arrow}
              alt="Arrow Icon"
            />
            <p>Classic Gold Chain</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-12 my-[20px] sm:my-[40px] xl:my-[70px]">
            {/* Product Image */}
            <div className="max-w-full sm:max-w-[525px] mx-auto">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto"
                    src={product_1}
                    alt=""
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto"
                    src={product_1}
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto"
                    src={product_1}
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Product Detail */}
            <div className="lg:max-w-[640px] mx-auto">
              <div className="space-y-[3px]">
                <h1 className="font-atteron text-primary text-[26px] sm:text-[32px] tracking-[1px]">
                  Classic Gold Chain
                </h1>
                <h2 className="text-[26px] font-semibold sm:text-[32px]">
                  ₹10,000
                </h2>
                <p className="text-[#878787] text-[14px]">
                  MRP Incl. of all taxes
                </p>
              </div>

              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Description */}
              <div>
                <h3 className="text-[#6F6F6F] text-[14px] font-medium">
                  Description
                </h3>
                <p className="text-[#484848] text-[16px] font-medium ">
                  Handcrafted 22KT gold chain with a timeless design perfect for
                  daily wear and gifting.
                </p>
              </div>

              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Locations */}
              <div className="space-y-6 sm:space-y-3">
                <h3 className="text-[#6F6F6F] text-[14px] font-medium">
                  Check estimated delivery date with Pincode
                </h3>

                <PincodeInput />

                <div className="flex items-center gap-x-[8px]">
                  <img
                    className="w-[18px] h-[22px]"
                    src={shopping_bag}
                    alt="Shopping bag icon"
                  />
                  <h3 className="text-[#6F6F6F] text-[14px] font-medium ">
                    Expected Delivery Date
                  </h3>
                </div>
                <p className="text-[#484848] text-[15px] font-medium ">
                  Delivered by Oct 10
                </p>
              </div>

              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Color Options */}
              <div className="">
                <p className="text-[14px] text-[#6F6F6F]">Colors Available</p>

                <div className="mt-2 flex justify-start gap-x-3">
                  <img
                    className="w-[45px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={gold_ellipse}
                    alt="gold ellipse"
                  />
                  <img
                    className="w-[45px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={silver_ellipse}
                    alt="Silver ellipse"
                  />
                  <img
                    className="w-[45px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={brown_ellipse}
                    alt="brown ellipse"
                  />
                </div>
              </div>

              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-[16px]">
                <Link to="/cart">
                  <button className="flex items-center justify-center gap-x-[8px] bg-[#4B001A] w-full h-[56px] rounded-full text-white text-[18px] font-medium sm:w-[210px]">
                    <img
                      className="w-[32px] h-[32px]"
                      src={shopping_cart}
                      alt="cart_icon"
                    />
                    Add to cart
                  </button>
                </Link>

                <Link to="/favourites">
                  <button className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-full h-[56px] rounded-full text-primary text-[18px] font-medium sm:w-[210px]">
                    <img
                      className="w-[32px] h-[32px]"
                      src={favorie_icon}
                      alt="like_icon"
                    />
                    Wishlist
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested products */}
        <div className="max-w-[1300px] mx-auto my-[60px] lg:my-[130px] px-4 sm:px-0">
          {/* Look Like */}
          <div>
            <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
              you may also like
            </h1>

            <div className="flex flex-wrap justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
              {/* Looping */}
              {Products.map((item) => {
                return (
                  <div className="font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0">
                    <img
                      className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px]"
                      src={item.product_img}
                      alt={item.alt}
                    />

                    <div className="mt-2 flex justify-between sm:mt-4">
                      <div>
                        <h3 className="text-[16px] font-semibold sm:text-[20px]">
                          {item.price}
                        </h3>
                        <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                          {item.product_name}
                        </p>
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-[15px] text-[#6F6F6F]">
                          Colors Available
                        </p>

                        <div className="mt-1 flex justify-end gap-x-3">
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={gold_ellipse}
                            alt="gold ellipse"
                          />
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={silver_ellipse}
                            alt="Silver ellipse"
                          />
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={brown_ellipse}
                            alt="brown ellipse"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Recently_Viewed />
        </div>
      </div>
    </>
  );
}

export default Product_Description;

import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useLocation } from "react-router";

// images
import grey_arrow from "../assets/Products/grey_arrow.png";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import shopping_bag from "../assets/Products/shopping_bag.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import favorie_icon from "../assets/Products/favorite_icon.png";
import favorie_icon_white from "../assets/Products/Unfilled_likeIcon.png";
import { AppContext } from "../context/AppContext";
import pure_silver from "../assets/pure_silver_icon.png";
import shipping from "../assets/shipping_icon.png";
import plating from "../assets/plating_icon.png";

// components
import PincodeInput from "../components/Pincode_Input";
import Recently_Viewed from "../components/Recently-Viewed";
import AddToCartButton from "../components/AddToCartButton";
import Wishlist_Popup from "../components/Wishlist_Popup";

function Product_Description() {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart, filteredProducts, addToWishlist, addToRecentlyViewed } =
    useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState("gold");
  const [selectedImage, setSelectedImage] = useState(product?.image?.src);
  const swiperRef = useRef(null);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false)


  const Colors = [
    { id: "gold", img: gold_ellipse },
    { id: "silver", img: silver_ellipse },
    { id: "brown", img: brown_ellipse },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.variants[0].id,
      title: product.title,
      price: parseInt(product.variants[0].price),
      image: product.image.src,
      quantity: quantity,
    });
  };

  const matchingProducts = filteredProducts?.filter(
    (item) =>
      item.product_type === product.product_type && item.id !== product.id
  );

  const handleAddToWish = () => {
    addToWishlist({
      id: product.variants[0].id,
      title: product.title,
      price: parseInt(product.variants[0].price),
      image: product.image.src,
      quantity: quantity,
    });
  };

  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.variants[0].id,
        title: product.title,
        image: product.image.src,
        price: parseInt(product.variants[0].price),
      });
    }
  }, []);
  const [wishIconSrc, setWishIconSrc] = useState(favorie_icon);

  return (
    <>
      {/* Backgound */}
      <div className="bg-light-sandal font-poppins py-[30px] sm:py-[70px]">
        {/* Container */}
        <div className="max-w-[1300px] mx-auto px-5 sm:px-0">
          {/* Product path */}
          <div className="flex items-center justify-center gap-x-[8px] text-[#6F6F6F] text-[16px] xl:justify-start">
            <p>{product?.product_type}</p>
            <img
              className="w-[30px] h-[30px]"
              src={grey_arrow}
              alt="Arrow Icon"
            />
            <p> {product?.title}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-12 my-[20px] sm:my-[40px] xl:my-[70px]">
            {/* Product Image */}
            <div className="max-w-full sm:max-w-[525px] mx-auto">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}

                // 🔥 Sync active color when user swipes
                onSlideChange={(swiper) => {
                  const index = swiper.activeIndex;

                  if (index === 0) {
                    setActiveColor("gold");
                    setSelectedImage(product?.image?.src);
                  }

                  if (index === 1) {
                    setActiveColor("silver");
                    setSelectedImage(product_1);
                  }

                  if (index === 2) {
                    setActiveColor("brown");
                    setSelectedImage(product_2);
                  }

                }}
              >
                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto rounded-[18px]"
                    src={product?.image?.src}
                    alt="Product"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto rounded-[18px]"
                    src={product_1}
                    alt="gold"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full sm:w-[388px] sm:h-[399px] mx-auto rounded-[18px]"
                    src={product_2}
                    alt="silver"
                  />
                </SwiperSlide>
              </Swiper>


            </div>

            {/* Product Detail */}
            <div className="lg:max-w-[640px] mx-auto">
              <div className="space-y-[3px]">
                <h1 className="font-atteron text-primary text-[26px] sm:text-[32px] tracking-[1px]">
                  {product?.title}
                </h1>
                <h2 className="text-[26px] font-semibold sm:text-[32px]">
                  ₹{parseInt(product.variants[0].price).toLocaleString("en-IN")}
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

                <div className="max-w-[305px] flex flex-wrap justify-between  font-[poppins] text-center text-[#313131] my-5">
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={pure_silver}
                      alt="pure silver icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      92.5
                      <br /> Pure Silver
                    </p>
                  </div>
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={shipping}
                      alt="pure silver icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Pan India Shipping
                    </p>
                  </div>
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={plating}
                      alt="pure silver icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Life long plating
                    </p>
                  </div>
                </div>
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
              <div className="mt-2 flex justify-start gap-x-4">
                {Colors.map((color) => {
                  const isAvailable =
                    product?.availableColors?.includes(color.id) ?? true;

                  const handleColorChange = () => {
                    if (!isAvailable) return;

                    setActiveColor(color.id);

                    // 🔥 Scroll & Update Image
                    if (color.id === "gold") {
                      setSelectedImage(product?.image?.src);
                      swiperRef.current.slideTo(0);
                    }

                    if (color.id === "silver") {
                      setSelectedImage(product_1);
                      swiperRef.current.slideTo(1);
                    }

                    if (color.id === "brown") {
                      setSelectedImage(product_2);
                      swiperRef.current.slideTo(2);

                    }
                  };

                  return (
                    <img
                      key={color.id}
                      onClick={handleColorChange}
                      className={`w-[45px] h-[45px] rounded-full bg-white transition-all duration-200 cursor-pointer
          ${activeColor === color.id
                          ? "border-[4px] border-primary p-[2px]"
                          : "border-[2px] border-transparent hover:border-primary hover:p-[2px]"
                        }
          ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}`}
                      src={color.img}
                      alt={color.id}
                    />
                  );
                })}
              </div>


              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Buttons */}
              <div className="max-w-[500px] ">
                {/* <div className="flex flex-col w-full sm:flex-row items-center gap-[16px]">
                  <AddToCartButton />

                  <Link className="w-full" to="/favourites" state={{ product }}>
                    <button
                      className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-[361px] h-[56px] rounded-full text-primary text-[18px] font-medium sm:w-[176px]
  transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
                      onMouseEnter={() => setWishIconSrc(favorie_icon_white)}
                      onMouseLeave={() => setWishIconSrc(favorie_icon)}
                      onClick={handleAddToWish}
                    >
                      <img
                        className="w-[32px] h-[32px]"
                        src={wishIconSrc}
                        alt="like_icon"
                      />
                      Wishlist
                    </button>
                  </Link>
                </div> */}

                <div className="flex flex-col w-full sm:flex-row items-center gap-[16px]">
                  <AddToCartButton />

                  <button
                    className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-full h-[52px] rounded-full text-primary text-[16px] font-medium mt-2  transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
                    onMouseEnter={() => setWishIconSrc(favorie_icon_white)}
                    onMouseLeave={() => setWishIconSrc(favorie_icon)}
                    onClick={() => setShowWishlistPopup(true)}>
                    <img
                      className="w-[32px] h-[32px]"
                      src={wishIconSrc}
                      alt="like_icon"
                    />
                    Add to Wishlist
                  </button>


                </div>
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
              {matchingProducts.map((item) => {
                return (
                  <div className="font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0">
                    <img
                      className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px]"
                      src={item?.image?.src}
                      alt={item?.alt || item?.title}
                    />

                    <div className="mt-2 flex flex-wrap items-center justify-between sm:mt-4">
                      <div>
                        <h3 className="text-[16px] font-semibold sm:text-[20px]">
                          ₹{parseInt(item.variants[0].price)}
                        </h3>
                        <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                          {item?.title}
                        </p>
                      </div>

                      <div className="hidden sm:block">
                        {/* <p className="text-[15px] text-[#6F6F6F]">
                          Colors Available
                        </p> */}

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
      <Wishlist_Popup
        show={showWishlistPopup}
        onClose={() => setShowWishlistPopup(false)}
      />
    </>
  );
}

export default Product_Description;

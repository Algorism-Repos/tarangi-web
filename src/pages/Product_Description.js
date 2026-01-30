import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Link, useLocation, useParams } from "react-router";
// images
import grey_arrow from "../assets/Products/grey_arrow.png";

import { AppContext } from "../context/AppContext";
import pure_silver from "../assets/pure_silver_icon.png";
import shipping from "../assets/shipping_icon.png";
import plating from "../assets/plating_icon.png";
import arrow_left from "../assets/left_arrow_border.png";
import arrow_right from "../assets/right_arrow_border.png";
import closeIcon from "../assets/close_icon_sandal.png";
import toggle_plus_icon from "../assets/toggle_plus.png";
import toggle_minus_icon from "../assets/toggle_minus.png";

// components
import PincodeInput from "../components/Pincode_Input";
import Recently_Viewed from "../components/Recently-Viewed";
import AddToCartButton from "../components/AddToCartButton";
import Wishlist_Popup from "../components/Wishlist_Popup";
import AddToWishlistButton from "../components/AddToWishlistButton";
import OutOfStockModal from "../components/OutOfStockModal";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";
import { FetchAllProductFromShopify } from "../handler/api_Handler";
import { formatProduct } from "../utils/productFormatter";

function Product_Description() {
  const swiperRef = useRef(null);
  const swiperRefs = useRef({});
  const lightBoxSwiper = useRef(null);
  const lightBox_prevRef = useRef(null);
  const ligthBox_nextRef = useRef(null);
  const lightBox_pagination = useRef(null);
  const [lightBoxClose, setlightBoxClose] = useState(false);
  const [lightBoxBottomClose, setlightBoxBottomClose] = useState(false);
  const { params } = useParams();
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [lightBox, setlightBox] = useState(false);
  const [swiperActiveIndex, setswiperActiveIndex] = useState(0);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState({});
  const location = useLocation();
  const { product } =
    location?.state ||
    categorizedProduct.find(
      (p) => p.title.replace(/\s+/g, "-") === params.handle,
    );
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const [activeVariant, setactiveVariant] = useState({});
  const [colorSelected, setColorSelected] = useState("");
  const [jewelleryCareToggle, setjewelleryCareToggle] = useState(false);
  const [shippingToggle, setshippingToggle] = useState(false);
  const [youMayLike, setYouMayLike] = useState(() => {
    const stored = localStorage.getItem("youMayLike");
    return stored ? JSON.parse(stored) : [];
  });
  const {
    categorizedProduct,
    wishlistItems,
    pincodeDetails,
    addToRecentlyViewed,
    colorAssets,
  } = useContext(AppContext);

  console.log(product);

  const jewelleryCare_content = [
    "Avoid wearing your jewellery while sweating or exercising.",
    "Do not apply perfume, lotion, or sunscreen after wearing your jewellery.",
    "Remove jewellery before washing hands, bathing, or swimming.",
    "Keep away from hard surfaces, friction, and direct heat.",
    "Avoid wearing while sleeping.",
    "Store pieces in a plastic zip pouch or airtight box when not in use — avoid velvet boxes.",
    "Do not clean with harsh chemicals or silver polish liquids.",
    "Gently wipe with a soft, dry cotton cloth after each use to restore its shine.",
  ];

  // setting the color selected
  useEffect(() => {
    if (product?.variants?.length === 1) {
      setColorSelected(product?.variants?.[0].colorVariant);
    } else if (product?.variants?.length > 1) {
      const firstProduct = product?.variants?.findIndex(
        (i) => i.inventoryQuantity > 0,
      );
      setColorSelected(product?.variants?.[firstProduct].colorVariant);
      swiperRef.current.slideTo(firstProduct);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const variant = product?.variants?.find(
        (element) => element?.colorVariant === colorSelected,
      );
      if (variant) {
        setactiveVariant({
          ...variant,
          title: product?.title,
          productId: product?.productId,
          deliveryDetails: pincodeDetails,
        });
      }
    } else {
      setactiveVariant({
        ...product,
        variantId: product?.variantId,
        deliveryDetails: pincodeDetails,
      });
    }
  }, [colorSelected, pincodeDetails]);

  useEffect(() => {
    if (!categorizedProduct?.length || !product?.productId) return;

    const filtered = categorizedProduct.filter(
      (item) => item.productId !== product.productId,
    );

    //  remove the products where the inventory quantity is 0
    const removeSoldOut = filtered.filter((item) =>
      item.type === "simple"
        ? item.inventoryQuantity > 0
        : item.variants?.some((variant) => variant.inventoryQuantity > 0),
    );
    // setYouMayLike(filtered);

    setYouMayLike(removeSoldOut);

    localStorage.setItem("youMayLike", JSON.stringify(filtered));
  }, [categorizedProduct, product?.productId]);

  useEffect(() => {
    if (!product) return;
    addToRecentlyViewed(product);
  }, [product]);

  // click on  color toggle
  function handleColorChangeByButton(color) {
    setColorSelected(color);
    const idx = product?.variants?.findIndex(
      (element) => element.colorVariant === color,
    );
    console.log(idx);
    swiperRef.current.slideTo(idx);
  }

  const isAlreadyInWishlist = wishlistItems.some(
    (item) =>
      item?.variantId === activeVariant?.variantId ||
      item?.variants?.some((i) => i.variantId === activeVariant?.variantId),
  );

  useEffect(() => {
    if (categorizedProduct) {
      const filterOutofStockProducts = categorizedProduct.filter((item) => {
        const hasVariants = item.variants && item.variants.length > 0;

        return hasVariants
          ? item.variants.every((i) => i.inventoryQuantity !== 0)
          : item.inventoryQuantity !== 0;
      });
      console.log(filterOutofStockProducts);
      const removingProductShown = filterOutofStockProducts.filter(
        (item) => item.productId !== product?.productId,
      );
    }
    // setRecentlyViewed(categorizedProduct);
  }, [categorizedProduct, location.pathname]);
  // useEffect(() => {
  //   setRecentlyViewed(categorizedProduct);
  // }, [categorizedProduct, location.pathname]);

  const changeVariant = (productId, index, item) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
    swiperRefs.current[productId]?.slideTo(index);
  };

  const handleSuccess = () => {
    setShowRestockModal(false);
    setShowSuccessModal(true);
  };
  const handleOutOfStockClick = () => {
    setShowOutStockModal(true);
  };

  const handleRestockClick = () => {
    setShowRestockModal(true);
  };

  function openLightBox() {
    setlightBox(true);
    lightBoxSwiper.current?.slideTo(swiperActiveIndex);

    if (product?.variants === null && product?.images.length === 1) {
      setlightBoxClose(true);
    } else if (product?.variants?.length === 1) {
      setlightBoxClose(true);
    } else {
      setlightBoxBottomClose(true);
    }
  }
  function closeLightBox() {
    setlightBox(false);
    swiperRef.current?.slideTo(swiperActiveIndex);
  }

  console.log(youMayLike);
  const test = product?.productDetails?.value.split("\n");
   console.log(test)
  return (
    <>
      {/* Backgound */}
      <div className="bg-[#FFF5E8] font-poppins py-[30px] sm:py-[70px]">
        {/* Container */}
        <div className="max-w-7xl mx-auto px-5 sm:px-0 ">
          {/* Product path */}
          <div className="sm:flex sm:flex-row items-center justify-center gap-x-[8px] text-[#6F6F6F] text-[16px] xl:justify-start hidden">
            <p>{product?.productType}</p>
            <img
              className="w-[30px] h-[30px]"
              src={grey_arrow}
              alt="Arrow Icon"
            />
            <p> {product?.title}</p>
          </div>

          <div className="flex flex-wrap flex-col sm:flex-row lg:flex-nowrap items-start gap-y-10 gap-x-10 lg:gap-x-24 sm:my-[40px] xl:my-[70px] sm:px-12 ">
            {/* Product Image */}

            <div className="max-w-[361px] sm:max-w-[400px] sm:min-w-[400px]  overflow-hidden  lg:mt-20 mb-5">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  const id = swiper.activeIndex;
                  if (product?.variants != null) {
                    setColorSelected(product?.variants[id]?.colorVariant);
                  }
                  setswiperActiveIndex(id);
                }}
                spaceBetween={30}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
              >
                {product?.variants && product?.variants?.length > 0
                  ? product?.variants?.map((item) => (
                      <SwiperSlide>
                        <img
                          className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px] cursor-zoom-in"
                          src={item?.image}
                          onClick={openLightBox}
                        />
                      </SwiperSlide>
                    ))
                  : product?.images?.map((img) => (
                      <SwiperSlide>
                        <img
                          className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px] cursor-zoom-in"
                          src={img}
                          onClick={openLightBox}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>

            {/* Product Detail */}
            <div className="min-w-full sm:min-w-[633px] max-w-[650px]">
              <div className="space-y-[5px]">
                <h1 className="font-atteron text-primary text-[24px] sm:text-[32px] tracking-[1px] mt-3 sm:mt-0">
                  {product?.title}{" "}
                </h1>
                {/* Price Section */}
                {/* Price alone */}
                <h2
                  className={
                    activeVariant?.compareAtPrice === null
                      ? "block text-[24px] font-semibold sm:text-[32px]"
                      : "hidden"
                  }
                >
                  ₹{" "}
                  {Number(activeVariant?.price).toLocaleString("en-IN") ||
                    product?.price}
                </h2>

                {/* Price with Discounted Price */}
                <div
                  className={
                    activeVariant?.compareAtPrice !== null
                      ? "flex flex-row flex-nowrap items-center gap-x-3 w-fit"
                      : "hidden"
                  }
                >
                  <h2 className="text-[16px] font-semibold text-red-500 sm:text-[22px] line-through">
                    {" "}
                    ₹
                    {parseInt(activeVariant?.compareAtPrice).toLocaleString(
                      "en-IN",
                    ) || product?.compareAtPrice}
                  </h2>
                  <h2 className="text-[24px] font-semibold sm:text-[32px]">
                    {" "}
                    ₹
                    {parseInt(activeVariant?.price).toLocaleString("en-IN") ||
                      product.price}
                  </h2>
                </div>
                <p className="text-[#878787] text-[12px] font-poppins ">
                  MRP Excl.of all taxes
                </p>
              </div>
              {/* ----------------------------------------------------------------------------------------- */}
              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px] sm:block hidden" />

              <h1
                className={
                  activeVariant?.inventoryQuantity === 0
                    ? "mb-4 font-poppins text-[#404040] text-[20px] font-medium leading-[52px] tracking-0 bg-[#B8B8B8] w-[125px] h-fit text-center rounded-[173px]"
                    : "hidden"
                }
              >
                Sold Out
              </h1>

              {/* Description */}
              <div>
                <h3 className="text-[#6F6F6F] text-[14px] font-medium mt-5 sm:mt-0">
                  Description
                </h3>
                <p className="text-[#484848] text-[16px] font-medium">
                  {product?.description || "Description not available"}
                </p>
                
                  <ul className="list-disc">
                    {test.map((i) => (
                      <li>{i}</li>
                    ))}
                  </ul>
       

                {/*Colors Available Section - Mobile  */}
                <div
                  className={
                    product?.variants !== null ? "sm:hidden block" : "hidden"
                  }
                >
                  <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

                  {/* Color Icons */}
                  <h3 className="font-poppins font-medium text-[14px] leading-normal text-[#6F6F6F] mt-3">
                    Colors Available
                  </h3>
                  <div className="flex flex-row items-center mt-1 gap-x-3">
                    {product?.variants?.map((item) => {
                      return (
                        <button
                          type="button"
                          disabled={item.inventoryQuantity === 0}
                          onClick={() =>
                            handleColorChangeByButton(item?.colorVariant)
                          }
                        >
                          <img
                            className={`w-[40px] h-[40px] ${item?.inventoryQuantity === 0 ? "opacity-[30%]" : ""} ${activeVariant?.inventoryQuantity > 0 && colorSelected === item.colorVariant ? "border-4 rounded-full border-primary cursor-pointer px-[0.5px]" : ""}`}
                            src={colorAssets[item.colorVariant]}
                            alt="color-assets"
                          />
                        </button>
                      );
                    })}
                  </div>

                  <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
                </div>

                <div className=" max-w-full sm:max-w-[305px] flex flex-wrap justify-between  font-[poppins] text-center text-[#313131] mt-7 sm:my-5">
                  <div className="max-w-[75px]">
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
                      alt="shipping icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Pan India Shipping
                    </p>
                  </div>
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={plating}
                      alt="plating icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Premium Quality
                    </p>
                  </div>
                </div>
              </div>
              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Pincode */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-[#6F6F6F] text-[14px] font-medium">
                  Check estimated delivery date with Pincode
                </h3>
                <PincodeInput />
              </div>

              {/*Colors Available Section - Above Mobile (large screens) */}
              <div
                className={
                  product?.variants !== null ? "sm:block mt-9 hidden" : "hidden"
                }
              >
                {/* Color Icons */}
                <h3 className="font-poppins font-medium text-[14px] leading-normal text-[#6F6F6F] mt-3">
                  Colors Available
                </h3>
                <div className="flex flex-row items-center mt-2 gap-x-3">
                  {product?.variants?.map((item, index) => {
                    return (
                      <button
                        type="button"
                        onClick={() =>
                          handleColorChangeByButton(item.colorVariant)
                        }
                      >
                        <img
                          className={`w-[40px] h-[40px] ${item?.inventoryQuantity === 0 ? "opacity-[30%]" : ""} ${colorSelected === item.colorVariant ? "border-4 rounded-full border-primary cursor-pointer px-[0.5px]" : ""}`}
                          src={colorAssets[item.colorVariant]}
                          alt="color-assets"
                        />
                      </button>
                    );
                  })}
                </div>

                <hr className="border-[0.50px] bsorder-t-[#D9D9D9] w-full my-[16px]" />
              </div>

              {/* Buttons */}
              <div className="mt-2">
                <div className="max-w-[500px] flex flex-col w-full sm:flex-row items-center gap-[16px]">
                  <AddToCartButton
                    productToCart={activeVariant}
                    buttonDisabled={activeVariant?.inventoryQuantity === 0}
                  />
                  <AddToWishlistButton
                    productToFavorites={product}
                    buttonDisabled={isAlreadyInWishlist}
                  />
                </div>
                <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
              </div>

              {/* Jewellery Care */}
              <div className="mb-5">
                <div
                  className="flex flex-row items-center justify-between w-full cursor-pointer"
                  onClick={() => setjewelleryCareToggle(!jewelleryCareToggle)}
                >
                  <h3 className="font-poppins text-[18px] font-medium text-font-grey">
                    Jewellery Care
                  </h3>
                  <img
                    src={
                      jewelleryCareToggle ? toggle_minus_icon : toggle_plus_icon
                    }
                    alt="toggle_icon"
                    className="w-[30px] h-[30px] cursor-pointer"
                    onClick={() => setjewelleryCareToggle(!jewelleryCareToggle)}
                  />
                </div>
                <div className={jewelleryCareToggle ? "block" : "hidden"}>
                  <h4 className="font-poppins text-[15px] text-black font-medium mt-3 ml-3">
                    To keep your Tarangi pieces shining beautifully, follow
                    these simple steps,
                  </h4>

                  <ul className="list-disc mt-5 ml-5 sm:ml-7 space-y-2">
                    {jewelleryCare_content.map((i) => (
                      <li className="font-poppins text-[14px] text-black font-normal">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

              {/* Shipping Details */}
              <div className="mb-12 sm:mb-0">
                <div
                  className="flex flex-row items-center justify-between w-full cursor-pointer "
                  onClick={() => setshippingToggle(!shippingToggle)}
                >
                  <h3 className="font-poppins text-[18px] font-medium text-font-grey">
                    Shipping & Delivery Details
                  </h3>
                  <img
                    src={shippingToggle ? toggle_minus_icon : toggle_plus_icon}
                    alt="plus-icon"
                    className="w-[30px] h-[30px] cursor-pointer"
                    onClick={() => setshippingToggle(!shippingToggle)}
                  />
                </div>
                <h5
                  className={
                    shippingToggle
                      ? "font-poppins text-[14px] font-normal text-black mt-3 ml-2"
                      : "hidden"
                  }
                >
                  At Tarangi, all orders are carefully packed and delivered
                  within 5 to 15 business days. Delivery timelines may vary
                  depending on the customer’s location and courier service
                  availability.
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested products */}
        <div className="max-w-[1300px] mx-auto my-[60px] lg:my-[130px] px-4 xl:px-0">
          <div>
            <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
              You may also like
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[20px] gap-y-6 mt-[25px] sm:gap-x-[20px]">
              {youMayLike?.slice(0, 4).map((item) => {
                const isOutOfStock =
                  item?.variants?.every(
                    (item) => item.inventoryQuantity === 0,
                  ) || item?.inventoryQuantity === 0;
                const isRestocking = false;

                const selectedIndex = selectedVariants[item?.productId] ?? 0;

                return (
                  <Link
                    className="font-poppins w-[170px] sm:w-[310px] mx-auto relative sm:hover:scale-105 transition duration-300 ease-in-out group"
                    key={item?.productId}
                    to={
                      !isOutOfStock
                        ? `/product_description/${item?.title.replace(/\s+/g, "-")}`
                        : "#"
                    }
                    state={
                      !isOutOfStock && !isRestocking ? { product: item } : {}
                    }
                    // onClick={isOutOfStock
                    //   ? handleOutOfStockClick
                    //   : isRestocking
                    //     ? handleRestockClick
                    //     : undefined}

                    onClick={(e) => {
                      if (isOutOfStock) {
                        e.preventDefault();
                        handleOutOfStockClick();
                        return;
                      }

                      if (isRestocking) {
                        e.preventDefault();
                        handleRestockClick();
                        return;
                      }

                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Swiper
                      onSwiper={(swiper) =>
                        (swiperRefs.current[item.productId] = swiper)
                      }
                      onSlideChange={(swiper) => {
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [item.productId]: swiper.activeIndex,
                        }));
                      }}
                    >
                      {item?.variants !== null && item.variants.length > 0
                        ? item?.variants?.map((i) => {
                            return (
                              <SwiperSlide>
                                <img
                                  className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-60" : ""} ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`}
                                  src={i.image}
                                  alt={item?.title}
                                />
                              </SwiperSlide>
                            );
                          })
                        : item.images.map((i) => {
                            return (
                              <SwiperSlide>
                                <img
                                  className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-60" : ""} ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`}
                                  src={i}
                                  alt={item?.title}
                                />
                              </SwiperSlide>
                            );
                          })}
                    </Swiper>

                    {/* SOLD OUT LABEL */}
                    {isOutOfStock && (
                      <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5 z-10">
                        Sold Out
                      </p>
                    )}

                    {/* RESTOCK SOON LABEL */}
                    {!isOutOfStock && isRestocking && (
                      <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                        Restocking Soon
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap justify-between sm:mt-3">
                      <div>
                        <h1 className="text-[12px] font-semibold sm:text-[18px] text-wrap text-[#313131]">
                          {item?.title}
                        </h1>
                      </div>

                      <div className="mt-1.3 flex flex-col sm:flex-row gap-y-2 items-start sm:items-center sm:justify-between w-full">
                        {/* Pricing without discount */}
                        <h3
                          className={
                            item?.compareAtPrice === null ||
                            item?.variants?.[selectedIndex]?.compareAtPrice ===
                              null
                              ? "font-poppins text-[12px] sm:text-[16px] font-normal leading-normal"
                              : "hidden"
                          }
                        >
                          ₹{" "}
                          {item.variants !== null && item.variants.length > 0
                            ? parseInt(
                                item?.variants?.[selectedIndex]?.price,
                              ).toLocaleString("en-IN")
                            : parseInt(item?.price)?.toLocaleString("en-IN")}
                        </h3>

                        {/* Pricing with discount */}
                        {item?.variants?.length > 0 &&
                        item?.variants?.[selectedIndex]?.compareAtPrice !==
                          null ? (
                          <div className="flex flex-row items-center flex-nowrap gap-x-2">
                            <h3 className="font-poppins text-[10px] sm:text-[14px]  leading-normal text-red-500 line-through font-semibold ">
                              ₹{" "}
                              {parseInt(
                                item?.variants[selectedIndex]?.compareAtPrice,
                              ).toLocaleString("en-IN")}
                            </h3>
                            <h3 className="font-poppins text-[12px] sm:text-[16px] font-normal leading-normal">
                              ₹{" "}
                              {parseInt(
                                item?.variants[selectedIndex]?.price,
                              ).toLocaleString("en-IN")}
                            </h3>
                          </div>
                        ) : (
                          <div
                            className={
                              !item?.compareAtPrice ||
                              item?.compareAtPrice === null
                                ? "hidden"
                                : "flex flex-row items-center flex-nowrap gap-x-2"
                            }
                          >
                            <h3 className="font-poppins text-[10px] sm:text-[14px]  leading-normal text-red-500 line-through font-semibold ">
                              ₹{" "}
                              {parseInt(item?.compareAtPrice).toLocaleString(
                                "en-IN",
                              )}
                            </h3>
                            <h3 className="font-poppins text-[12px] sm:text-[16px] font-normal leading-normal">
                              {" "}
                              ₹{parseInt(item?.price).toLocaleString("en-IN")}
                            </h3>
                          </div>
                        )}

                        {/*  COLOR TOGGLE BUTTONS */}
                        <div
                          className={
                            item?.variants?.some(
                              (v) => colorAssets?.[v.colorVariant],
                            )
                              ? "flex flex-row items-center gap-x-2"
                              : "hidden"
                          }
                        >
                          {item?.variants !== null && item?.variants.length > 0
                            ? item.variants.map((variants, index) => {
                                return (
                                  <>
                                    <button
                                      type="button"
                                      disabled={
                                        variants?.inventoryQuantity === 0
                                      }
                                    >
                                      <img
                                        key={variants?.variantId || index}
                                        src={
                                          colorAssets[variants?.colorVariant]
                                        }
                                        alt="color-assets"
                                        className={`w-[24px] h-[24px] cursor-pointer ${variants?.inventoryQuantity === 0 ? "opacity-[30%]" : ""} ${variants?.inventoryQuantity !== 0 && item?.variants?.length > 1 && selectedIndex === index ? "border-2 border-primary rounded-[24px] px-[0.2px]" : "border-none"}`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          changeVariant(item?.productId, index);
                                        }}
                                      />
                                    </button>
                                  </>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Recently_Viewed />
        </div>

        <Wishlist_Popup
          show={showWishlistPopup}
          onClose={() => setShowWishlistPopup(false)}
        />
      </div>

      {/* OUT OF STOCK MODAL */}
      <OutOfStockModal
        open={showOutStockModal}
        onClose={() => setShowOutStockModal(false)}
      />

      {/* Restock modal */}
      <RestockModal
        open={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        onSuccess={handleSuccess}
      />

      <RestockSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Product Image Lightbox */}
      <div
        className={
          lightBox === true
            ? "fixed inset-0 bg-black/60 flex items-center justify-center z-50 mx-auto"
            : "hidden"
        }
      >
        <div>
          <div
            className={`relative max-w-7xl w-[380px] sm:w-[600px] rounded-[24px] `}
          >
            <img
              src={closeIcon}
              alt="close_icon"
              className={
                lightBoxClose
                  ? "w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] cursor-pointer absolute top-[-60px] right-0"
                  : "hidden"
              }
              onClick={closeLightBox}
            />
            <Swiper
              onSwiper={(swiper) => (lightBoxSwiper.current = swiper)}
              onSlideChange={(swiper) => {
                setswiperActiveIndex(swiper.activeIndex);
              }}
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: lightBox_prevRef.current,
                nextEl: ligthBox_nextRef.current,
              }}
              pagination={{
                el: lightBox_pagination.current,
                dynamicBullets: true,
                clickable: true,
              }}
            >
              {product?.variants !== null && product?.variants?.length > 0
                ? product?.variants?.map((item) => (
                    <SwiperSlide>
                      <img
                        src={item.image}
                        alt="lightbox_images"
                        className=" sm:w-[600px] sm:h-[600px] w-[380px] h-[380px] object-contain rounded-[24px] cursor-zoom-out"
                        onClick={closeLightBox}
                      />
                    </SwiperSlide>
                  ))
                : product?.images?.map((i) => (
                    <div>
                      <SwiperSlide>
                        <img
                          src={i}
                          alt="lightbox_images"
                          className="sm:w-[600px] sm:h-[600px] w-[380px] h-[380px] object-contain rounded-[24px] cursor-zoom-out"
                          onClick={closeLightBox}
                        />
                      </SwiperSlide>
                    </div>
                  ))}
            </Swiper>
          </div>
          <div
            className={
              lightBoxBottomClose
                ? "bg-light-sandal relative mx-auto w-[250px] sm:w-[400px] mt-5 py-4 sm:py-5 rounded-[24px] border-2 border-primary "
                : "hidden"
            }
          >
            <div className="flex flex-row items-center justify-center flex-nowrap gap-x-8 sm:gap-x-12 mb-7">
              <button type="button" ref={lightBox_prevRef}>
                <img
                  src={arrow_left}
                  alt="left_arrow"
                  className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px]"
                />
              </button>
              <img
                src={closeIcon}
                alt="close_icon"
                className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] cursor-pointer"
                onClick={closeLightBox}
              />
              <button type="button" ref={ligthBox_nextRef}>
                <img
                  src={arrow_right}
                  alt="right_arrow"
                  className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px]"
                />
              </button>
            </div>
            <div className="sm:absolute sm:bottom-2 sm:left-[50%] sm:right-[50%]">
              <div className="" ref={lightBox_pagination}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product_Description;

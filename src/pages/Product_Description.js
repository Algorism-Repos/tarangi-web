import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useLocation, useParams } from "react-router";
// images
import grey_arrow from "../assets/Products/grey_arrow.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { AppContext } from "../context/AppContext";
import pure_silver from "../assets/pure_silver_icon.png";
import shipping from "../assets/shipping_icon.png";
import plating from "../assets/plating_icon.png";

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
  const {params} = useParams();
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState({});
  const location = useLocation();
  const { product } = location?.state || categorizedProduct.find(
    p => p.title.replace(/\s+/g, "-") === params.handle
  );
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const [activeVariant, setactiveVariant] = useState({});
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
    setRecentlyViewed,
    recentlyViewed,
  } = useContext(AppContext);

  const [colorSelected, setColorSelected] = useState(
    product?.variants?.[0]?.colorVariant || "",
  );

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

    const filtered = categorizedProduct.filter((item) => item.productId !== product.productId);
    console.log("filtered",filtered)

    setYouMayLike(filtered);
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

  const isAlreadyInWishlist = wishlistItems.some((item) => item?.variantId === activeVariant?.variantId || item?.variants?.some((i) => i.variantId === activeVariant?.variantId));


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

  console.log(youMayLike);
  
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
                }}
                spaceBetween={30}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
              >
                {product?.variants && product?.variants?.length > 0
                  ? product?.variants.map((item) => (
                    <SwiperSlide>
                      <img
                        className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px]"
                        src={item?.image}
                      />
                    </SwiperSlide>
                  ))
                  : product?.images.map((img) => (
                    <SwiperSlide>
                      <img
                        className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px]"
                        src={img}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            {/* Product Detail */}
            <div className="min-w-full sm:min-w-[633px]">
              <div className="space-y-[5px]">
                <h1 className="font-atteron text-primary text-[24px] sm:text-[32px] tracking-[1px] mt-3 sm:mt-0">{product?.title} </h1>
                {/* Price Section */}
                {/* Price alone */}
                <h2
                  className={
                    activeVariant?.compareAtPrice === null
                      ? "block text-[24px] font-semibold sm:text-[32px]"
                      : "hidden"
                  }
                >
                  ₹ {Number(activeVariant?.price).toLocaleString("en-IN") || product?.price}
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

                <div className=" max-w-full sm:max-w-[305px] flex flex-wrap justify-between  font-[poppins] text-center text-[#313131] mt-9 sm:my-5">
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
                      Life long plating
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
              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px] sm:hidden block" />

              {/*Colors Available Section - Above Mobile (large screens) */}
              <div
                className={
                  product?.variants !== null ? "sm:block hidden" : "hidden"
                }
              >
                <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

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

                <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
              </div>

              {/* Buttons */}
              <div className="max-w-[500px] mt-5">
                <div className="flex flex-col w-full sm:flex-row items-center gap-[16px]">
                  <AddToCartButton productToCart={activeVariant} buttonDisabled={activeVariant?.inventoryQuantity === 0} />
                  <AddToWishlistButton productToFavorites={product} buttonDisabled={isAlreadyInWishlist} />
                </div>
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

                const isOutOfStock = item?.variants?.every(item => item.inventoryQuantity === 0) || item?.inventoryQuantity === 0;
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
                    state={!isOutOfStock && !isRestocking ? { product: item, } : {}}
                    onClick={
                      isOutOfStock
                        ? handleOutOfStockClick
                        : isRestocking
                          ? handleRestockClick
                          : undefined
                    }
                  >
                    <Swiper
                      onSwiper={(swiper) => (swiperRefs.current[item.productId] = swiper)}

                      onSlideChange={(swiper) => {
                        setSelectedVariants((prev) => ({
                          ...prev, [item.productId]: swiper.activeIndex,
                        }))
                      }}
                    >
                      {item?.variants !== null && item.variants.length > 0 ?
                        item?.variants?.map((i) => {
                          return (
                            <SwiperSlide>
                              <img className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-60" : ""} ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`} src={i.image} alt={item?.title} />
                            </SwiperSlide>
                          )
                        })
                        :
                        item.images.map((i) => {
                          return (
                            <SwiperSlide>
                              <img className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-60" : ""} ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`} src={i} alt={item?.title} />
                            </SwiperSlide>
                          )
                        })
                      }
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
                        <h3 className={item?.compareAtPrice === null || item?.variants?.[selectedIndex]?.compareAtPrice === null ? "font-poppins text-[12px] sm:text-[16px] font-normal leading-normal" : "hidden"}>₹ {item.variants !== null && item.variants.length > 0 ? parseInt(item?.variants?.[selectedIndex]?.price).toLocaleString("en-IN") : parseInt(item?.price)?.toLocaleString("en-IN")}</h3>

                        {/* Pricing with discount */}
                        {item?.variants?.length > 0 && item?.variants?.[selectedIndex]?.compareAtPrice !== null ?
                          (
                            <div className="flex flex-row items-center flex-nowrap gap-x-2">
                              <h3 className="font-poppins text-[10px] sm:text-[14px]  leading-normal text-red-500 line-through font-semibold ">₹ {parseInt(item?.variants[selectedIndex]?.compareAtPrice).toLocaleString("en-IN")}</h3>
                              <h3 className="font-poppins text-[12px] sm:text-[16px] font-normal leading-normal">₹ {parseInt(item?.variants[selectedIndex]?.price).toLocaleString("en-IN")}</h3>
                            </div>
                          )

                          : (
                            <div className={!item?.compareAtPrice || item?.compareAtPrice === null ? "hidden" : "flex flex-row items-center flex-nowrap gap-x-2"}>
                              <h3 className="font-poppins text-[10px] sm:text-[14px]  leading-normal text-red-500 line-through font-semibold ">₹ {parseInt(item?.compareAtPrice).toLocaleString("en-IN")}</h3>
                              <h3 className="font-poppins text-[12px] sm:text-[16px] font-normal leading-normal"> ₹{parseInt(item?.price).toLocaleString("en-IN")}</h3>
                            </div>
                          )
                        }

                        {/*  COLOR TOGGLE BUTTONS */}
                        <div className={item?.variants?.some(v => colorAssets?.[v.colorVariant]) ? "flex flex-row items-center gap-x-2" : "hidden"}>
                          {item?.variants !== null && item?.variants.length > 0 ?
                            item.variants.map((variants, index) => {
                              return (
                                <>
                                  <button type="button" disabled={variants?.inventoryQuantity === 0}>
                                    <img key={variants?.variantId || index} src={colorAssets[variants?.colorVariant]} alt="color-assets" className={`w-[24px] h-[24px] cursor-pointer ${variants?.inventoryQuantity === 0 ? "opacity-[30%]" : ""} ${variants?.inventoryQuantity !== 0 && item?.variants?.length > 1 && selectedIndex === index ? "border-2 border-primary rounded-[24px] px-[0.2px]" : "border-none"}`}
                                      onClick={(e) => { e.preventDefault(); changeVariant(item?.productId, index) }}
                                    />
                                  </button>
                                </>
                              )
                            }) : ""
                          }
                        </div>
                      </div>
                    </div>
                  </Link>
                )
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
    </>
  );
}

export default Product_Description;

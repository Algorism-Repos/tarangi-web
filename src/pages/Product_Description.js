import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useLocation } from "react-router";
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
import { FetchAllProductFromShopify } from "../handler/api_Handler";
import { formatProduct } from "../utils/productFormatter";

function Product_Description() {
  const swiperRef = useRef(null);
  const location = useLocation();
  const { product } = location.state || {};
  const {
     
    categorizedProduct,
    wishlistItems,
    pincodeDetails,
    addToRecentlyViewed,
    colorAssets,
    setRecentlyViewed
  } = useContext(AppContext);
  const [colorSelected, setColorSelected] = useState(
    product?.variants?.[0]?.colorVariant || ""
  );
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const [activeVariant, setactiveVariant] = useState({});
  const [youMayLike, setYouMayLike] = useState();

  const colorAssetsArray = [
    {
      value: "Gold",
      imgUrl: gold_ellipse,
    },
    {
      value: "Silver",
      imgUrl: silver_ellipse,
    },
    {
      value: "RoseGold",
      imgUrl: brown_ellipse,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (product?.variants?.length > 0) {
      const variant = product?.variants?.find(
        (element) => element?.colorVariant === colorSelected
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
    addToRecentlyViewed(product);
  }, [colorSelected, pincodeDetails]);

  //Organising the colors that are available for the product
  const variantColors = (product?.variants || []).map(
    (element) => element.colorVariant
  );

  const availableColors = colorAssetsArray?.filter((element) =>
    variantColors?.includes(element.value)
  );

  // click on  color toggle
  function handleColorChangeByButton(color) {
    setColorSelected(color);
    const idx = product?.variants?.findIndex(
      (element) => element.colorVariant === color
    );
    console.log(idx);
    swiperRef.current.slideTo(idx);
  }
  const isAlreadyInWishlist = wishlistItems.some(
    (item) => item?.variantId === activeVariant?.variantId
  );
  console.log(product);

  console.log("variantActive", activeVariant);
  console.log(" you may also like categorizedProduct ", categorizedProduct);
    console.log(" you may also like youMayLike ", youMayLike);


  useEffect(() => {
    if (categorizedProduct) {
      // setProducts(normalizeProducts(categorizedProduct));
      const filterOutofStockProducts = categorizedProduct.filter((item) => {
        const hasVariants = item.variants && item.variants.length > 0;

        return hasVariants ? item.variants.every(i => i.inventoryQuantity !== 0) : item.inventoryQuantity !== 0;
      })
      console.log(filterOutofStockProducts);
      const removingProductShown = filterOutofStockProducts.filter(item => item.productId !== product?.productId);
      console.log(product?.productId);
      console.log("removingProductShown",removingProductShown);
      setYouMayLike(removingProductShown);
    }
    setRecentlyViewed(categorizedProduct)
  }, [categorizedProduct, location.pathname]);


  console.log("Active Variant", activeVariant);
  // console.log(" you may also like categorizedProduct ", youMayLike);

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
                      <img className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px]" src={item?.image} />
                    </SwiperSlide>
                  ))
                  : product?.images.map((img) => (
                    <SwiperSlide>
                      <img className="w-[361px] h-[373px] sm:w-[388px] sm:h-[399px] rounded-[24px]" src={img} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            {/* Product Detail */}
            <div className="min-w-full sm:min-w-[633px]">
              <div className="space-y-[5px]">
                <h1 className="font-atteron text-primary text-[24px] sm:text-[32px] tracking-[1px] mt-3 sm:mt-0">
                  {product?.title}
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
                  ₹
                  {parseInt(activeVariant?.price).toLocaleString("en-IN") || product?.price}
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
                      "en-IN"
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
              {/* Description */}
              <div>
                <h3 className="text-[#6F6F6F] text-[14px] font-medium mt-5 sm:mt-0">
                  Description
                </h3>
                <p className="text-[#484848] text-[16px] font-medium ">
                  At Tarangi Jewels, every piece of 92.5 silver jewellery reflects impeccable artistry and sophisticated charm. Experience jewellery that is as beautiful as it is timeless.
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
                    {availableColors?.map((item) => (
                      <img
                        className={
                          colorSelected === item?.value
                            ? "w-[40px] sm:h-[40px] border-4 rounded-full border-primary cursor-pointer"
                            : "w-[40px] sm:h-[40px] hover:border-4 rounded-full border-primary cursor-pointer"
                        }
                        src={item?.imgUrl}
                        alt={`image_${item?.value}`}
                        onClick={() => {
                          handleColorChangeByButton(item?.value);
                        }}
                      />
                    ))}
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
                <div className="flex flex-row items-center mt-1 gap-x-3">
                  {availableColors?.map((item) => (
                    <img
                      className={
                        colorSelected === item?.value
                          ? "w-[40px] sm:h-[40px] border-4 rounded-full border-primary cursor-pointer"
                          : "w-[40px] sm:h-[40px] hover:border-4 rounded-full border-primary cursor-pointer"
                      }
                      src={item?.imgUrl}
                      alt={`image_${item?.value}`}
                      onClick={() => {
                        handleColorChangeByButton(item?.value);
                      }}
                    />
                  ))}
                </div>

                <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
              </div>

              {/* Buttons */}
              <div className="max-w-[500px] mt-5">
                <div className="flex flex-col w-full sm:flex-row items-center gap-[16px]">
                  <AddToCartButton productToCart={activeVariant} />
                  <AddToWishlistButton productToFavorites={product} disabled={isAlreadyInWishlist} />
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
                // const selectedIndex = selectedVariants[item?.productId] ?? 0;
                // const selectedVariant = item?.variants[selectedIndex];
                return (
                  <div
                    key={item?.id}
                    className="font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0"
                    onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });} }
                  >
                    <Link
                      to={`/product_description/${item?.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      state={{ product: item }}
                    >
                      <img
                        className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px]"
                        src={item?.images?.[0]}
                        alt={`${item?.alt || item?.title}_image`}
                      />
                    </Link>
                    <div>
                      <h1 className="font-poppins font-semibold sm:text-[18px] text-[12px] leading-[140%] mt-2 mb-1">{item?.title}</h1>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-1 sm:gap-y-0 justify-between w-full ">
                        <h3 className="text-[12px] font-normal leading-normal sm:text-[16px] ">
                          ₹{" "}
                          {(item?.variants && item?.variants.length > 0
                            ? parseInt(item?.variants?.[0]?.price) 
                            : parseInt(item?.price)
                          )?.toLocaleString("en-IN")}
                        </h3>
                        <div className="flex flex-row items-center gap-x-2">
                            {item?.variants !== null && item?.variants.length > 0 ?
                              item.variants.map((variants, index) => {
                                return (
                                  <>
                                    <img key={variants?.variantId || index} src={colorAssets[variants?.colorVariant]} alt="color-assets" className={`w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer`}
                                    />
                                  </>
                                )
                              }) : ""
                            }
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

        <Wishlist_Popup
          show={showWishlistPopup}
          onClose={() => setShowWishlistPopup(false)}
        />
      </div >
    </>
  );
}

export default Product_Description;

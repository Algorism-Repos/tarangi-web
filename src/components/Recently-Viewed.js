import React, { useContext, useEffect, useState, useRef } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import product_3 from "../assets/Products/product_1.png"; // brown color image
import { Swiper, SwiperSlide } from "swiper/react";



import { AppContext } from "../context/AppContext";
import LikeButton from "../components/LikeButton";
import { Link } from "react-router";
import OutOfStockModal from "../components/OutOfStockModal";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";


function Recently_Viewed() {
  const [products, setProducts] = useState([]);
  const swiperRefs = useRef({});
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { recentlyViewed, setRecentlyViewed, colorAssets } = useContext(AppContext);
  const [selectedVariants, setSelectedVariants] = useState({});


  console.log(recentlyViewed)
  useEffect(() => {
    if (recentlyViewed) {
      setProducts(normalizeProducts(recentlyViewed));

    }
  }, [recentlyViewed]);

  const normalizeProducts = (data) =>
    data.map((item) => {
      if (!item?.variants) {
        return {
          ...item,
          variants: [
            {
              variantId: item?.variantId,
              price: item?.price,
              image: item?.image,
              colorVariant: null,
            },
          ],
        };
      }
      return item;
    });

  const changeVariant = (productId, index) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
    swiperRefs.current[productId]?.slideTo(index);

  };

  const handleOutOfStockClick = () => {
    setShowOutStockModal(true);
  };

  const handleRestockClick = () => {
    setShowRestockModal(true);
  };

  const handleSuccess = () => {
    setShowRestockModal(false);
    setShowSuccessModal(true);
  };
  //  Like
  //  toggle
  const toggleLike = (id) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item?.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={recentlyViewed.length === 1 ? "hidden" : "max-w-[1300px] mx-auto mt-[50px] lg:mt-[80px]"}>
      <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
        Recently Viewed
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
        {recentlyViewed?.slice(0, 8).map((item) => {
          const isOutOfStock = item?.variants?.every(item => item.inventoryQuantity === 0) || item?.inventoryQuantity === 0;
          const isRestocking = false;

          const selectedIndex = selectedVariants[item?.productId] ?? 0;


          return (
            <Link
              className="font-poppins w-[170px] sm:w-[310px] mx-auto relative sm:hover:scale-105 transition duration-300 ease-in-out group"
              key={item?.productId}
              to={
                !isOutOfStock && !isRestocking
                  ? `/product_description/${item?.title.replace(/\s+/g, "-")}`
                  : "#"
              }
              state={!isOutOfStock && !isRestocking ? { product: item, } : {}}
              // onClick={
              //   isOutOfStock
              //     ? handleOutOfStockClick
              //     : isRestocking
              //       ? handleRestockClick
              //       : undefined
              // }
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

                {/* SOLD OUT LABEL */ }
                {
                  isOutOfStock && (
                    <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5 z-10">
                      Sold Out
                    </p>
                  )
                }

                {/* RESTOCK SOON LABEL */ }
                {
                  !isOutOfStock && isRestocking && (
                    <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                      Restocking Soon
                    </p>
                  )
                }

                <div className="mt-2 flex flex-wrap justify-between sm:mt-3">
                  <div>
                    <h1 className="text-[12px] font-semibold sm:text-[18px] text-wrap text-[#313131]">
                      {item?.title}
                    </h1>
                  </div>

                  <div className="mt-1.3 flex flex-col sm:flex-row gap-y-2 items-start sm:items-center sm:justify-between w-full">
                    {/* Pricing without discount */}
                    <h3 className={item?.compareAtPrice === null || item?.variants?.[selectedIndex]?.compareAtPrice === null ? "font-poppins text-[12px] sm:text-[16px] font-normal leading-normal" : "hidden"}>₹ {item.variants !== null && item.variants.length > 0 ? parseInt(item?.variants?.[selectedIndex]?.price).toLocaleString("en-IN") : parseInt(item?.price)?.toLocaleString("en-IN")}</h3>

                    {/* Pricing with disscount */}
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
      );
        })}

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
    </div>
    </div >
  );
}

export default Recently_Viewed;

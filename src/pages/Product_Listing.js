import { useRef } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// Image
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { useEffect, useState } from "react";
import OutOfStockModal from "../components/OutOfStockModal";
import LikeButton from "../components/LikeButton";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";
import { Autoplay } from "swiper/modules";

function Product_Listing({ productCatergory }) {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState({});
  const {
    loading,
    setLoading,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    colorAssets
  } = useContext(AppContext);
  const swiperRefs = useRef({});
  console.log("SwiperRef ---", swiperRefs)

  useEffect(() => {
    if (productCatergory) {
      setProducts(productCatergory);
  setLoading(true); 
  
  
 setTimeout(() => {
      setLoading(false);       
    }, 300);
  }
  }, [productCatergory]);
  const changeVariant = (productId, index, item) => {
   
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,

    }));
    swiperRefs.current[productId]?.slideTo(index);
  };
  console.log("Selected Variant List:", selectedVariants);

  useEffect(() => {
    const array = [2,3,1];
    console.log("Trial Array --- ", array.some(i => i>5));
  },[])

  //  Like button toggle
  const toggleLike = (productId, variantId) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product.productId !== productId) return product;

        const isLiked = product.liked;

        if (isLiked) {
          removeFromWishlist(productId);
        } else {
          addToWishlist(product);
        }

        return { ...product, liked: !product.liked };
      });
    });
  };

  useEffect(() => {
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        liked: wishlistItems.some(
          (w) =>
            w.productId === product.productId &&
            w.variantId === product.variantId
        ),
      }))
    );
  }, [wishlistItems, productCatergory]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // after form success
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
  if (loading) {
    return <LoadingScreen />;
  }
  if (products.length === 0) {
    return (
      <>
        <p className="text-center w-full text-[18px] font-poppins text-[#747474]">
          No products found
        </p>

        <RestockModal
          open={showRestockModal}
          onClose={() => setShowRestockModal(false)}
          onSuccess={() => {
            setShowRestockModal(false);
            setShowRestockSuccess(true);
          }}
        />

        <RestockSuccessModal
          open={showRestockSuccess}
          onClose={() => setShowRestockSuccess(false)}
        />
      </>
    );
  }

   console.log(products)
  return (
    <>
      <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-[15px] sm:gap-y-10 sm:gap-x-[30px] px-1.5">
        {products.map((item) => {
          const isOutOfStock = item?.variants?.every(item => item.inventoryQuantity === 0) || item?.inventoryQuantity === 0 ;
          const isRestocking = item?.restock === true;

          const selectedIndex = selectedVariants[item?.productId] ?? 0;

          return (
            <Link
              key={item?.productId}
              to={
                !isOutOfStock && !isRestocking
                  ? `/product_description/${item?.title.replace(/\s+/g, "-")}`
                  : "#"
              }
              state={!isOutOfStock && !isRestocking ? { product: item } : {}}
              onClick={
                isOutOfStock
                  ? handleOutOfStockClick
                  : isRestocking
                    ? handleRestockClick
                    : undefined
              }
              className="font-poppins w-[170px] sm:w-[310px] mx-auto relative sm:hover:scale-105 transition duration-300 ease-in-out group"
            >
              {/* MAIN PRODUCT IMAGE */}
              <Swiper
                onSwiper={(swiper) => (swiperRefs.current[item.productId] = swiper)}

                onSlideChange={(swiper) => {
                  setSelectedVariants((prev) => ({
                    ...prev, [item.productId] : swiper.activeIndex,
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

              {/*  Like Button */}
              <LikeButton
                liked={item?.liked}
                isOutOfStock={isOutOfStock}
                isRestocking={isRestocking}
                onToggle={() => toggleLike(item.productId, item.variantId)}
              />

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

              {/* PRODUCT DETAILS */}
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
                  {item?.variants?.length > 0 && item?.variants?.[selectedIndex]?.compareAtPrice !== null  ?
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
                            <button type="button" disabled = {variants?.inventoryQuantity === 0}>
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

export default Product_Listing;

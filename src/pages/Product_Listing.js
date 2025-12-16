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
  } = useContext(AppContext);
  const COLOR_MAP = {
    Gold: gold_ellipse,
    Silver: silver_ellipse,
    RoseGold: brown_ellipse,
  };
  useEffect(() => {
    if (productCatergory) {
      setProducts(normalizeProducts(productCatergory));
      // setProducts(productCatergory);
      // setProducts(productCatergory);
      setLoading(false);
    }
  }, [productCatergory]);

  const normalizeProducts = (data) =>
    data.map((item) => {
      if (!item.variants) {
        return {
          ...item,
          variants: [
            {
              variantId: item.variantId,
              price: item.price,
              image: item.image,
              colorVariant: null,
            },
          ],
        };
      }
      return item;
    });

  console.log(products);

  const changeVariant = (productId, index ,item) => {
    console.log(productId, index,item);
    

    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,

    }));
  };
  //  Like button toggle
  const toggleLike = (productId, variantId) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product.productId !== productId) return product;

        const isLiked = product.liked;

        if (isLiked) {
          removeFromWishlist(variantId);
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

  return (
    <>
      <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-[15px] sm:gap-y-10 sm:gap-x-[30px] px-1.5">
        {products.map((item) => {
          const isOutOfStock =  item.inventoryQuantity === 0 || item?.variants?.every(item => item.inventoryQuantity === 0);

            // item?.inventoryQuantity === 0 ||
            // item?.variants?.[0]?.inventoryQuantity === 0;
          const isRestocking = item.restock === true;



          const selectedIndex = selectedVariants[item?.productId] ?? 0;
          const selectedVariant = item?.variants[selectedIndex];
          return (
            <Link
              key={item?.id}
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
              <img
                className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${
                  isOutOfStock ? "grayscale" : ""
                } ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`}
                // src={
                //   item.variants != null
                //     ? item.variants.map((item) => item.image)
                //     : item.images
                // }
                src={selectedVariant?.image}
                alt={item?.title}
              />

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
                  <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                    ₹ {parseInt(selectedVariant?.price).toLocaleString("en-IN")}
                  </h3>

                  {/*  COLOR TOGGLE BUTTONS */}
                  <div className="flex flex-row items-center gap-x-4">
                    {item?.variants?.map((variant, index) => {
                      if (!variant.colorVariant) return null;

                      return (
                        <img
                          key={variant?.variantId}
                          src={COLOR_MAP[variant?.colorVariant]}
                          alt={variant.colorVariant}
                          className={`w-6 h-6 cursor-pointer ${
                            selectedIndex === index
                              ? "ring-2 ring-[#8B5E3C] rounded-full"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            changeVariant(item?.productId, index,variant);
                          }}
                        />
                      );
                    })}
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

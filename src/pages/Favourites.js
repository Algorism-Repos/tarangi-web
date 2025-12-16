import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Filled_LikeIcon from "../assets/Products/Filled_likeIcon.png";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";



import AddToCartButton from "../components/AddToCartButton";
import LikeButton from "../components/LikeButton";
import Recently_Viewed from "../components/Recently-Viewed";
import OutOfStockModal from "../components/OutOfStockModal";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { AppContext } from "../context/AppContext";

function Favourites() {
  const { pathname } = useLocation();
  console.log(pathname);
  const isVisible = pathname === "/profile";

  const initialProducts = [];

  const [products, setProducts] = useState(initialProducts);
  // const [favorites, setFavorites] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const { wishlistItems, removeFromWishlist, colorAssets, addToWishlist } = useContext(AppContext);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const likedProducts = products.filter((p) => p.liked);
  useEffect(() => {
    localStorage.setItem(
      "hasFavourites",
      likedProducts.length > 0 ? "true" : "false"
    );
  }, [likedProducts]);

  console.log(wishlistItems);

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
  }, [wishlistItems]);

  const handleOutOfStockClick = () => {
    setShowOutStockModal(true);
  };

  const handleRestockClick = () => {
    setShowRestockModal(true);
  };


  console.log("wishlistItems", wishlistItems);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="bg-[#FFF5E8] py-[70px]">
        <div className="max-w-[1300px] mx-auto px-2">
          <h1
            className={
              isVisible
                ? "hidden"
                : "font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left"
            }
          >
            Your Favourites
          </h1>

          {wishlistItems.length === 0 ? (
            <Link to="/products/womens">
              <p className="text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
                No items yet. Find something you'll love
              </p>
            </Link>
          ) : (
            <div
              className={
                isVisible
                  ? "grid grid-cols-2 lg:grid-cols-3 gap-[15px] px-2 sm:gap-[25px]"
                  : "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]"
              }
            >
              {wishlistItems?.map((item) => {

                const isOutOfStock = item?.inventoryQuantity === 0 || item?.variants?.[0]?.inventoryQuantity === 0;
                const isRestocking = false;
                return (
                  <div>
                    <Link
                      key={item.id}
                      to={`/product_description/${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      state={!isOutOfStock && !isRestocking ? { product: item } : {}}
                      className="font-poppins w-[170px] sm:w-[310px] mx-auto relative hover:scale-105 transition duration-300 ease-in-out group z-0"
                      onClick={
                        isOutOfStock
                          ? handleOutOfStockClick
                          : isRestocking
                            ? handleRestockClick
                            : undefined
                      }
                    >
                      {/* IMAGE */}
                      <div className="overflow-hidden rounded-2xl relative ">
                        {item.images ?
                          <Swiper>
                            {(item?.variants?.map(v => v?.image) || item?.images)?.map((item, i) => (
                              <SwiperSlide>
                                <img src={item} alt="images" className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-[0.6]" : ""
                                  } ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`} />
                              </SwiperSlide>
                            ))}
                          </Swiper> :

                          <img src={item.image} alt="images" className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "opacity-[0.6]" : ""
                            } ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`} />
                        }

                        {/* SOLD OUT LABEL */}
                        {item.isOutOfStock && (
                          <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                            Sold Out
                          </p>
                        )}

                        {/* RESTOCK SOON LABEL */}
                        {!item.isOutOfStock && item.isRestocking && (
                          <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                            Restocking Soon
                          </p>
                        )}

                        {/* <LikeButton
                            liked={item.liked}
                            isOutOfStock={isOutOfStock}
                            isRestocking={isRestocking}
                            onToggle={() => toggleLike(item.productId, item.variantId)} 
                          /> */}
                        <button className="w-[40px] h-[40px] absolute top-3 right-3 z-10 transition-opacity duration-300 ease-in-out focus:outline-none lg:opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.preventDefault();
                            setProductToDelete(item);
                            setIsDeleteModalOpen(true);
                          }}>
                          <img src={Filled_LikeIcon} alt="liked_icon" />
                        </button>
                      </div>

                      {/* DETAILS */}
                      <div className="mt-2 flex flex-wrap justify-between sm:my-4">
                        <div>
                          <h1 className="font-poppins text-[12px] font-semibold sm:text-[18px] text-wrap text-[#313131]">
                            {item?.title}
                          </h1>
                        </div>

                        <div className="mt-1.3 flex flex-col sm:flex-row gap-y-2 items-start sm:items-center sm:justify-between w-full">
                          <h3 className="font-poppins text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                            ₹{" "}
                            {item?.variants != null && item?.variants?.inventoryQuantity !== 0
                              ? parseInt(item.variants?.[0]?.price).toLocaleString(
                                "en-IN"
                              )
                              : parseInt(item.price).toLocaleString("en-in")}
                          </h3>

                          {/*  COLOR TOGGLE BUTTONS */}
                          <div className="flex flex-row items-center gap-x-1">
                            {Object.values(colorAssets).map((i) => (
                              <img src={i} alt="color_assets" className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] p-[0.5px] hover:border-2 rounded-full border-primary" />
                            ))}
                          </div>
                        </div>
                      </div>

                    </Link >
                    <AddToCartButton
                      productToCart={item}
                      isOutOfStock={item.isOutOfStock}
                      isRestocking={item.isRestocking}
                      isFavouritesPage={true}
                    />

                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* <div className={isVisible ? "hidden" : "block"}>
          <Recently_Viewed />
        </div> */}
      </div >
      <OutOfStockModal
        open={showOutStockModal}
        onClose={() => setShowOutStockModal(false)}
      />

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

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Remove Item"
        message="Are you sure you want to remove this product from your cart?"
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={() => {
          if (productToDelete) {
            removeFromWishlist(productToDelete.variantId);
          }
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
      />
    </>
  );
}

export default Favourites;

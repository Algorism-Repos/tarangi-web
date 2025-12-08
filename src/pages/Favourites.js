import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";

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
  const [favorites, setFavorites] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const { wishlistItems, removeFromWishlist } = useContext(AppContext);
  const likedProducts = products.filter((p) => p.liked);
  useEffect(() => {
    localStorage.setItem(
      "hasFavourites",
      likedProducts.length > 0 ? "true" : "false"
    );
  }, [likedProducts]);

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
            <Link to ="/products/womens">
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
              {wishlistItems.map((item) => (
                    <Link
                      to={`/product_description/${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      state={{ product: item }}
                    >
                <div key={item.id} className="max-w-[304px] mx-auto group">
                  <div
                    // onClick={() => handleProductClick(item)}
                    className="cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-2xl relative">
                      <img
                        className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] ${item.isOutOfStock ? "grayscale" : ""
                          } ${item.isRestocking ? "opacity-50" : ""
                          }  transition-all duration-300 group-hover:scale-105`}
                        src={item.image||item.images[0]}
                        alt={item.title}
                      />

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
                        isOutOfStock={item.isOutOfStock}
                        isRestocking={item.isRestocking}
                        onToggle={() => toggleLike(item.id)}
                      /> */}
                    </div>

                    {/* DETAILS */}
                    <div className="flex justify-between items-end w-full my-3">
                      <div>
                        <p className="text-[13px] font-poppins font-semibold sm:text-[18px] text-[#313131]">
                          {item.title}
                        </p>
                        <p className="font-poppins text-[#4E4E4E] font-normal text-[16px]">
                          ₹{parseInt(item.price).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* COLOR SELECTOR */}
                      <div className="hidden sm:flex flex-row items-center gap-x-1">
                        <img src={gold_ellipse} alt="color-selector" className="w-[24px] h-[24px]" />
                        <img src={silver_ellipse} alt="color-selector" className="w-[24px] h-[24px]" />
                        <img src={brown_ellipse} alt="color-selector" className="w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>

                  <AddToCartButton
                    productToCart={item}
                    isOutOfStock={item.isOutOfStock}
                    isRestocking={item.isRestocking}
                    isFavouritesPage={true}
                  />

                  {/* <div>
                    <button
                      className="text-red-600 text-[14px] underline mt-2"
                      onClick={() => removeFromWishlist(item.variantId)}
                    >
                      Remove
                    </button>
                  </div> */}
                </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={isVisible ? "hidden" : "block"}>
          <Recently_Viewed />
        </div>
      </div>
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
    </>
  );
}

export default Favourites;

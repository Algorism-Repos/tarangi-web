import React, { useState, useEffect } from "react";
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

function Favourites() {
  const initialProducts = [
    // {
    //   id: 1,
    //   product_name: "Stone Necklace",
    //   price: "₹10,000",
    //   liked: true,
    //   isOutOfStock: false,
    //   isRestocking: true,

    //   colorImages: {
    //     gold: product_1,
    //     silver: product_2,
    //     brown: product_2,
    //   },

    //   colors: [
    //     { id: "gold", img: gold_ellipse },
    //     { id: "silver", img: silver_ellipse },
    //     { id: "brown", img: brown_ellipse },
    //   ],

    //   selectedColor: "gold",
    // },

    // {
    //   id: 2,
    //   product_name: "Stone Kada",
    //   price: "₹4,000",
    //   liked: true,
    //   isOutOfStock: false,
    //   isRestocking: false,

    //   colorImages: {
    //     gold: product_1,
    //     silver: product_2,
    //     brown: product_2,
    //   },

    //   colors: [
    //     { id: "gold", img: gold_ellipse },
    //     { id: "silver", img: silver_ellipse },
    //     { id: "brown", img: brown_ellipse },
    //   ],

    //   selectedColor: "gold",
    // },

    // {
    //   id: 3,
    //   product_name: "Stone Kada",
    //   price: "₹4,000",
    //   liked: true,
    //   isOutOfStock: true,
    //   isRestocking: false,

    //   colorImages: {
    //     gold: product_1,
    //     silver: product_2,
    //     brown: product_2,
    //   },

    //   colors: [
    //     { id: "gold", img: gold_ellipse },
    //     { id: "silver", img: silver_ellipse },
    //     { id: "brown", img: brown_ellipse },
    //   ],

    //   selectedColor: "gold",
    // },

    // {
    //   id: 4,
    //   product_name: "Stone Kada",
    //   price: "₹4,000",
    //   liked: true,
    //   isOutOfStock: false,
    //   isRestocking: true,

    //   colorImages: {
    //     gold: product_1,
    //     silver: product_2,
    //     brown: product_2,
    //   },

    //   colors: [
    //     { id: "gold", img: gold_ellipse },
    //     { id: "silver", img: silver_ellipse },
    //     { id: "brown", img: brown_ellipse },
    //   ],

    //   selectedColor: "gold",
    // },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [favorites, setFavorites] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);


  const handleProductClick = (item) => {
    if (item.isOutOfStock) {
      setShowOutStockModal(true);
      return;
    }

    if (item.isRestocking) {
      setShowRestockModal(true);
      return;
    }

    // Later → navigate to product page
  };

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked } : p
      )
    );
  };

  const handleColorSelect = (productId, colorId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, selectedColor: colorId } : p
      )
    );
  };

  const likedProducts = products.filter((p) => p.liked);

  const handleRemove = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: false } : item
      )
    );
  };



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
      <div className="bg-light-sandal py-[70px]">
        <div className="max-w-[1300px] mx-auto px-2">
          <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
            Your Favourites
          </h1>

          {likedProducts.length === 0 ? (
            <p className="text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
              No Products in the favourites page
            </p>
          ) : (

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
              {likedProducts.map((item) => (

                <div key={item.id} className="max-w-[304px] mx-auto group">
                  <div
                    onClick={() => handleProductClick(item)}
                    className="cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-2xl relative">
                      <img
                        className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] ${item.isOutOfStock ? "grayscale" : ""
                          } ${item.isRestocking ? "opacity-50" : ""
                          }  transition-all duration-300 group-hover:scale-105`}
                        src={item.colorImages[item.selectedColor]}
                        alt={item.product_name}
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

                      <LikeButton
                        liked={item.liked}
                        isOutOfStock={item.isOutOfStock}
                        isRestocking={item.isRestocking}
                        onToggle={() => toggleLike(item.id)}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex justify-between items-center w-full my-3">
                      <div>
                        <p className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                          {item.product_name}
                        </p>
                        <p className="text-[#4E4E4E] font-semibold text-[16px]">
                          {item.price}
                        </p>
                      </div>


                      {/* COLOR SELECTOR */}
                      <div className="flex gap-x-2.5">
                        {item.colors.map((color) => (
                          <img
                            key={color.id}
                            src={color.img}
                            onClick={() =>
                              handleColorSelect(item.id, color.id)
                            }
                            className={`w-[20px] sm:w-[24px] rounded-full cursor-pointer transition-all ${item.selectedColor === color.id
                              ? "border-2 border-primary p-[2px]"
                              : "border bg-white"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <AddToCartButton
                    isOutOfStock={item.isOutOfStock}
                    isRestocking={item.isRestocking}
                    isFavouritesPage={true}
                    onRemoveFromFavourites={() => handleRemove(item.id)}
                  />



                </div>

              ))}
            </div>
          )}
        </div>

        <Recently_Viewed />
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

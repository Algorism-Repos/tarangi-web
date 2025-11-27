// src/pages/FavouritesSection.jsx
import React from "react";

import AddToCartButton from "../components/AddToCartButton";
import LikeButton from "../components/LikeButton";
import OutOfStockModal from "../components/OutOfStockModal";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";

const FavouritesSection = ({
  likedProducts,
  handleProductClick,
  toggleLike,
  handleColorSelect,
  handleRemove,
  showOutStockModal,
  setShowOutStockModal,
  showRestockModal,
  setShowRestockModal,
  showRestockSuccess,
  setShowRestockSuccess,
}) => {
  return (
    <>
      <div>
        {likedProducts.length === 0 ? (
          <p className="text-center text-[14px] text-[#4B0010] mt-6 font-poppins">
            No Products in the favourites page
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full overflow-visible relative">
            {likedProducts.map((item) => (
              <div
                key={item.id}
                className="max-w-[304px] flex flex-wrap gap-x-10 mx-auto items-center group relative"
              >
                {/* IMAGE CARD */}
                <div
                  onClick={() => handleProductClick(item)}
                  className="overflow-hidden rounded-2xl relative "
                >
                  <img
                    src={item.colorImages[item.selectedColor]}
                    className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] object-cover rounded-[16px]${
                      item.isOutOfStock ? " grayscale" : ""
                    } ${
                      item.isRestocking ? "opacity-50" : ""
                    }  transition-all duration-300 group-hover:scale-105`}
                  />

                  {/* LABEL */}
                  {item.isOutOfStock ? (
                    <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                      Sold Out
                    </p>
                  ) : item.isRestocking ? (
                    <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                      Restocking Soon
                    </p>
                  ) : null}

                  {/* HEART BUTTON */}
                  <div>
                    <LikeButton
                      liked={item.liked}
                      isOutOfStock={item.isOutOfStock}
                      isRestocking={item.isRestocking}
                      onToggle={() => toggleLike(item.id)}
                    />
                  </div>
                </div>

                {/* PRODUCT NAME + PRICE */}
                <div className="flex justify-between items-center w-full my-3 gap-x-2">
                  <div>
                    <p className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                      {item.product_name}
                    </p>
                    <p className="text-[#4E4E4E] font-semibold text-[16px]">
                      {item.price}
                    </p>
                  </div>

                  {/* COLOR OPTIONS */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex justify-center gap-x-2.5 mr-1">
                      {item.colors.map((color) => (
                        <img
                          key={color.id}
                          src={color.img}
                          onClick={() =>
                            handleColorSelect(item.id, color.id)
                          }
                          className={`w-[20px] sm:w-[24px] rounded-full cursor-pointer transition-all ${
                            item.selectedColor === color.id
                              ? "border-2 border-primary p-[2px]"
                              : "border bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
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

      {/* MODALS */}
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
};

export default FavouritesSection;

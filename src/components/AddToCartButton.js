import React, { useState } from "react";
import CartToast from "./CartToast";

import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";

import OutOfStockModal from "./OutOfStockModal";
import RestockSuccessModal from "./RestockSuccessModal";
import RestockModal from "./RestockModal";

function AddToCartButton({ 
  isOutOfStock, 
  isRestocking, 
  isFavouritesPage = false,
  onRemoveFromFavourites 
}) {

  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);
  const [showRestockModal, setShowRestockModal] = useState(false);

  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);

  const isDisabledInFavourites =
    isFavouritesPage && (isOutOfStock || isRestocking);

  const handleClick = () => {
    // If inside favourites & product unavailable → remove instead
    if (isDisabledInFavourites) {
      if (onRemoveFromFavourites) onRemoveFromFavourites();
      return;
    }

    if (isOutOfStock) {
      setShowOutStockModal(true);
      return;
    }

    if (isRestocking) {
      setShowRestockModal(true);
      return;
    }

    // Normal add to cart
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <button
        className={`cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
          w-full h-[45px] sm:h-[52px] rounded-full text-primary text-[14px] font-medium mt-2 sm:text-[16px]
          transition-all duration-300 ease-in-out 
          ${isDisabledInFavourites ? "hover:bg-[#4B001A] hover:text-white" : "hover:bg-[#4B001A] hover:text-white"}
        `}
        onMouseEnter={() =>
          !isDisabledInFavourites && setCartIconSrc(shoppingCart_white)
        }
        onMouseLeave={() =>
          !isDisabledInFavourites && setCartIconSrc(shoppingCart_red)
        }
        onClick={handleClick}
      >
        {!isDisabledInFavourites && (
          <img className="w-[26px] sm:w-[32px] sm:h-[32px]" src={cartIconSrc} alt="" />
        )}

        {isDisabledInFavourites ? "Remove from favourites" : "Add to cart"}
      </button>

      <CartToast show={showToast} onClose={() => setShowToast(false)} />

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


export default AddToCartButton;

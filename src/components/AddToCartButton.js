import React, { useContext, useState } from "react";
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";
import { AppContext } from "../context/AppContext";
import OutOfStockModal from "./OutOfStockModal";
import RestockSuccessModal from "./RestockSuccessModal";
import RestockModal from "./RestockModal";
import CartToast from "./CartToast";
import { useNavigate, useLocation } from "react-router-dom";

function AddToCartButton({
  productToCart,
  isOutOfStock,
  isRestocking,
  isFavouritesPage = false,
  onRemoveFromFavourites,
}) {
  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const{pathname} = useLocation();

  const handleAddToCart = () => {
    addToCart(productToCart);
  };

  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const isDisabledInFavourites =
    isFavouritesPage && (isOutOfStock || isRestocking);

  const handleClick = () => {
    handleAddToCart();
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/cart");
    }, 1000); // 1 seconds
    

    // If inside favourites & product unavailable → remove instead
    if (isDisabledInFavourites) {
      onRemoveFromFavourites && onRemoveFromFavourites();
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

    handleAddToCart();
  };

  return (
    <>
      <button
        className={`cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
        w-full  ${pathname === "/favourites" ? "sm:w-full mt-3 sm:mt-5 h-[39px]" : "sm:w-[205px] mt-2 h-[56px]"} sm:h-[56px] rounded-full text-primary text-[16px] font-medium 
        transition-all duration-300 hover:bg-[#4B001A] hover:text-white`}
        onMouseEnter={() => !isDisabledInFavourites && setCartIconSrc(shoppingCart_white)}
        onMouseLeave={() => !isDisabledInFavourites && setCartIconSrc(shoppingCart_red)}
        onClick={handleClick}
      >
        {!isDisabledInFavourites && (
          <img className="w-[32px] h-[32px]" src={cartIconSrc} alt="cart_icon" />
        )}

        {isDisabledInFavourites ? "Remove from favourites" : "Add to cart"}
      </button>

      {/* Toast */}
      <CartToast show={showToast} onClose={() => setShowToast(false)} />

      {/* Out of stock */}
      <OutOfStockModal
        open={showOutStockModal}
        onClose={() => setShowOutStockModal(false)}
      />

      {/* Restock */}
      <RestockModal
        open={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        onSuccess={() => {
          setShowRestockModal(false);
          setShowRestockSuccess(true);
        }}
      />

      {/* Restock success */}
      <RestockSuccessModal
        open={showRestockSuccess}
        onClose={() => setShowRestockSuccess(false)}
      />
    </>
  );
}

export default AddToCartButton;

import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";
import { AppContext } from "../context/AppContext";
import OutOfStockModal from "./OutOfStockModal";
import RestockSuccessModal from "./RestockSuccessModal";
import RestockModal from "./RestockModal";
import CartToast from "./CartToast";
function AddToCartButton({
  productToCart,
  isOutOfStock,
  isRestocking,
  isFavouritesPage = false,
  onRemoveFromFavourites,
}) {
  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const { addToCart } = useContext(AppContext);
  const isDisabledInFavourites =
    isFavouritesPage && (isOutOfStock || isRestocking);
  console.log(productToCart);

  const{pathname} = useLocation();

  const handleAddToCart = () => {
    addToCart(productToCart);
    setShowToast(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setShowToast(false);
      document.body.style.overflow = "auto";
    }, 1500);
  };
  const handleClick = (e) => {
    e.preventDefault();
    handleAddToCart();

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
  };
  return (
    <>
      <button
        className={`cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
        ${pathname === "/favourites" ? "w-full h-[56px]" :"w-full h-[40px] sm:w-[205px] sm:h-[56px]"} rounded-full text-primary text-[16px] font-medium mt-2
        transition-all duration-300 hover:bg-[#4B001A] hover:text-white`}
        onMouseEnter={() => !isDisabledInFavourites && setCartIconSrc(shoppingCart_white)}
        onMouseLeave={() => !isDisabledInFavourites && setCartIconSrc(shoppingCart_red)}
        onClick={handleClick}
      >
        {!isDisabledInFavourites && (
          <img className="w-[32px] h-[32px]" src={cartIconSrc} alt="cart icon" />
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
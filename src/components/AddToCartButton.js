import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";
import { AppContext } from "../context/AppContext";
import cartIcon from "../assets/Products/Check.png";
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/backgrounds/flower_bg.png";
import OutOfStockModal from "./OutOfStockModal";
import RestockSuccessModal from "./RestockSuccessModal";
import RestockModal from "./RestockModal";
import CartToast from "./CartToast";

function AddToCartButton({
  productToCart,
  quantity,
  isOutOfStock,
  isRestocking,
  isFavouritesPage = false,
  onRemoveFromFavourites,
}) {
  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(productToCart);

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
    // setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <button
        className={`cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
          w-full sm:w-[205px] h-[56px] rounded-full text-primary text-[16px] font-medium mt-2
          transition-all duration-300 ease-in-out 
          ${isDisabledInFavourites
            ? "hover:bg-[#4B001A] hover:text-white"
            : "hover:bg-[#4B001A] hover:text-white"
          }
        `}
        onMouseEnter={() =>
          !isDisabledInFavourites && setCartIconSrc(shoppingCart_white)
        }
        onMouseLeave={() =>
          !isDisabledInFavourites && setCartIconSrc(shoppingCart_red)
        }
        onClick={handleClick}
      // onClick={handleAddToCart}
      >
        {!isDisabledInFavourites && (
          <img className="w-[32px] h-[32px]" src={cartIconSrc} alt="" />
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

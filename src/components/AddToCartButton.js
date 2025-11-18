import React, { useState } from "react";
import CartToast from "./CartToast";

import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";

function AddToCartButton() {
  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);

  const handleClick = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        className="cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
        w-full h-[52px] rounded-full text-primary text-[16px] font-medium mt-2
        transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
        onMouseEnter={() => setCartIconSrc(shoppingCart_white)}
        onMouseLeave={() => setCartIconSrc(shoppingCart_red)}
        onClick={handleClick}
      >
        <img className="w-[32px] h-[32px]" src={cartIconSrc} alt="" />
        Add to cart
      </button>

      {/* Toast */}
      <CartToast show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

export default AddToCartButton;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";

import cartIcon from "../assets/Products/Check.png";
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/backgrounds/flower_bg.png";

function AddToCartButton({ product }) {
  const [showToast, setShowToast] = useState(false);
  const [cartIconSrc, setCartIconSrc] = useState(shoppingCart_red);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      {/* Add to Cart Button */}
      <button
        className="cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A]
        w-full h-[50px] rounded-full text-primary text-[16px] font-medium mt-2 
        transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
        onMouseEnter={() => setCartIconSrc(shoppingCart_white)}
        onMouseLeave={() => setCartIconSrc(shoppingCart_red)}
        onClick={handleClick}
      >
        <img className="w-[32px] h-[32px]" src={cartIconSrc} alt="cart_icon" />
        Add to cart
      </button>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.7 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 z-[9999]"
          >
            <div className="relative w-[90vw] max-w-[540px] h-[92px] bg-[#F9C892] 
              rounded-[16px] shadow-lg flex items-center px-6 py-4 overflow-hidden">

              {/* Background Flower */}
              <div className="absolute -left-1 z-0 ">
                <img src={flowerBg} className="w-[100px] h-[100px]" />
              </div>

              {/* Check Icon */}
              <div className="relative z-10 w-[46px] h-[46px] mr-3 flex items-center justify-center">
                <img src={cartIcon} className="w-[52px] h-[52px]" />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-[#2B2B2B] text-[20px] font-semibold">Hooray!</h3>
                <p className="text-[#502F07] text-[14px]">Added to your cart successfully</p>
              </div>

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 z-10"
                onClick={() => setShowToast(false)}
              >
                <img src={closeIcon} className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddToCartButton;

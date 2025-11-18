import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import heartIcon from "../assets/heart_icon.png";   // your wishlist icon
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/PinkFlower.png";

function Wishlist_Popup({ show, onClose }) {

  // Auto close after 2 seconds
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // disable scroll

      const timer = setTimeout(() => {
        onClose();
        document.body.style.overflow = "auto"; // enable scroll
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs bg-black/50"
        >
          <div className="relative w-[90vw] max-w-[540px] h-[92px] bg-[#F0C4CA] rounded-[16px] shadow-lg flex items-center px-6 py-4 overflow-hidden">

            {/* BG Flower */}
            <div className="absolute left-0 z-0">
              <img src={flowerBg} className="w-[100px] h-[100px]" alt="bg" />
            </div>

            {/* Icon */}
            <div className="relative z-10 w-[52px] h-[52px] mr-4 flex items-center justify-center">
              <img src={heartIcon} alt="wishlist" className="w-[52px] h-[52px]" />
            </div>

            {/* Text */}
            <div className="relative z-10">
              <h3 className="text-[#2B2B2B] text-[20px] font-semibold leading-none">
                Added to Wishlist
              </h3>
              <p className="text-[#67171F] font-poppins text-[14px] mt-1">
                Your item has been saved for later.
              </p>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10"
              onClick={() => {
                onClose();
                document.body.style.overflow = "auto";
              }}
            >
              <img src={closeIcon} className="w-[25px] h-[25px]" alt="close" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Wishlist_Popup;

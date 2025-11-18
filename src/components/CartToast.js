import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import cartIcon from "../assets/Products/Check.png";
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/backgrounds/flower_bg.png";

export default function CartToast({ show, onClose }) {
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
          <div className="relative w-[90vw] max-w-[520px] bg-[#F3B977] rounded-[16px]
               shadow-[0px_4px_20px_rgba(0,0,0,0.15)] flex items-center px-6 py-4 overflow-hidden">

            {/* Background Flower */}
            <img
              src={flowerBg}
              className="absolute left-0 opacity-60 w-[110px] h-[110px]"
              alt=""
            />

            {/* Check Icon */}
            <img
              src={cartIcon}
              className="relative z-10 w-[42px] h-[42px] mr-3"
              alt=""
            />

            {/* Text */}
            <div className="relative z-10">
              <h3 className="text-[#4B001A] text-[18px] font-poppins font-semibold">
                Hooray!
              </h3>
              <p className="text-[#4B001A] font-medium font-poppins text-[14px]">
                Added to your cart successfully
              </p>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10"
              onClick={onClose}
            >
              <img src={closeIcon} className="w-[25px] h-[25px]" alt="" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

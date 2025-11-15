import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import exclamationmark from "../assets/exclamation_mark.png";
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/PinkFlower.png";

function Error_Popup({ show, onClose }) {
  
  const handleClick = () => {
  setShowToast(true);

  // Disable page scroll
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    setShowToast(false);
    document.body.style.overflow = "auto"; // Enable scroll again
  }, 2000); // 2 seconds
};
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.7 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-transparent"
        >
          <div className="relative w-[90vw] max-w-[540px] h-[92px] bg-[#F0C4CA] rounded-[16px] shadow-lg flex items-center px-6 py-4 overflow-hidden">

            {/* Flower BG */}
            <div className="absolute left-0 z-0">
              <img src={flowerBg} className="w-[100px] h-[100px]" alt="bg" />
            </div>

            {/* Icon */}
            <div className="relative z-10 w-[52px] h-[52px] mr-4 flex items-center justify-center">
              <img src={exclamationmark} alt="error" className="w-[52px] h-[52px]" />
            </div>

            {/* Text */}
            <div className="relative z-10">
              <h3 className="text-[#2B2B2B] text-[20px] font-semibold leading-none">
                Oh No!
              </h3>
              <p className="text-[#67171F] font-poppins text-[14px] mt-1">
                Something went wrong. Please try again.
              </p>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10"
              onClick={() => {
                setShowToast(false);
                document.body.style.overflow = "unset"; // restore scroll
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

export default Error_Popup;

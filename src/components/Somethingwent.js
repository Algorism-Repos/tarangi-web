import React from "react";
import cartIcon from "../assets/something_went_wrong.png";
import closeIcon from "../assets/Close.png";
import flowerBg from "../assets/PinkFlower.png";

function SomethingWentWrong({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed  left-1/2 -translate-x-1/2 z-[9999] animate-fade-in">
      <div className="relative w-[90vw] max-w-[540px] h-[92px] 
                      bg-[#F0C4CA] rounded-[16px] shadow-lg 
                      flex items-center px-6 py-4 overflow-visible">

        {/* Flower BG */}
        <div className="absolute -left-1 z-0">
          <img src={flowerBg} className="w-[100px] h-[100px]" alt="bg"/>
        </div>

        {/* Error Icon Circle */}
        <div className="relative z-10 w-[46px] h-[46px] mr-4 flex items-center justify-center 
                        bg-[#4B001A] rounded-full">
          <img src={cartIcon} alt="error" className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="relative z-10">
          <h3 className="text-[#2B2B2B] text-[20px] font-semibold leading-none">
            Oh No!
          </h3>
          <p className="text-[#67171F] text-[14px] mt-1">
            Something went wrong. Please try again.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 z-10"
        >
          <img src={closeIcon} className="w-5 h-5" alt="close" />
        </button>
      </div>
    </div>
  );
}

export default SomethingWentWrong;

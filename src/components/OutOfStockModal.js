import React, { useEffect } from "react";
import closeIcon from "../assets/Close_brown_small.png";


function OutOfStockModal({ open, onClose }) {
   useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF5E8] px-6 py-4 rounded-xl shadow-xl text-center w-[80%] sm:w-[350px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[20px] font-semibold text-[#434343]">
          Product Out of Stock
        </h2>
        <p className="text-[#67171F] text-[14px] mt-2">
          This product is currently unavailable.
        </p>

            <button
              className="absolute top-3 right-3 z-10"
              onClick={onClose}
            >
              <img src={closeIcon} className="w-[25px] h-[25px]" alt="" />
            </button>
      </div>
    </div>
  );
}

export default OutOfStockModal;

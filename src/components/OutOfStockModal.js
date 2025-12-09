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
        className="bg-[#FFF5E8] p-7 rounded-xl shadow-xl text-center w-[80%] sm:w-[400px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-red-500 text-[18px] font-poppins font-medium capitalize my-3">
          This product is currently unavailable.
        </h1>

            <button
              className="absolute top-3 right-2 z-10"
              onClick={onClose}
            >
              <img src={closeIcon} className="w-[25px] h-[25px]" alt="" />
            </button>
      </div>
    </div>
  );
}

export default OutOfStockModal;

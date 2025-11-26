import React, { useEffect } from "react";
import closeIcon from "../assets/Close_brown_small.png";

const Modal = ({
  isOpen,
  onCancel,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = null, 
}) => {
  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen ,]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#FFF5EA] rounded-[18px] p-6 shadow-lg max-w-[375px] mx-auto"
      >
        {/* Icon (optional) */}
        {icon && (
          <div className="flex justify-center mb-3">
            <img src={icon} alt="icon" className="w-[39px] h-[39px]" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-center text-[#434343] text-[16px] font-semibold mb-2 font-poppins">
          {title}
        </h3>

        {/* Message */}
        <p className="text-center text-[#67171F] font-medium text-[14px] mb-5">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onConfirm}
            className="border border-[#5A0010] bg-[#5A0010]  text-white px-6 py-2 rounded-full text-[14px] font-medium w-[130px]"
          >
            {confirmText}
          </button>

          <button
            onClick={onCancel}
            className="border border-[#5A0010] hover:bg-[#5A0010] text-[#5A0010] hover:text-white px-6 py-2 rounded-full text-[14px] font-medium w-[130px]"
          >
            {cancelText}
          </button>
          
            <button
              className="absolute top-3 right-3 z-10"
              onClick={onCancel}
            >
              <img src={closeIcon} className="w-[25px] h-[25px]" alt="" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

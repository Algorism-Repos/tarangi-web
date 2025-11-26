import React, { useEffect } from "react";
import { motion } from "framer-motion";
import checkIcon from "../assets/Check.png";
import toastbg from "../assets/backgrounds/Toast.png";

function RestockSuccessModal({ open, onClose }) {

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="px-6 py-6 rounded-xl shadow-xl text-center w-[80%] sm:w-[360px] bg-cover bg-center"
        style={{ backgroundImage: `url(${toastbg})` }}
      >
        <img src={checkIcon} className="w-[65px] mx-auto" alt="success" />

        <h2 className="text-[18px] font-semibold text-[#2B2B2B] mt-3">
          Thank you
        </h2>

        <p className="text-[#318C66] text-[14px] font-medium mt-1">
          We will get back to you once the product is back in stock.
        </p>
      </motion.div>
    </div>
  );
}

export default RestockSuccessModal;

import React, { useEffect } from "react";
import closeIcon from "../assets/Close_brown_small.png";
import { useFormik } from "formik";
import * as Yup from "yup";

function RestockModal({ open, onClose, onSuccess }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      // log to console
      console.log("Restock request:", values);
      // call success callback
      onSuccess();
    },
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null; // AFTER hooks

  // sanitize contact input to numbers only
  const handleContactChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10); // max 10 digits
    formik.setFieldValue("contact", digitsOnly);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF5E8] px-6 py-6 rounded-xl shadow-xl text-center w-[80%] sm:w-[360px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-[20px] font-semibold text-[#434343]">
          Restocking Soon
        </h2>
        <p className="text-[#67171F] text-[14px] mt-1">
          Enter your details to be notified when this product is restocked.
        </p>

        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <img src={closeIcon} className="w-[24px] h-[24px]" alt="close" />
        </button>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="mt-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-1 py-2 rounded-lg border border-[#AA8B6F] bg-white text-[#4A4032] focus:outline-none placeholder:text-[14px] placeholder-[#979797] placeholder:font-normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
          )}

          {/* Contact (numbers only) */}
          <input
            type="tel"
            name="contact"
            placeholder="Phone Number"
            inputMode="numeric"
            maxLength={10}
            className="w-full px-1 py-2 rounded-lg border border-[#AA8B6F] bg-white text-[#4A4032] mt-3 focus:outline-none placeholder:text-[14px] placeholder-[#979797] placeholder:font-normal"
            value={formik.values.contact}
            onChange={handleContactChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.contact && formik.touched.contact && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.contact}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-[#4B001A] text-white rounded-lg font-semibold shadow hover:opacity-90"
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestockModal;

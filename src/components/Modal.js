import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

//assets import
import close_icon from "../assets/close_icon.png";
import completed_illustration from "../assets/completed_illustration.png";

function Modal({ modal, active, productName }) {
  const [showModal, setshowModal] = useState("form");

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is Required"),
    phone: Yup.string()
      .required("Phone Number is Required")
      .matches(/^[0-9]+$/, "Invalid Phone Number")
      .length(10, "Invalid Phone Number"),
    product: Yup.string().required("Please enter a Product"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      product: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleGSheet(values);
      setshowModal("thankyou");
      setTimeout(() => {
        active();
        setshowModal("form");
        formik.resetForm();
      }, 3000);
    },
  });

  // ✅ Sync productName prop with Formik values
  useEffect(() => {
    if (productName) {
      formik.setFieldValue("product", productName);
    } else {
      formik.setFieldValue("product", "");
    }
  }, [productName]);

  const handleGSheet = (values) => {
    console.log("Submitting to GSheet", values);

    const url =
      "https://script.google.com/macros/s/AKfycbyLu_paGx69o9r0gR8ixKCVQeU0B85xk1oT0Rz9FFpgYguE5e5iiUW_BqvxoNnbP-Td/exec";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(values).toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <>
      <div
        className={
          modal === true
            ? "bg-black bg-opacity-70 inset-0 fixed z-50 w-full h-full flex px-4 flex-col items-center justify-center"
            : "hidden"
        }
      >
        <div className="bg-secondary p-7 rounded-lg relative w-full sm:w-[393px]">
          <img
            src={close_icon}
            alt="close-icon"
            className="w-[29px] h-[29px] absolute top-3 right-3 cursor-pointer"
            onClick={() => {
              active();
              formik.resetForm();
            }}
          />

          <h4 className="font-poppins text-center text-[#28040E] text-[18px] font-normal leading-normal mt-5">
            {showModal === "form"
              ? "Please fill out this form. We will get in touch with you soon."
              : "Your enquiry has been submitted successfully!"}
          </h4>

          <form
            onSubmit={formik.handleSubmit}
            className={showModal === "form" ? "block" : "hidden"}
          >
            <div className="flex flex-col items-center gap-y-5 max-w-[317px] mx-auto mt-7">
              {/* Name */}
              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Name
                </label>
                <input
                  className="input-box"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formik.touched.name && formik.errors.name}
                </h4>
              </div>

              {/* Phone */}
              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Phone Number
                </label>
                <input
                  className="input-box"
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="+91 00000 00000"
                  value={formik.values.phone}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formik.touched.phone && formik.errors.phone}
                </h4>
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  E-mail
                </label>
                <input
                  className="input-box"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formik.touched.email && formik.errors.email}
                </h4>
              </div>

              {/* Product */}
              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Products interested in
                </label>
                <input
                  className="input-box"
                  name="product"
                  type="text"
                  disabled={productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.product}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formik.touched.product && formik.errors.product}
                </h4>
              </div>

              <button
                type="submit"
                className="bg-[#4B001A] w-[184px] rounded-[93px] font-[poppins] text-[20px] text-white font-normal leading-normal px-[26px] py-[16px]"
              >
                Submit
              </button>
            </div>
          </form>

          <img
            src={completed_illustration}
            alt="Illustration"
            className={showModal !== "form" ? "block" : "hidden"}
          />
        </div>
      </div>
    </>
  );
}

export default Modal;


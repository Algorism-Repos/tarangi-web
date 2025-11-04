import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import product images
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import truck_icon from "../assets/truck_icon.png";
import LineImg from "../assets/line1.png";
function Paymentpage() {
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const orderItems = [
    {
      product_img: product_1,
      alt: "Stone Necklace - Silver",
      product_name: "Stone Necklace - Silver",
      quantity: 1,
      price: 10000,
    },
    {
      product_img: product_2,
      alt: "Silver Kada",
      product_name: "Silver Kada",
      quantity: 1,
      price: 4000,
    },
    {
      product_img: product_1,
      alt: "Silver Cleaning Kit",
      product_name: "Silver Cleaning Kit",
      quantity: 1,
      price: 0,
      free: true,
    },

  ];

  const subTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 800;
  const shipping = 0;
  const total = subTotal + tax + shipping;

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    // email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    landmark: Yup.string(),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN")
      .required("Pincode is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  // Formik Setup 
  const formik = useFormik({
    initialValues: {
    
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen bg-[#FFF5E8] text-[#979797] text-sm font-poppins overflow-x-hidden px-3 sm:px-6">
      <div className="max-w-[1110px] mx-auto py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between relative px-4 sm:px-6 md:px-8 lg:px-12 py-2">
        {/* Go Back */}
        <div className="flex items-center gap-1 text-[#6E0027] text-sm sm:text-base font-semibold cursor-pointer">
            <span className="text-lg sm:text-xl leading-none">‹</span>
            <span className="truncate">Go Back</span>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-9 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
            <span className="font-medium text-[#6E0027] pb-1">
            Address
            </span>
            <img
              src={LineImg}
              alt="progress line"
              className="w-10 sm:w-14 md:w-16 object-contain"
            />
            <span className="font-medium text-[#6E0027]   pb-1">Payment</span>
        </div>
        </div>



        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT FORM */}
          <div className="col-span-12 lg:col-span-8">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-#FFF5E8] rounded-xl  p-4 sm:p-6 space-y-6"
            >
              {/* === CONTACT DETAILS === */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-[#6E0027]">Contact Details</h2>


                {/* First and Last Name */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                        formik.errors.firstName && formik.touched.firstName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="First Name"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                        formik.errors.lastName && formik.touched.lastName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="Last Name"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <div
                    className={`flex items-center w-full h-[44px] px-3 border rounded-md text-sm bg-white ${
                      formik.errors.mobile && formik.touched.mobile
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }`}
                  >
                    <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
                      IN +91
                    </span>
                    <span className="h-5 w-px bg-gray-300 mr-2"></span>
                    <input
                      type="text"
                      name="mobile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      placeholder="Mobile Number"
                      className="flex-1 bg-transparent focus:outline-none placeholder-[#979797]"
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.mobile}</p>
                  )}
                </div>
              </section>

              {/* === SHIPPING ADDRESS === */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-[#6E0027]">Shipping Address</h3>

                {/* Address */}
                <div>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                      formik.errors.address && formik.touched.address
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }`}
                    placeholder="Address line"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.address}</p>
                  )}
                </div>

                {/* Landmark */}
                <div>
                  <input
                    name="landmark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.landmark}
                    className="w-full h-[44px] px-3 border border-[#efe6e6] rounded-md text-sm placeholder-[#979797]"
                    placeholder="Landmark (Optional)"
                  />
                </div>

                {/* City, PIN, State, Country */}
                <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3">
                  <div className="flex-1 min-w-[45%]">
                    <input
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                        formik.errors.city && formik.touched.city
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="City"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.city}</p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <input
                      name="pincode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pincode}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                        formik.errors.pincode && formik.touched.pincode
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="PIN"
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.pincode}</p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <select
                      name="state"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                        formik.errors.state && formik.touched.state
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                    >
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                    {formik.touched.state && formik.errors.state && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.state}</p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <select
                      name="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      className="w-full h-[44px] px-3 border border-[#efe6e6] rounded-md text-sm"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </section>
              {/* === Gift wrap + Note + Terms === */} 
              <section className="space-y-4">
                 <div className="flex items-start gap-3">
                     <input type="checkbox" className="w-4 h-4 accent-[#6E0027] " /> 
                     <p className="text-sm text-[#313131]">Add gift wrap for ₹50</p> 
                     </div> 
                     <div> 
                        <label className="text-sm block mb-1 text-[#6E0027]">Order Note</label>
                         <textarea className="w-full min-h-[110px] p-3 border border-[#efe6e6] rounded-md text-sm" placeholder="Leave a note for special requests or instructions" /> 
                         </div>

                        <div className="flex flex-col gap-1 bg-[#FFF5EE] p-3 rounded-md">
                          <p className="text-xs text-[#6B6B6B] font-medium">T&C Checkbox</p>

                          <label className="flex items-center gap-2 text-sm text-[#313131]">
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-[#6E0027] cursor-pointer"
                              required
                            />
                            <p>I agree to the Terms & Conditions and Jewel Care Instructions.</p>
                          </label>
                        </div>


                <button
                  type="submit" 
                  className="w-full h-12 rounded-full bg-[#4B001A] text-white text-[18px] font-normal hover:bg-[#6E0027]"
                >
                  Save and Continue
                </button>
              </section>
            </form>
          </div>

          {/* Right Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="w-full bg-white rounded-[10px] shadow-md border border-[#EDEDED] p-5">
              <h3 className="font-semibold mb-4 text-base text-[#313131]">Order Summary</h3>

              <div className="space-y-4">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md border border-[#f2eaea] overflow-hidden">
                      <img src={item.product_img} alt={item.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#6F6F6F]">{item.product_name}</div>
                      <div className="text-xs text-[#6F6F6F]">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm text-[#313131] font-semibold">
                      {item.free ? "Free" : `₹${item.price.toLocaleString()}`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  max-w-[205px] max-h-[24px] items-center gap-2 text-xs  text-[#A84C32] bg-[#FDE7E7] rounded-md px-3 py-2 mt-5">
                <img src={truck_icon} alt="truck icon" className="w-4 h-4 object-contain" />
                <span>Est. delivery by 22 Oct</span>
              </div>

              <div className="border-t border-[#EDEDED] my-4" />

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#F55A5A]">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-[#EDEDED] my-3" />
                <div className="flex justify-between text-base font-semibold text-[#1E1E1E]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentpage;

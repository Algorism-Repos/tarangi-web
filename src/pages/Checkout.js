import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


// Import product images
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import truck_icon from "../assets/truck_icon.png";
import LineImg from "../assets/line.png";
import red_arrow from '../assets/Products/down_arrow_red.png'

function CheckoutPage() {
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const navigate = useNavigate();

  // Order Items
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
  const [showSummary, setShowSummary] = useState(false);


  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
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
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),

  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
      terms: false,
    },
    validationSchema,
    onSubmit: () => {
      // Navigate to payment only if form is valid
      navigate("/payment");
    },
  });

  return (
    <div className="min-h-screen bg-[#FFF5E8] text-[#979797]  font-poppins overflow-x-hidden px-3 sm:px-6">
      <div className="max-w-[1110px] mx-auto py-10 space-y-10 ">
        {/* Header */}
        <div className="flex  items-center  relative px-2 sm:px-4 md:px-6 lg:px-10 py-2">
                    <Link
                        to=""
                        className="flex  items-center gap-x-[6px] px-5 max-[425px]:gap-x-[4px] max-[425px]:px-4"
                    >
                        <img
                            className="w-[26px] rotate-90 max-[425px]:w-[26px]"
                            src={red_arrow}
                            alt="Arrow icon"
                        />
                        <h3 className="text-primary text-[16px] font-semibold max-[425px]:text-[16px] max-[375px]:text-[15px] hidden lg:block">
                            Go back
                        </h3>
                    </Link>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base  ">
            <span className="font-poppins text-[16px] text-[#6E0027] pb-1">Address</span>
             <img
                src={LineImg}
                alt="progress line"
                className="w-[36px] sm:w-[132px] md:w-16 object-cover"
              />
            <span className="font-poppins text-[16px] text-gray-400  pb-1">Payment</span>
          </div>
        </div>
        
        {/* ======= Mobile Order Summary Dropdown ======= */}
        <div className="block lg:hidden bg-[#FFFAF3] rounded-[10px] shadow-md border border-[#F6EFE6] mb-6">
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium  text-sm"
          >
            <span>{showSummary ? "View Order Summary" : "View Order Summary "}</span>
            <span className="font-semibold text-[#404040]">₹{total.toLocaleString()}</span>
          </button>

          {showSummary && (
            <div className="border-t border-[#FFFAF3] px-4 py-4 text-sm space-y-3 bg-[#FFFAF3] transition-all duration-300">
              {/* Order Items */}
              <div className="space-y-3">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md border border-[#f2eaea] overflow-hidden">
                      <img
                        src={item.product_img}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-[#6F6F6F]">
                        {item.product_name}
                      </div>
                      <div className="text-[12px] text-[#6F6F6F]">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-[13px] text-[#313131] font-semibold">
                      {item.free ? "Free" : `₹${item.price.toLocaleString()}`}
                    </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <div className="flex max-w-[205px] items-center gap-2 text-[12px] text-[#A84C32]  bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] rounded-md px-3 py-2">
                <img src={truck_icon} alt="truck icon" className="w-4 h-4 object-contain" />
                <span>Est. delivery by 22 Oct</span>
              </div>

              <div className="border-t border-[#EDEDED] my-3" />

              {/* Summary values */}
              <div className="text-[13px] space-y-2">
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
                  <span className="text-[#F55A5A]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-[#EDEDED] my-2" />
                <div className="flex justify-between text-[15px] font-semibold text-[#1E1E1E]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Form */}
          <div className="col-span-12 lg:col-span-8">
            <form onSubmit={formik.handleSubmit} className="bg-[#FFF5E8] rounded-xl  p-4 sm:p-6 space-y-6">
              {/* Contact Details */}
              <section className="space-y-4">
                <h2 className="text-lg text-[#6E0027] font-semibold">Contact Details</h2>

                <div>
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full h-[44px] px-3 rounded-md text-sm placeholder-[#979797] ${
                      formik.errors.email && formik.touched.email ? "border-red-500" : "border-[#efe6e6]"
                    }`}
                    placeholder="Email Id"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm placeholder-[#979797] ${
                        formik.errors.firstName && formik.touched.firstName ? "border-red-500" : "border-[#efe6e6]"
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
                        formik.errors.lastName && formik.touched.lastName ? "border-red-500" : "border-[#efe6e6]"
                      }`}
                      placeholder="Last Name"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div
                    className={`flex items-center w-full h-[44px] px-3 border rounded-md text-sm bg-white ${
                      formik.errors.mobile && formik.touched.mobile ? "border-red-500" : "border-[#efe6e6]"
                    }`}
                  >
                    <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">IN +91</span>
                    <span className="h-5 w-px bg-gray-300 mr-2"></span>
                    <input
                      type="text"
                      name="mobile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      placeholder="Mobile Number"
                      className="flex-1 bg-transparent font-light focus:outline-none placeholder-[#979797]"
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.mobile}</p>
                  )}
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-4">
                <h3 className="text-lg text-[#6E0027] font-semibold">Shipping Address</h3>

                <div>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className={`w-full h-[44px] px-3 border rounded-md placeholder-[#979797] text-sm ${
                      formik.errors.address && formik.touched.address ? "border-red-500" : "border-[#efe6e6]"
                    }`}
                    placeholder="Address (Flat No./ House No./Street/Area))"
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
                        formik.errors.city && formik.touched.city ? "border-red-500" : "border-[#efe6e6]"
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
                        formik.errors.pincode && formik.touched.pincode ? "border-red-500" : "border-[#efe6e6]"
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
                      className={`w-full h-[44px] px-3 border rounded-md text-sm  ${
                        formik.errors.state && formik.touched.state ? "border-red-500" : "border-[#efe6e6]"
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

              {/* Gift wrap + Order note */}
              <section className="space-y-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="w-4 h-4  accent-[#6E0027]" />
                  <p className="text-sm text-[#313131]">Add gift wrap for ₹50</p>
                </div>
                <div>
                  <label className="text-sm block mb-1">Order Note</label>
                  <textarea
                    className="w-full min-h-[110px] p-3 border border-[#efe6e6] rounded-md text-sm"
                    placeholder="Leave a note for special requests or instructions"
                  />
                </div>

                {/* Terms */}
                <div className="flex flex-col gap-1 bg-[#FFF5EE] p-3 rounded-md">
                  <p className="text-xs text-[#6B6B6B] font-medium">T&C Checkbox</p>

                  <label className="flex items-center gap-2 text-sm text-[#313131]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer border-2 border-orange-500 accent-[#6E0027] rounded-sm"
                      required
                    />
                    <p>I agree to the Terms & Conditions and Jewel Care Instructions.</p>
                  </label>
                </div>

                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.terms}</p>
                )}

                {/* Proceed Button */}
                <button
                type="submit"
                className="w-full h-12 rounded-full bg-[#4B001A] text-white text-lg font-semibold hover:bg-[#6E0027]"
                >
                Proceed to Payment
                </button>
              </section>
            </form>
          </div>

          {/* Right Summary */}
          <div className="col-span-12 lg:col-span-4 hidden lg:block">
            <div className="w-full bg-[#FFFAF3] rounded-[10px] shadow-md border border-[#EDEDED] p-5">
              <h3 className="font-semibold mb-4 text-base text-[#313131]">Order Summary</h3>

              <div className="space-y-4">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-[98px] h-[101px] rounded-md border border-[#f2eaea] gap-[33px] overflow-hidden">
                      <img src={item.product_img} alt={item.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1   ">
                      <div className=" text-sm font-medium text-[#6F6F6F]">{item.product_name}</div>
                      <div className="w-[78px] text-xs text-[#6F6F6F]">Quantity: {item.quantity}</div>
                      <div className=" text-sm text-[#313131]  font-semibold">
                      {item.free  ? "Free" : `₹${item.price.toLocaleString()}`}
                    </div>
                    </div>

                  </div>
                ))}
              </div>

              <div className="flex  max-w-[205px] max-h-[24px] items-center gap-2 text-[12px]  text-[#A84C32]  bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] rounded-md px-3 py-2 mt-5">
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

export default CheckoutPage;

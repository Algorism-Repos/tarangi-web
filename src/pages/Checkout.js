import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { OpenRazorpayService } from "../utils/OpenRazorpayService";
// Import product images
import { AppContext } from "../context/AppContext";
import axios from "axios";
import truck_icon from "../assets/truck_icon.png";
import LineImg from "../assets/line.png";
import red_arrow from "../assets/Products/down_arrow_red.png";
import downArrow from "../assets/arrowDown.png";
import {
  checkOrCreateCustomer,
  FetchDeliveryByPincode,
} from "../handler/api_Handler";

function CheckoutPage() {
  const location = useLocation();
  const { subtotal, shipping, tax, total } = location.state || {};
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const navigate = useNavigate();
  const [giftWrapPrice, setGiftWrapPrice] = useState(0);
  const [orderId, setOrderId] = useState();
  const { cartItems, clearCart } = useContext(AppContext);
  const [showSummary, setShowSummary] = useState(false);
  const [formValues, setFormValues] = useState([]);
  // Yup validation schema
  const validationSchema = Yup.object({
    // Contact
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
      .required("Mobile number is required"),

    // Shipping
    address: Yup.string().required("Address is required"),
    landmark: Yup.string(),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN")
      .required("Pincode is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),

    // Billing (conditional)
    billingAddress: Yup.string().when("useDifferentBilling", {
      is: true,
      then: (schema) => schema.required("Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingLandmark: Yup.string(),
    billingCity: Yup.string().when("useDifferentBilling", {
      is: true,
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingPincode: Yup.string().when("useDifferentBilling", {
      is: true,
      then: (schema) =>
        schema
          .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN")
          .required("Pincode is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingState: Yup.string().when("useDifferentBilling", {
      is: true,
      then: (schema) => schema.required("State is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    billingCountry: Yup.string().when("useDifferentBilling", {
      is: true,
      then: (schema) => schema.required("Country is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
    useDifferentBilling: Yup.boolean(),
    addGiftWrap: Yup.boolean(),
    orderNote: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",

      // Shipping
      address: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",

      // Billing
      billingAddress: "",
      billingLandmark: "",
      billingCity: "",
      billingPincode: "",
      billingState: "",
      billingCountry: "India",

      terms: false,
      useDifferentBilling: false,
      addGiftWrap: false,
      orderNote: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setFormValues(values);
      if (!total) {
        alert("Total amount missing!");
        return;
      }
      try {
        const customerId = await checkOrCreateCustomer(values);
        console.log("Customer ID:", customerId);
        const paymentResponse = await OpenRazorpayService(formValues, total);
        if (paymentResponse.razorpay_payment_id) {
          await handlePlaceOrder(values, customerId);
        }
      } catch (error) {
        console.log("error".error);
      }
    },
  });
  console.log(formValues);
  console.log(cartItems);
  const handlePincodeCheck = async (field) => {
    console.log(field);
    const pincode = formik.values[field];
    if (!pincode || pincode.length !== 6) return;
    try {
      const response = await FetchDeliveryByPincode(pincode);
      const state = response?.CSTATE || response?.data?.CSTATE || "";
      const city = response?.CITY || response?.data?.CITY || "";

      if (!state || !city) return;

      const mapping = {
        pincode: { city: "city", state: "state" },
        billingPincode: { city: "billingCity", state: "billingState" },
      };
      formik.setFieldValue(mapping[field].city, city);
      formik.setFieldValue(mapping[field].state, state);
    } catch (error) {
      console.log("Error fetching pincode", error);
    }
  };
  const handlePlaceOrder = async (formValues, customerId) => {
    console.log(cartItems);
    if (!cartItems || cartItems.length === 0) return;

    const orderData = {
      order: {
        line_items: cartItems.map((item) => ({
          variant_id: item.variantId.split("/").pop(),
          quantity: item.quantity,
          price: item.price,
        })),
        customer: { id: customerId },
        shipping_address: {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          address1: formValues.address,
          city: formValues.city,
          province: formValues.state,
          country: formValues.country,
          zip: formValues.pincode,
          phone: formValues.mobile,
        },
        billing_address: {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          address1: formValues.billingAddress,
          city: formValues.billingCity,
          province: formValues.billingState,
          country: formValues.billingCountry,
          zip: formValues.billingPincode,
          phone: formValues.mobile,
        },
        tags: "Estimated Delivery: 2025-10-30",
        financial_status: "paid",
      },
    };

    try {
      console.log(orderData);
      const response = await axios.post(
        "http://localhost:8080/api/shopify/order",
        orderData
      );
      setOrderId(response.data.id);
      
      sendWhatsapp(response.data.id);
      navigate("/thankyou");
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };
  const sendWhatsapp = (orderId) => {
    const phoneNumber = "919003058300";
    const message = `Hi, my order has been placed. My Order ID is: ${orderId}`;
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className="min-h-screen bg-[#FFF5E8] text-[#979797]  font-poppins overflow-x-hidden px-3 sm:px-6">
      <div className="max-w-[1440px] mx-auto py-10 space-y-10 ">
        {/* Header */}
        <div className="flex items-center  relative px-2 sm:px-4 md:px-6 lg:px-10 py-2">
          <Link
            to="/cart"
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
            <span className="font-poppins text-[16px] text-[#6E0027] pb-1">
              Address
            </span>
            <img
              src={LineImg}
              alt="progress line"
              className="w-[36px] sm:w-[132px] md:w-16 object-cover"
            />
            <span className="font-poppins text-[16px] text-gray-400  pb-1">
              Payment
            </span>
          </div>
        </div>

        {/* ======= Mobile Order Summary Dropdown ======= */}
        <div className="max-w-[660px] mx-auto block xl:hidden bg-[#FFFAF3] shadow-md border border-[#F6EFE6] mb-6">
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-Poppins text-[14px]"
          >
            <div className="flex items-center gap-2">
              <span>View Order Summary</span>
              <img
                src={downArrow}
                alt="Dropdown Arrow"
                className={`w-[11px] h-[7px] transition-transform duration-300 ${
                  showSummary ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <p className="font-semibold text-[#404040]">
              ₹{total.toLocaleString()}
            </p>
          </button>

          {showSummary && (
            <div className="border-t border-[#FFFAF3] px-4 py-4 text-sm space-y-3 bg-[#FFFAF3] transition-all duration-300">
              {/* Order Items */}
              <div className="space-y-3">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md border border-[#f2eaea] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-11 space-y-1">
                      <div className="text-[14px] font-Poppins text-[#6F6F6F]">
                        {item.title}
                      </div>
                      <div className="text-[12px] font-Poppins text-[#6F6F6F]">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-[14px] text-[#313131] font-semibold">
                        {item.free ? "Free" : `₹${item.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <div className="flex max-w-[205px] items-center gap-2 text-[12px] text-[#A84C32]  bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] rounded-none px-3 py-2">
                <img
                  src={truck_icon}
                  alt="truck icon"
                  className="w-4 h-4 object-contain"
                />
                <span>
                  Est. delivery by {cartItems[0]?.deliverDetails?.date}
                </span>
              </div>

              <div className="border-t border-[#EDEDED] my-3" />

              {/* Summary values */}
              <div className="text-[13px] space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#6E0027]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {giftWrapPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Gift Wrap Price</span>
                    <span>₹{giftWrapPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-[#EDEDED] my-2" />
                <div className="flex justify-between text-[15px] font-semibold text-[#1E1E1E]">
                  <span>Total</span>
                  <span>₹{(total + giftWrapPrice).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="flex max-w-[1300px]">
          {/* Left Form */}
          <div className="w-[700px]  mx-auto">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-[#FFF5E8] rounded-xl  p-4 sm:p-6 space-y-6"
            >
              {/* Contact Details */}
              <section className="space-y-4">
                <h2 className="text-[14px] text-[#6E0027] font-semibold">
                  Contact Details
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-sm block mb-1">First Name</label>
                    <input
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                        formik.errors.firstName && formik.touched.firstName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                      focus:outline-none focus:border-[#8C455E]`}
                      placeholder="First Name"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="text-sm block mb-1">Last Name</label>
                    <input
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                        formik.errors.lastName && formik.touched.lastName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                             focus:outline-none focus:border-[#8C455E]`}
                      placeholder="Last Name"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm block mb-1">Mobile Number</label>
                  <div
                    className={`flex items-center w-full h-[44px] px-3 border rounded-md text-[16px] bg-white ${
                      formik.errors.mobile && formik.touched.mobile
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }
                    focus:outline-none focus:border-[#8C455E]`}
                  >
                    <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
                      IN +91
                    </span>
                    <span className="h-5 w-px bg-gray-300 mr-2"></span>
                    <input
                      type="tel"
                      name="mobile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      placeholder="Mobile Number"
                      className="flex-1 bg-transparent font-light focus:outline-none focus:border-[#8C455E] placeholder-[#979797] placeholder:font-normal"
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.mobile}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm block mb-1">Email Id</label>

                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    } focus:outline-none focus:border-[#8C455E]`}
                    placeholder="Email Id"
                  />

                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-4">
                <h3 className="text-[14px] text-[#6E0027] font-semibold">
                  Shipping Address
                </h3>

                <div>
                  <label className="text-sm block mb-1">Address</label>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className={`w-full h-[44px] px-3 border rounded-md placeholder-[#979797] placeholder:font-normal text-[16px] ${
                      formik.errors.address && formik.touched.address
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }
                     focus:outline-none focus:border-[#8C455E]`}
                    placeholder="Address (Flat No./ House No./Street/Area))"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                {/* Landmark */}
                <div>
                  <label className="text-sm block mb-1">Landmark</label>
                  <input
                    name="landmark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.landmark}
                    className="w-full h-[44px] px-3 border border-[#efe6e6] rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal focus:outline-none focus:border-[#8C455E]"
                    placeholder="Landmark (Optional)"
                  />
                </div>

                {/* City, PIN, State, Country */}
                <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3">
                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">Pincode</label>

                    <input
                      type="tel"
                      name="pincode"
                      inputMode="numeric"
                      maxLength={6}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        formik.setFieldValue("pincode", value);
                      }}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        handlePincodeCheck("pincode", e.target.value);
                      }}
                      value={
                        formik.values.pincode ||
                        cartItems[0]?.deliverDetails.pincode
                      }
                      className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                        formik.errors.pincode && formik.touched.pincode
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                      focus:outline-none focus:border-[#8C455E]`}
                      placeholder="Pincode"
                    />

                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.pincode}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">City</label>
                    <input
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.city || cartItems[0]?.deliverDetails?.city
                      }
                      className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                        formik.errors.city && formik.touched.city
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                       focus:outline-none focus:border-[#8C455E]`}
                      placeholder="City"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">State</label>
                    <input
                      name="state"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.state ||
                        cartItems[0]?.deliverDetails?.state
                      }
                      className={`w-full h-[44px] px-3 border rounded-md text-[16px]  ${
                        formik.errors.state && formik.touched.state
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                     focus:outline-none focus:border-[#8C455E]`}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">Country</label>
                    <select
                      name="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      className="w-full h-[44px] px-3 border border-[#efe6e6] focus:outline-none focus:border-[#8C455E] rounded-md text-[16px]"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Billing Address Section */}
              <div className="mb-6">
                {/* <label className="text-[14px] font-Poppins text-[#6E0027] mb-2 block">
                  Billing Address
                </label> */}

                <div
                  onClick={() => {
                    setUseDifferentBilling(false);
                  }}
                  className={`cursor-pointer w-full p-4 rounded-md border transition-all duration-300
              ${
                !useDifferentBilling
                  ? "bg-gradient-to-r from-[#f8e3e3] to-[#ffffff] border-[#8C455E] shadow-md"
                  : "bg-transparent hover:bg-gradient-to-r hover:from-[#fff7f7] hover:to-[#ffeaea]"
              }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-16px font-Poppins text-[#313131]">
                      Same as shipping address
                    </p>
                    <span
                      className={`w-[22px] h-[22px] border-2 rounded-full flex items-center justify-center
                  ${
                    !useDifferentBilling
                      ? "border-[#6E0027]"
                      : "border-[#6E0027]"
                  }
                     `}
                    >
                      {!useDifferentBilling && (
                        <span className="w-3 h-3 rounded-full bg-[#6E0027]" />
                      )}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setUseDifferentBilling(true);
                  }}
                  className={`cursor-pointer w-full p-4 mt-3 rounded-md border transition-all duration-300
              ${
                useDifferentBilling
                  ? "bg-gradient-to-r from-[#DAB3C14F] to-[#ffffff]  border-[#8C455E] shadow-md"
                  : "bg-transparent hover:bg-gradient-to-r hover:from-[#fff7f7] hover:to-[#ffeaea]"
              }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-Poppins text-[#313131]">
                      Use a different billing address
                    </span>
                    <span
                      className={`w-[22px] h-[22px] border-2 rounded-full flex items-center justify-center
        ${useDifferentBilling ? "border-[#6E0027]" : "border-[#6E0027]"}`}
                    >
                      {useDifferentBilling && (
                        <span className="w-3 h-3 rounded-full bg-[#6E0027]" />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {useDifferentBilling && (
                <div className="mt-4">
                  <label className="text-[14px] font-Poppins text-[#6E0027] mb-2 block">
                    Billing Address
                  </label>
                  <div>
                    <label className="text-sm block mb-1">Address</label>
                    <input
                      name="billingAddress"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.billingAddress}
                      className={`w-full h-[44px] px-3 border rounded-md placeholder-[#979797] placeholder:font-normal text-[16px] ${
                        formik.errors.billingAddress &&
                        formik.touched.billingAddress
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }
                     focus:outline-none focus:border-[#8C455E]`}
                      placeholder="Address (Flat No./ House No./Street/Area))"
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="text-sm block mb-1">Landmark</label>
                    <input
                      name="landmark"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.landmark}
                      className="w-full h-[44px] px-3 border border-[#efe6e6] rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal focus:outline-none focus:border-[#8C455E]"
                      placeholder="Landmark (Optional)"
                    />
                  </div>

                  {/* City, PIN, State, Country */}
                  <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3">
                    <div className="flex-1 min-w-[45%]">
                      <label className="text-sm block mb-1">Pincode</label>
                      <input
                        type="tel"
                        name="billingPincode"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          formik.setFieldValue("billingPincode", value);
                        }}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          handlePincodeCheck("billingPincode", e.target.value);
                        }}
                        value={formik.values.billingPincode}
                        className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                          formik.errors.billingPincode &&
                          formik.touched.billingPincode
                            ? "border-red-500"
                            : "border-[#efe6e6]"
                        } focus:outline-none focus:border-[#8C455E]`}
                        placeholder="billingPincode"
                      />

                      {formik.touched.billingPincode &&
                        formik.errors.billingPincode && (
                          <p className="text-xs text-red-500 mt-1">
                            {formik.errors.billingPincode}
                          </p>
                        )}
                    </div>
                    <div className="flex-1 min-w-[45%]">
                      <label className="text-sm block mb-1">City</label>
                      <input
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.billingCity}
                        className={`w-full h-[44px] px-3 border rounded-md text-[16px] placeholder-[#979797] placeholder:font-normal ${
                          formik.errors.billingCity &&
                          formik.touched.billingCity
                            ? "border-red-500"
                            : "border-[#efe6e6]"
                        }
                       focus:outline-none focus:border-[#8C455E]`}
                        placeholder="City"
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-xs text-red-500 mt-1">
                          {formik.errors.city}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 min-w-[45%]">
                      <label className="text-sm block mb-1 mt-2.5">State</label>
                      <input
                        name="billingState"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.billingState}
                        className={`w-full h-[44px] px-3 border rounded-md text-[16px]  ${
                          formik.errors.billingState &&
                          formik.touched.billingState
                            ? "border-red-500"
                            : "border-[#efe6e6]"
                        }
                     focus:outline-none focus:border-[#8C455E]`}
                      />
                      {formik.touched.billingState && formik.errors.state && (
                        <p className="text-xs text-red-500 mt-1">
                          {formik.errors.billingState}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 min-w-[45%]">
                      <label className="text-sm block mb-1">Country</label>
                      <select
                        name="country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                        className="w-full h-[44px] px-3 border border-[#efe6e6] focus:outline-none focus:border-[#8C455E] rounded-md text-[16px]"
                      >
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Gift wrap + Order note */}
              <section className="space-y-7">
                <div className="relative">
                  <label className="flex items-center custom-checkbox cursor-pointer">
                    <input
                      type="checkbox"
                      name="addGiftWrap"
                      checked={formik.values.addGiftWrap}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (e.target.checked) {
                          setGiftWrapPrice(50);
                        } else {
                          setGiftWrapPrice(0);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <span className="checkmark"></span>
                    <span className="text-[16px] text-[#313131] absolute top-0 left-8">
                      Add gift wrap for ₹50
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-[14px] text-[#6E0027] block mb-1">
                    Order Note
                  </label>
                  <textarea
                    name="orderNote"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderNote}
                    className="w-full min-h-[110px] p-3 border border-[#efe6e6] rounded-md focus:outline-none focus:border-[#8C455E] text-sm placeholder:font-normal"
                    placeholder="Leave a note for special requests or instructions"
                  />
                  {formik.touched.orderNote && formik.errors.orderNote && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.orderNote}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex flex-col gap-2 items-start  bg-[#FFF5EE]  ">
                  <p className="text-[14px] text-[#313131] font-Poppins">
                    T&C Checkbox
                  </p>

                  <div className="relative w-full ">
                    <label className=" custom-checkbox ">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <p className=" text-[16px] mx-2  text-[#313131] absolute top-0 left-6">
                      I agree to the{" "}
                      <Link to="/terms" className="underline text-primary">
                        Terms & Conditions
                      </Link>{" "}
                      and Jewel Care Instructions.
                    </p>
                  </div>
                </div>

                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.terms}
                  </p>
                )}

                {/* Proceed Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#4B001A] text-white text-[18px] font-semibold hover:bg-[#6E0027]"
                >
                  Proceed to Payment
                </button>
              </section>
            </form>
          </div>

          {/* Right Summary */}
          <div className="hidden xl:block ">
            <div className="w-[466px] h-[617px] bg-[#FFFAF3] rounded-[10px] shadow-2xl border border-[#EDEDED] p-5">
              <h3 className="font-semibold mb-4 text-base text-[#313131]">
                Order Summary
              </h3>

              <div className="space-y-4">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 sp">
                    <div className="w-[98px] h-[101px] rounded-md border border-[#f2eaea] gap-[33px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-[98px] h-[101px] object-contain"
                      />
                    </div>
                    <div className="flex-1 w-[123px] h-[95px] space-y-1">
                      <div className=" text-14px font-Poppins text-[#6F6F6F]">
                        {item.title}
                      </div>
                      <div className="text-14px text-[#6F6F6F] ">
                        Quantity:{item.quantity}
                      </div>
                      <div className=" text-18px text-[#313131]   font-semibold">
                        ₹{parseInt(item.price).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  max-w-[205px] max-h-[24px] items-center gap-2 text-[12px]  text-[#A84C32]  bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] rounded-none px-3 py-2 mt-5">
                <img
                  src={truck_icon}
                  alt="truck icon"
                  className="w-4 h-4 object-contain"
                />
                <span>
                  Est. delivery by {cartItems[0]?.deliverDetails?.date}
                </span>
              </div>

              <div className="border-t border-[#EDEDED] my-4" />

              <div className="text-[14px] space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#6E0027]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {giftWrapPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Gift Wrap Price</span>
                    <span>₹{giftWrapPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-[#EDEDED] my-3" />
                <div className="flex justify-between text-base font-semibold text-[#1E1E1E]">
                  <span>Total</span>
                  <span>₹{(total + giftWrapPrice).toLocaleString()}</span>
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

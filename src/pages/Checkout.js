import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { OpenRazorpayService } from "../utils/OpenRazorpayService";

// Import product images
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function CheckoutPage() {
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(AppContext);
  const [formValues, setFormValues] = useState({});

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

  const subTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = 800;
  const shipping = 0;
  const total = subTotal + tax + shipping;

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
    onSubmit: (values) => {
          setFormValues(values); 
              console.log("Form Values Submitted", values);

      // Navigate to payment only if form is valid
      navigate("/payment");
    },
  });
  const handlePlaceOrder = async () => {
    console.log(cartItems);
    if (!cartItems || cartItems.length === 0) return;
    const orderData = {
      order: {
        line_items: cartItems.map((item) => ({
          variant_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        customer: { id: 9510330040634 },
        shipping_address: {
          first_name: "John",
          last_name: "Doe",
          address1: "123 Fake Street",
          city: "Fakecity",
          province: "Ontario",
          country: "Canada",
          zip: "K2P1L4",
          phone: "555-555-5555",
        },
        billing_address: {
          first_name: "John",
          last_name: "Doe",
          address1: "123 Fake Street",
          city: "Fakecity",
          province: "Ontario",
          country: "Canada",
          zip: "K2P1L4",
          phone: "555-555-5555",
        },
        tags: "Estimated Delivery: 2025-10-30",
        financial_status: "paid",
      },
    };
    try {
      console.log(orderData);
      return;
      const response = await axios.post("/api/shopify/order", orderData);
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };
   console.log("formValues",formValues)
  return (
    <div className="min-h-screen bg-[#F6ECE6] text-[#6E0027] font-poppins overflow-x-hidden px-3 sm:px-6">
      <div className="max-w-[1110px] mx-auto py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between relative px-4 sm:px-6 md:px-8 lg:px-12 py-2">
          <div className="flex items-center gap-1 text-[#6E0027] text-sm sm:text-base font-semibold cursor-pointer">
            <span className="text-lg sm:text-xl leading-none">‹</span>
            <span className="truncate">Go Back</span>
          </div>
          <div className="absolute top-9 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
            <span className="font-medium text-[#6E0027] pb-1">Address</span>
            <div className="w-10 sm:w-14 md:w-16 h-[1px] bg-gray-400" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-400" />
            <span className="text-gray-400 truncate">Payment</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Form */}
          <div className="col-span-12 lg:col-span-8">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-transparent rounded-xl border border-[#f3e7e7] p-4 sm:p-6 space-y-6"
            >
              {/* Contact Details */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Contact Details</h2>

                <div>
                  <label className="text-sm block mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }`}
                    placeholder="Email@example.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-sm block mb-1">First Name</label>
                    <input
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                        formik.errors.firstName && formik.touched.firstName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
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
                      className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                        formik.errors.lastName && formik.touched.lastName
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
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
                      className="flex-1 bg-transparent focus:outline-none placeholder-gray-400"
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.mobile}
                    </p>
                  )}
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping Address</h3>

                <div>
                  <label className="text-sm block mb-1">Address</label>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                      formik.errors.address && formik.touched.address
                        ? "border-red-500"
                        : "border-[#efe6e6]"
                    }`}
                    placeholder="Address line"
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
                    className="w-full h-[44px] px-3 border border-[#efe6e6] rounded-md text-sm"
                    placeholder="Landmark (Optional)"
                  />
                </div>

                {/* City, PIN, State, Country */}
                <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3">
                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">City</label>
                    <input
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                        formik.errors.city && formik.touched.city
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="City"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">Pincode</label>
                    <input
                      name="pincode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pincode}
                      className={`w-full h-[44px] px-3 border rounded-md text-sm ${
                        formik.errors.pincode && formik.touched.pincode
                          ? "border-red-500"
                          : "border-[#efe6e6]"
                      }`}
                      placeholder="PIN"
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.pincode}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label className="text-sm block mb-1">State</label>
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
                  <input type="checkbox" className="w-4 h-4 accent-[#6E0027]" />
                  <p className="text-sm">Add gift wrap for ₹50</p>
                </div>
                <div>
                  <label className="text-sm block mb-1">Order Note</label>
                  <textarea
                    className="w-full min-h-[110px] p-3 border border-[#efe6e6] rounded-md text-sm"
                    placeholder="Leave a note for special requests or instructions"
                  />
                </div>

                {/* Terms */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.terms}
                    className="w-4 h-4 accent-[#6E0027]"
                  />
                  I agree to the Terms & Conditions.
                </label>
                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.terms}
                  </p>
                )}

                {/* Proceed Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#4B001A] text-white text-lg font-semibold hover:bg-[#6E0027]"
                  // onClick={handlePlaceOrder}
                >
                  Proceed to Payment
                </button>
              </section>
            </form>
          </div>

          {/* Right Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="w-full bg-white rounded-[10px] shadow-md border border-[#EDEDED] p-5">
              <h3 className="font-semibold mb-4 text-base text-[#1E1E1E]">
                Order Summary
              </h3>

              <div className="space-y-4">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md border border-[#f2eaea] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>

                    <div className="text-sm font-semibold">
                      {item.free
                        ? "Free"
                        : `₹${item.price.toLocaleString("en-IN")}`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A84C32] bg-[#FDE7E7] rounded-md px-3 py-2 mt-5">
                <span>🚚 Est. delivery by 10th Oct</span>
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
                  <span className="text-[#F55A5A]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
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

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import userIcon from "../assets/user.png";
import addressIcon from "../assets/address.png";
import ordersIcon from "../assets/orders.png";
import favIcon from "../assets/favourites.png";

import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import cartIcon from "../assets/cart.png";
import truck_icon from "../assets/truck_icon.png";

import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const menuItems = [
    { name: "Your Profile", icon: userIcon },
    { name: "Saved Address", icon: addressIcon },
    { name: "Orders", icon: ordersIcon },
    { name: "Favourites", icon: favIcon },
  ];

  return (
    <div className="min-h-[972px] bg-[#FFF5E8]  py-10 px-4 sm:px-6 lg:px-16 xl:px-28 ">
      <div className="max-w-[1110px] mx-auto space-y-28">
        {/* Heading */}
        <h1 className="font-atteron text-[#5A0010] text-[28px] leading-[42px]">
          PROFILE
        </h1>

        {/* Layout wrapper */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Sidebar */}
          <div className="w-full md:w-[220px] flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name)}
                className={`flex items-center gap-3 px-5 py-3 rounded-md text-sm font-poppins transition-all w-full ${
                  activeSection === item.name
                    ? "bg-[#5A0010] text-white"
                    : "text-[#6D6D6D] hover:bg-[#4B001A] hover:text-[#FFFFFF]"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-[18px] h-[18px]"
                />
                {item.name}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-transparent">
            {/* PROFILE SECTION */}
            {activeSection === "Your Profile" && (
              <div className="max-w-[700px] w-full space-y-6">
                <h2 className="text-[#5A0010] text-sm font-semibold mb-[4px]">
                  Contact Details
                </h2>

                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-[16px] w-full"
                >
                  {/* Name fields */}
                  <div className="flex flex-col sm:flex-row gap-[12px]">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        className="w-full border border-[#D9D9D9] rounded-md px-4 py-2 text-sm focus:outline-none placeholder:text-[#2A2A2A]"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        className="w-full border border-[#D9D9D9] rounded-md px-4 py-2 text-sm focus:outline-none placeholder:text-[#2A2A2A]"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone field */}
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
                        placeholder="00000 00000"
                        className="flex-1 bg-transparent font-light focus:outline-none placeholder-[#2A2A2A]"
                      />
                    </div>
                    {formik.touched.mobile && formik.errors.mobile && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="w-full border border-[#D9D9D9] rounded-md px-4 py-2 text-sm focus:outline-none placeholder:text-[#2A2A2A]"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* SAVED ADDRESS SECTION */}
            {activeSection === "Saved Address" && (
              <div className="space-y-4 max-w-[700px]">
                {[
                  {
                    name: "John Doe",
                    address: "Address Line 1",
                    details:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    pin: "641 001",
                  },
                  {
                    name: "Jane Smith",
                    address: "Address Line 2",
                    details:
                      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    pin: "641 002",
                  },
                  {
                    name: "Alice Johnson",
                    address: "Address Line 3",
                    details:
                      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
                    pin: "641 003",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative border border-[#D9D9D9] rounded-md p-4 bg-white shadow-sm"
                  >
                    <div className="absolute top-3 right-3 flex gap-3">
                      <button>
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="w-[14px] h-[14px] cursor-pointer"
                        />
                      </button>
                      <button>
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="w-[14px] h-[14px] cursor-pointer"
                        />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[#000000] font-semibold text-[14px]">
                        {item.name}
                      </p>
                      <p className="text-[#000000] text-[13px]">
                        {item.address}
                      </p>
                      <p className="text-[#555555] text-[13px] leading-relaxed">
                        {item.details}
                      </p>
                      <p className="text-[#000000] text-[13px] font-medium">
                        Pin Code - {item.pin}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ORDERS SECTION */}
            {activeSection === "Orders" && (
              <div className="space-y-10 max-w-[700px]">
                {/* Upcoming Orders */}
                <div>
                  <h2 className="text-[#2A2A2A] text-sm font-semibold mb-[8px]">
                    Upcoming Orders
                  </h2>

                  <div className="border border-[#D9D9D9] rounded-md bg-white p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:justify-between items-start border-b border-[#E0E0E0] pb-2 mb-3 gap-2">
                      <div className="text-[16px] text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Order Date:</span> 12
                          Oct 2025
                        </p>
                        <p>
                          <span className="font-medium">Order Number:</span>{" "}
                          #123456
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[14px] text-[#5A0010] bg-[#FFF5E8] border border-[#5A0010] px-2 py-[2px] rounded-full font-medium">
                          Shipped
                        </span>
                        <button className="text-[#5A0010] text-[14px] font-medium hover:underline">
                          View Order Details
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-5 items-center flex-wrap">
                      <img
                        src={product_1}
                        alt="Product"
                        className="w-[98px] h-[101px] rounded-md object-cover"
                      />
                      <img
                        src={product_2}
                        alt="Product"
                        className="w-[98px] h-[101px] rounded-md object-cover"
                      />
                    </div>

                    <div className="flex max-w-[220px] items-center gap-3 text-[12px] text-[#A84C32] bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] rounded-md px-3 py-2 mt-3">
                      <img
                        src={truck_icon}
                        alt="truck icon"
                        className="w-4 h-4 object-contain"
                      />
                      <span>Est. delivery by 22 Oct</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button className="flex-1 bg-[#5A0010] text-white text-[16px] font-semibold py-2 rounded-full">
                        Track Order
                      </button>
                      <button className="flex-1 border border-[#5A0010] text-[#5A0010] text-[16px] font-semibold py-2 rounded-full">
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivered Orders */}
                <div>
                  <h2 className="text-[#2A2A2A] text-sm font-semibold mb-[8px]">
                    Delivered
                  </h2>

                  <div className="border border-[#D9D9D9] rounded-md bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-2 mb-3">
                      <div className="text-[16px] text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Order Date:</span> 18
                          Oct 2025
                        </p>
                        <p>
                          <span className="font-medium">Order Number:</span>{" "}
                          #123458
                        </p>
                      </div>
                      <button className="text-[#5A0010] text-[14px] font-medium hover:underline">
                        View Order Details
                      </button>
                    </div>

                    <p className="text-[16px] font-semibold text-gray-800 mb-2">
                      Delivered on 20 Oct
                    </p>

                    <div className="flex gap-3 sm:gap-5 items-center flex-wrap">
                      <img
                        src={product_1}
                        alt="Product"
                        className="w-[98px] h-[101px] rounded-md object-cover"
                      />
                      <img
                        src={product_2}
                        alt="Product"
                        className="w-[98px] h-[101px] rounded-md object-cover"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button className="flex-1 bg-[#5A0010] text-white text-[16px] font-semibold py-2 rounded-full">
                        Track Order
                      </button>
                      <button className="flex-1 border border-[#5A0010] text-[#5A0010] text-[16px] font-semibold py-2 rounded-full">
                        Return Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAVOURITES SECTION */}
            {activeSection === "Favourites" && (
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 max-w-[700px] ">
                {[ 
                  { src: product_1, price: "₹10,000", name: "Stone Necklace" },
                  { src: product_2, price: "₹4,000", name: "Silver Kada" },
                ].map((product, index) => (
                  <div key={index} className="flex flex-wrap mx-auto items-center">
                    <img
                      src={product.src}
                      alt={product.name}
                      className="w-full h-[307px] object-contain rounded-2xl"
                    />
                    <div className="w-full mt-2 text-left">
                      <p className="text-[#000000] font-semibold text-[14px]">
                        {product.price}
                      </p>
                      <p className="text-[#6D6D6D] text-[13px]">
                        {product.name}
                      </p>
                    </div>
                    <button className="mt-3 w-full border border-[#5A0010] rounded-full py-2 text-[#5A0010] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#5A0010] hover:text-white transition-all">
                      <img
                        src={cartIcon}
                        alt="Cart"
                        className="w-[22px] h-[22px]"
                      />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

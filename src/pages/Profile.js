import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import userIcon from "../assets/user.png";
import addressIcon from "../assets/address.png";
import ordersIcon from "../assets/orders.png";
import favIcon from "../assets/favourites.png";
import userIconActive from "../assets/userIconActive.png";
import favIconActive from "../assets/favIconActive.png";
import ordersIconActive from "../assets/ordersIconActive.png";
import addressIconActive from "../assets/addressIconActive.png";

import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import cartIcon from "../assets/cart.png";
import truck_icon from "../assets/truck_icon.png";
import upArrow from "../assets/arrowup.png";
import downArrow from "../assets/arrowDown.png";

import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import circle from "../assets/Ellipse 12.png";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");

  const [openSections, setOpenSections] = useState({
    profile: true,
    address: false,
    orders: false,
    favourites: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const allClosed = Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {}
      );
      return { ...allClosed, [key]: !prev[key] };
    });
  };

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
    { name: "Your Profile", icon: userIcon, activeIcon: userIconActive },
    { name: "Saved Address", icon: addressIcon, activeIcon: addressIconActive },
    { name: "Orders", icon: ordersIcon, activeIcon: ordersIconActive },
    { name: "Favourites", icon: favIcon, activeIcon: favIconActive },
  ];

  return (
    <div className="min-h-[972px] bg-[#FFF5E8]  py-16 px-4 sm:px-6 lg:px-16 xl:px-28">
      <div className="max-w-[1110px] mx-auto space-y-14 ">
        <div className="md:flex flex-auto justify-items-center">
          <h1 className=" font-atteron  text-[#5A0010] text-[28px] leading-[42px] ">
            PROFILE
          </h1>
        </div>
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:flex flex-row gap-10 md:gap-16">
          <div className="w-[220px] flex flex-col gap-4">
            {menuItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-md text-sm font-poppins transition-all w-full
        ${
          isActive
            ? "bg-[#5A0010] text-white"
            : "text-[#6D6D6D] hover:bg-[#F4E7E7] hover:text-[#5A0010]"
        }`}
                >
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    alt={item.name}
                    className="w-[30px] h-[30px] transition-all"
                  />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="flex-1 bg-transparent">
            {activeSection === "Your Profile" && renderProfileSection(formik)}
            {activeSection === "Saved Address" && renderAddressSection()}
            {activeSection === "Orders" && renderOrdersSection()}
            {activeSection === "Favourites" && renderFavouritesSection()}
          </div>
        </div>

        {/* MOBILE DROPDOWN LAYOUT */}
        <div className="block md:hidden space-y-4">
          {/* Profile Dropdown */}
          <div className="bg-[#FFF5E8] rounded-[10px]">
            <button
              type="button"
              onClick={() => toggleSection("profile")}
              className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="w-[30px] h-[30px] "
                />
                <span>Your Profile</span>
              </div>
              <img
                src={openSections.profile ? upArrow : downArrow}
                alt="Toggle"
                className="w-[11px] h-[7px]"
              />
            </button>
            {openSections.profile && (
              <div className="border-t px-4 py-4 bg-[#FFF5E8] transition-all duration-300">
                {renderProfileSection(formik)}
              </div>
            )}
          </div>

          {/* Address Dropdown */}
          <div className="bg-[#FFF5E8] rounded-[10px]">
            <button
              type="button"
              onClick={() => toggleSection("address")}
              className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={addressIcon}
                  alt="Address"
                  className="w-[30px] h-[30px]"
                />
                <span>Saved Address</span>
              </div>
              <img
                src={openSections.address ? upArrow : downArrow}
                alt="Toggle"
                className="w-[11px] h-[7px]"
              />
            </button>
            {openSections.address && (
              <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">
                {renderAddressSection()}
              </div>
            )}
          </div>

          {/* Orders Dropdown */}
          <div className="bg-[#FFF5E8] rounded-[10px]">
            <button
              type="button"
              onClick={() => toggleSection("orders")}
              className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={ordersIcon}
                  alt="Orders"
                  className="w-[30px] h-[30px]"
                />
                <span>Orders</span>
              </div>
              <img
                src={openSections.orders ? upArrow : downArrow}
                alt="Toggle"
                className="w-[11px] h-[7px]"
              />
            </button>
            {openSections.orders && (
              <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">
                {renderOrdersSection()}
              </div>
            )}
          </div>

          {/* Favourites Dropdown */}
          <div className="bg-[#FFF5E8] rounded-[10px]">
            <button
              type="button"
              onClick={() => toggleSection("favourites")}
              className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={favIcon}
                  alt="Favourites"
                  className="w-[30px] h-[30px]"
                />
                <span>Favourites</span>
              </div>
              <img
                src={openSections.favourites ? upArrow : downArrow}
                alt="Toggle"
                className="w-[11px] h-[7px]"
              />
            </button>
            {openSections.favourites && (
              <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">
                {renderFavouritesSection()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* === Render Helper Functions === */
const renderProfileSection = (formik) => (
  <div className="max-w-[633px] w-full space-y-6">
    <h2 className="text-[#5A0010] text-sm font-semibold mb-[4px]">
      Contact Details
    </h2>
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-[16px] w-full font-poppins"
    >
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="flex-1">
          <input
            type="text"
            name="firstName"
            placeholder="John"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium"
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
            className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center w-full py-3.5 px-3 border border-[#efe6e6] rounded-md text-sm bg-white">
          <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
            IN +91
          </span>
          <span className="h-5 w-px bg-gray-300 mr-2"></span>
          <input
            type="text"
            name="mobile"
            placeholder="00000 00000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            className="flex-1 bg-transparent font-light focus:outline-none placeholder-[#2A2A2A]"
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>
    </form>
  </div>
);

const renderAddressSection = () => (
  <div className="space-y-4 max-w-[633px]">
    {[
      {
        name: "John Doe",
        address: "Address Line 1",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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
          <img src={editIcon} alt="Edit" className="w-[24px] h-[24px]" />
          <img src={deleteIcon} alt="Delete" className="w-[24px] h-[24px]" />
        </div>
        <div className="space-y-1">
          <p className="text-[#000000] font-semibold text-[14px]">
            {item.name}
          </p>
          <p className="text-[#000000] text-[13px]">{item.address}</p>
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
);

const renderOrdersSection = () => (
  <div className="space-y-10 max-w-[634px]">
    {/* Upcoming Orders */}
    <div>
      <h2 className="text-[#2A2A2A] text-[13px] font-semibold mb-2">
        Upcoming Orders
      </h2>

      <div className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-3 mb-4 w-full">
          <div className="flex  gap-6  p-1">
            {/* Order Date */}
            <div className="flex flex-col">
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                Order Date
              </span>
              <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                12 Oct 2025
              </span>
            </div>

            {/* Order Number */}
            <div className="flex flex-col gap-x-2 text-start">
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                Order Number
              </span>
              <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                #123456
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-[6px]  mt-2 sm:mt-0">
            <div className="flex items-center justify-center gap-1 text-[12px] font-medium text-[#5A0010] bg-[#FFF5E8] border border-[#5A0010] rounded-full px-3 py-[3px]">
              <img src={circle} alt="circle" className="w-[8px] h-[8px]" />
              <span>Shipped</span>
            </div>
            <button className="text-[#5A0010] text-[12px] font-medium hover:underline">
              View Order Details
            </button>
          </div>
        </div>

        {/* Product Images */}
        <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
          <img
            src={product_1}
            alt="Product"
            className="w-[90px] h-[90px] rounded-md object-cover"
          />
          <img
            src={product_2}
            alt="Product"
            className="w-[90px] h-[90px] rounded-md object-cover"
          />
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-2 text-[12px] text-[#A84C32] bg-gradient-to-r from-[#F6D7E0] to-[#FFFFFF] px-3 py-2 mt-4 rounded-md max-w-[230px]">
          <img src={truck_icon} alt="truck" className="w-4 h-4" />
          <span>Est. delivery by 20th Oct</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button className="flex-1 bg-[#4B001A] text-white text-[14px] font-semibold py-2.5 rounded-full">
            Track Order
          </button>
          <button className="flex-1 border border-[#4B001A] text-[#4B001A] text-[14px] font-semibold py-2.5 rounded-full">
            Cancel Order
          </button>
        </div>
      </div>
    </div>

    {/* Delivered Orders */}
    <div>
      <h2 className="text-[#2A2A2A] text-[13px] font-semibold mb-2">
        Delivered
      </h2>

      <div className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-3 mb-4">
          <div className="flex gap-6 p-1">
            {/* Order Date */}
            <div className="flex flex-col">
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                Order Date
              </span>
              <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                12 Oct 2025
              </span>
            </div>

            {/* Order Number */}
            <div className="flex flex-col  text-start">
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                Order Number
              </span>
              <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                #123456
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-[6px] mt-2 sm:mt-0">
            <button className="text-[#4B001A] text-[12px] font-medium hover:underline">
              View Order Details
            </button>
          </div>
        </div>

        {/* Delivery Status */}
        <p className="text-[14px] font-semibold text-[#2A2A2A] mb-3">
          Delivered on 20 Oct
        </p>

        {/* Product Images */}
        <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
          <img
            src={product_1}
            alt="Product"
            className="w-[90px] h-[90px] rounded-md object-cover"
          />
          <img
            src={product_2}
            alt="Product"
            className="w-[90px] h-[90px] rounded-md object-cover"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button className="flex-1 bg-[#4B001A] text-white text-[14px] font-semibold py-2.5 rounded-full">
            Track Order
          </button>
          <button className="flex-1 border border-[#4B001A] text-[#4B001A] text-[14px] font-semibold py-2.5 rounded-full">
            Return Order
          </button>
        </div>
      </div>
    </div>
  </div>
);

const renderFavouritesSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[700px]">
    {[
      { src: product_1, price: "₹10,000", name: "Stone Necklace" },
      { src: product_2, price: "₹4,000", name: "Silver Kada" },
    ].map((product, index) => (
      <div
        key={index}
        className="max-w-[304px] flex flex-wrap gap-x-10 mx-auto items-center"
      >
        <img
          src={product.src}
          alt={product.name}
          className="w-full h-[307px] object-contain rounded-2xl"
        />
        <div className="w-full mt-2 text-left">
          <p className="text-[#000000] font-semibold text-[14px]">
            {product.price}
          </p>
          <p className="text-[#6D6D6D] text-[13px]">{product.name}</p>
        </div>
        <button className="mt-3 w-full border border-[#5A0010] rounded-full py-2 text-[#5A0010] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#5A0010] hover:text-white transition-all">
          <img src={cartIcon} alt="Cart" className="w-[24px] h-[24px]" />
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);

export default Profile;

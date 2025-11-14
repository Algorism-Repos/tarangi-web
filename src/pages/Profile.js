import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, ErrorMessage } from "formik";
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
import truck_icon from "../assets/truck_icon.png";
import upArrow from "../assets/arrowup.png";
import downArrow from "../assets/arrowDown.png";

import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import circle from "../assets/Ellipse 12.png";

import AddToCartButton from "../components/AddToCartButton";
import LikeButton from "../components/LikeButton";
import logout_icon from "../assets/logout_icon.png";

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

// ✅ Move schema definition here so it’s in scope
const addressValidationSchema = Yup.object({
  id: Yup.number().nullable(),
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  details: Yup.string(),
  city: Yup.string().required("City is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN")
    .required("PIN code is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");
  const [isEditing, setIsEditing] = useState(true);
  const [hasSavedOnce, setHasSavedOnce] = useState(false);

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
      console.log("✅ Form Submitted:", values);
    },
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleSave = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      firstName: true,
      lastName: true,
      mobile: true,
      email: true,
    });

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
      setHasSavedOnce(true);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const [openSections, setOpenSections] = useState({
    profile: false,
    address: false,
    orders: false,
    favourites: false,
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      src: product_1,
      price: "₹10,000",
      name: "Stone Necklace",
      liked: true,
      isOutOfStock: false,
    },
    {
      id: 2,
      src: product_2,
      price: "₹4,000",
      name: "Silver Kada",
      liked: true,
      isOutOfStock: false,
    },
    {
      id: 3,
      src: product_2,
      price: "₹4,000",
      name: "Silver Kada",
      liked: true,
      isOutOfStock: false,
    },
  ]);

  const toggleLike = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );

  const likedProducts = products.filter((p) => p.liked);

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const allClosed = Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {}
      );
      return { ...allClosed, [key]: !prev[key] };
    });
  };

  // Address logic
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "Address Line 1",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      city: "Coimbatore",
      pin: "641001",
      state: "Tamil Nadu",
      country: "India",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "Address Line 2",
      details:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      city: "Chennai",
      pin: "641002",
      state: "Tamil Nadu",
      country: "India",
    },
  ]);

  const [editingAddressId, setEditingAddressId] = useState(null);
  const nextAddressId = () =>
    addresses.length === 0 ? 1 : Math.max(...addresses.map((a) => a.id)) + 1;

  const handleAddNew = () => {
    const newId = nextAddressId();
    const newAddr = {
      id: newId,
      name: "",
      address: "",
      details: "",
      city: "",
      pin: "",
      state: "",
      country: "",
      isNew: true,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setEditingAddressId(newId);
  };

  const handleAddressEditClick = (id) => setEditingAddressId(id);

  const handleAddressSave = (values, { setSubmitting }) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === values.id ? { ...values, isNew: false } : a))
    );
    setEditingAddressId(null);
    setSubmitting(false);
    console.log("✅ Address Saved:", values);
  };

  const handleAddressCancel = (id) => {
    const addr = addresses.find((a) => a.id === id);
    if (addr && addr.isNew)
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    setEditingAddressId(null);
  };

  const handleAddressDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (editingAddressId === id) setEditingAddressId(null);
  };

  const menuItems = [
    { name: "Your Profile", icon: userIcon, activeIcon: userIconActive },
    { name: "Saved Address", icon: addressIcon, activeIcon: addressIconActive },
    { name: "Orders", icon: ordersIcon, activeIcon: ordersIconActive },
    { name: "Favourites", icon: favIcon, activeIcon: favIconActive },
  ];

  return (
    <div className="min-h-[972px] bg-[#FFF5E8] py-16 px-4 sm:px-6 lg:px-16 xl:px-28">
      <div className="max-w-[1280px] mx-auto space-y-20  ">
        <div className="md:flex flex-auto justify-items-center">
          <h1 className=" font-atteron  text-[#5A0010] text-[28px] leading-[42px] ">
            PROFILE
          </h1>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:flex flex-row gap-10 md:gap-16">
          <div className="w-[220px] flex flex-col gap-8">
            {menuItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-[8px] text-[16px] font-poppins transition-all w-full
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

            <button
              onClick={() => console.log("Logout clicked")}
              className="flex items-center gap-3 px-5 py-3  mt-[275px] text-[#6D6D6D] hover:bg-[#F4E7E7] hover:text-[#5A0010] rounded-[8px] text-[16px] font-poppins"
            >
              <img
                src={logout_icon}
                alt="Logout"
                className="w-[30px] h-[30px] object-contain"
              />
              Logout
            </button>
          </div>

          <div className="flex-1 bg-transparent">
            {activeSection === "Your Profile" &&
              renderProfileSection(
                formik,
                isEditing,
                handleEdit,
                handleSave,
                handleCancel,
                hasSavedOnce
              )}

            {activeSection === "Saved Address" &&
              renderAddressSection(
                addresses,
                editingAddressId,
                handleAddNew,
                handleAddressEditClick,
                handleAddressSave,
                handleAddressCancel,
                handleAddressDelete
              )}

            {activeSection === "Orders" && renderOrdersSection()}
            {activeSection === "Favourites" &&
              renderFavouritesSection(products, toggleLike, likedProducts)}
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
                {renderProfileSection(
                  formik,
                  isEditing,
                  handleEdit,
                  handleSave,
                  handleCancel,
                  hasSavedOnce
                )}
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
                {renderAddressSection(
                  addresses,
                  editingAddressId,
                  handleAddNew,
                  handleAddressEditClick,
                  handleAddressSave,
                  handleAddressCancel,
                  handleAddressDelete
                )}
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
                {renderFavouritesSection(products, toggleLike, likedProducts)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* === Render Helper Functions === */

const renderProfileSection = (
  formik,
  isEditing,
  handleEdit,
  handleSave,
  handleCancel,
  hasSavedOnce
) => (
  <div className="max-w-[633px] w-full space-y-1.5">
    <h2 className="text-[#6E0027] text-[14px] font-semibold font-poppins mb-[4px]">
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
            disabled={!isEditing}
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none  placeholder-[#979797] placeholder:font-normal  bg-white disabled:cursor-not-allowed"
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
            disabled={!isEditing}
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none  placeholder-[#979797] placeholder:font-normal bg-white disabled:cursor-not-allowed"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center w-full py-3.5 px-3 border border-[#ADADAD] rounded-[8px] text-sm bg-white disabled:cursor-not-allowed">
          <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
            IN +91
          </span>
          <span className="h-5 w-px bg-[#ADADAD] mr-2"></span>
          <input
            type="text"
            disabled={!isEditing}
            name="mobile"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            className="flex-1 bg-white font-light focus:outline-none  placeholder-[#979797] placeholder:font-normal"
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          disabled={!isEditing}
          name="email"
          placeholder="Email ID"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none  placeholder-[#979797] placeholder:font-normal bg-white disabled:cursor-not-allowed"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="flex gap-3 mt-4 justify-end">
        {!hasSavedOnce && isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
          >
            Save
          </button>
        )}

        {hasSavedOnce && !isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
          >
            Edit
          </button>
        )}

        {hasSavedOnce && isEditing && (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border border-[#5A0010] text-[#5A0010] px-6 py-2 rounded-[8px] font-medium text-[14px]"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  </div>
);

const renderAddressSection = (
  addresses,
  editingAddressId,
  handleAddNew,
  handleEditClick,
  handleSave,
  handleCancel,
  handleDelete
) => (
  <div className="space-y-4 max-w-[633px]">
    <div className="flex justify-end">
      <button
        onClick={handleAddNew}
        className="bg-[#5A0010] text-white px-4 py-2 rounded-[8px] text-[14px] mb-4"
      >
        + Add Address
      </button>
    </div>

    {addresses.map((addr) => (
      <div
        key={addr.id}
        className="relative border border-[#ADADAD] rounded-[8px] p-4 bg-white"
      >
        {editingAddressId !== addr.id && (
          <div className="absolute top-3 right-3 flex gap-3">
            <img
              src={editIcon}
              alt="Edit"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => handleEditClick(addr.id)}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => handleDelete(addr.id)}
            />
          </div>
        )}

        {editingAddressId === addr.id ? (
          <Formik
            initialValues={{
              id: addr.id,
              name: addr.name || "",
              address: addr.address || "",
              details: addr.details || "",
              city: addr.city || "",
              pin: addr.pin || "",
              state: addr.state || "",
              country: addr.country || "",
              isNew: addr.isNew || false,
            }}
            validationSchema={addressValidationSchema}
            onSubmit={handleSave}
            enableReinitialize
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}

                <input
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Address Line"
                  className="w-full border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}

                <input
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  placeholder="Details"
                  className="w-full border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                  />
                  <input
                    name="pin"
                    value={values.pin}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    className="border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                  />
                  <input
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                  />
                  <input
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="border  border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px]  placeholder-[#979797] placeholder:font-normal"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="bg-[#5A0010] text-white px-6 py-2 rounded-lg text-[14px]"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(values.id)}
                    className="border border-[#5A0010] text-[#5A0010] px-6 py-2 rounded-[8px] text-[14px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div>
            <p className="font-semibold">{addr.name}</p>
            <p>{addr.address}</p>
            <p>{addr.details}</p>
            <p>
              {addr.city}, {addr.state}, {addr.country} - {addr.pin}
            </p>
          </div>
        )}
      </div>
    ))}
  </div>
);

const renderOrdersSection = () => {
  // Example data — you can replace this with real API data later
  const upcomingOrders = [
    {
      id: 1,
      date: "12 Oct 2025",
      number: "#123456",
      status: "Shipped",
      delivery: "20th Oct",
      products: [product_1, product_2],
    },
    {
      id: 2,
      date: "15 Oct 2025",
      number: "#654321",
      status: "Processing",
      delivery: "25th Oct",
      products: [product_2, product_1],
    },
  ];

  const deliveredOrders = [
    {
      id: 1,
      date: "05 Sep 2025",
      number: "#789012",
      deliveredOn: "10 Sep",
      products: [product_1, product_2],
    },
    {
      id: 2,
      date: "01 Aug 2025",
      number: "#890123",
      deliveredOn: "06 Aug",
      products: [product_2, product_1],
    },
  ];

  return (
    <div className="space-y-10 max-w-[634px]">
      {/* Upcoming Orders */}
      <div>
        <h2 className="text-[#2A2A2A] text-[16px] font-semibold font-poppins mb-2">
          Upcoming Orders
        </h2>

        {upcomingOrders.map((order) => (
          <div
            key={order.id}
            className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-3 mb-4 w-full">
              <div className="flex gap-6 p-1">
                {/* Order Date */}
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Date
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.date}
                  </span>
                </div>
                {/* Order Number */}
                <div className="flex flex-col gap-x-2 text-start">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Number
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.number}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-[6px] mt-2 sm:mt-0">
                <div className="flex items-center justify-center gap-1 text-[12px] font-medium text-[#5A0010] bg-[#FFF5E8] border border-[#5A0010] rounded-full px-3 py-[3px]">
                  <img src={circle} alt="circle" className="w-[8px] h-[8px]" />
                  <span>{order.status}</span>
                </div>
                <button className="text-[#5A0010] text-[12px] font-medium hover:underline">
                  View Order Details
                </button>
              </div>
            </div>

            {/* Product Images */}
            <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
              {order.products.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Product"
                  className="w-[90px] h-[90px] rounded-[8px] object-cover"
                />
              ))}
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-[12px] text-[#A84C32] bg-gradient-to-r from-[#F6D7E0] to-[#FFFFFF] px-3 py-2 mt-4 rounded-[8px] max-w-[230px]">
              <img src={truck_icon} alt="truck" className="w-4 h-4" />
              <span>Est. delivery by {order.delivery}</span>
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
        ))}
      </div>

      {/* Delivered Orders */}
      <div>
        <h2 className="text-[#2A2A2A] text-[16px] font-semibold font-poppins mb-2">
          Delivered
        </h2>

        {deliveredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-3 mb-4">
              <div className="flex gap-6 p-1">
                {/* Order Date */}
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Date
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.date}
                  </span>
                </div>
                {/* Order Number */}
                <div className="flex flex-col text-start">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Number
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.number}
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
              Delivered on {order.deliveredOn}
            </p>

            {/* Product Images */}
            <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
              {order.products.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Product"
                  className="w-[90px] h-[90px] rounded-[8px] object-cover"
                />
              ))}
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
        ))}
      </div>
    </div>
  );
};

const renderFavouritesSection = (products, toggleLike, likedProducts) => (
  <div>
    {likedProducts.length === 0 ? (
      <p className="text-center text-[14px] text-[#4B0010] mt-6 font-poppins">
        No Products in the favourites page
      </p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-6 w-full overflow-visible relative">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-[304px] flex flex-wrap gap-x-10 mx-auto items-center group relative "
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img
                className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] object-cover rounded-[16px] ${
                  product.isOutOfStock ? "grayscale" : ""
                } transition-all duration-300 ease-in-out group-hover:shadow-lg`}
                src={product.src}
                alt={product.name}
              />
              <LikeButton
                liked={product.liked}
                isOutOfStock={product.isOutOfStock}
                onToggle={() => toggleLike(product.id)}
              />
            </div>
            <div className="flex justify-between items-center w-full my-3 gap-x-2">
              <div>
                <p className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                  {product.name}
                </p>
                <p className="text-[#4E4E4E] font-semibold text-[16px]">
                  {product.price}
                </p>
              </div>
              {/* Ellipse */}
              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex justify-center gap-x-2.5 mr-1">
                  <img
                    className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={gold_ellipse}
                    alt="gold ellipse"
                  />
                  <img
                    className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={silver_ellipse}
                    alt="Silver ellipse"
                  />
                  <img
                    className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                    src={brown_ellipse}
                    alt="brown ellipse"
                  />
                </div>
              </div>
            </div>
            <AddToCartButton />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Profile;

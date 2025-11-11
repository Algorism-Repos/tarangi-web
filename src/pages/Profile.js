import React, { useState } from "react";
import { useFormik, Formik } from "formik";
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

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");
  const [isEditing, setIsEditing] = useState(false);

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
  ]);

  const toggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

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

  // ---------------- Address state & handlers ----------------
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

  // id of address currently being edited (null if none)
  const [editingAddressId, setEditingAddressId] = useState(
    addresses[0]?.id ?? null
  );

  // Helper to generate next id
  const nextAddressId = () => {
    if (addresses.length === 0) return 1;
    return Math.max(...addresses.map((a) => a.id)) + 1;
  };

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

  const handleAddressEditClick = (addressId) => {
    setEditingAddressId(addressId);
  };

  const handleAddressSave = (values, { setSubmitting }) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === values.id ? { ...values, isNew: false } : addr
      )
    );
    setEditingAddressId(null);
    setSubmitting(true);
  };

  const handleAddressCancel = (addrId) => {
    const addr = addresses.find((a) => a.id === addrId);
    if (addr && addr.isNew) {
      // remove if it was a new slot
      setAddresses((prev) => prev.filter((a) => a.id !== addrId));
    }
    setEditingAddressId(null);
  };

  const handleAddressDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (editingAddressId === id) setEditingAddressId(null);
  };

  // Profile form (Formik) & handlers 
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };
  const handleSave = () => {
    formik.handleSubmit();
    setIsEditing(false);
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
    <div className="min-h-[972px] bg-[#FFF5E8] py-16 px-4 sm:px-6 lg:px-16 xl:px-28">
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
            {activeSection === "Your Profile" &&
              renderProfileSection(
                formik,
                isEditing,
                handleEdit,
                handleSave,
                handleCancel
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
                  handleCancel
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
  handleCancel
) => (
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
            disabled={!isEditing}
            name="firstName"
            placeholder="John"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium bg-white disabled:cursor-not-allowed"
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
            placeholder="Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium bg-white disabled:cursor-not-allowed"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center w-full py-3.5 px-3 border border-[#efe6e6] rounded-md text-sm bg-white disabled:cursor-not-allowed">
          <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
            IN +91
          </span>
          <span className="h-5 w-px bg-gray-300 mr-2"></span>
          <input
            type="text"
            disabled={!isEditing}
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
          disabled={!isEditing}
          name="email"
          placeholder="johndoe@gmail.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border border-[#D9D9D9] rounded-md px-4 py-3.5 text-sm focus:outline-none placeholder:text-[#2A2A2A] placeholder:font-medium bg-white disabled:cursor-not-allowed"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="flex gap-3 mt-4 justify-end">
        {isEditing ? (
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
              className="border border-[#5A0010] text-[#5A0010] px-6 py-2 rounded-md font-medium text-[14px]"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
          >
            Edit
          </button>
        )}
      </div>
    </form>
  </div>
);

const addressValidationSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  details: Yup.string().nullable(),
  city: Yup.string().required("City is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pin")
    .required("Pin code is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

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
        className="bg-[#5A0010] text-white px-4 py-2 rounded-md text-[14px] mb-4"
      >
        + New Slot
      </button>
    </div>

    {addresses.map((addr) => (
      <div
        key={addr.id}
        className="relative border border-[#D9D9D9] rounded-md p-4 bg-white shadow-[14px]"
      >
        {/* hide icons while this card is being edited */}
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
              name: addr.name ?? "",
              address: addr.address ?? "",
              city: addr.city ?? "",
              pin: addr.pin ?? "",
              state: addr.state ?? "",
              country: addr.country ?? "",
              isNew: addr.isNew ?? false,
            }}
            validationSchema={addressValidationSchema}
            onSubmit={handleSave}
            enableReinitialize
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}

                <input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Address Line"
                  className="w-full border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
                <input
                  type="text"
                  name="detail"
                  placeholder="Detail"
                  className="w-full border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                />

                <div className="grid grid-cols-2 gap-2  ">
                  <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="flex-1 border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                  />
                  {touched.city && errors.city && (
                    <p className="text-red-500 text-xs w-full mt-1">
                      {errors.city}
                    </p>
                  )}

                  <input
                    type="text"
                    name="pin"
                    value={values.pin}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    className="flex-1 border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                  />
                  {touched.pin && errors.pin && (
                    <p className="text-red-500 text-xs w-full mt-1">
                      {errors.pin}
                    </p>
                  )}

                  <input
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="flex-1 border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                  />
                  {touched.state && errors.state && (
                    <p className="text-red-500 text-xs w-full mt-1">
                      {errors.state}
                    </p>
                  )}

                  <input
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="flex-1 border border-[#D9D9D9] rounded-md px-3 py-2 text-[14px] placeholder:text-[#595959]"
                  />
                  {touched.country && errors.country && (
                    <p className="text-red-500 text-xs w-full mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5A0010] text-white px-4 py-2 rounded-md text-[14px] placeholder:text-[#595959]"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(values.id)}
                    className="border border-[#5A0010] text-[#5A0010] px-4 py-2 rounded-md text-[14px] placeholder:text-[#595959]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div className="space-y-1">
            <p className="text-[#000000] font-semibold text-[14px]">
              {addr.name || "—"}
            </p>
            <p className="text-[#000000] text-[13px]">{addr.address || "—"}</p>
            <p className="text-[#555555] text-[13px] leading-relaxed">
              {addr.details || ""}
            </p>
            <p className="text-[#000000] text-[13px] font-medium">
              {addr.city || "—"} • {addr.state || "—"} • {addr.country || "—"} •
              Pin: {addr.pin || "—"}
            </p>
          </div>
        )}
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
            <div className="flex flex-col gap-x-2 text-start">
              <span className="text-[14px] text-[#4B4B4B] font-medium">
                Order Number
              </span>
              <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                #123456
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-[6px] mt-2 sm:mt-0">
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
            <div className="flex flex-col text-start">
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

const renderFavouritesSection = (products, toggleLike, likedProducts) => (
  <div>
    {likedProducts.length === 0 ? (
      <p className="text-center text-[14px] text-[#4B0010] mt-6 font-poppins">
        No Products in the favourites page
      </p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 w-full sm:max-w-[700px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-[304px] flex flex-wrap gap-x-10 mx-auto items-center group relative"
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
              {product.isOutOfStock && (
                <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                  Sold Out
                </p>
              )}
            </div>
            <div className="w-full mt-2 text-left gap-x-2">
              <p className="text-[#000000] font-semibold text-[14px]">
                {product.price}
              </p>
              <p className="text-[#6D6D6D] text-[14px]">{product.name}</p>
            </div>
            <AddToCartButton />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Profile;

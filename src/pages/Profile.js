// import React, { useContext, useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// import userIcon from "../assets/user.png";
// import addressIcon from "../assets/address.png";
// import ordersIcon from "../assets/orders.png";
// import favIcon from "../assets/favourites.png";
// import { AppContext } from "../context/AppContext";
// import editIcon from "../assets/editIcon.png";
// import deleteIcon from "../assets/deleteIcon.png";
// import cartIcon from "../assets/cart.png";
// import truck_icon from "../assets/truck_icon.png";
// import { CustomersOrders, FetchOrderByMail } from "../handler/api_Handler";

// import product_1 from "../assets/Products/product_1.png";
// import product_2 from "../assets/Products/product_2.png";

// const Profile = () => {
//   const [activeSection, setActiveSection] = useState("Your Profile");
//   const { loggedCustomerId } = useContext(AppContext);
//   const [orders, setorder] = useState([])

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       mobile: "",
//       email: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First name is required"),
//       lastName: Yup.string().required("Last name is required"),
//       mobile: Yup.string()
//         .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
//         .required("Mobile number is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   const menuItems = [
//     { name: "Your Profile", icon: userIcon },
//     { name: "Saved Address", icon: addressIcon },
//     { name: "Orders", icon: ordersIcon },
//     { name: "Favourites", icon: favIcon },
//   ];

//  useEffect(() => {
//     if (loggedCustomerId) {
//       // setAddresses(loggedCustomerId?.customer?.addresses);
//     }
//   }, [loggedCustomerId]);

//   const CustomerOrders = async () => {

//     try {
//       const response = await CustomersOrders(loggedCustomerId?.customer?.id);
//       console.log(response);
//       setorder(response.data.orders)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//  useEffect(() => {
//     CustomerOrders()
//     // orderByEmail();
//   }, []);

//   // const orderByEmail = async () => {
//   //   try {
//   //     const response = await FetchOrderByMail("bob@example.com");
//   //     console.log(response);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

// src/pages/Profile.js
import React, { useState, useEffect, useRef, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import userIcon from "../assets/user.png";
import addressIcon from "../assets/address.png";
import ordersIcon from "../assets/orders.png";
import favIcon from "../assets/favourites.png";
import userIconActive from "../assets/userIconActive.png";
import favIconActive from "../assets/favIconActive.png";
import ordersIconActive from "../assets/ordersIconActive.png";
import addressIconActive from "../assets/addressIconActive.png";

import upArrow from "../assets/arrowup.png";
import downArrow from "../assets/arrowDown.png";

import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";

import logout_icon from "../assets/logout_icon.png";
import trashcan from "../assets/Trash.png";

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import circle from "../assets/Ellipse 12.png";
import truck_icon from "../assets/truck_icon.png";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import OrderSummaryPopup from "../components/OrderSummaryPopup";
import { AppContext } from "../context/AppContext";

// NEW: section components
import ProfileSection from "../profilecomponent/ProfileSection";
import AddressSection from "../profilecomponent/AddressSection";
import OrdersSection from "../profilecomponent/OrdersSection";
import FavouritesSection from "../profilecomponent/FavouritesSection";
import { CustomersOrders, FetchOrderByMail } from "../handler/api_Handler";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");
  const [isEditing, setIsEditing] = useState(true);
  const [hasSavedOnce, setHasSavedOnce] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  // delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [imageMap, setImageMap] = useState({});

  // favourites modals
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  // order popup
  const { loggedCustomerId, wishlistItems } = useContext(AppContext);
  const [orders, setorder] = useState([]);
  const savedCustomerId = localStorage.getItem("customerId");
  const profileRef = useRef(null);
  const addressRef = useRef(null);
  const ordersRef = useRef(null);
  const favouritesRef = useRef(null);
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
  const sendTrackOrder = (orderId) => {
    const phoneNumber = "919003058300";
    const message = `Hi, I would like to track my order with the Order ID: ${orderId}`;
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };
  const sendCancelOrder = (orderId) => {
    const phoneNumber = "919003058300";
    const message = `Hi, I would like to cancel my Order with the Order ID:  ${orderId}`;
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  console.log(orders);
  const grouped = {
    fulfilled: orders.filter((o) => o.fulfillment_status === "fulfilled"),
    unfulfilled: orders.filter((o) => o.fulfillment_status !== "fulfilled"),
  };
  console.log(grouped);

  useEffect(() => {
    const id = loggedCustomerId?.customer?.id || savedCustomerId;

    if (id) {
      CustomerOrders(id);
    }
  }, [loggedCustomerId]);
  // profile form

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    const errors = await formik.validateForm();

    formik.setTouched({
      firstName: true,
      lastName: true,
      mobile: true,
      email: true,
    });

    if (Object.keys(errors).length > 0) {
      setIsEditing(true);
      return;
    }

    formik.handleSubmit();
    setHasSavedOnce(true);
    setIsEditing(false);
    setSuccessMessage("Your details have been successfully saved");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const [openSections, setOpenSections] = useState({
    profile: false,
    address: false,
    orders: false,
    favourites: false,
  });

  // favourites data
  const [products, setProducts] = useState([
    {
      id: 1,
      product_name: "Stone Necklace",
      price: "₹10,000",
      liked: true,
      isOutOfStock: false,
      isRestocking: false,
      colorImages: {
        gold: product_1,
        silver: product_2,
        brown: product_2,
      },
      colors: [
        { id: "gold", img: gold_ellipse },
        { id: "silver", img: silver_ellipse },
        { id: "brown", img: brown_ellipse },
      ],
      selectedColor: "gold",
    },
    {
      id: 2,
      product_name: "Stone Kada",
      price: "₹4,000",
      liked: true,
      isOutOfStock: false,
      isRestocking: false,
      colorImages: {
        gold: product_1,
        silver: product_2,
        brown: product_2,
      },
      colors: [
        { id: "gold", img: gold_ellipse },
        { id: "silver", img: silver_ellipse },
        { id: "brown", img: brown_ellipse },
      ],
      selectedColor: "gold",
    },
    {
      id: 3,
      product_name: "Stone Kada",
      price: "₹4,000",
      liked: true,
      isOutOfStock: true,
      isRestocking: false,
      colorImages: {
        gold: product_1,
        silver: product_2,
        brown: product_2,
      },
      colors: [
        { id: "gold", img: gold_ellipse },
        { id: "silver", img: silver_ellipse },
        { id: "brown", img: brown_ellipse },
      ],
      selectedColor: "gold",
    },
    {
      id: 4,
      product_name: "Stone Kada",
      price: "₹4,000",
      liked: true,
      isOutOfStock: false,
      isRestocking: true,
      colorImages: {
        gold: product_1,
        silver: product_2,
        brown: product_2,
      },
      colors: [
        { id: "gold", img: gold_ellipse },
        { id: "silver", img: silver_ellipse },
        { id: "brown", img: brown_ellipse },
      ],
      selectedColor: "gold",
    },
  ]);

  const handleProductClick = (item) => {
    if (item.isOutOfStock) {
      setShowOutStockModal(true);
      return;
    }

    if (item.isRestocking) {
      setShowRestockModal(true);
      return;
    }

    // Later → navigate to product page
  };

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)),
    );
  };

  const handleColorSelect = (productId, colorId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, selectedColor: colorId } : p,
      ),
    );
  };

  const likedProducts = products.filter((p) => p.liked);

  const handleRemove = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, liked: false } : item)),
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "hasFavourites",
      likedProducts.length > 0 ? "true" : "false",
    );
  }, [likedProducts]);

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const allClosed = Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {},
      );
      return { ...allClosed, [key]: !prev[key] };
    });
  };

  const tax = 800;
  const shipping = 0;
  // const total = subTotal + tax + shipping;

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
      prev.map((a) => (a.id === values.id ? { ...values, isNew: false } : a)),
    );
    setEditingAddressId(null);
    setSubmitting(false);
    setSuccessMessage("Your address has been successfully saved!");
    setTimeout(() => setSuccessMessage(""), 3000);
    console.log("✅ Address Saved:", values);
  };

  const handleAddressCancel = (id) => {
    const addr = addresses.find((a) => a.id === id);
    if (addr && addr.isNew)
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    setEditingAddressId(null);
  };

  const handleAddressDelete = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const menuItems = [
    // { name: "Your Profile", icon: userIcon, activeIcon: userIconActive },
    // { name: "Saved Address", icon: addressIcon, activeIcon: addressIconActive },
    { name: "Orders", icon: ordersIcon, activeIcon: ordersIconActive },
    // { name: "Favourites", icon: favIcon, activeIcon: favIconActive },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("favourites");
    localStorage.setItem("hasFavourites", "false");
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("favouritesUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/login");
  };

  useEffect(() => {
    const sectionMap = {
      profile: profileRef,
      address: addressRef,
      orders: ordersRef,
      favourites: favouritesRef,
    };

    const ref =
      sectionMap[Object.keys(openSections).find((key) => openSections[key])];

    if (ref?.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        ref.current.focus();
      }, 200);
    }
  }, [openSections]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const CustomerOrders = async (customerId) => {
    try {
      if (!customerId) return;

      const response = await CustomersOrders(customerId);
      setorder(response.data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const customerId =
      loggedCustomerId?.customer?.id || localStorage.getItem("customerId");

    if (customerId) {
      CustomerOrders(customerId);
    }
  }, [loggedCustomerId]);
  console.log("loggedCustomerId:", loggedCustomerId);
  console.log("order:", orders);

  return (
    <div className="min-h-fit bg-[#FFF5E8] py-16 px-2 sm:px-6 lg:px-16 xl:px-28">
      <div className="max-w-[1280px] mx-auto space-y-20">
        <div className="md:flex flex-auto justify-items-center">
          <h1 className="font-atteron text-[#5A0010] text-[28px] leading-[42px]">
            Orders
          </h1>
        </div>
        <div>
          <h2 className="text-[#2A2A2A] text-[16px] font-semibold font-poppins mb-2">
            Orders
          </h2>
          {orders.map((fulfillmentsOrder) => (
            <div className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-3 mb-4 w-full">
                <div className="flex gap-6 p-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] text-[#4B4B4B] font-medium">
                      Order ID : {fulfillmentsOrder.id}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                {fulfillmentsOrder?.line_items?.map((line_items, idx) => (
                  <div>
                    <p>Product : {line_items.title}</p>
                    <p>
                      Price :{" "}
                      {parseInt(line_items?.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  className="flex-1 bg-[#4B001A] text-white text-[14px] font-semibold py-2.5 rounded-full"
                  onClick={() =>
                    sendTrackOrder(fulfillmentsOrder.fulfillments[0]?.order_id)
                  }
                >
                  Track Order
                </button>
                <button
                  className="flex-1 border border-[#4B001A] text-[#4B001A] text-[14px] font-semibold py-2.5 rounded-full"
                  onClick={() =>
                    sendCancelOrder(fulfillmentsOrder.fulfillments[0]?.order_id)
                  }
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:flex flex-row gap-10 md:gap-16">
          <div className="flex-1 bg-transparent">
            {activeSection === "Orders" && <OrdersSection grouped={grouped} />}

            {activeSection === "Favourites" && (
              <FavouritesSection
                wishlistItems={wishlistItems}
                handleProductClick={handleProductClick}
                toggleLike={toggleLike}
                handleColorSelect={handleColorSelect}
                handleRemove={handleRemove}
                showOutStockModal={showOutStockModal}
                setShowOutStockModal={setShowOutStockModal}
                showRestockModal={showRestockModal}
                setShowRestockModal={setShowRestockModal}
                showRestockSuccess={showRestockSuccess}
                setShowRestockSuccess={setShowRestockSuccess}
              />
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN LAYOUT */}
        <div className="block md:hidden gap-y-4 flex flex-col">
          {/* Profile Dropdown */}
          <div
            ref={profileRef}
            tabIndex="-1"
            className="bg-[#FFF5E8] rounded-[10px]"
          >
            <button
              type="button"
              onClick={() => toggleSection("profile")}
              className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="w-[30px] h-[30px]"
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
                <ProfileSection
                  formik={formik}
                  isEditing={isEditing}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  hasSavedOnce={hasSavedOnce}
                  successMessage={successMessage}
                />
              </div>
            )}
          </div>

          {/* Address Dropdown */}
          <div
            ref={addressRef}
            tabIndex="-1"
            className="bg-[#FFF5E8] rounded-[10px]"
          >
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
                <AddressSection
                  addresses={addresses}
                  editingAddressId={editingAddressId}
                  handleAddNew={handleAddNew}
                  handleEditClick={handleAddressEditClick}
                  handleSave={handleAddressSave}
                  handleCancel={handleAddressCancel}
                  handleAddressDelete={handleAddressDelete}
                  successMessage={successMessage}
                />
              </div>
            )}
          </div>

          {/* Orders Dropdown */}
          <div
            ref={ordersRef}
            tabIndex="-1"
            className="bg-[#FFF5E8] rounded-[10px]"
          >
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
                <OrdersSection grouped={grouped} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

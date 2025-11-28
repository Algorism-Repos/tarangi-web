// src/pages/Profile.js
import React, { useState, useEffect, useRef } from "react";
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
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import OrderSummaryPopup from "../components/OrderSummaryPopup";

// NEW: section components
import ProfileSection from "../profilecomponent/ProfileSection";
import AddressSection from "../profilecomponent/AddressSection";
import OrdersSection from "../profilecomponent/OrdersSection";
import FavouritesSection from "../profilecomponent/FavouritesSection";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");
  const [isEditing, setIsEditing] = useState(true);
  const [hasSavedOnce, setHasSavedOnce] = useState(false);
  const { loggedCustomerId } = useContext(AppContext);
  const [orders, setorder] = useState([])
  const [successMessage, setSuccessMessage] = useState("");

  // delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // favourites modals
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);

  // order popup
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // profile form
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
      console.log(" Form Submitted:", values);
    },
  });

  useEffect(() => {
    if (loggedCustomerId) {
      setAddresses(loggedCustomerId?.customer?.addresses);
    }
  }, [loggedCustomerId]);



  const CustomerOrders = async () => {
    try {
      const response = await CustomersOrders(loggedCustomerId?.customer?.id);
      console.log(response.data);
      setorder(response.data.orders)
    } catch (error) {
      console.log(error);
    }
  };

  // const orderByEmail = async () => {
  //   try {
  //     const response = await FetchOrderByMail("bob@example.com");
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    CustomerOrders()
    // orderByEmail();
  }, []);
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
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const handleColorSelect = (productId, colorId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, selectedColor: colorId } : p
      )
    );
  };

  const likedProducts = products.filter((p) => p.liked);

  const handleRemove = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: false } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "hasFavourites",
      likedProducts.length > 0 ? "true" : "false"
    );
  }, [likedProducts]);

  const toggleSection = (key) => {
    setOpenSections((prev) => {
      const allClosed = Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {}
      );
      return { ...allClosed, [key]: !prev[key] };
    });
  };

  // Order details for popup
  const orderItems =
    selectedOrder?.products?.map((p) => ({
      product_img: p,
      product_name: "Product Name",
      quantity: 1,
      free: false,
      price: 1200,
    })) || [];

  const subTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = 800;
  const shipping = 0;
  const total = subTotal + tax + shipping;

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
    addresses.length === 0
      ? 1
      : Math.max(...addresses.map((a) => a.id)) + 1;

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
      prev.map((a) =>
        a.id === values.id ? { ...values, isNew: false } : a
      )
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
    { name: "Your Profile", icon: userIcon, activeIcon: userIconActive },
    { name: "Saved Address", icon: addressIcon, activeIcon: addressIconActive },
    { name: "Orders", icon: ordersIcon, activeIcon: ordersIconActive },
    { name: "Favourites", icon: favIcon, activeIcon: favIconActive },
  ];
  // logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    // Update login status
    localStorage.setItem("isLoggedIn", "false");

    // Clear user-related data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("favourites");
    localStorage.setItem("hasFavourites", "false");
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("favouritesUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/login");
  };


  const profileRef = useRef(null);
  const addressRef = useRef(null);
  const ordersRef = useRef(null);
  const favouritesRef = useRef(null);

  useEffect(() => {
    const sectionMap = {
      profile: profileRef,
      address: addressRef,
      orders: ordersRef,
      favourites: favouritesRef,
    };

    const ref =
      sectionMap[
      Object.keys(openSections).find((key) => openSections[key])
      ];

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

  return (
    <div className="min-h-fit bg-[#FFF5E8] py-16 px-4 sm:px-6 lg:px-16 xl:px-28">
      <div className="max-w-[1280px] mx-auto space-y-20">
        <div className="md:flex flex-auto justify-items-center">
          <h1 className="font-atteron text-[#5A0010] text-[28px] leading-[42px]">
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
                      ${isActive
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
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 text-[#6D6D6D] mt-[240px] hover:bg-[#F4E7E7] hover:text-[#5A0010] rounded-[8px] text-[16px] font-poppins"
            >
              <img src={logout_icon} alt="Logout" className="w-[30px] h-[30px] object-contain" />
              Logout
            </button>

          </div>

          <div className="flex-1 bg-transparent">
            {activeSection === "Your Profile" && (
              <ProfileSection
                formik={formik}
                isEditing={isEditing}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                hasSavedOnce={hasSavedOnce}
                successMessage={successMessage}
              />
            )}

            {activeSection === "Saved Address" && (
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
            )}

            {activeSection === "Orders" && (
              <OrdersSection
                setSelectedOrder={setSelectedOrder}
                setShowOrderPopup={setShowOrderPopup}
              />
            )}

            {activeSection === "Favourites" && (
              <FavouritesSection
                likedProducts={likedProducts}
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
                <OrdersSection
                  setSelectedOrder={setSelectedOrder}
                  setShowOrderPopup={setShowOrderPopup}
                />
              </div>
            )}
          </div>

          {/* Favourites Dropdown */}
          <div
            ref={favouritesRef}
            tabIndex="-1"
            className="bg-[#FFF5E8] rounded-[10px]"
          >
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
              <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8]">
                <FavouritesSection
                  likedProducts={likedProducts}
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
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3  px-5 py-3 mt-[150px] text-[#6D6D6D] hover:bg-[#F4E7E7] hover:text-[#5A0010] rounded-[8px] text-[16px] font-poppins"
          >
            <img
              src={logout_icon}
              alt="Logout"
              className="w-[30px] h-[30px] object-contain"
            />
            Logout
          </button>
        </div>
      </div>

      {/* Delete confirmation modal*/}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setAddresses((prev) =>
            prev.filter((a) => a.id !== addressToDelete)
          );
          setIsDeleteModalOpen(false);
        }}
        title="Are you Sure"
        message="You want to delete this address ??"
        confirmText="Delete"
        cancelText="Cancel"
        icon={trashcan}
      />

      <OrderSummaryPopup
        open={showOrderPopup}
        onClose={() => setShowOrderPopup(false)}
        order={selectedOrder}
        orderItems={orderItems}
        subTotal={subTotal}
        tax={tax}
        shipping={shipping}
        total={total}
      />
    </div>
  )


  {/* MOBILE DROPDOWN LAYOUT */ }
  < div className = "block md:hidden gap-y-4 flex flex-col" >
    {/* Profile Dropdown */ }
    < div className = "bg-[#FFF5E8] rounded-[10px]" >
      <button type="button" onClick={() => toggleSection("profile")} className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]">
        <div className="flex items-center gap-2">
          <img src={userIcon} alt="Profile" className="w-[30px] h-[30px]" />
          <span>Your Profile</span>
        </div>
        <img src={openSections.profile ? upArrow : downArrow} alt="Toggle" className="w-[11px] h-[7px]" />
      </button>
{ openSections.profile && <div className="border-t px-4 py-4 bg-[#FFF5E8] transition-all duration-300">{renderProfileSection(formik, isEditing, handleEdit, handleSave, handleCancel, hasSavedOnce, successMessage)}</div> }
          </div >

  {/* Address Dropdown */ }
  < div className = "bg-[#FFF5E8] rounded-[10px]" >
    <button type="button" onClick={() => toggleSection("address")} className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]">
      <div className="flex items-center gap-2">
        <img src={addressIcon} alt="Address" className="w-[30px] h-[30px]" />
        <span>Saved Address</span>
      </div>
      <img src={openSections.address ? upArrow : downArrow} alt="Toggle" className="w-[11px] h-[7px]" />
    </button>
{ openSections.address && <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">{renderAddressSection(addresses, editingAddressId, handleAddNew, handleAddressEditClick, handleAddressSave, handleAddressCancel, handleAddressDelete, successMessage)}</div> }
          </div >

  {/* Orders Dropdown */ }
  < div className = "bg-[#FFF5E8] rounded-[10px]" >
    <button type="button" onClick={() => toggleSection("orders")} className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]">
      <div className="flex items-center gap-2">
        <img src={ordersIcon} alt="Orders" className="w-[30px] h-[30px]" />
        <span>Orders</span>
      </div>
      <img src={openSections.orders ? upArrow : downArrow} alt="Toggle" className="w-[11px] h-[7px]" />
    </button>
{ openSections.orders && <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">{renderOrdersSection()}</div> }
          </div >

  {/* Favourites Dropdown */ }
  < div className = "bg-[#FFF5E8] rounded-[10px]" >
    <button type="button" onClick={() => toggleSection("favourites")} className="w-full flex justify-between items-center px-4 py-3 text-[#6E0027] font-medium text-[16px]">
      <div className="flex items-center gap-2">
        <img src={favIcon} alt="Favourites" className="w-[30px] h-[30px]" />
        <span>Favourites</span>
      </div>
      <img src={openSections.favourites ? upArrow : downArrow} alt="Toggle" className="w-[11px] h-[7px]" />
    </button>
{ openSections.favourites && <div className="border-t border-[#F6EFE6] px-4 py-4 bg-[#FFF5E8] transition-all duration-300">{renderFavouritesSection(products, toggleLike, likedProducts)}</div> }
          </div >
  <button
    onClick={handleLogout}
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
     
    

  {/* Delete confirmation modal (render inside component so state is available) */ }
  < DeleteConfirmationModal
isOpen = { isDeleteModalOpen }
onCancel = {() => setIsDeleteModalOpen(false)}
onConfirm = {() => {
  setAddresses((prev) => prev.filter(a => a.id !== addressToDelete));
  setIsDeleteModalOpen(false);
}}
title = "Are you Sure"
message = "You want to delete this address ??"
confirmText = "Delete"
cancelText = "Cancel"
icon = { trashcan }
  />
};

export default Profile;

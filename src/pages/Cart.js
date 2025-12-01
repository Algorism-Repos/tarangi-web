import React, { useState, useEffect } from "react";
// import { Link } from "react-router"; // <- not used, so removed
import QuantitySelector from "../components/QuantitySelector";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// Images
import red_arrow from "../assets/Products/down_arrow_red.png";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import close_icon from "../assets/Products/cart-close_icon.png";
import Pincode_Input from "../components/Pincode_Input";

function Cart() {
  const [showSummary, setShowSummary] = useState(false);

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  
  const initialCartItems = [
    {
      id: 1,
      name: "Stone Necklace",
      price: 10000,
      color: "Gold",
      image: product_1,
    },
    {
      id: 2,
      name: "Silver Kada",
      price: 4000,
      color: "Silver",
      image: product_2,
    },
  ];

  const [cartItems, setCartItems] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems"));
    if (Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    return initialCartItems;
  });

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Keep localStorage in sync + notify Navbar
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));

  //   // optional: simple flag if you want
  //   localStorage.setItem(
  //     "hasCartItems",
  //     cartItems.length > 0 ? "true" : "false"
  //   );

  //   // Notify Navbar (and others) in this tab
  //   window.dispatchEvent(new Event("cartUpdated"));
  // }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = 800;
  const total = subtotal + tax;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="font-poppins bg-light-sandal pt-[35px] ">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="lg:flex flex-auto justify-items-center  gap-x-[18px]">
            <h2 className="font-atteron text-[24px] text-primary sm:text-[36px]">
              your cart
            </h2>
          </div>

          {/* Main container */}
          <div className="flex flex-wrap justify-between gap-y-14 px-5 my-[60px] sm:px-0 sm:my-[80px] max-[425px]:my-[40px] max-[375px]:my-[30px] ">
            {/* Selected Productlist */}
            <div className="w-[694px] mx-auto xl:mx-0 max-[425px]:w-full">
              {cartItems.length === 0 ? (
                <h3 className="text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
                  No Products in the Cart
                </h3>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mb-[25px] max-[425px]:p-[16px]"
                  >
                    {/* DELETE ICON  */}
                    <img
                      className="float-right w-[29px] h-[29px] cursor-pointer max-[425px]:w-[22px] max-[425px]:h-[22px]"
                      src={close_icon}
                      alt="close icon"
                      onClick={() => {
                        setProductToDelete(item.id);
                        setIsDeleteModalOpen(true);
                      }}
                    />

                    <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center max-[425px]:gap-x-[12px]">
                      <img
                        className="w-[140px] sm:w-[233px] sm:h-[239px] rounded-[12px] max-[425px]:w-[100px]"
                        src={item.image}
                        alt="product image"
                      />

                      <div className="space-y-[10px]">
                        <div>
                          <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px]">
                            {item.name}
                          </h3>
                          <h3 className="text-[16px] font-semibold sm:text-[20px]">
                            ₹{item.price.toLocaleString("en-IN")}
                          </h3>
                        </div>

                        <div>
                          <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                            Color chosen
                          </h3>
                          <h3 className="text-[15px] font-medium sm:text-[18px]">
                            {item.color}
                          </h3>
                        </div>

                        <div>
                          <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                            Quantity
                          </h3>
                          <QuantitySelector />
                        </div>

                        <h3 className="text-[13px] text-primary sm:text-[16px]">
                          Delivered by Oct 10
                        </h3>
                      </div>
                    </div>

                    {/* Free silver cleaning kit */}
                    {item.price > 2000 && (
                      <>
                        <hr className="border border-[#EDEDED] my-[14px]" />
                        <div className="sm:flex items-center gap-x-[20px]">
                          <img
                            className="w-[73px] h-[74px] rounded-[16px]"
                            src={product_1}
                            alt="free kit"
                          />

                          <div className="flex items-center justify-between w-full">
                            <div>
                              <h3 className="text-[#404040] text-[14px] font-medium sm:text-[18px]">
                                Free Silver Cleaning Kit
                              </h3>
                              <h3 className="text-[12px] text-[#6E6E6E] sm:text-[16px]">
                                Added for products above ₹2000
                              </h3>
                            </div>
                            <p className="bg-[#C5A881] px-4 py-1 rounded-full text-[#404040] text-[13px]">
                              Free
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Summary Box (Desktop) */}
            {cartItems.length > 0 && (
              <div className="w-[466px] mx-auto xl:mx-0 max-[425px]:w-full hidden lg:block">
                <Pincode_Input />

                <div className="bg-[#FFFAF3] p-[24px] rounded-[16px] shadow-2xl mt-[25px]">
                  <div className="space-y-[16px]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-semibold">
                        Sub total
                      </h3>
                      <h3 className="text-[16px] text-[#404040] font-medium">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-semibold">
                        Tax
                      </h3>
                      <h3 className="text-[16px] text-[#404040] font-medium">
                        ₹{tax.toFixed(0)}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-semibold">
                        Shipping
                      </h3>
                      <h3 className="text-[16px] text-primary font-medium">
                        Free
                      </h3>
                    </div>

                    <hr className="border border-[#EDEDED] my-[18px]" />

                    <div className="flex items-center justify-between py-3">
                      <h3 className="text-[18px] text-[#878787] font-semibold">
                        Total
                      </h3>
                      <h3 className="text-[18px] text-[#404040] font-medium">
                        ₹{total.toFixed(0)}
                      </h3>
                    </div>

                    <button className="bg-[#4B001A] text-white w-full h-[51px] rounded-full">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommended products */}
          <div className="py-12 px-5 md:px-0 max-[425px]:my-[60px]">
            <h1 className="font-atteron  text-primary text-[26px] text-center sm:text-[30px] xl:text-left max-[425px]:text-[22px] mx-auto">
              Frequently bought together
            </h1>
            <div className="sm:max-w-fit mx-auto xl:mx-0 ">
              <div className="bg-[#FFFAF3] max-w-[580px] p-[24px] rounded-[16px] shadow-2xl mt-[25px] max-[425px]:p-[16px] ">
                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center justify-between max-[425px]:gap-x-[10px]">
                  {/* Product 1 */}
                  <div className="relative space-y-[10px]">
                    <input
                      type="checkbox"
                      className="absolute top-5 right-3 w-[18px] h-[18px] accent-[#6E0027] border-2 border-[#6E0027] outline-[#6E0027] rounded-sm cursor-pointer"
                    />
                    <img
                      className="w-[148px] sm:w-[233px] rounded-[12px]"
                      src={product_1}
                      alt="product image"
                    />
                    <div>
                      <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px] max-[425px]:text-[13px]">
                        Stone Necklace
                      </h3>
                      <h3 className="text-[16px] font-semibold sm:text-[20px] max-[425px]:text-[15px]">
                        ₹10,000
                      </h3>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="relative space-y-[10px]">
                    <input
                      type="checkbox"
                      className="absolute top-5 right-3 w-[18px] h-[18px] accent-[#6E0027] border-2 border-[#6E0027] rounded-sm cursor-pointer"
                    />
                    <img
                      className="w-[148px] sm:w-[233px] rounded-[12px]"
                      src={product_2}
                      alt="product image"
                    />
                    <div>
                      <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px] max-[425px]:text-[13px]">
                        Tulip Brooch
                      </h3>
                      <h3 className="text-[16px] font-semibold sm:text-[20px] max-[425px]:text-[15px]">
                        ₹2,000
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mt-[24px]">
                  <button className="bg-[#4B001A] w-full h-[51px] rounded-full text-white mt-[24px] max-[425px]:h-[46px] max-[425px]:text-[15px]">
                    Add to cart : ₹12,000
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version Summary */}
          {cartItems.length > 0 && (
            <div className="block lg:hidden">
              {showSummary && (
                <div className="bg-[#FFFAF3] p-4 max-w-[361px] rounded-[12px] shadow-lg mt-4 m-auto my-9 transition-all duration-300 ease-in-out">
                  <h3 className="text-[15px] font-semibold text-[#404040] mb-3">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-[#878787] font-semibold">
                        Sub total
                      </p>
                      <p className="text-[14px] text-[#404040] font-medium">
                        {subtotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-[#878787] font-semibold">
                        Tax
                      </p>
                      <p className="text-[14px] text-[#404040] font-medium">
                        {tax.toFixed(0)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-[#878787] font-semibold">
                        Shipping
                      </p>
                      <p className="text-[14px] text-[#C70039] font-medium">
                        Free
                      </p>
                    </div>
                    <hr className="border border-[#EDEDED] my-[10px]" />
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] text-[#878787] font-semibold">
                        Total
                      </p>
                      <p className="text-[15px] text-[#404040] font-semibold">
                        {total.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Pincode_Input />
              <div className="w-full bg-[#FFFAF3] flex items-center justify-between px-5 py-3 z-50 bottom-0 left-0">
                <div>
                  <p className="text-[#404040] font-semibold text-[16px]">
                    ₹{total.toFixed(0)}
                  </p>
                  <button
                    onClick={toggleSummary}
                    className="text-[#6E0027] text-[12px] underline"
                  >
                    {showSummary ? "Hide Order Summary" : "View Order Summary"}
                  </button>
                </div>
                <button className="bg-[#4B001A] text-white px-6 py-2 rounded-full font-medium text-[14px]">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Remove Item"
        message="Are you sure you want to remove this product from your cart?"
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={() => {
          setCartItems((prev) =>
            prev.filter((item) => item.id !== productToDelete)
          );
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
      />
    </>
  );
}

export default Cart;

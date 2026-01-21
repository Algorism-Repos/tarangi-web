import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import QuantitySelector from "../components/QuantitySelector";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// Images
import red_arrow from "../assets/Products/down_arrow_red.png";
import SilverCleaningKit from "../assets/Products/Silver Cleaning Kit.png";
import product_2 from "../assets/Products/product_2.png";
import close_icon from "../assets/Products/cart-close_icon.png";
import Pincode_Input from "../components/Pincode_Input";
import { AppContext } from "../context/AppContext";
import AddToCartButton from "../components/AddToCartButton";

function Cart() {
  const [showSummary, setShowSummary] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boughtTogether, setboughtTogether] = useState(() => {
  try {
    const saved = localStorage.getItem("boughtTogether");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  const [productToDelete, setProductToDelete] = useState(null);
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    categorizedProduct,
  } = useContext(AppContext);
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const subtotal = cartItems?.reduce((total, item) => {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.quantity) || 1;
    return total + price * qty;
  }, 0);
  const tax = subtotal * 0.03;
  const shipping = 0;
  const total = subtotal + tax + shipping;
  // console.log(categorizedProduct);

  // console.log(cartItems);

  const getProductPrice = (item) => {
    if (item.variants && item.variants.length > 0) {
      return Number(item.variants[0].price);
    }
    return Number(item.price);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // localStorage.setItem(
    //   "categorizedProduct",
    //   JSON.stringify(categorizedProduct)
    // );
    if (!Array.isArray(categorizedProduct) || categorizedProduct.length === 0) {
    return;
  }

  const filterOutofStockProducts = categorizedProduct.filter((item) => {
    const hasVariants = item.variants && item.variants.length > 0;

    return hasVariants
      ? item.variants.every(
          (v) => v.inventoryQuantity !== 0 && v.price <= 6000
        )
      : item.inventoryQuantity !== 0 && item.price <= 6000;
  });

  setboughtTogether(filterOutofStockProducts);
}, [categorizedProduct]);

  //   if (categorizedProduct) {
  //     // setProducts(normalizeProducts(categorizedProduct));
  //     const filterOutofStockProducts = categorizedProduct.filter((item) => {
  //       const hasVariants = item.variants && item.variants.length > 0;

  //       return hasVariants
  //         ? item.variants.every(
  //             (i) => i.inventoryQuantity !== 0 && i.price <= 6000
  //           )
  //         : item.inventoryQuantity !== 0 && item.price <= 6000;
  //     });
  //     setboughtTogether(filterOutofStockProducts);
  //   }
  // }, [cartItems, categorizedProduct]);

  useEffect(() => {
  if (boughtTogether.length > 0) {
    localStorage.setItem(
      "boughtTogether",
      JSON.stringify(boughtTogether)
    );
  }
}, [boughtTogether]);


  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );
  return (
    <>
      <div className="font-poppins bg-light-sandal pt-[35px] sm:py-[70px]">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <h2 className="font-atteron text-[24px] text-primary sm:text-[36px] ml-2 xl:ml-0">
            Your Cart
          </h2>

          <h5 className="font-poppins text-[12px] sm:text-[14px] ml-3 xl:ml-2 uppercase">
            TOTAL ITEMS IN BAG :{" "}
            <span className="font-bold">
              {String(totalCartQuantity).padStart(2, "0")}
            </span>
          </h5>

          {/* Main container */}
          <div className="flex flex-wrap justify-between gap-y-14 px-3 my-[60px] sm:px-0 sm:my-[80px] max-[425px]:my-[40px] max-[375px]:my-[30px] ">
            {/* Selected Productlist */}
            <div className="w-[694px] mx-auto xl:mx-0 max-[425px]:w-full">
              {cartItems?.length === 0 ? (
                <Link to="/products/womens">
                  <h3 className="hover:underline text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
                    No items yet. Find something you'll love
                  </h3>
                </Link>
              ) : (
                cartItems?.map((item) => (
                  
                  <div
                    key={item?.id}
                    className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mb-[25px] max-[425px]:p-[16px]"
                  >
                    {/*  DELETE ICON (opens modal) */}
                    <img
                      className="float-right w-[29px] h-[29px] cursor-pointer max-[425px]:w-[22px] max-[425px]:h-[22px]"
                      src={close_icon}
                      alt="close icon"
                      onClick={() => {
                        setProductToDelete(item);
                        setIsDeleteModalOpen(true);
                      }}
                    />

                    <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center max-[425px]:gap-x-[12px]">
                      <img
                        className="w-[140px] h-[148px] sm:w-[233px] sm:h-[239px] rounded-[16px] "
                        src={item?.image || item?.variants?.[0]?.image}
                        alt="product image"
                      />

                      <div className="space-y-[3px] sm:space-y-[15px]">
                        <div>
                          
                          <Link
                            to={`/product_description/${item?.title?.replace(
                              /\s+/g,
                              "-"
                            )}`}
                            state={{
                              product: categorizedProduct.find((p) =>
                                p.type === "simple"
                                  ? p.variantId === item?.variantId
                                  : p.variants?.some(
                                      (v) => v.variantId === item?.variantId
                                    )
                              ),
                            }}
                          >
                            <h3 className="text-[10px] font-medium text-[#6F6F6F] sm:text-[16px]">
                              {item.title}
                            </h3>
                          </Link>
                          <h3 className="text-[12px] font-semibold sm:text-[20px]">
                            ₹
                            {Number(
                              item?.price ?? item?.variants?.[0]?.price ?? 0
                            ).toLocaleString("en-IN")}
                          </h3>
                        </div>

                        <div
                          className={item?.colorVariant ? "block" : "hidden"}
                        >
                          <h3 className="text-[10px] text-[#6F6F6F] sm:text-[14px]">
                            Color chosen
                          </h3>
                          <h3 className="text-[12px] font-medium sm:text-[18px]">
                            {item?.colorVariant}
                          </h3>
                        </div>

                        <div>
                          <h3 className="text-[10px] text-[#6F6F6F] sm:text-[14px] leading-none">
                            Quantity
                          </h3>
                          <QuantitySelector
                            maxQuantity={10}
                            value={item?.quantity}
                            onChange={(newQty) =>
                              updateCartItemQuantity(item.variantId, newQty)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Free silver cleaning kit */}
                    {Number(item?.price ?? item?.variants?.[0]?.price) >=
                      10000 && (
                      <>
                        <hr className="border border-[#EDEDED] my-[14px]" />
                        <div className="flex items-center gap-x-[20px] justify-between">
                          <div className="flex flex-row items-center gap-x-3 sm:gap-x-5">
                            <img
                              className="w-[37px] h-[38px] sm:w-[73px] sm:h-[74px] rounded-[4px] sm:rounded-[16px]"
                              src={SilverCleaningKit}
                              alt="free kit"
                            />
                            <div className="">
                              <h3 className="text-[#404040] text-[12px] font-medium sm:text-[18px]  sm:mt-0">
                              Silver Cleaning Kit
                              </h3>
                              <h3 className="text-[10px] text-[#6E6E6E] sm:text-[16px]">
                                Added for products above ₹10,000
                              </h3>
                            </div>
                          </div>
                          <p className="bg-[#C5A881] px-4 py-1 rounded-full text-[#404040] text-[12px]">
                            Free
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Summary Box (Desktop) */}
            {cartItems?.length > 0 && (
              <div className="w-[466px] mx-auto xl:mx-0 max-[425px]:w-full hidden sm:block">
                <div className="bg-[#FFFAF3] p-[24px] rounded-[16px] shadow-2xl mt-[25px]">
                  <div className="space-y-[16px]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-normal">
                        Sub total
                      </h3>
                      <h3 className="text-[16px] text-[#404040] font-normal">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-normal">
                        Tax
                      </h3>
                      <h3 className="text-[16px] text-[#404040] font-normal">
                        ₹{tax.toFixed(0)}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] text-[#878787] font-normal">
                        Shipping
                      </h3>
                      <h3 className="text-[16px] text-primary font-medium max-[425px]:text-[14px]">
                        {shipping === 0 ? "Free" : `₹ ${shipping}`}
                      </h3>
                    </div>

                    <hr className="border border-[#EDEDED] my-[18px]" />

                    <div className="flex items-center justify-between py-3">
                      <h3 className="text-[18px] text-[#878787] font-semibold">
                        Total
                      </h3>
                      <h3 className="text-[18px] text-[#404040] font-medium">
                        ₹{total.toLocaleString("en-IN")}
                      </h3>
                    </div>

                    <div className="flex flex- w-full gap-x-[25px]">
                      <Link
                        to={"/products/:handle"}
                        className="text-[15px] border-primary border-2 rounded-full py-3 px-4 text-primary"
                      >
                        Continue Shopping
                      </Link>

                      <Link
                        to="/checkout"
                        state={{
                          subtotal: subtotal,
                          shipping: shipping,
                          tax: tax,
                          total: total,
                        }}
                      >
                        <button className="bg-[#4B001A] text-white w-[210px] py-3 rounded-full text-[16px]">
                          Place Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommended products */}
          <div className="my-[100px] px-2 md:px-0 max-[425px]:my-[60px]">
            <h1 className="font-atteron  text-primary text-[26px] text-center sm:text-[30px] xl:text-left max-[425px]:text-[22px] mx-auto">
              {cartItems?.length > 0
                ? "Frequently bought together"
                : "Our favourites, just for you"}
            </h1>
            <div className="sm:max-w-fit mx-auto xl:mx-0 ">
              <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap  gap-y-9 sm:gap-x-[50px] items-center justify-center max-[425px]:gap-x-[10px]">
                {boughtTogether.slice(0, 4)?.map((item) => (
                  <div className="bg-[#FFFAF3] max-w-[580px] p-[24px] rounded-[16px] shadow-2xl mt-[25px] max-[425px]:p-[16px] ">
                    <div className="relative">
                      {/* <input
                        type="checkbox"
                        className="absolute top-5 right-3 w-[18px] h-[18px] accent-[#6E0027] border-2 border-[#6E0027] outline-[#6E0027] rounded-sm cursor-pointer"
                      /> */}
                      <img
                        className="w-[148px] sm:w-[233px] h-[239px] object-cover rounded-[12px]"
                        src={item?.images?.[0]}
                        alt="product image"
                      />
                      <div>
                        <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px] max-[425px]:text-[13px] mt-6">
                          {item?.title}
                        </h3>
                        <h3 className="text-[16px] font-semibold sm:text-[20px] max-[425px]:text-[15px]">
                          ₹
                          {item.variants !== null
                            ? parseInt(
                                item?.variants?.[0].price
                              ).toLocaleString("en-IN")
                            : parseInt(item?.price).toLocaleString("en-IN")}
                        </h3>
                      </div>
                    </div>
                    {/* Total Price */}
                    <div className="mt-[20px]">
                      <Link
                        key={item.id}
                        to={`/product_description/${item.title.replace(
                          /\s+/g,
                          "-"
                        )}`}
                        state={{ product: item }}
                      >
                        <button
                          className="cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] rounded-full text-primary text-[12px] sm:text-[18px] font-medium mt-2
                                            transition-all duration-300 hover:bg-[#4B001A] hover:text-white w-full h-[40px] sm:h-[50px]"
                        >
                          View Product Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Version Summary */}
          {cartItems?.length > 0 && (
            <div className="block sm:hidden">
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
                        {total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

                {/* <Link to="/" className="flex items-center justify-center gap-x-[8px] bg-[#4B001A] w-[220px] h-[56px] rounded-full text-white text-[18px] font-medium ">
                  Continue Shopping
                </Link > */}
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
          if (productToDelete) {
            removeFromCart(productToDelete.variantId);
          }
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
      />
    </>
  );
}

export default Cart;

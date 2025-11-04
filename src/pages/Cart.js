import React from "react";
import { Link } from "react-router";
import QuantitySelector from "../components/QuantitySelector";

// Images
import red_arrow from '../assets/Products/down_arrow_red.png'
import product_1 from '../assets/Products/product_1.png'
import product_2 from '../assets/Products/product_2.png'
import close_icon from '../assets/Products/cart-close_icon.png'
import Pincode_Input from "../components/Pincode_Input";

function Cart() {
    return (
        <>
            <div className="font-poppins bg-light-sandal py-[70px] max-[425px]:py-[40px] max-[375px]:py-[30px] max-[320px]:py-[25px]">

                <div className="max-w-[1300px] mx-auto">

                    {/* Back button */}
                    {/* <Link
                        to="/productdescription"
                        className="flex items-center gap-x-[6px] px-5 max-[425px]:gap-x-[4px] max-[425px]:px-4"
                    >
                        <img
                            className="w-[36px] rotate-90 max-[425px]:w-[26px]"
                            src={red_arrow}
                            alt="Arrow icon"
                        />
                        <h3 className="text-primary text-[20px] font-semibold max-[425px]:text-[16px] max-[375px]:text-[15px]">
                            Go back
                        </h3>
                    </Link> */}
                  {/* Heading */}

                       <div className="lg:flex flex-auto justify-items-center  gap-x-[18px]">
                        <h2 className="font-atteron text-[24px] text-primary sm:text-[36px]">your cart</h2>
                       </div>





                    {/* Main container */}
                    <div className="flex flex-wrap justify-between gap-y-14 px-5 my-[60px] sm:px-0 sm:my-[80px] max-[425px]:my-[40px] max-[375px]:my-[30px]">

                        {/* Selected Productlist */}
                        <div className="w-[694px] mx-auto xl:mx-0 max-[425px]:w-full max-[375px]:w-full">

                            {/* First product */}
                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl max-[425px]:p-[16px] max-[375px]:p-[14px] max-[320px]:p-[12px]">

                                <img
                                    className="float-right w-[29px] h-[29px] cursor-pointer max-[425px]:w-[22px] max-[425px]:h-[22px]"
                                    src={close_icon}
                                    alt="close icon"
                                />

                                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center max-[425px]:gap-x-[12px]">
                                    {/* product Image */}
                                    <img
                                        className="w-[140px] sm:w-[233px] sm:h-[239px] rounded-[12px] max-[425px]:w-[100px] max-[375px]:w-[90px] max-[320px]:w-[80px]"
                                        src={product_1}
                                        alt="product image"
                                    />

                                    {/* product detail */}
                                    <div className="space-y-[10px] max-[425px]:space-y-[8px]">
                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px] max-[425px]:text-[13px]">
                                                Stone Necklace
                                            </h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px] max-[425px]:text-[15px]">
                                                ₹10,000
                                            </h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                                                Color chosen
                                            </h3>
                                            <h3 className="text-[15px] font-medium sm:text-[18px] max-[425px]:text-[14px]">
                                                Gold
                                            </h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                                                Quantity
                                            </h3>
                                            <QuantitySelector />
                                        </div>

                                        <h3 className="text-[13px] text-primary sm:text-[16px] max-[425px]:text-[12px]">
                                            Delivered by Oct 10
                                        </h3>
                                    </div>
                                </div>

                                <hr className="border border-[#EDEDED] my-[14px]" />

                                {/* free items */}
                                <div className="sm:flex items-center gap-x-[20px] max-[425px]:flex max-[425px]:gap-x-[10px]">
                                    <img
                                        className="w-[73px] h-[74px] rounded-[16px] max-[425px]:w-[60px] max-[375px]:w-[55px]"
                                        src={product_1}
                                        alt="product image"
                                    />

                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <h3 className="text-[#404040] text-[14px] font-medium sm:text-[18px] max-[425px]:text-[13px]">
                                                Free Silver Cleaning Kit
                                            </h3>
                                            <h3 className="text-[12px] text-[#6E6E6E] sm:text-[16px] max-[425px]:text-[11px]">
                                                Added for silver products only
                                            </h3>
                                        </div>
                                        <p className="bg-[#C5A881] px-4 py-1 rounded-full text-[#404040] text-[13px] max-[425px]:px-3">
                                            Free
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Second Product */}
                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mt-[25px] max-[425px]:p-[16px] ">
                                <img
                                    className="float-right w-[29px] h-[29px] cursor-pointer max-[425px]:w-[22px]"
                                    src={close_icon}
                                    alt="close icon"
                                />

                                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center max-[425px]:gap-x-[12px]">
                                    <img
                                        className="w-[140px] sm:w-[233px] sm:h-[239px] rounded-[12px] max-[425px]:w-[100px]"
                                        src={product_2}
                                        alt="product image"
                                    />

                                    <div className="space-y-[10px] max-[425px]:space-y-[8px]">
                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px] max-[425px]:text-[13px]">
                                                Silver Kada
                                            </h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px] max-[425px]:text-[15px]">
                                                ₹4,000
                                            </h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                                                Color chosen
                                            </h3>
                                            <h3 className="text-[15px] font-medium sm:text-[18px] max-[425px]:text-[14px]">
                                                Silver
                                            </h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[13px] text-[#6F6F6F] sm:text-[14px]">
                                                Quantity
                                            </h3>
                                            <QuantitySelector />
                                        </div>

                                        <h3 className="text-[13px] text-primary sm:text-[16px] max-[425px]:text-[12px]">
                                            Delivered by Oct 10
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overall Price */}
                        <div className="w-[466px] mx-auto xl:mx-0 max-[425px]:w-full max-[425px]:mt-[40px] hidden sm:block">
                            <Pincode_Input />

                            <div className="bg-[#FFFAF3] p-[24px] rounded-[16px] shadow-2xl mt-[25px] max-[425px]:p-[16px]">
                                <div className="space-y-[16px]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold max-[425px]:text-[14px]">
                                            Sub total
                                        </h3>
                                        <h3 className="text-[16px] text-[#404040] font-medium max-[425px]:text-[14px]">
                                            ₹14,000
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold max-[425px]:text-[14px]">
                                            Tax
                                        </h3>
                                        <h3 className="text-[16px] text-[#404040] font-medium max-[425px]:text-[14px]">
                                            ₹800
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold max-[425px]:text-[14px]">
                                            Shipping
                                        </h3>
                                        <h3 className="text-[16px] text-primary font-medium max-[425px]:text-[14px]">
                                            Free
                                        </h3>
                                    </div>

                                    <hr className="border border-[#EDEDED] my-[18px]" />

                                    <div className="flex items-center justify-between py-3">
                                        <h3 className="text-[18px] text-[#878787] font-semibold max-[425px]:text-[15px]">
                                            Total
                                        </h3>
                                        <h3 className="text-[18px] text-[#404040] font-medium max-[425px]:text-[15px]">
                                            ₹14,800
                                        </h3>
                                    </div>
                                    <button className="bg-[#4B001A] text-white w-full h-[51px] rounded-full max-[425px]:h-[46px] max-[425px]:text-[15px]">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended products */}
                    <div className="my-[100px] px-5 md:px-0 max-[425px]:my-[60px]">
                    <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left max-[425px]:text-[22px]">
                        Frequently bought together
                    </h1>

                    <div className="sm:w-[694px] mx-auto xl:mx-0">
                        <div className="bg-[#FFFAF3] max-w-[580px] p-[24px] rounded-[16px] shadow-2xl mt-[25px] max-[425px]:p-[16px]">
                        <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center justify-between max-[425px]:gap-x-[10px]">

                            {/* Product 1 */}
                            <div className="relative space-y-[10px]">
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                className="absolute top-5 right-3 w-[18px] h-[18px] accent-[#6E0027] border-2 border-[#6E0027] rounded-sm cursor-pointer"
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

                            {/* <span className="text-[24px] font-semibold max-[425px]:text-[20px]">+</span> */}

                            {/* Product 2 */}
                            <div className="relative space-y-[10px]">
                            {/* Checkbox */}
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

                      {/*  Mobile Version  */}
                        <div className="block sm:hidden">

                            {/* Order Summary Card */}
                            <div className="bg-[#FFFAF3] p-4 max-w-[361px] rounded-[12px] shadow-lg mt-4 m-auto">
                            <h3 className="text-[15px] font-semibold text-[#404040] mb-3">
                                Order Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                <p className="text-[14px] text-[#878787] font-semibold">Sub total</p>
                                <p className="text-[14px] text-[#404040] font-medium">₹14,000</p>
                                </div>

                                <div className="flex items-center justify-between">
                                <p className="text-[14px] text-[#878787] font-semibold">Tax</p>
                                <p className="text-[14px] text-[#404040] font-medium">₹800</p>
                                </div>

                                <div className="flex items-center justify-between">
                                <p className="text-[14px] text-[#878787] font-semibold">Shipping</p>
                                <p className="text-[14px] text-[#C70039] font-medium">Free</p>
                                </div>

                                <hr className="border border-[#EDEDED] my-[10px]" />

                                <div className="flex items-center justify-between">
                                <p className="text-[15px] text-[#878787] font-semibold">Total</p>
                                <p className="text-[15px] text-[#404040] font-semibold">₹14,800</p>
                                </div>
                            </div>
                            </div>
                            <Pincode_Input />
                            <div className="w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between px-5 py-3 z-50">
                            <div>
                                <p className="text-[#404040] font-semibold text-[16px]">₹14,800</p>
                                <p className="text-[#878787] text-[12px]">View Order Summary</p>
                            </div>
                            <button className="bg-[#4B001A] text-white px-6 py-2 rounded-full font-medium text-[14px]">
                                Place Order
                            </button>
                            </div>

                        </div>
                        </div>


                </div>
            
        </>
    );
}

export default Cart;

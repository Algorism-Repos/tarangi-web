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
            <div className="font-poppins bg-light-sandal py-[70px]">

                <div className="max-w-[1300px] mx-auto">

                    {/* Back button */}
                    <Link to="/productdescription" className="flex items-center gap-x-[6px] px-5">
                        <img className="w-[36px] rotate-90" src={red_arrow} alt="Arrow icon" />
                        <h3 className="text-primary text-[20px] font-semibold">Go back</h3>
                    </Link>

                    {/* Main container */}
                    <div className="flex flex-wrap justify-between gap-y-14 px-5 my-[60px] sm:px-0 sm:my-[80px]">

                        {/* Selected Productlist */}
                        <div className="w-[694px] mx-auto xl:mx-0">

                            {/* First product */}
                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl">

                                <img className="float-right w-[29px] h-[29px] cursor-pointer" src={close_icon} alt="close icon" />

                                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center">
                                    {/* product Image */}
                                    <img className="w-[110px] sm:w-[233px] sm:h-[239px]" src={product_1} alt="product image" />

                                    {/*  product detail*/}
                                    <div className="space-y-[14px]">

                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px]">Stone Necklace</h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px]">₹ 10,000</h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[14px] text-[#6F6F6F] sm:text-[14px]">Color choosen</h3>
                                            <h3 className="text-[16px] font-medium sm:text-[18px]">Gold</h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[14px] text-[#6F6F6F] sm:text-[14px]">Color choosen</h3>
                                            <QuantitySelector />
                                        </div>

                                        <h3 className="text-[14px] text-primary sm:text-[16px]">Delivered by Oct 10</h3>
                                    </div>

                                </div>

                                <hr className="border border-[#EDEDED] my-[14px]" />

                                {/* free items */}
                                <div className="sm:flex items-center gap-x-[20px]">
                                    <img className="w-[74px] h-[74px] rounded-[16px]" src={product_1} alt="product image" />

                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <h3 className="text-[#404040] text-[14px] font-medium sm:text-[18px]">Free Silver Cleaning Kit</h3>
                                            <h3 className="text-[12px] text-[#6E6E6E] sm:text-[16px]">Added for silver products only</h3>
                                        </div>
                                        <p className="bg-[#C5A881] px-5 py-1.5 rounded-full text-[#404040]">Free</p>
                                    </div>
                                </div>

                            </div>

                            {/* Second Product */}
                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mt-[25px]">

                                <img className="float-right w-[29px] h-[29px] cursor-pointer" src={close_icon} alt="close icon" />

                                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center">
                                    {/* product Image */}
                                    <img className="w-[110px] sm:w-[233px] sm:h-[239px]" src={product_2} alt="product image" />

                                    {/*  product detail*/}
                                    <div className="space-y-[14px]">

                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px]">Silver Kada</h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px]">₹ 4,000</h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[14px] text-[#6F6F6F] sm:text-[14px]">Color choosen</h3>
                                            <h3 className="text-[16px] font-medium sm:text-[18px]">Silver</h3>
                                        </div>

                                        <div>
                                            <h3 className="text-[14px] text-[#6F6F6F] sm:text-[14px]">Color choosen</h3>
                                            <QuantitySelector />
                                        </div>

                                        <h3 className="text-[14px] text-primary sm:text-[16px]">Delivered by Oct 10</h3>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Overall Price */}
                        <div className="w-[466px] mx-auto xl:mx-0">
                            <Pincode_Input />

                            {/* Second Product */}
                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mt-[25px]">

                                {/*  product detail*/}
                                <div className="space-y-[16px]">

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold">Sub total</h3>
                                        <h3 className="text-[16px] text-[#404040] font-medium">₹ 14,000</h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold">Tax</h3>
                                        <h3 className="text-[16px] text-[#404040] font-medium">₹ 800</h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[16px] text-[#878787] font-semibold">Shipping</h3>
                                        <h3 className="text-[16px] text-primary font-medium">Free</h3>
                                    </div>

                                    <hr className="border border-[#EDEDED] my-[18px]" />

                                    <div className="flex items-center justify-between py-3">
                                        <h3 className="text-[18px] text-[#878787] font-semibold">Total</h3>
                                        <h3 className="text-[18px] text-[#404040] font-medium">₹14,800</h3>
                                    </div>
                                    <button className="bg-[#4B001A] text-white w-full h-[51px] rounded-full">Place Order</button>

                                </div>


                            </div>

                        </div>
                    </div>


                    {/* Recommended products */}
                    <div className="my-[100px] px-5 md:px-0">
                        <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px]  xl:text-left">People also bought with this</h1>

                        <div className="sm:w-[694px] mx-auto xl:mx-0">

                            <div className="bg-[#FFFAF3] max-w-[694px] p-[24px] rounded-[16px] shadow-2xl mt-[25px]">

                                <div className="flex gap-x-[15px] sm:gap-x-[50px] items-center justify-between">

                                    {/*  product detail*/}
                                    <div className="space-y-[14px]">
                                        <img className="w-[150px] sm:w-[233px] sm:h-[239px]" src={product_1} alt="product image" />

                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px]">Stone Necklace</h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px]">₹ 10,000</h3>
                                        </div>
                                    </div>
                                    <span className="text-[24px] font-semibold">+</span>

                                    <div className="space-y-[14px]">
                                        <img className="w-[150px] sm:w-[233px] sm:h-[239px]" src={product_2} alt="product image" />

                                        <div>
                                            <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[16px]">Tulip Brooch</h3>
                                            <h3 className="text-[16px] font-semibold sm:text-[20px]">₹ 2,000</h3>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-[24px]">
                                    <h3 className="text-[14px] font-medium text-[#6F6F6F] sm:text-[18px]">Total price</h3>
                                    <h3 className="text-[16px] font-semibold sm:text-[20px] mt-1">₹ 12,000</h3>
                                    <button className="bg-[#4B001A] w-full h-[51px] rounded-full text-white mt-[24px]">Add to cart</button>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );
}

export default Cart;
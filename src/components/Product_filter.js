import React, { useState } from "react";
import down_arrow_red from '../assets/Products/down_arrow_red.png'
import sort_icon from '../assets/Products/sort_icon.png'
import filter_icon from '../assets/Products/filter_icon.png'
import close_icon from '../assets/Products/close_icon.png'
import down_arrow from '../assets/Products/down_arrow.png'
import Product_Listing from "../pages/Product_Listing";



function Product_Filter() {

    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [tab, setTab] = useState("productCatergory")

    const priceRanges = [
        { label: "₹10,000 – ₹15,000" },
        { label: "₹15,000 – ₹25,000" },
        { label: "₹25,000 – ₹35,000" },
        { label: "₹35,000 – ₹50,000" },
        { label: "₹50,000 – ₹75,000" },
    ];

    const productCatergory = [
        { label: "Earrings" },
        { label: "Necklace" },
        { label: "Bangles" },
        { label: "Rings" },
        { label: "Bracelets" },
    ];

    const Occasion = [
        { label: "Daily wear" },
        { label: "Wedding" },
        { label: "Office Attire" },
        { label: "Casual" },
        { label: "Festival" }

    ];

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }


    return (
        <>
            <div>

                {/* Women Collection & Sort  */}
                <div className="max-w-[1350px] mx-auto flex flex-wrap justify-between px-4">

                    <div className="lg:flex flex-wrap items-center gap-x-[18px]">
                        <h2 className="font-atteron text-[26px] text-primary tracking-[1px] sm:text-[36px]">Women Collections</h2>
                        <p className="font-poppins text-font-grey text-[14px] sm:mt-3 sm:text-[16px]">180 Designs</p>
                    </div>

                    {/* Drop down */}
                    <div className="lg:flex items-center gap-4 bg-light-sandal p-4 rounded-md hidden">

                        <label className="font-poppins text-font-grey text-[18px]">Sort by</label>

                        <div className="relative">
                            <select className="appearance-none border border-[#B9B9B9] rounded-md p-2.5 bg-white text-font-grey text-[14px] cursor-pointer outline-none" >
                                <option value="Latest">Latest</option>
                                <option value="Featured">Featured</option>
                                <option value="Price High to Low">Price High to Low</option>
                                <option value="Price Low to High">Price Low to High</option>
                            </select>
                            <div className=" absolute right-2 top-2.5">
                                <img src={down_arrow} alt="Down Arrow" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">

                    {/* Filter  */}
                    <div>
                        {/* Laptop Filter */}
                        <div className="w-[275px] font-poppins text-font-grey hidden lg:block pl-6">

                            <div className="flex justify-between">
                                <p className="text-[16px] font-semibold uppercase">Filters</p>
                                <button className="text-primary text-[16px] font-semibold uppercase focus:underline">Clear All</button>
                            </div>

                            <hr className="border border-[#C8C8C8] my-[25px]" />


                            {/* Price Filter */}
                            <div>
                                <h3 className="text-primary text-[20px] font-semibold">Price Range</h3>

                                <div className="mt-6 space-y-3">

                                    {priceRanges.map((items) => (

                                        <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                            <div className="flex items-center space-x-3">
                                                {/* Checkbox */}
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span class="checkmark"></span>
                                                </label>
                                                <span className="text-[18px]">{items.label}</span>
                                            </div>

                                        </label>
                                    ))}

                                </div>

                                {/* Show more Button */}
                                <div className="flex mt-4 cursor-pointer gap-x-[8px]">
                                    <img className="w-[26px]" src={down_arrow_red} />
                                    <p className="text-primary text-[16px] font-semibold">Show more</p>
                                </div>

                                <hr className="border border-[#C8C8C8] my-[25px]" />
                            </div>


                            {/* Product Catergory */}
                            <div>
                                <h3 className="text-primary text-[20px] font-semibold">Product Catergory</h3>

                                <div className="mt-6 space-y-3">

                                    {productCatergory.map((items) => (

                                        <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                            <div className="flex items-center space-x-3">
                                                {/* Checkbox */}
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span class="checkmark"></span>
                                                </label>
                                                <span className="text-[18px]">{items.label}</span>
                                            </div>
                                        </label>
                                    ))}

                                </div>

                                {/* Show more Button */}
                                <div className="flex mt-4 cursor-pointer gap-x-[8px]">
                                    <img className="w-[26px]" src={down_arrow_red} />
                                    <p className="text-primary text-[16px] font-semibold">Show more</p>
                                </div>

                                <hr className="border border-[#C8C8C8] my-[25px]" />
                            </div>


                            {/* occasion */}
                            <div>
                                <h3 className="text-primary text-[20px] font-semibold">Occasion</h3>

                                <div className="mt-6 space-y-3">

                                    {Occasion.map((items) => (

                                        <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                            <div className="flex items-center space-x-3">
                                                {/* Checkbox */}
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span class="checkmark"></span>
                                                </label>
                                                <span className="text-[18px]">{items.label}</span>
                                            </div>

                                        </label>
                                    ))}

                                </div>

                                <hr className="border border-[#C8C8C8] my-[25px]" />
                            </div>

                        </div >

                        {/* Mobile Verion Filter */}
                        <div className="w-full bg-[#EBBB85] font-poppins absolute bottom-0 p-5 lg:hidden px-4">

                            <div className="flex justify-between">

                                <div className="group flex items-center gap-x-[8px]" onClick={() => { setShowSort(true) }}>
                                    <img className="w-[24px] h-[24px]" src={sort_icon} alt="icons" />
                                    <button className="text-primary text-[18px] font-semibold">Sort</button>
                                </div>

                                <div className="group flex items-center gap-x-[8px] cursor-pointer" onClick={() => { setShowFilter(true) }}>
                                    <img className="w-[24px] h-[24px]" src={filter_icon} alt="icons" />
                                    <button className="text-primary text-[18px] font-semibold">Filter</button>
                                </div>
                            </div>

                        </div>

                        {/* Sort popup  */}
                        <div className={showSort === true ? "font-poppins bg-light-sandal w-full h-[302px] fixed inset-0 right-0 z-20 p-7 rounded-t-8 transition-all duration-300 ease-in-out" : "hidden"}>

                            <div className="flex flex-col space-y-[20px] text-[#747474]">

                                <h2 className="text-center text-[18px] font-semibold text-[#434343]">Sort Designs By</h2>

                                <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false); ScrollToTop(); }} >Latest</button>
                                <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false); ScrollToTop(); }} >Featured</button>
                                <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false); ScrollToTop(); }} >Price High to Low</button>
                                <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false); ScrollToTop(); }} >Price Low to High</button>
                            </div>
                        </div>

                        {/* Filter popup */}
                        <div className={showFilter === true ? "font-poppins bg-light-sandal w-full h-[469px] fixed inset-0 right-0 z-20 p-6" : "hidden"}>

                            <div className="flex justify-between my-4">
                                <h2 className="text-[18px] font-semibold text-[#434343]">Filter</h2>
                                <img className="w-[32px] h-[32px]" src={close_icon} alt="Close icon" onClick={() => { setShowFilter(false); ScrollToTop(); }} />
                            </div>

                            <div className="flex gap-x-16 justify-start mt-10">

                                {/* Tabs */}
                                <div className="flex flex-col items-start text-[16px] space-y-6 text-[#747474]">
                                    <button className=" focus:text-primary" onClick={() => setTab("productCatergory")}>Catergory</button>
                                    <hr className="border border-t-[#D9D9D9] w-full" />
                                    <button className=" focus:text-primary" onClick={() => setTab("priceRange")}>Price Range</button>
                                    <hr className="border border-t-[#D9D9D9] w-full" />
                                    <button className=" focus:text-primary hidden" onClick={() => setTab("occasion")}>Occasion</button>
                                    <hr className="border border-t-[#D9D9D9] w-full hidden" />
                                </div>

                                {/* Catergory */}
                                {tab === "productCatergory" &&
                                    <div>
                                        <div className="space-y-5">

                                            {productCatergory.map((items) => (

                                                <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                                    <div className="flex items-center space-x-2">
                                                        {/* Checkbox */}
                                                        <label className="custom-checkbox">
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="text-[15px]">{items.label}</span>
                                                    </div>

                                                </label>
                                            ))}

                                        </div>
                                    </div>
                                }

                                {/* Price Filter */}
                                {tab === "priceRange" &&
                                    <div>
                                        <div className="w-[160px] space-y-5">

                                            {priceRanges.map((items) => (

                                                <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                                    <div className="flex items-center space-x-2">
                                                        {/* Checkbox */}
                                                        <label className="custom-checkbox">
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="text-[14px]">{items.label}</span>
                                                    </div>
                                                </label>
                                            ))}

                                        </div>
                                    </div>
                                }

                                {/* Occasion */}
                                {tab === "occasion" &&
                                    <div>
                                        <div className="space-y-5">

                                            {Occasion.map((items) => (

                                                <label className="flex items-center justify-between text-font-grey cursor-pointer">

                                                    <div className="flex items-center space-x-2">
                                                        {/* Checkbox */}
                                                        <label className="custom-checkbox ">
                                                            <input type="checkbox" />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <span className="text-[15px]">{items.label}</span>
                                                    </div>

                                                </label>
                                            ))}

                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>

                    

                    {/*  */}
                    <Product_Listing />
                </div>

            </div>


        </>
    );
}

export default Product_Filter;
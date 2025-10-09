import React, { useState } from "react";
import down_arrow from '../assets/Products/down_arrow_red.png'
import sort_icon from '../assets/Products/sort_icon.png'
import filter_icon from '../assets/Products/filter_icon.png'
import close_icon from '../assets/Products/close_icon.png'


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


    return (
        <>
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
                            <img className="w-[26px]" src={down_arrow} />
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
                            <img className="w-[26px]" src={down_arrow} />
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

                {/* Mobile Verion */}
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

                        <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false) }} >Latest</button>
                        <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false) }} >Featured</button>
                        <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false) }} >Price High to Low</button>
                        <button className="text-[16px] font-medium text-left focus:text-primary" onClick={() => { setShowSort(false) }} >Price Low to High</button>
                    </div>
                </div>

                {/* Filter popup */}
                <div className={showFilter === true ? "font-poppins bg-light-sandal w-full h-[469px] fixed inset-0 right-0 z-20 p-6" : "hidden"}>

                    <div className="flex justify-between my-4">
                        <h2 className="text-[18px] font-semibold text-[#434343]">Filter</h2>
                        <img className="w-[32px] h-[32px]" src={close_icon} alt="Close icon" onClick={() => { setShowFilter(false) }} />
                    </div>

                    <div className="flex gap-x-16 justify-start mt-10">
                        
                        {/* Tabs */}
                        <div className="flex flex-col items-start text-[16px] space-y-6 text-[#747474]">
                            <button className=" focus:text-primary" onClick={() => setTab("productCatergory")}>Catergory</button>
                                <hr className="border border-t-[#D9D9D9] w-full" />
                            <button className=" focus:text-primary" onClick={() => setTab("priceRange")}>Price Range</button>
                                <hr className="border border-t-[#D9D9D9] w-full" />
                            <button className=" focus:text-primary" onClick={() => setTab("occasion")}>Occasion</button>
                                <hr className="border border-t-[#D9D9D9] w-full" />
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


        </>
    );
}

export default Product_Filter;
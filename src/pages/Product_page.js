import React from "react";

// Images
import down_arrow from '../assets/Products/down_arrow.png'

// Component
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";

function Product_page() {
    return (
        <>
            <div className="bg-[#FFF5E8] py-[50px] relative">

                {/* Heading */}
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

                {/* Filters */}

                <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">

                    <Product_Filter />

                    <Product_Listing />
                </div>



            </div>
        </>
    );
}

export default Product_page;
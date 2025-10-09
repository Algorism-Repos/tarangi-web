import React from "react";
import product_1 from '../assets/Products/product_1.png'
import product_2 from '../assets/Products/product_2.png'


function Recently_Viewed () {
      const Products = [
        {
            product_img: product_1,
            alt: "Necklace",
            price: "₹10,000",
            product_name: "Stone Necklace"

        },
        {
            product_img: product_2,
            alt: "Silver Kada",
            price: "₹4,000",
            product_name: "Stone Necklace"

        },
        {
            product_img: product_1,
            alt: "Necklace",
            price: "₹10,000",
            product_name: "Stone Necklace"

        },
        {
            product_img: product_2,
            alt: "Silver Kada",
            price: "₹4,000",
            product_name: "Stone Necklace"

        },
    ]

    return (
        <>
            {/* Recently Viewed */}
                    <div className='mt-[50px] lg:mt-[80px]'>
                        <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px]  xl:text-left">Recently Viewed</h1>

                        <div className='flex flex-wrap justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]'>
                            {/* Looping */}
                            {
                                Products.map((item) => {
                                    return (
                                        <div className="font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0">
                                            <img className="w-full h-fit" src={item.product_img} alt={item.alt} />

                                            <div className="mt-2 flex justify-between sm:mt-4">

                                                <div>
                                                    <h3 className="text-[16px] font-semibold sm:text-[20px]">{item.price}</h3>
                                                    <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">{item.product_name}</p>
                                                </div>

                                                <div className="hidden sm:block">
                                                    <p className="text-[15px] text-[#6F6F6F]">Colors Available</p>

                                                    <div className="mt-1 flex justify-end gap-x-3">
                                                        <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={gold_ellipse} alt="gold ellipse" />
                                                        <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={silver_ellipse} alt="Silver ellipse" />
                                                        <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={brown_ellipse} alt="brown ellipse" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
        </>
    )
}

export default Recently_Viewed ;
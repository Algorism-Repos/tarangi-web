import React, { useState } from "react";
import { Link } from "react-router";
// Image
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import Modal from "../components/Modal";
function Product_Listing({ productCatergory }) {
    const [modalToggle, setModalToggle] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const toggle = (product) => {
        console.log(product);
        // if(product)
        setModalToggle(!modalToggle);
        setSelectedType(product);
    };
    console.log("productCatergory", productCatergory);
    if (!productCatergory || productCatergory.length === 0) {
        return (
            <p className="text-center w-full text-[18px] font-poppins text-[#747474]">
                No products found
            </p>
        );
    }
    return (
        <>
            <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-24 pb-16 sm:gap-x-[30px]">
                {/* Looping */}
                {productCatergory.map((item) => {
                    const isOutOfStock = item.variants[0].inventory_quantity === 0;
                    return (
                        <div
                            className="font-poppins w-[173px] h-[173px] sm:w-[310px] sm:h-[310px] mx-auto transform transition-transform duration-300 ease-out hover:scale-110"
                            onClick={() => {
                                if (!isOutOfStock) {
                                    toggle(item?.title);
                                }
                            }}
                        >
                            <img
                                className={`w-[173px] h-[173px] sm:w-[310px] sm:h-[310px] rounded-[16px] ${item.variants[0].inventory_quantity === 0 ? " opacity-60" : ""
                                    }`}
                                src={item?.image?.src}
                                alt={item?.alt || item?.title}
                            />
                            {/*                               
                                <img className="w-full h-fit rounded-[16px]" src={item?.image?.src} alt={item?.alt} /> */}
                            <div className="mt-2 flex justify-between sm:mt-4">
                                <div>
                                    <h3 className="text-[14px] font-semibold sm:text-[20px]">
                                        ₹{parseInt(item.variants[0].price).toLocaleString("en-IN")}
                                    </h3>
                                    <p className="text-[12px] font-medium text-[#6F6F6F] sm:text-[14px]">
                                        {item?.title}
                                    </p>
                                </div>
                                {item.variants[0].inventory_quantity === 0 && (
                                    <div className="">
                                        <p className="text-primary font-semibold text-[12px] md:text-[20px]">
                                            Sold Out
                                        </p>
                                        {/* <p className="text-[15px] text-[#6F6F6F]">Colors Available</p> */}
                                        {/* <div className="mt-1 flex justify-end gap-x-3">
                                            <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={gold_ellipse} alt="gold ellipse" />
                                            <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={silver_ellipse} alt="Silver ellipse" />
                                            <img className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={brown_ellipse} alt="brown ellipse" />
                                        </div> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal modal={modalToggle} active={toggle} productName={selectedType} />
        </>
    );
}
export default Product_Listing;
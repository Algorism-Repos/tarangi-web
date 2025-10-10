import react from "react";
import { Link } from "react-router";
// Image 
import product_1 from '../assets/Products/product_1.png'
import product_2 from '../assets/Products/product_2.png'
import gold_ellipse from '../assets/Products/gold_ellipse.png'
import silver_ellipse from '../assets/Products/silver_ellipse.png'
import brown_ellipse from '../assets/Products/brown_ellipse.png'


function Product_Listing() {

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
    ]

    return (
        <>
            <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-10 sm:gap-x-[30px] px-3.5">
                {/* Looping */}
                {
                    Products.map((item) => {
                        return (
                            <Link to="/productdescription" className="font-poppins w-[170px] sm:w-[310px] mx-auto">
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

                            </Link>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Product_Listing;
import React, { useState } from "react";

import Modal from "../components/Modal"

//asset import
import new_product_1 from "../assets/new_product_1.png"
import new_product_2 from "../assets/new_product_2.png"
import new_product_3 from "../assets/new_product_3.png"
import fast_selling_1 from "../assets/fast_selling_1.png"
import fast_selling_2 from "../assets/fast_selling_2.png"
import fast_selling_3 from "../assets/fast_selling_3.png"
import offer_product_1 from "../assets/offer_product_1.png"
import offer_product_2 from "../assets/offer_product_2.png"
import offer_product_3 from "../assets/offer_product_3.png"
import men_design from "../assets/men_design.png"
import women_design from "../assets/women_design.png"
import couple_design from "../assets/couple_design.png"
import pink_collection from "../assets/pink_collection_design.png"
import statement_earrings from "../assets/statement_earrings_design.png"
import dangers from "../assets/dangers_design.png"
import jaguar_bracelet from "../assets/jaguar_bracelets_design.png"
import watch_charms from "../assets/watch_charms_design.png"
import bullet_icon from '../assets/bullet_point.png'
import men_image from "../assets/men_image.jpg"
import women_image from "../assets/women_image.jpg"
import silver_jewel from "../assets/silver_jewel.jpg"
import gold_jewel from "../assets/gold_jewel.jpg"





function Home() {

    // Modal State & Function
    const [modalToggle, setModalToggle] = useState(false);
    function toggle() {
        setModalToggle(!modalToggle);
    }
    // -------------------


    return (
        <>
            <div className="banner-section">
                <h1 className="font-atteron text-[52px] leading-[70px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[85px] font-normal w-full sm:w-[670px]">Rooted in legacy, shaped for modern elegance</h1>
                <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-5">Because jewelry should feel as unique as the one who wears it.</h4>

                <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[10px] px-[16px] cursor-pointer" onClick={toggle}>View our Collection</button>

            </div>

            <div className="whyus">
                <h1 className="font-atteron text-[52px] sm:text-[72px] text-center text-[#5C0A1F] leading-normal">WHY US?</h1>

                <div className="font-poppins text-center text-[16px] sm:text-[24px] font-normal leading-normal text-[#28040E] w-[318px] sm:w-[1034px] mt-5 sm:mt-9 ">
                    <p>With nearly 70 years of heritage, Tarangi carries forward the craftsmanship and trust of V. Nataraj Mudhaliar & Sons, reimagined for today by the daughters. Each piece blends timeless artistry with a modern sensibility, creating jewelry that feels rooted and refreshingly new. </p>
                    <p className=" mt-5 sm:mt-9">The handmade silver jewelry designs celebrate everyone, including women, men, children, and elders, making inclusivity our defining hallmark. Tarangi offers fine 925 silver and gold-plated silver jewelry at affordable pricing, making it aspirational yet accessible. </p>
                </div>
            </div>

            {/* Design - Section */}
            <div className="design-section py-40 relative">
                <div className="max-w-7xl mx-auto">
                    <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white ">Our Curations</h1>
                    <div className="flex flex-col gap-y-[250px] sm:gap-y-0 sm:flex-row items-center justify-center gap-x-12 relative my-56">
                        <div className="border-2 border-white w-[360px] h-[374px] relative z-0 ">
                            <img src={men_design} alt="men-image" className="w-[359px] h-[539px] sm:w-[373px] sm:h-[459px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute bottom-[-0px] z-10" />
                            <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-0 left-1/3 ">Men</h2>
                        </div>

                        <div className="border-2 border-white w-[360px] h-[374.15px] relative z-0">
                            <img src={women_design} alt="men-image" className="w-[359px] h-[539px] sm:w-[373px] sm:h-[459px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute bottom-[-0px] z-10" />
                            <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-0 left-1/4 ">Women</h2>
                        </div>

                        <div className="border-2 border-white w-[360px] h-[374.15px]  relative">
                            <img src={couple_design} alt="men-image" className="w-[360px] h-[360px] sm:w-[374px] sm:h-[374px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute z-10" />
                            <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-[-15px] left-1/4 ">Couples</h2>
                        </div>
                    </div>

                    <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white mt-32 sm:mt-0 ">Tarangi Specials</h1>

                    <div className="flex flex-col sm:flex-row items-center sm:gap-x-12 gap-y-20 sm:flex-wrap justify-center mt-12 sm:mt-44">
                        <div className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={pink_collection} alt="tarangi_special_1" className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white " />
                            <h3 className="font-atteron text-[34px] font-normal leading-normal text-white">Pink Collection</h3>
                        </div>

                        <div className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={statement_earrings} alt="tarangi_special_1" className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white " />
                            <h3 className="font-atteron text-[34px] font-normal leading-normal text-white">Statement Earings</h3>
                        </div>

                        <div className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={dangers} alt="tarangi_special_1" className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white " />
                            <h3 className="font-atteron text-[34px] font-normal leading-normal text-white">Dangers</h3>
                        </div>


                        <div className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={jaguar_bracelet} alt="tarangi_special_1" className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white " />
                            <h3 className="font-atteron text-[34px] font-normal leading-normal text-white">Jaguar Bracelets</h3>
                        </div>


                        <div className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={watch_charms} alt="tarangi_special_1" className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white " />
                            <h3 className="font-atteron text-[34px] font-normal leading-normal text-white">Watch Charms</h3>
                        </div>


                    </div>

                </div>
            </div>

            {/* Gold vs Gold Plated Silver Section */}
            <div className="bg-secondary">
                <div className="max-w-[1220px] mx-auto sm:pt-40 sm:pb-48 py-40 px-3 ">
                    <h1 className="section-heading sm:w-[846px] w-[336px] mx-auto">Gold vs Gold Plated Silver Jewellery</h1>
                    <p className="section-content text-center sm:w-[1034px] w-[330px] mx-auto mt-9">Gold jewelry has always been cherished for its permanence, but often feels out of reach for everyday style. Gold-plated silver brings the same timeless look with the ease and affordability to make elegance part of daily life.</p>
                    <p className="section-content text-center sm:w-[1034px] w-[330px] mx-auto mt-9">At Tarangi, each gold-plated silver piece fuses the richness of gold with the strength of sterling silver. </p>


                    {/* Images */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-y-28 w-full mt-16 sm:mt-40">
                        <div className="relative">
                            <img src={silver_jewel} alt="silver_jewel" className="sm:w-[542px] sm:h-[645px]" />
                            <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">Gold </h2>
                        </div>

                         <div className="relative">
                            <img src={gold_jewel} alt="silver_jewel" className="sm:w-[542px] sm:h-[645px]" />
                            <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">Silver</h2>
                        </div>
                    </div>

                    <div className="my-24 px-4">
                        <h1 className="font-atteron text-[24px] font-semibold text-[#5C0A1F] text-center sm:text-[40px]">Why choose Tarangi’s gold-plated<br className="hidden md:block" />silver jewelry?</h1>
                        
                        <ul style={{ listStyleImage: `url(${bullet_icon})` }} className="font-poppins text-left text-[18px] max-w-fit mx-auto space-y-6 mt-16 sm:text-[30px] px-" >
                            <li>&nbsp;The luminous beauty of gold, made affordable</li>
                            <li>&nbsp;Lightweight and comfortable for everyday wear</li>
                            <li>&nbsp;Versatile, from casual looks to special occasions</li>
                            <li>&nbsp;Versatile, from casual looks to special occasions</li>
                        </ul>
                    </div>

                </div>

            </div>

            {/* New Products Section */}
            <div className="newproducts-section">
                <div className="max-w-7xl mx-auto py-40 px-3 sm:px-0">
                    <h1 className="section-heading !text-white">New Products</h1>

                    <div className="flex flex-col sm:flex-row gap-y-20 sm:gap-y-0 items-center justify-between mt-20">
                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={new_product_1} alt="new_product_image" className="w-[395px] h-[395px]" />
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Emerald Pendant</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹2,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={new_product_2} alt="new_product_image" className="w-[395px] h-[395px]" />
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Necklace Set</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹8,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <img src={new_product_3} alt="new_product_image" className="w-[395px] h-[395px]" />
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Gold Bracelet</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹5,500.00</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fast Selling Products - Section */}
            <div className="fastselling-section">
                <div className="max-w-7xl mx-auto py-40 px-3 sm:px-0">
                    <h1 className="section-heading !text-white">Fast Selling Products</h1>

                    <div className="flex flex-col gap-y-20 sm:gap-y-0 sm:flex-row items-center justify-between mt-20">
                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={fast_selling_1} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">2 more in Stock</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Earings</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹2,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={fast_selling_2} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">Selling Fast</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Nose pin</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹8,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={fast_selling_3} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">Only 1 left</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Chain</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹5,500.00</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product with Offers - Section */}
            <div className="newproducts-section">
                <div className="max-w-7xl mx-auto py-40 px-3 sm:px-0">
                    <h1 className="section-heading !text-white">Products with Offers</h1>

                    <div className="flex flex-col gap-y-20 sm:flex-row items-center justify-between mt-20 ">
                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={offer_product_1} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Bugadi</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹2,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={offer_product_2} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Ring</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹8,000.00</h4>
                        </div>

                        <div className="flex flex-col items-center gap-y-2 transform transition-transform duration-300 ease-out hover:scale-110">
                            <div className="relative">
                                <img src={offer_product_3} alt="new_product_image" className="w-[395px] h-[395px]" />
                                {/* <p className="font-poppins text-[16px] font-semibold text-white text-nowrap leading-normal bg-[#8F113b] w-fit py-2 px-3 rounded-[8px] absolute top-5 left-2">20% off</p> */}
                            </div>
                            <h5 className="font-poppins text-[28px] font-normal leading-normal text-white">Bangle</h5>
                            <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">₹5,500.00</h4>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                modal={modalToggle}
                active={toggle}
            />

        </>
    )
}

export default Home    
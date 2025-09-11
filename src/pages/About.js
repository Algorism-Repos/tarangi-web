import React from "react";

//assets import
import illustration from "../assets/about-banner-illustration.png"
import new_product_2 from "../assets/new_product_2.png"
import about_product_1 from "../assets/about-product-1.png"
import about_product_2 from "../assets/about-product-2.png"



function About() {
    return (
        <>
            {/* Banner Section */}
            <div className="about-banner">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-x-32 sm:mt-[130px]">
                    <div className="sm:mt-32 w-[335px] sm:w-full text-center sm:text-left">
                        <h1 className="font-atteron w-[248px] sm:w-full text-[52px] sm:text-[128px] text-white font-normal leading-normal mx-auto sm:mx-0">About Us</h1>
                        <h6 className="font-poppins text-[16px] sm:text-[22px] text-white font-normal leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h6>
                    </div>
                    <img src={illustration} alt="banner-illustration" className="w-[271px] h-[492px] mt-[50px] sm:w-[406px] sm:h-[738px]" />
                </div>
            </div>

            {/* First Section */}
            <div className="about-first-section py-52 sm:py-[300px] relative">
                <div className="max-w-7xl mx-auto ">
                    <h1 className="font-atteron text-[52px] sm:text-[72px] text-[#5C0A1F] font-normal leading-normal text-center sm:w-[748px] mx-auto">70+ Years of Experience</h1>

                    <div className="flex flex-col sm:flex-row items-center gap-x-20 mt-[200px] sm:absolute sm:bottom-60">
                        <img src={new_product_2} alt="product image" className="w-[341px] h-[351px] sm:w-[577px] sm:h-[577px] rounded-[16px]" />

                        <div className="sm:w-[609px] px-3">
                            <h1 className="font-atteron text-[36px] sm:text-[63px] font-normal leading-normal text-[#5C0A1F] ">Artisans hand crafted jewellery</h1>
                            <p className="font-poppins text-[16px] sm:text-[24px] font-normal leading-normal text-[#28040E] mt-5 sm:mt-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="bg-[#4B001A] py-40 relative">
                <h1 className="section-heading !text-[46px] sm:!text-[64px] sm:w-[890px] mx-auto !text-white">Traditional Jewellery making with modern design</h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-40 gap-x-32 gap-y-20 sm:gap-y-0">
                    <div className="w-[324px] h-[318px] sm:w-[619px] sm:h-[607px] border-[#FCD99F] border-2 relative">
                        <img src={about_product_1} alt="about-product-1" className="w-[324px] h-[318px] sm:w-[619px] sm:h-[607px] absolute top-3 sm:top-7 left-[-30px] " />
                    </div>

                    <h5 className="font-poppins text-white text-[16px] sm:text-[24px] font-normal leading-normal sm:w-[623px] w-[361px] mx-auto px-3">At Tarangi, we believe jewellery is more than adornment — it is heritage reimagined. Every piece is crafted with the artistry of traditional silverwork, drawing inspiration from temple motifs and timeless Indian craftsmanship.</h5>
                </div>

                <div className="flex flex-col gap-y-20 sm:flex-row items-end sm:items-center sm:justify-between mt-20 sm:pl-28">
                    <h5 className="font-poppins text-white text-[16px] sm:text-[24px] font-normal leading-normal sm:w-[623px] w-[360px] mx-auto order-2 sm:order-1 px-3">What makes Tarangi unique is how we blend this legacy with modern design. From anklets, jhumkas, and nose pins that echo cultural roots, to ear cuffs, couple rings, and brooches that reflect today’s contemporary spirit — our collections flow seamlessly between the past and the present.</h5>

                    <div className="w-[253px] h-[298px] sm:w-[475px] sm:h-[716px] border-2 border-[#FCD99F] relative right-[-80px] sm:right-0 order-1 sm:order-2">
                        <img src={about_product_2} alt="about-product-2" className="w-[187px] h-[313px] sm:w-[434px] sm:h-[727px] absolute top-0 left-3 sm:left-0 sm:right-[-10px]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
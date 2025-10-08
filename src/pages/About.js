import React from "react";

//assets import
import illustration from "../assets/about-banner-illustration.png"
import crafted_jewellery from '../assets/crafted_jewellery.png'
import new_product_2 from "../assets/new_product_2.png"
import about_product_1 from "../assets/about-product-1.png"
import about_product_2 from "../assets/about-product-2.png"
import whatsapp_floating from "../assets/whatsapp_icon.svg"



function About() {
    return (
        <>
            <a href="https://wa.me/919003058300/?text=Hi," target="_blank"><img src={whatsapp_floating} alt="Whatsapp_Icon" className="w-[50px] sm:w-[70px] h-fit fixed bottom-3 right-3 sm:bottom-9 sm:right-7 animate-bounce hover:scale-125 duration-300 transition-transform z-30" /></a>

            {/* Banner Section */}
            <div className="about-banner">
                <div className="flex flex-col lg:flex-row items-center sm:items-start gap-x-32 sm:mt-[130px]">
                    <div className="sm:mt-32 w-[335px] sm:w-full text-center sm:text-left">
                        <h1 className="font-atteron  sm:w-full text-[52px] sm:text-[128px] text-white font-normal leading-normal mx-auto sm:mx-0">Our Story</h1>
                        <h6 className="font-poppins text-[16px] sm:text-[22px] text-white font-normal leading-normal">Crafted from South Indian heritage, for today’s world.</h6>
                    </div>
                    <img src={illustration} alt="banner-illustration" className="w-[271px] h-[492px] mt-[50px] sm:w-[406px] sm:h-[738px] mx-auto" />
                </div>
            </div>

            {/* First Section */}
            <div className="about-first-section py-28 lg:py-[300px] relative">
                <div className="max-w-7xl mx-auto ">
                    <h1 className="font-atteron text-[52px] sm:text-[72px] text-[#5C0A1F] font-normal leading-normal text-center sm:w-[748px] mx-auto"><span className="font-poppins font-extralight">6</span>0+ Years of Experience</h1>

                    <div className="flex flex-col xl:flex-row items-center gap-x-16 mt-[200px] gap-y-8 mx-auto xl:absolute xl:bottom-60">
                        <img src={crafted_jewellery} alt="product image" className="w-[341px] h-[351px] sm:w-[577px] sm:h-[577px] rounded-[16px] mx-auto" />

                        <div className="max-w-[350px] sm:max-w-[620px] mx-auto px-3">
                            <h1 className="font-atteron text-[36px] sm:text-[63px] font-normal leading-tight text-[#5C0A1F] ">trusted legacy timeless jewelry </h1>
                            <p className="font-poppins text-[16px] sm:text-[24px] font-normal leading-normal text-[#28040E] mt-5 sm:mt-9">Tarangi is founded by third generation daughters from the familiy of jewellers. We are sisters united in vision to shape a globally admired fine jewelry brand that blends timeless South Indian artistry with modern elegance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="bg-[#4B001A] py-20 sm:py-40 relative">
                <h1 className="section-heading px-2 sm:px-0 !text-[46px] sm:!text-[64px] sm:max-w-[890px] mx-auto !text-white">Handcrafted jewelry by local artisans</h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-20 sm:mt-40 gap-x-32 gap-y-20 sm:gap-y-0">
                    <div className="w-[324px] h-[318px] sm:w-[619px] sm:h-[607px] border-[#FCD99F] border-2 relative">
                        <img src={about_product_2} alt="about-product-1" className="w-[324px] h-[318px] sm:w-[619px] sm:h-[607px] absolute top-3 sm:top-7 left-[-30px] " />
                    </div>

                    <h5 className="font-poppins text-white text-[16px] sm:text-[24px] font-normal leading-normal sm:w-[623px] w-[361px] mx-auto px-3">Every piece at Tarangi is handmade by skilled artisans, reflecting detail and elegance. We design and craft silver jewelry that is premium yet accessible, without compromising on the quality or artistry.</h5>
                </div>

                <div className="flex flex-col gap-y-24 sm:flex-row items-end sm:items-center sm:justify-between mt-20 sm:pl-28 overflow-hidden">
                    <h5 className="font-poppins text-white text-[16px] sm:text-[24px] font-normal leading-normal sm:w-[623px] w-[360px] mx-auto order-2 sm:order-1 px-3">Our collections are designed for everyone, across generations. From ear cuffs, haathphools, couple rings, brooches, hip chains, and statement jewelry for every generation, to classic kadas, cufflinks, bangles, and anklets, there’s something for all.</h5>

                    <div className="w-[253px] h-[298px] sm:w-[475px] sm:h-[716px] border-2 border-[#FCD99F] relative right-[-80px] sm:right-0 order-1 sm:order-2">
                        <img src={about_product_1} alt="about-product-2" className="w-[187px] h-[313px] object-cover sm:w-[434px] sm:h-[727px] absolute top-6 left-3 sm:left-6 sm:right-[-10px]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
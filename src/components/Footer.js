import React from "react";

// assets import
import logo from "../assets/logo.png"
import instagram from "../assets/instagram_icon.svg"
import twitter from "../assets/twitter_icon.svg"
import linkedin from "../assets/linkedin_icon.svg"

function Footer() {
    return (
        <>
            {/* Coming Soon - Section */}
            <div className="coming-soon">
                <h1 className="font-atteron text-[32px] sm:text-[49px] font-normal leading-normal text-white w-[328px] text-center sm:w-full ">Our Products page will be live soon</h1>
                <button className="font-poppins text-white text-[24px] font-extralight leading-normal bg-[#4B001A] rounded-[93px] py-[20px] px-[26px] cursor-pointer mt-7 sm:mt-20 ">Get in Touch</button>
            </div>
            <div className="footer-section">
                <div className="flex flex-col gap-y-20 sm:flex-row sm:items-center sm:justify-between px-3 pt-5 pb-12 sm:py-0 sm:pt-0 sm:px-[70px] ">
                    <div className="">
                        <img src={logo} alt="brand-logo" className="w-[231px] h-fit" />

                        <div className="flex flex-row items-center gap-x-5 ml-10 sm:ml-11">
                            {/* <a href="https://www.twitter.com" target="_blank"><img src={twitter} className="w-[30px] h-[31px]" /></a> */}
                            <a href="https://www.instagram.com" target="_blank"><img src={instagram} className="w-[30px] h-[31px]" /></a>
                            {/* <a href="https://www.linkedin.com" target="_blank"><img src={linkedin} className="w-[30px] h-[31px]" /></a> */}
                        </div>
                    </div>

                    <div className="font-poppins text-[16px] sm:text-[22px] text-white text-left sm:text-right ml-7 sm:ml-0">
                        <a href="tel:9003058300"><p>+91 90030 58300</p></a>
                        <a href="mailto:tarangijewelsindia@gmail.com"><p className="mt-3">tarangijewelsindia@gmail.com</p></a>
                        <a href="https://maps.app.goo.gl/jzWsgG8Pov41RSPJ9" target="_blank">
                            <p className="mt-3">431-435,VNA Complex,NSR Road</p>
                            <p>Saibaba Colony, Coimbatore-641011</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
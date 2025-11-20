import React, { useState } from "react";
import { useLocation } from "react-router";
import Marquee from "react-fast-marquee";

// assets import
import logo from "../assets/logo.png"
import instagram from "../assets/instagram_icon.svg"
import whatsapp from '../assets/whatsapp_icon.svg'
import Modal from "./Modal";

// Clients 
import client_1 from '../assets/Clients/client_1.png'
import client_2 from '../assets/Clients/client_2.png'
import client_3 from '../assets/Clients/client_3.png'
import client_4 from '../assets/Clients/client_4.png'
import client_5 from '../assets/Clients/client_5.png'
import client_6 from '../assets/Clients/client_6.png'
import client_7 from '../assets/Clients/client_7.png'
import client_8 from '../assets/Clients/client_8.png'
import client_9 from '../assets/Clients/client_9.png'
import client_10 from '../assets/Clients/client_10.png'

function Footer() {

    // Modal State & Function
    const [modalToggle, setModalToggle] = useState(false);
    function toggle() {
        setModalToggle(!modalToggle);
    }
    // -------------------
    const { pathname } = useLocation();
    const isVisible = pathname === "/" || pathname === "/home" || pathname === "/about";

    const Clients = [
        { src: client_1 },
        { src: client_2 },
        { src: client_3 },
        { src: client_4 },
        { src: client_5 },
        { src: client_6 },
        { src: client_7 },
        { src: client_8 },
        { src: client_9 },
        { src: client_10 }
    ]

    return (
        <>
            {/* Coming Soon - Section */}
            <div className={isVisible ? "coming-soon py-[80px]  sm:py-[100px]" : "hidden"}>
                <h1 className="font-atteron text-[32px] sm:text-[49px] font-normal leading-normal text-white text-center tracking-[1px]">Our Happy Customers,<br className="hidden sm:block" /> the stars of Tarangi</h1>

                {/* Clients */}
                <div className="w-full mx-auto my-[60px]  px-4 sm:px-6 sm:my-[80px] lg:px-8">
                    <Marquee pauseOnHover={true} speed={80} gradient={false}>
                        <div className="flex items-center gap-x-8 sm:gap-x-12 lg:gap-x-16 px-4 sm:px-6 lg:px-8">
                            {
                                Clients.map((items,index) => {
                                    return (
                                        <img key={index} className="w-[220px] h-[320px] sm:w-full sm:h-fit " src={items.src} alt="Clients" />
                                    )
                                })
                            }
                        </div>

                    </Marquee>
                </div>

                {/* Clients */}
                {/* <div className="w-full max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
                    <Marquee pauseOnHover={true} speed={100} gradient={false}>
                        <div className="flex items-center gap-x-8 sm:gap-x-12 lg:gap-x-16 px-4 sm:px-6 lg:px-8">
                            {Clients.map((item) => (
                                <img
                                    className="h-10 sm:h-14 lg:h-20 w-auto object-contain"
                                    src={item.src}
                                    alt="Client logo"
                                />
                            ))}
                        </div>
                    </Marquee>
                </div> */}

                {/* Insta Button */}
                <a href="https://www.instagram.com/tarangistars" target="_blank"><button className="font-poppins text-white text-[20px] font-extralight leading-normal bg-[#4B001A] rounded-[93px] py-[10px] px-[20px] cursor-pointer sm:text-[24px] sm:mt-6 ">Explore More</button></a>
            </div>


            {/* Footer */}
            <div className="footer-section">
                <div className="flex flex-col gap-y-20 sm:flex-row sm:items-center sm:justify-between px-3 pt-5 pb-12 sm:py-0 sm:pt-0 sm:px-[70px] ">
                    <div className="">
                        <img src={logo} alt="brand-logo" className="w-[231px] h-fit" />

                        <div className=" flex flex-row items-center gap-x-6 w-fit ml-10 sm:ml-14">
                            <a href="https://www.instagram.com/tarangijewels/" target="_blank"><img src={instagram} className="w-[30px] h-[31px]" /></a>
                            <a href="https://wa.me/919003058300/?text=Hi," target="_blank"><img src={whatsapp} className="w-[40px] h-[40px]" /></a>
                        </div>
                    </div>

                    <div className="font-poppins text-[16px] sm:text-[18px] text-white text-left sm:text-right ml-7 sm:ml-0">
                        <a href="tel:9003058300"><p>+91 90030 58300</p></a>
                        <a href="mailto:tarangijewelsindia@gmail.com"><p className="mt-3">tarangijewelsindia@gmail.com</p></a>
                        <a href="https://share.google/6f6U8XByQoc0FWsBP" target="_blank">
                            <p className="mt-3">431-435,VNA Complex, NSR Road</p>
                            <p>Saibaba Colony, Coimbatore-641011</p>
                        </a>
                    </div>
                </div>

                <Modal
                    modal={modalToggle}
                    active={toggle}
                />

            </div>

        </>
    )
}

export default Footer;
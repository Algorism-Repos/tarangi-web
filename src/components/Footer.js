import React, {useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Marquee from "react-fast-marquee";
import { AppContext } from "../context/AppContext";


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

    const {collection} = useContext(AppContext);

    // Modal State & Function
    const [modalToggle, setModalToggle] = useState(false);
    function toggle() {
        setModalToggle(!modalToggle);
    }
    // -------------------
    const { pathname } = useLocation();
    const isVisible = pathname === "/" || pathname === "/home" || pathname === "/about";

    const clients = [
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

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
                                clients.map((items, index) => {
                                    return (
                                        <div className="p-8 bg-secondary rounded-[16px]">
                                            <img key={index} className="w-[220px] h-[320px] sm:w-full sm:h-fit rounded-[8px] " src={items.src} alt="Clients" />
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </Marquee>
                </div>

                <div className=" flex flex-row items-center gap-x-6 w-fit ml-8 sm:ml-10">
                    <a
                        href="https://www.instagram.com/tarangijewels/"
                        target="_blank"
                    >
                        <img src={instagram} className="w-[30px] h-[31px]" />
                    </a>
                    <a href="https://wa.me/919003058300/?text=Hi," target="_blank">
                        <img src={whatsapp} className="w-[40px] h-[40px]" />
                    </a>
                </div>
            </div>


            {/* Product Catergory */}
            <div className="flex flex-col gap-y-[15px] text-[17px] sm:text-[18px] ml-6 sm:ml-0">
                {collection &&
                    collection
                        ?.filter((item) => item.handle !== "best_seller")
                        .map((item) => (
                            <Link
                                to={`/products/${item.handle}`}
                                state={{
                                    category: item.handle,
                                    collectionId: item.id,
                                }}
                            >
                                {item.handle}
                            </Link>
                        ))}
            </div>

            
        </>
    )
}

export default Footer;
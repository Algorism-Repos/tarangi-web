import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Marquee from "react-fast-marquee";
import { AppContext } from "../context/AppContext";


// assets import
import logo from "../assets/logo.png"
import instagram from "../assets/instagram_icon.svg"
import whatsapp from '../assets/whatsapp_icon.svg'
import Modal from "./Modal";
import AOS from 'aos';
import 'aos/dist/aos.css';

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
import client_11 from '../assets/Clients/client_11.png'
import client_12 from '../assets/Clients/client_12.png'

function Footer() {

    const { collection } = useContext(AppContext);
    // Aos Animation 
    useEffect(() => {
        AOS.init({ duration: 1000 });
        window.scrollTo({top:0, behavior: "smooth"})
    }, []);


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
        { src: client_10 },
        { src: client_11 },
        { src: client_12 }
    ]

    function ScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // +

    return (
        <>
            {/* Coming Soon - Section */}
            <div className={isVisible ? "coming-soon py-[80px]  sm:py-[100px]" : "hidden"}  >
                <h1 className="font-atteron text-[32px] sm:text-[49px] font-normal leading-normal text-white text-center tracking-[1px]"  data-aos="fade-up">Our Happy Customers,<br className="hidden sm:block" /> the stars of Tarangi</h1>

                {/* Clients */}
                <div className="w-full mx-auto my-[60px]  px-4 sm:px-6 sm:my-[80px] lg:px-8"  data-aos="fade-up">
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

                {/* Insta Button */}
                <a href="https://www.instagram.com/tarangistars" target="_blank"><button className="font-poppins text-white text-[20px] font-extralight leading-normal bg-[#4B001A] rounded-[93px] py-[10px] px-[20px] cursor-pointer sm:text-[24px] sm:mt-6"  data-aos="fade-up">Explore More</button></a>
            </div>


            {/* Footer */}
            <div className="footer-section z-0 font-[poppins] text-white sm:py-14 ">

                {/* Muhil */}
                <div className="flex flex-col gap-y-16 xl:flex-row sm:items-center sm:justify-between px-3 pt-5 pb-12 sm:py-0 sm:pt-0 sm:px-[70px]">

                    <div className="flex flex-wrap gap-x-[60px] gap-y-10 ">
                        {/* Logo & Social */}
                        <div className="sm:m-auto xl:m-0">
                            <img src={logo} alt="brand-logo" className="w-[231px] h-[155px] "/>

                            <div className=" flex flex-row items-center gap-x-6 w-fit mx-auto ">
                                <a href="https://www.instagram.com/tarangijewels/" target="_blank"><img src={instagram} className="w-[30px] h-[31px]" /></a>
                                <a href="https://wa.me/919003058300/?text=Hi," target="_blank"><img src={whatsapp} className="w-[40px] h-[40px]" /></a>
                            </div>
                        </div>

                        <div className="flex gap-x-[25px] sm:gap-x-[65px] gap-y-10 sm:mx-auto">

                            {/* Subpages */}
                            <div className="flex flex-col gap-y-[15px] text-[17px] sm:text-[18px] ml-6 sm:ml-0 md:border-l border-[#D6A76F] md:pl-[54px]">
                                <Link to="/home" className="transition-transform duration-300 hover:scale-105" onClick={ScrollToTop}>Home</Link>
                                <Link to="/about" className="transition-transform duration-300 hover:scale-105" onClick={ScrollToTop}>About</Link>
                                <Link to="/privacy" className="transition-transform duration-300 hover:scale-105" onClick={ScrollToTop}>Privacy Policy</Link>
                                <Link to="/terms" className="transition-transform duration-300 hover:scale-105" onClick={ScrollToTop}>Terms & Conditions</Link>
                                <Link to ="/jewellery_care" className="transition-transform duration-300 hover:scale-105" onClick={ScrollToTop}>Jewellery Care</Link>
                            </div>

                            {/* Product Catergory */}
                            <div className="flex flex-col gap-y-[15px] text-[17px] sm:text-[18px] ml-7 sm:ml-0">
                                {Array.isArray(collection) && collection
                                    ?.filter((item) => item.handle !== "best_seller" && item.body_html !== "<p>tarangi-specials</p>")
                                    .map((item) => (
                                        <Link
                                            to={`/products/${item.handle}`}
                                            state={{
                                                category: item.handle,
                                                collectionId: item.id,
                                            }}
                                            onClick={ScrollToTop}
                                            className="group transition-transform duration-300 hover:scale-105 "
                                        >
                                            <p className="capitalize">{item.handle}</p>
                                        </Link>
                                ))}
                                <Link to="/blog" className = "transition-transform duration-300 hover:scale-105">Blogs</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[15px] text-[17px] sm:text-[18px] text-left sm:text-center xl:text-right ml-6 sm:ml-0">
                        <a href="tel:9003058300"><p>+91 90030 58300</p></a>
                        <a href="mailto:tarangijewelsindia@gmail.com"><p>tarangijewelsindia@gmail.com</p></a>
                        <a href="https://share.google/6f6U8XByQoc0FWsBP" target="_blank">
                            <p>431-435,VNA Complex, NSR Road</p>
                            <p>Saibaba Colony, Coimbatore-641011</p>
                        </a>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Footer;
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

// Images 
import craftedby from '../assets/craftedby.png'
import sandalflower from '../assets/sandalflower.png'

function ThankYou() {

    const data = [
        {
            img: craftedby,
            name: "Ramakrishana",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
         {
            img: craftedby,
            name: "Ramakrishana",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ]

    return (
        <>
            {/* Background */}
            <div className="thankyou relative bg-light-sandal py-[60px] xl:py-[140px]">

                {/* <img className="absolute right-0 z-0" src={sandalflower} alt="" /> */}

                {/* Container */}
                <div className="max-w-[1300px] mx-auto font-poppins flex flex-wrap items-center gap-12 px-5">

                    {/* Thank you message */}
                    <div className="max-w-[524px] mx-auto">
                        <h1 className="font-atteron text-[40px] text-center text-primary sm:text-[50px] lg:text-[64px] xl:text-left">Thank you for your purchase</h1>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] mt-6 xl:justify-start">
                            <button className="flex items-center justify-center gap-x-[8px] bg-[#4B001A] w-[220px] h-[56px] rounded-full text-white text-[18px] font-medium ">
                                Continue Shopping
                            </button>

                            <button className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-[210px] h-[56px] rounded-full text-primary text-[18px] font-medium ">
                                View my Orders
                            </button>
                        </div>
                    </div>

                    {/* Crafted by */}
                    <div className="w-full sm:max-w-[572px] mx-auto">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {/* <SwiperSlide>
                                <div className="sm:w-[472px] h-fit mx-auto bg-[#FFFAF3] rounded-[24px] shadow-2xl p-[25px] sm:p-[35px] z-10">
                                    <img className="w-[399px] sm:h-[420px] " src={craftedby} alt='Handcrafeted' />

                                    <div className="space-y-[3px] mt-[20px]">
                                        <p className="text-[#6E6E6E] text-[16px]">This piece was handcrafted by</p>
                                        <h2 className="text-[#404040] text-[24px] font-medium">Ramakrishana</h2>
                                        <p className="text-primary text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </SwiperSlide> */}
                            {
                                data.map((items) => {
                                    return (
                                        <SwiperSlide>
                                            <div className="w-full sm:w-[472px] h-fit mx-auto bg-[#FFFAF3] rounded-[24px] shadow-2xl p-[25px] sm:p-[35px] z-10">
                                                <img className="w-[399px] sm:h-[420px] " src={items.img} alt='Handcrafeted' />

                                                <div className="space-y-[3px] mt-[20px]">
                                                    <p className="text-[#6E6E6E] text-[16px]">This piece was handcrafted by</p>
                                                    <h2 className="text-[#404040] text-[24px] font-medium">{items.name}</h2>
                                                    <p className="text-primary text-[16px]">{items.content}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }



                        </Swiper>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ThankYou;
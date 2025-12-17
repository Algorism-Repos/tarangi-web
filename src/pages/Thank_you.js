import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// Images
import sandalflower from "../assets/sandalflower.png";
import muthukrishan from "../assets/muthukrishan_artist.jpeg";
import ramesh from "../assets/ramesh_artist.jpeg";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();

  const { cartItems,clearCart } = useContext(AppContext);
  console.log(cartItems)
const data = [
        {
            img: muthukrishan,
            name: "Muthukrishnan",
            content: "A second-generation artisan who blends creativity and precision to craft exquisite jewels that reflect timeless craftsmanship and meticulous attention to detail."
        },
        {
            img: ramesh,
            name: "Ramesh",
            content: "A master craftsman who can infuse tradition with innovation, creating jewels that embody precision, novel artistry and generations of refined skillsets."
        }
    ]
  const mergedData =
    cartItems.length === 1
      ? [
          {
            ...data[0],
            productImage: cartItems[0].image,
          },
        ]
      : data.map((item, key) => ({
          ...item,
          productImage: cartItems[key]?.image,
        }));
        useEffect(()=>{
                clearCart();

        },[])
  return (
    <>
      {/* Background */}
      <div className="thankyou relative bg-light-sandal py-[60px] xl:py-[140px]">
        {/* <img className="absolute right-0 z-0" src={sandalflower} alt="" /> */}

        {/* Container */}
        <div className="max-w-[1300px] mx-auto font-poppins flex flex-wrap items-center gap-12 px-5">
          {/* Thank you message */}
          <div className="max-w-[524px] mx-auto">
            <h1 className="font-atteron text-[40px] text-center text-primary sm:text-[50px] lg:text-[64px] xl:text-left">
              Thank you for your purchase
            </h1>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] mt-6 xl:justify-start">
              <button className="flex items-center justify-center gap-x-[8px] bg-[#4B001A] w-[220px] h-[56px] rounded-full text-white text-[18px] font-medium "  onClick={() => navigate("/home")}>
                Back to home
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
              onSlideChange={() => console.log("slide change")}
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
              {mergedData?.map((items) => {
                return (
                  <SwiperSlide>
                    <div className="w-full sm:w-[472px] h-fit mx-auto bg-[#FFFAF3] rounded-[24px] shadow-2xl p-[25px] sm:p-[35px] z-10">
                      <div className="relative">
                        <img
                          className="w-[399px] sm:h-[420px] rounded-[24px] object-cover relative"
                          src={items.img}
                          alt="Handcrafeted"
                        />
                        {/* <img className="w-[130px] h-[130px] object-cover absolute bottom-0 right-0 rounded-[14px] border-white border-[16px]" src={product} alt="product_image" /> */}
                        <div className="w-[130px] h-[130px] absolute bottom-0 right-0 rounded-[14px] border-[16px] border-white overflow-hidden">
                          <img
                            className="w-full h-full object-cover rounded-[14px]"
                            src={items?.image}
                            alt="product_image"
                          />
                        </div>
                      </div>

                      <div className="space-y-[3px] mt-[20px]">
                        <p className="text-[#6E6E6E] text-[16px]">
                          This piece was handcrafted by
                        </p>
                        <h2 className="text-[#404040] text-[24px] font-medium">
                          {items.name}
                        </h2>
                        <p className="text-primary text-[16px]">
                          {items.content}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYou;

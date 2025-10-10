import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

import Modal from "../components/Modal"

//asset import
import new_product_1 from "../assets/new_product_1.png"
import new_product_2 from "../assets/new_product_2.png"
import new_product_3 from "../assets/new_product_3.png"
import new_product_4 from "../assets/Bold Black Stud.png"
import new_product_5 from '../assets/Lord Shiva Kada.png'
import new_product_6 from '../assets/Choco Hollow Braclet 1.png'
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
import whatsapp_floating from "../assets/whatsapp_icon.svg"





function Home() {

  const [modalToggle, setModalToggle] = useState(false);
  const [festiveProducts, setPfestiveProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [instafeed, setInstafeed] = useState();
  function toggle(type) {
    setSelectedType(type);
    console.log(type);
    setModalToggle(!modalToggle);
  }
  const festiveProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/shopify/products"
      );
      setPfestiveProducts(response.data);
      console.log(response);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    }
    
  };
  const festiveFiltered = festiveProducts.filter((product) =>
    product.tags
      ?.toLowerCase()
      .split(",")
      .map((tag) => tag.trim())
      .includes("festive collection")
  );
  console.log(festiveFiltered);
  useEffect(() => {
    festiveProduct();
  }, []);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // -------------------


  const bestSellers = [
    { img: new_product_1, name: "Flora Beauty", price: "₹ 1,700" },
    { img: new_product_2, name: "Queen Necklace", price: "₹ 4,650" },
    { img: new_product_3, name: "Bloom Haathphool", price: "₹ 2,400" },
    { img: new_product_4, name: "Bold Black Stud", price: "₹ 990" },
    { img: new_product_5, name: "Lord Shiva Kada", price: "₹ 16,500" },
    { img: new_product_6, name: "Choco Hollow Bracelet", price: "₹ 4,100" },
  ];



  const specials = [
    { img: pink_collection, title: "Pink Collection" },
    { img: statement_earrings, title: "Statement Ear rings" },
    { img: dangers, title: "Danglers" },
    { img: jaguar_bracelet, title: "Jaguar Bracelets" },
    { img: watch_charms, title: "Watch Charms" },
  ];



  return (
    <>
      <a href="https://wa.me/919003058300/?text=Hi," target="_blank" className="fixed bottom-3 right-3 sm:bottom-9 sm:right-7 z-30 ">
        <img src={whatsapp_floating} alt="Whatsapp_Icon" className={`w-[50px] sm:w-[70px] h-fit hover:scale-125 max-h-[70px] ${animate ? " animate-bounce duration-300 transition-transform will-change-transform transform-gpu" : ""}`} />
      </a>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="festive-banner relative">
            <a href="#launchOffers" className="hover:scale-110 transition duration-300 absolute bottom-8 sm:bottom-16 sm:left-[24%]  ">
              <button className="rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">View our Best Sellers</button>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-section">
            <h1 className="font-atteron uppercase text-[52px] leading-[70px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[720px]">Born from tradition Designed for today</h1>
            <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">Because exculsive 925 silver jewelry should feel as unique as the one who wears it.</h4>
            <a href="#launchOffers" className="w-fit hover:scale-110 transition duration-300">
              <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[14px] cursor-pointer">View our Best Sellers</button>
            </a>
          </div>
        </SwiperSlide>

      </Swiper>

      {/* Home Banner */}
      {/* <div className="banner-section">
                <h1 className="font-atteron uppercase text-[52px] leading-[70px] text-center sm:text-left sm:text-[65px] text-white sm:leading-[80px] font-normal w-full sm:max-w-[720px]">Born from tradition Designed for today</h1>
                <h4 className="font-poppins text-[12px] w-[257px] sm:w-full sm:text-[22px] font-normal leading-normal text-white text-center sm:text-left mt-8 max-w-[640px]">Because exculsive 925 silver jewelry should feel as unique as the one who wears it.</h4>
                <a href="#launchOffers" className="w-fit">
                    <button className=" mt-10 sm:mt-12 rounded-[32px] bg-[#CFA266] w-[259px] font-poppins text-[16px] font-normal text-white py-[16px] px-[16px] cursor-pointer">View our Collection</button>
                </a>
            </div> */}

      <div className="whyus">
        <h1 className="font-atteron text-[52px] sm:text-[72px] text-center text-[#5C0A1F] leading-normal">WHY US?</h1>

        <div className="font-poppins text-center text-[16px] sm:text-[24px] font-medium sm:leading-[38px] text-[#28040E] max-w-[318px] sm:max-w-[1000px] mt-5 sm:mt-9 ">
          <p>With nearly 60 years of heritage, Tarangi carries forward the craftsmanship and trust of their family's tradition, reimagined for today by the siblings. Each piece blends timeless artistry with a modern sensibility, creating jewelry that feels rooted and refreshingly new. The handmade silver jewelry designs celebrate everyone, including women, men and couples, making inclusivity our defining hallmark. Tarangi offers fine 925 silver jewelry. </p>
        </div>
      </div>

      {/* Collections - Section */}
      <div className="design-section py-40 relative">
        <div className="max-w-7xl mx-auto">
          <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white">Our Curations</h1>
          <div className="flex flex-col gap-y-[160px] sm:gap-y-0 sm:flex-row items-center justify-center gap-x-12 relative my-36 sm:my-56">
            <div className="border-2 border-white w-[360px] h-[374px] relative z-0 overflow-hidden" onClick={toggle}> <img src={men_design} alt="men-image" className="w-[359px] h-[539px] sm:w-[373px] sm:h-[459px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute bottom-[-0px] z-10" />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-0 left-1/3 ">Men</h2>
            </div>
            <div className="border-2 border-white w-[360px] h-[374.15px] relative z-0 " onClick={toggle}> <img src={women_design} alt="men-image" className="w-[359px] h-[539px] sm:w-[373px] sm:h-[459px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute bottom-[-0px] z-10" />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-0 left-1/4 ">Women</h2>
            </div>
            <div className="border-2 border-white w-[360px] h-[374.15px] relative z-0 overflow-hidden" onClick={toggle}> <img src={couple_design} alt="men-image" className="w-[360px] h-[360px] sm:w-[374px] sm:h-[374px] h-fit transform transition-transform duration-300 ease-out hover:scale-110 absolute z-10" />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[50px] z-20 absolute bottom-[-15px] left-1/4 ">Couples</h2>
            </div>
          </div>


          {/* Best Sellers */}
          <h1 className="section-heading !text-white">Best Sellers</h1>
          <div className="flex flex-col flex-wrap sm:flex-row gap-y-20 items-center justify-between mt-20 sm:mt-36">
            {festiveFiltered.map((type) => (
              <div
                className="flex flex-col items-center gap-y-1 transform transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                onClick={() => {
                  setSelectedType(type.name);
                  toggle();
                }}
              >
                <img
                  src={type?.image?.src}
                  alt={type?.name}
                  className="w-[395px] h-[395px]"
                />
                <h5 className="font-poppins text-[28px] font-normal leading-normal text-white mt-6">
                  {type?.title}
                </h5>
                <h4 className="font-poppins text-[28px] font-semibold leading-normal text-[#FCD99F]">
                  ₹ {type.variants[0]?.price || "N/A"}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Gold vs Gold Plated Silver Section */}
      <div className="bg-secondary">
        <div className="max-w-[1220px] mx-auto py-20 sm:pt-40 sm:pb-20  px-3 ">
          <h1 className="section-heading lg:w-[846px] w-[336px] mx-auto tracking-[]">Gold vs Silver Jewellery</h1>
          <p className="section-content text-center sm:max-w-[1034px] mx-auto mt-14">Gold jewelry has always been cherished for its permanence, but often feels out of reach for everyday style. Gold-plated silver brings the same timeless look with the ease and affordability to make elegance part of daily life.</p>
          {/* <p className="section-content text-center sm:w-[1034px] w-[330px] mx-auto mt-9">At Tarangi, each gold-plated silver piece fuses the richness of gold with the strength of sterling silver. </p> */}


          {/* Images */}

          <h1 className="w-[340px] sm:w-[680px] mx-auto text-center font-atteron text-[#5C0A1F] text-[20px] sm:text-[40px] font-semibold tracking-[1px] sm:tracking-[2.5px] mt-16 sm:mt-20">Enjoy stunning designs without the heavy price tag</h1>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-y-12 sm:gap-y-28 w-full mt-16 sm:mt-20">

            <div className="relative border">
              <img src={silver_jewel} alt="silver_jewel" className="sm:w-[542px] sm:h-[645px]" />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute top-[100px] sm:top-[150px] left-1/2 -translate-x-1/2 -translate-y-1/2">Gold</h2>
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">₹ 4,00,000</h2>
            </div>

            <div className="relative">
              <img src={gold_jewel} alt="silver_jewel" className="sm:w-[542px] sm:h-[645px]" />
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute top-[100px] sm:top-[150px] left-1/2 -translate-x-1/2 -translate-y-1/2">Silver</h2>
              <h2 className="font-atteron text-white text-center font-normal leading-normal text-[35px] sm:text-[50px] z-20 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">₹ 12,000</h2>

              {/* <h2 className="max-w-[350px] font-atteron text-white text-center font-normal leading-normal text-[25px] sm:text-[24px] z-20 tracking-[2px] absolute bottom-0 sm:bottom-8 left-[20%]">Get the Look of Luxury At just<span className="text-[30px] font-bold"> ₹12,000</span></h2> */}
              <p></p>
            </div>
          </div>



          <div className="max-w-6xl mx-auto mt-8 sm:mt-28 px-4 py-12">
            <h1 className="font-atteron text-[30px] font-bold text-[#5C0A1F] text-center tracking-[2px] sm:text-[48px]">Why choose Tarangi’s<br className="hidden md:block" /> silver jewelry?</h1>

            <div className="flex flex-col w-fit mx-auto gap-y-7 mt-16 px-4 sm:px-0">
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[24px]">The luminous beauty of gold, made affordable.</p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[24px]">Lightweight and comfortable for everyday wear.</p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[24px]">Versatile, from casual looks to special occasions.</p>
              </div>
              <div className="flex flex-row items-center gap-x-4">
                <img className="w-[28px]" src={bullet_icon} />
                <p className="font-poppins text-left text-[18px] sm:text-[24px]">Crafted with lasting artistry and care.</p>
              </div>
            </div>

            {/* <ul style={{ listStyleImage: `url(${bullet_icon})` }} className=" max-w-fit px-5 mx-auto space-y-6 mt-16 sm:text-[28px] flex-col items-center" >
                            <li>&nbsp; &nbsp;The luminous beauty of gold, made affordable</li>
                            <li>&nbsp; &nbsp;Lightweight and comfortable for everyday wear</li>
                            <li>&nbsp; &nbsp;Versatile, from casual looks to special occasions</li>
                            <li>&nbsp; &nbsp;Crafted with lasting artistry and care</li>
                        </ul> */}
          </div>

        </div>

      </div>


      {/* Tarangi Specials */}
      <div id="launchOffers" className="newproducts-section">
        <div className="max-w-7xl mx-auto py-20 sm:py-40 px-3 sm:px-0">
          <h1 className="section-heading !text-[52px] sm:!text-[64px] !text-white mt-32 sm:mt-0 overflow-x-hidden">
            Tarangi Specials
          </h1>

          <div className="flex flex-col sm:flex-row items-center sm:gap-x-12 gap-y-24 sm:flex-wrap justify-center mt-12 sm:mt-44">
            {specials.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center transform transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                onClick={() => {
                  setSelectedType(item.title);
                  toggle();
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[357px] h-[380px] sm:w-[374px] sm:h-[398px] border-[2px] border-white"
                />
                <h3 className="font-atteron text-[34px] font-normal leading-normal text-white mt-2">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Fast Selling Products - Section */}
      <div className="fastselling-section hidden">
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
      <div className="newproducts-section hidden">
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

      {/* Modal */}
      <Modal modal={modalToggle} active={toggle} productName={selectedType} />

    </>
  )
}

export default Home    
import React, { useContext } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import Unfilled_likeIcon from "../assets/Products/Unfilled_likeIcon.png";
import { AppContext } from "../context/AppContext";

function Recently_Viewed() {
  const { recentlyViewed } = useContext(AppContext);

  if (recentlyViewed.length === 0) return null;

  return (
    <>
      {/* Recently Viewed */}
      <div className="max-w-[1300px] mx-auto mt-[50px] lg:mt-[80px]">
        <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px]  xl:text-left">
          Recently Viewed
        </h1>

        <div className="flex flex-wrap justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
          {/* Looping */}
          {recentlyViewed.map((item) => {
            return (
              <div className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0">
                <img
                  className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px]"
                  src={item.image}
                  alt={item.alt}
                />
                <img
                  className="w-[40px] h-[40px] absolute right-3 top-3"
                  src={Unfilled_likeIcon}
                  alt="Like Icon"
                />

                <div className="mt-2 flex-col items-center justify-between sm:mt-4">
                  <div>
                    <h1 className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">{item?.title}</h1>

                    {/* <h3 className="text-[16px] font-semibold sm:text-[20px]">
                      {item.price}
                    </h3>
                    <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                      {item.title}
                    </p> */}
                  </div>

                  <div className="mt-1.5 flex items-center justify-between">
                    {/* <p className="text-[15px] text-[#6F6F6F]">
                      Colors Available
                    </p> */}

                    <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                      ₹{item.price}
                    </h3>

                    <div className="flex justify-center gap-x-2.5 mr-1">
                      <img
                        className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                        src={gold_ellipse}
                        alt="gold ellipse"
                      />
                      <img
                        className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                        src={silver_ellipse}
                        alt="Silver ellipse"
                      />
                      <img
                        className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                        src={brown_ellipse}
                        alt="brown ellipse"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Recently_Viewed;

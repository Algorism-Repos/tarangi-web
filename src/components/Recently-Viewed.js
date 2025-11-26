import React, { useContext } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import product_3 from "../assets/Products/product_1.png"; // brown color image

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

import { AppContext } from "../context/AppContext";
import LikeButton from "../components/LikeButton";

function Recently_Viewed() {
  const { recentlyViewed, setRecentlyViewed } = useContext(AppContext);

  // 🔥 Assign images based on color
  const colorImages = {
    gold: product_1,
    silver: product_2,
    brown: product_3,
  };

  // ❤️ Like toggle
  const toggleLike = (id) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  // 🎨 Color Change Function
  const handleColorChange = (id, color) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selectedColor: color,
              image: colorImages[color], // change product image here
            }
          : item
      )
    );
  };

  return (
    <div className="max-w-[1300px] mx-auto mt-[50px] lg:mt-[80px]">
      <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
        Recently Viewed
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
        {recentlyViewed.map((item) => (
          <div
            key={item.id}
            className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0 group hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px] transition-all duration-300 ease-in-out group-hover:shadow-lg"
              src={item.image}
              alt={item.alt || "Product image"}
            />

            {/* Like button */}
            <LikeButton liked={item.liked} onToggle={() => toggleLike(item.id)} />

            <div className="mt-2 flex-col items-center justify-between sm:mt-4">
              <div>
                <h1 className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                  {item.title}
                </h1>
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                  ₹{item.price}
                </h3>

                {/* Color Options */}
                <div className="flex justify-center gap-x-2.5 mr-1">
                  <img
                    className={`w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px] cursor-pointer ${
                      item.selectedColor === "gold" && "border-2"
                    }`}
                    src={gold_ellipse}
                    alt="gold"
                    onClick={() => handleColorChange(item.id, "gold")}
                  />

                  <img
                    className={`w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px] cursor-pointer ${
                      item.selectedColor === "silver" && "border-2"
                    }`}
                    src={silver_ellipse}
                    alt="silver"
                    onClick={() => handleColorChange(item.id, "silver")}
                  />

                  <img
                    className={`w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px] cursor-pointer ${
                      item.selectedColor === "brown" && "border-2"
                    }`}
                    src={brown_ellipse}
                    alt="brown"
                    onClick={() => handleColorChange(item.id, "brown")}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recently_Viewed;

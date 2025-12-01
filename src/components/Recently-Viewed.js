import React, { useContext } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import product_3 from "../assets/Products/product_1.png"; // brown color image

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

import { AppContext } from "../context/AppContext";
import LikeButton from "../components/LikeButton";

// Helper to map colors to images (like Product_Listing)
const IMAGE_BY_COLOR = (item) => ({
  gold: item.image?.src || item.image || product_1, // gold = main image
  silver: product_2,
  brown: product_3,
});

function Recently_Viewed() {
  const { recentlyViewed, setRecentlyViewed } = useContext(AppContext);

  //  Color change – only update selectedColor
  const handleColorChange = (id, color) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selectedColor: color,
            }
          : item
      )
    );
  };

  //  Like toggle
  const toggleLike = (id) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  return (
    <div className="max-w-[1300px] mx-auto mt-[50px] lg:mt-[80px]">
      <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
        Recently Viewed
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
        {recentlyViewed.map((item) => {
          const colorImages = IMAGE_BY_COLOR(item);
          const selectedColor = item.selectedColor || "gold";
          const imageSrc =
            (selectedColor && colorImages[selectedColor]) || colorImages.gold;

          return (
            <div
              key={item.id}
              className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0 group hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {/* Product image based on selectedColor */}
              <img
                className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px]  rounded-[24px] transition-all duration-300 ease-in-out group-hover:shadow-lg"
                src={imageSrc}
                alt={item.alt || "Product image"}
              />

              {/* Like button */}
              <LikeButton
                liked={item.liked}
                onToggle={() => toggleLike(item.id)}
              />

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
                    {/* GOLD */}
                    <img
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all duration-200 ${
                        selectedColor === "gold"
                          ? "border-2 border-[#6E0027] p-[2px] scale-110 shadow-md"
                          : "border border-gray-300 hover:border-[#6E0027]"
                      }`}
                      src={gold_ellipse}
                      alt="gold"
                      onClick={() => handleColorChange(item.id, "gold")}
                    />

                    {/* SILVER */}
                    <img
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all duration-200 ${
                        selectedColor === "silver"
                          ? "border-2 border-[#6E0027] p-[2px] scale-110 shadow-md"
                          : "border border-gray-300 hover:border-[#6E0027]"
                      }`}
                      src={silver_ellipse}
                      alt="silver"
                      onClick={() => handleColorChange(item.id, "silver")}
                    />

                    {/* BROWN */}
                    <img
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all duration-200 ${
                        selectedColor === "brown"
                          ? "border-2 border-[#6E0027] p-[2px] scale-110 shadow-md"
                          : "border border-gray-300 hover:border-[#6E0027]"
                      }`}
                      src={brown_ellipse}
                      alt="brown"
                      onClick={() => handleColorChange(item.id, "brown")}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recently_Viewed;

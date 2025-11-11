import React, { useState, useEffect } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import AddToCartButton from "../components/AddToCartButton";
import LikeButton from "../components/LikeButton";
import Recently_Viewed from "../components/Recently_Viewed";

function Favourites() {
  const initialProducts = [
    {
      id: 1,
      product_img: product_1,
      alt: "Necklace",
      price: "₹10,000",
      product_name: "Stone Necklace",
      liked: true,
      isOutOfStock: false,
    },
    {
      id: 2,
      product_img: product_2,
      alt: "Silver Kada",
      price: "₹4,000",
      product_name: "Stone Kada",
      liked: true,
      isOutOfStock: false,
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const toggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const likedProducts = products.filter((p) => p.liked);

  // ✅ Store if favourites exist in localStorage
  useEffect(() => {
    localStorage.setItem("hasFavourites", likedProducts.length > 0 ? "true" : "false");
  }, [likedProducts]);

  return (
    <div className="bg-light-sandal py-[70px]">
      <div className="max-w-[1300px] mx-auto px-2">
        <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
          Your Favourites
        </h1>

        {likedProducts.length === 0 ? (
          <p className="text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
            No Products in the favourites page
          </p>
        ) : (
          <div className="flex flex-wrap gap-x-[15px] gap-y-6 mt-[25px] sm:gap-x-[26px] justify-center xl:justify-start">
            {likedProducts.map((item) => (
              <div
                key={item.id}
                className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0 group hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="overflow-hidden rounded-2xl relative">
                  <img
                    className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] object-cover rounded-[16px] ${
                      item.isOutOfStock ? "grayscale" : ""
                    } transition-all duration-300 ease-in-out group-hover:shadow-lg`}
                    src={item.product_img}
                    alt={item.alt}
                  />

                  <LikeButton
                    liked={item.liked}
                    isOutOfStock={item.isOutOfStock}
                    onToggle={() => toggleLike(item.id)}
                  />

                  {item.isOutOfStock && (
                    <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                      Sold Out
                    </p>
                  )}
                </div>

                <div className="mt-2 sm:mt-4">
                  <div>
                    <h3 className="text-[16px] font-semibold sm:text-[20px]">
                      {item.price}
                    </h3>
                    <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                      {item.product_name}
                    </p>
                  </div>

                  <AddToCartButton />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Recently_Viewed />
    </div>
  );
}

export default Favourites;

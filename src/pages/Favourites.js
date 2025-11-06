import React, { useState } from "react";
import Recently_Viewed from "../components/Recently_Viewed";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";
import Filled_LikeIcon from "../assets/Products/Filled_likeIcon.png";
import LikeIcon from "../assets/Products/Unfilled_likeIcon.png";

function Favourites() {
  const initialProducts = [
    {
      id: 1,
      product_img: product_1,
      alt: "Necklace",
      price: "₹10,000",
      product_name: "Stone Necklace",
      liked: true,
    },
    {
      id: 2,
      product_img: product_2,
      alt: "Silver Kada",
      price: "₹4,000",
      product_name: "Stone Kada",
      liked: true,
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  // Toggle like/unlike
  const toggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const likedProducts = products.filter((p) => p.liked);

  return (
    <>
      <div className="bg-light-sandal py-[70px]">
        <div className="max-w-[1300px] mx-auto">
          <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
            Your Favourites
          </h1>

          {/* Favourites */}
          <div>
            {likedProducts.length === 0 ? (
              <p className="text-center text-[18px] text-[#4B001A] mt-6 font-poppins">
                No Products in the favourites page
              </p>
            ) : (
              <div className="flex flex-wrap gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[26px]">
                {likedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0 group"
                  >
                    {/* Image container with hover and transition */}
                    <div className="overflow-hidden rounded-2xl relative">
                      <img
                        className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                        src={item.product_img}
                        alt={item.alt}
                      />

                      {/* Like Button (shows only on hover) */}
                      <button
                        onClick={() => toggleLike(item.id)}
                        className="absolute right-3 top-3 w-[40px] h-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out focus:outline-none"
                      >
                        <img
                          src={item.liked ? Filled_LikeIcon : LikeIcon}
                          alt={item.liked ? "Liked" : "Unliked"}
                          className="w-full h-full transition-transform duration-200 hover:scale-110"
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="mt-2 sm:mt-4">
                      <div>
                        <h3 className="text-[16px] font-semibold sm:text-[20px]">
                          {item.price}
                        </h3>
                        <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                          {item.product_name}
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] 
                                   w-full h-[50px] rounded-full text-primary text-[16px] font-medium mt-2 
                                   sm:text-[18px] sm:h-[54px] transition-all duration-300 ease-in-out 
                                   hover:bg-[#4B001A] hover:text-white"
                        onMouseEnter={(e) =>
                          (e.currentTarget.querySelector("img").src =
                            shoppingCart_white)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.querySelector("img").src =
                            shoppingCart_red)
                        }
                      >
                        <img
                          className="w-[32px] h-[32px] transition-all duration-300 ease-in-out"
                          src={shoppingCart_red}
                          alt="cart_icon"
                        />
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Recently_Viewed />
      </div>
    </>
  );
}

export default Favourites;

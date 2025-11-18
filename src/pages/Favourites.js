import React, { useState, useEffect } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import AddToCartButton from "../components/AddToCartButton";
import LikeButton from "../components/LikeButton";
import Recently_Viewed from "../components/Recently-Viewed";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

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
    {
      id: 3,
      product_img: product_2,
      alt: "Silver Kada",
      price: "₹4,000",
      product_name: "Stone Kada",
      liked: true,
      isOutOfStock: false,
    },
        {
      id: 4,
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px] ">
            {likedProducts.map((item) => (
              <div
                key={item.id}
                className="max-w-[304px] items-center group relative mx-auto"
              >
                <div className="overflow-hidden rounded-2xl relative">
                  <img
                    className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px]  ${item.isOutOfStock ? "grayscale" : ""
                      } transition-all duration-300 ease-in-out group-hover:scale-105`}
                    src={item.product_img}
                    alt={item.alt}
                  />

                  <LikeButton
                    liked={item.liked}
                    isOutOfStock={item.isOutOfStock}
                    onToggle={() => toggleLike(item.id)}
                  />
                </div>

                <div className="flex justify-between items-center w-full my-3 gap-x-2">
                  <div>
                    <p className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                      {item.product_name}
                    </p>
                    <p className="text-[#4E4E4E] font-semibold text-[16px]">{item.price}</p>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex justify-center gap-x-2.5 mr-1">
                      <img className="w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={gold_ellipse} />
                      <img className="w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={silver_ellipse} />
                      <img className="w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]" src={brown_ellipse} />
                    </div>
                  </div>
                </div>

                <AddToCartButton />
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

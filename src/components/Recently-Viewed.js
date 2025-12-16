import React, { useContext, useEffect, useState } from "react";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import product_3 from "../assets/Products/product_1.png"; // brown color image

import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

import { AppContext } from "../context/AppContext";
import LikeButton from "../components/LikeButton";
import { Link } from "react-router";
function Recently_Viewed() {
  const [products, setProducts] = useState([]);

  const { recentlyViewed, setRecentlyViewed } = useContext(AppContext);
  const [selectedVariants, setSelectedVariants] = useState({});
  const COLOR_MAP = {
    Gold: gold_ellipse,
    Silver: silver_ellipse,
    RoseGold: brown_ellipse,
  };

  console.log(recentlyViewed)
  useEffect(() => {
    if (recentlyViewed) {
      setProducts(normalizeProducts(recentlyViewed));

    }
  }, [recentlyViewed]);
  const normalizeProducts = (data) =>
    data.map((item) => {
      if (!item.variants) {
        return {
          ...item,
          variants: [
            {
              variantId: item.variantId,
              price: item.price,
              image: item.image,
              colorVariant: null,
            },
          ],
        };
      }
      return item;
    });

  const changeVariant = (productId, index) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };
  //  Like toggle
  const toggleLike = (id) => {
    setRecentlyViewed((prev) =>
      prev.map((item) =>
        item?.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={recentlyViewed.length === 1 ? "hidden" : "max-w-[1300px] mx-auto mt-[50px] lg:mt-[80px]"}>
      <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
        Recently Viewed
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
        {recentlyViewed?.map((item) => {
            if (!item || !item?.variants || item?.variants.length === 0) return null; 
          const selectedIndex = selectedVariants[item?.productId] ?? 0;
          const selectedVariant = item?.variants[selectedIndex] ;

          return (
            <div key={item?.productId || item?.variantId}

              className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0 group hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {/* Product image based on selectedColor */}
              <Link
                to={`/product_description/${(
                  item?.title || "unknown-product"
                ).replace(/\s+/g, "-")}`}
                state={{ product: item }}
              >
                <img
                  className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px] transition-all duration-300 ease-in-out group-hover:shadow-lg"
                  src={selectedVariant?.image}
                  alt={item?.alt}
                />
              </Link>

              {/* Like button */}
              <LikeButton
                liked={item?.liked}
                onToggle={() => toggleLike(item?.id)}
              />

              <div className="mt-2 flex-col items-center justify-between sm:mt-4">
                <div>
                  <h1 className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                    {item?.title}
                  </h1>
                </div>

                <div className="mt-1.5 flex items-center justify-between">
                  <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                    ₹ {parseInt(selectedVariant?.price).toLocaleString("en-IN")}
                  </h3>

                  {/* Color Options */}
                  <div className="flex justify-center gap-x-2.5 mr-1">
                    {/* GOLD */}
                    {item?.variants.map((variant, index) => {
                      if (!variant?.colorVariant) return null;

                      return (
                        <img
                          key={variant?.variantId}
                          src={COLOR_MAP[variant?.colorVariant]}
                          alt={variant?.colorVariant}
                          className={`w-6 h-6 cursor-pointer ${
                            selectedIndex === index
                              ? "ring-2 ring-[#8B5E3C] rounded-full"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            changeVariant(item?.productId, index);
                          }}
                        />
                      );
                    })}
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

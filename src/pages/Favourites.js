import react, { useContext } from "react";
import Recently_Viewed from "../components/Recently-Viewed";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import Filled_LikeIcon from "../assets/Products/Filled_likeIcon.png";
import { AppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router";

function Favourites() {
  const { wishlistItems, removeFromWishlist, addToCart } =
    useContext(AppContext);
    console.log(wishlistItems);


  const handleAddToCart = (product) => {
    console.log(product);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    });
  };
  return (
    <>
      <div className="bg-light-sandal py-[70px]">
        <div className="max-w-[1300px] mx-auto">
          <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
            Your Favourites
          </h1>
          {/* Favourites*/}
          <div>
            <div className="flex flex-wrap gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[26px]">
              {/* Looping */}

              {wishlistItems.map((item, index) => (
                <div className="relative font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0">
                  <img
                    className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px]"
                    src={item.image}
                    alt={item.alt}
                  />
                  <img
                    className="w-[40px] h-[40px] absolute right-3 top-3"
                    src={Filled_LikeIcon}
                    alt="Icon"
                  />

                  <div className="mt-2 sm:mt-4">
                    <div>
                      <h3 className="text-[16px] font-semibold sm:text-[20px]">
                        ₹ {item.price.toLocaleString("en-IN")}
                      </h3>
                      <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                        {item.title}
                      </p>
                    </div>
                    <Link to="/cart">
                      <button
                        className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-full h-[50px] rounded-full text-primary text-[16px] font-medium mt-2 sm:text-[18px] sm:h-[54px]"
                        onClick={() => handleAddToCart(item)}
                      >
                        <img
                          className="w-[32px] h-[32px]"
                          src={shoppingCart_red}
                          alt="like_icon"
                        />
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Recently_Viewed />
      </div>
    </>
  );
}

export default Favourites;

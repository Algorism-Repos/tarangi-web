import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

// import your icons
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";
import { AppContext } from "../context/AppContext";

function AddToCartButton({ product, quantity }) {
  const { addToCart } = useContext(AppContext);
  const handleAddToCart = () => {
    if (!product?.variants?.[0]) return;


     console.log(product)
    addToCart({
      id: product.variants[0].id,
      title: product.title,
      price: parseInt(product.variants[0].price),
      image: product.image?.src,
      quantity: quantity,
    });
  };

  return (
    <Link to="/cart" >
      <button
        className="cursor-pointer flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] 
                 w-full h-[50px] rounded-full text-primary text-[16px] font-medium mt-2 
                 sm:text-[18px] sm:h-[54px] transition-all duration-300 ease-in-out 
                 hover:bg-[#4B001A] hover:text-white"
        onMouseEnter={(e) =>
          (e.currentTarget.querySelector("img").src = shoppingCart_white)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.querySelector("img").src = shoppingCart_red)
        }
        onClick={handleAddToCart}
      >
        <img
          className="w-[32px] h-[32px] transition-all duration-300 ease-in-out"
          src={shoppingCart_red}
          alt="cart_icon"
        />
        Add to cart
      </button>
    </Link>
  );
}

export default AddToCartButton;

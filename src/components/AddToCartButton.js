import React from "react";
import { useNavigate } from "react-router-dom";

// import your icons
import shoppingCart_red from "../assets/Products/shoppingcart_red.png";
import shoppingCart_white from "../assets/Products/shoppingcart_white.png";

function AddToCartButton({ product }) {
  // const navigate = useNavigate();

  // const handleAddToCart = () => {
  //   const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

  //   const alreadyExists = existingCart.some(
  //     (item) => item.id === product.id
  //   );

  //   if (!alreadyExists) {
  //     // Add the product to cart
  //     const updatedCart = [...existingCart, { ...product, quantity: 1 }];
  //     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //     alert(`${product.name} added to cart!`);
  //   } else {
  //     alert(`${product.name} is already in your cart.`);
  //   }

  //   // Redirect to cart page
  //   navigate("/cart");
  // };

  return (
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
      // onClick={handleAddToCart}
    >
      <img
        className="w-[32px] h-[32px] transition-all duration-300 ease-in-out"
        src={shoppingCart_red}
        alt="cart_icon"
      />
      Add to cart
    </button>
  );
}

export default AddToCartButton;

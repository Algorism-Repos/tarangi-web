import React, { useState, useContext } from "react";
import favorie_icon from "../assets/Products/favorite_icon.png";
import favorie_icon_white from "../assets/Products/Unfilled_likeIcon.png";
import CartToast from "./CartToast";
import { AppContext } from "../context/AppContext";
import Wishlist_Popup from "./Wishlist_Popup";

function AddToWishlistButton({ product }) {
  const { addToWishlist } = useContext(AppContext);
  const [wishIconSrc, setWishIconSrc] = useState(favorie_icon);
  //  console.log(product)

  const [showWishlistPopup, setShowWishlistPopup] = useState(false);

  const handleAddToWish = () => {
    // your wishlist add logic here
    setShowWishlistPopup(true);

    // if (!product?.variants?.[0]||) return;
    addToWishlist(product);
  };

  return (
    <>
      <button
        className="w-full sm:w-[190px] h-[56px] flex items-center justify-center gap-x-[8px]
          border-2 border-[#4B001A] rounded-full text-primary text-[16px] font-medium mt-2
          transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
        onMouseEnter={() => setWishIconSrc(favorie_icon_white)}
        onMouseLeave={() => setWishIconSrc(favorie_icon)}
        onClick={handleAddToWish}
      >
        <img src={wishIconSrc} className="w-[32px] h-[32px]" />
        Add to Wishlist
      </button>

      <Wishlist_Popup
        show={showWishlistPopup}
        onClose={() => setShowWishlistPopup(false)}
      />
    </>
  );
}

export default AddToWishlistButton;

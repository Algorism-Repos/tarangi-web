import React from "react";
import Filled_LikeIcon from "../assets/Products/Filled_likeIcon.png";
import LikeIcon from "../assets/Products/Unfilled_likeIcon.png";

function LikeButton({ liked, onToggle, isOutOfStock }) {
  if (isOutOfStock) return null;

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent link navigation
        onToggle();
      }}
      className={`absolute right-3 top-3 w-[40px] h-[40px] opacity-100 
        ${
          liked
            ? "opacity-100"
            : "lg:opacity-0 group-hover:opacity-100"
        }
        transition-opacity duration-300 ease-in-out focus:outline-none`}
    >
      <img
        src={liked ? Filled_LikeIcon : LikeIcon}
        alt={liked ? "Liked" : "Unliked"}
        className="w-full h-full transition-transform duration-200 hover:scale-110"
      />
    </button>
  );
}

export default LikeButton;

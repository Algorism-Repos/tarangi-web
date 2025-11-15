import React from "react";
import down_arrow from "../assets/Products/down_arrow.png";

function QuantitySelector({ maxQuantity=10,value, onChange = () => {} }) {
  const quantities = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className="relative inline-block mt-2" >
      <select
        className="appearance-none bg-white border border-[#B9B9B9] rounded-[8px] w-[65px] h-[36px] pr-5 text-center text-[16px] cursor-pointer focus:outline-none focus:border-primary"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {quantities.map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>

      <div className=" absolute right-1 top-1.5">
        <img src={down_arrow} alt="Down Arrow" />
      </div>
    </div>
  );
}

export default QuantitySelector;

  
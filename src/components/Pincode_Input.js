import React, { useState } from "react";
// Image
import location_icon from "../assets/Products/location.png";
function Pincode_Input() {
  const [pincode, setPincode] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [savedPincode, setSavedPincode] = useState("");
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 6) {
      setPincode(value);
    }
  };
  const handlePincodeChange = () => {
    if (isEditable && pincode.length === 6) {
      setSavedPincode(pincode);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };
  return (
    <div className="w-full bg-[#FFFAF3] border-2 border-transparent shadow mt-2 rounded-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img className="w-[24px] h-[24px] " src={location_icon} alt="location_icon" />
          {isEditable ? (
            <input
              type="text"
              placeholder="Enter Pincode"
              maxLength="6"
              value={pincode}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-[#333333] placeholder-[#333333] placeholder:font-medium text-[16px]"
            />
          ) : (
            <p className="text-[#333333] text-[14px]">
              Delivering to <span className="font-semibold">{savedPincode}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handlePincodeChange}
          className="text-[#7C0022] font-semibold text-[15px]"
        >
          {isEditable ? "Locate Me" : "Change Pincode"}
        </button>
      </div>
    </div>
  );
}
export default Pincode_Input;
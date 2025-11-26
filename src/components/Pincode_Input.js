import React, { useState } from "react";
import location_icon from "../assets/Products/location.png";

function Pincode_Input() {
  const [pincode, setPincode] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [savedPincode, setSavedPincode] = useState("");
  const [error, setError] = useState(""); // NEW

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 6) {
      setPincode(value);
      setError("");   // clear error while typing
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (pincode.length !== 6) {
        setError("Please enter a valid 6-digit pincode");
        return;
      }

      setSavedPincode(pincode);
      setIsEditable(false);
      setError("");
    }
  };

  const enableEdit = () => {
    setIsEditable(true);
    setPincode(savedPincode);
  };

  return (
    <div className="w-full bg-[#FFFAF3] border-2 border-[#F6EFE6] mx-auto shadow-2xl mt-2 rounded-xl">
      <div className="flex flex-col px-4 py-3">

        {/* Main Row */}
        <div 
          className="flex items-center justify-between"
          onClick={!isEditable ? enableEdit : undefined}
        >
          <div className="flex items-center gap-2">
            <img className="w-[24px] h-[24px]" src={location_icon} alt="location_icon" />

            {isEditable ? (
              <input
                type="text"
                placeholder="Enter Pincode"
                maxLength="6"
                value={pincode}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                autoFocus
                className={`bg-transparent focus:outline-none text-[#333333] placeholder-[#979797]
                  placeholder:font-semibold text-[16px] ${error ? "text-red-500" : ""}`}
              />
            ) : (
              <p className="text-[#333333] text-[14px] cursor-pointer">
                Delivering to <span className="font-semibold">{savedPincode}</span>
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-[12px] mt-1 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Pincode_Input;

import React, { useState } from "react";
import location_icon from "../assets/Products/location.png";

function Pincode_Input() {
  const [pincode, setPincode] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [savedPincode, setSavedPincode] = useState("");
  const [error, setError] = useState("");

  // only digits, max 6
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setPincode(value);
      setError("");
    }
  };

  const submitPincode = () => {
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }
    setSavedPincode(pincode);
    setIsEditable(false);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitPincode();
    }
  };

  const handleButtonClick = () => {
    if (isEditable) {
      // "Locate Me" acts like submit (no API)
      submitPincode();
    } else {
      // "Change Pincode"
      setIsEditable(true);
      setPincode(savedPincode);
      setError("");
    }
  };

  return (
    <div className="w-full bg-[#FFFAF3] border border-[#E6D5C2] mx-auto mt-2 rounded-xl">
      <div className="flex flex-col px-4 py-3 gap-1">
        {/* Main Row */}
        <div className="flex items-center justify-between gap-0 sm:gap-3">
          {/* Left: icon + input / text */}
          <div className="flex items-center flex-1 gap-2">
            <img
              className="w-[24px] h-[24px]"
              src={location_icon}
              alt="location_icon"
            />

            {isEditable ? (
              <input
                type="text"
                placeholder="Enter Pincode"
                maxLength={6}
                value={pincode}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className={`flex-1 bg-transparent focus:outline-none text-[#333333] placeholder-[#979797]
                  placeholder:font-normal text-[16px] ${
                    error ? "text-red-500" : ""
                  }`}
              />
            ) : (
              <p className="text-[#333333] text-[14px] truncate">
                Delivering to{" "}
                <span className="font-semibold">{savedPincode}</span>
              </p>
            )}
          </div>

          {/* Right: single button */}
          <button
            type="button"
            onClick={handleButtonClick}
            className=" px-2 py-1.5 text-[14px] font-semibold
                        text-[#6E0027] transition"
          >
            {isEditable ? "Locate Me" : "Change Pincode"}
          </button>
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

import React, { useState, useEffect } from "react";
import location_icon from "../assets/Products/location.png";

function Pincode_Input() {
  const [pincode, setPincode] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [savedPincode, setSavedPincode] = useState("");
  const [error, setError] = useState("");
  const [handleReSubmit, setHandleReSubmit] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    setError("");   // clear error while typing
    setHandleReSubmit(true);
  };

  // Automatic Submitting
  useEffect(() => {
    if (pincode.length === 6) {
      setIsEditable(false);
      setSavedPincode(pincode)
    } else {
      const timer = setTimeout(() => {
        if (pincode.length > 0 && pincode.length < 6) {
          setError("Please enter a valid 6-digit pincode.");
        }
      }, 2000); // 3 seconds (change to 4000 for 4s)
      return () => clearTimeout(timer);
    }

    if (pincode.length === 6 && !handleReSubmit) {
      const timer = setTimeout(() => {
        if (isEditable && !handleReSubmit && pincode.length === 6) {
          setIsEditable(false);
          setHandleReSubmit(true);
          console.log(pincode);
          setPincode(pincode);
        }
      }, 6000)
      return () => clearTimeout(timer);
    }
  }, [pincode, handleReSubmit]);

  const enableEdit = () => {
    setIsEditable(true);
    setPincode(savedPincode);
    setHandleReSubmit(false);
  };




  return (
    <>
      <div className={`w-full bg-[#FFFAF3] border-2 border-[#F6EFE6] mx-auto shadow-2xl mt-2 rounded-xl ${error ? "border-2 border-red-400" : "border-2 border-[#F6EFE6]"}`}>
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
                  autoFocus
                  className={`bg-transparent focus:outline-none text-[#333333] placeholder-[#979797]
                  placeholder:font-semibold text-[16px] `}
                />
              ) : (
                <p className="text-[#333333] text-[14px] cursor-pointer">
                  Delivering to <span className="font-semibold">{pincode}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {
        error && (
          <p className="text-red-500 text-[12px] leading-none !mt-2 ml-2 font-medium">
            {error}
          </p>)
      }
    </>
  );
}

export default Pincode_Input;

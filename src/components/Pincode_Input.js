import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import location_icon from "../assets/Products/location.png";
import shopping_bag from "../assets/Products/shopping_bag.png";
import { FetchDeliveryByPincode } from "../handler/api_Handler";
function Pincode_Input() {
  const [pincode, setPincode] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [savedPincode, setSavedPincode] = useState("");
  const [error, setError] = useState("");
  const [handleReSubmit, setHandleReSubmit] = useState(false);
  const pageLocation = useLocation();
  const location = pageLocation.pathname.split("/");
  const pathname = location[1];
  const [deliveryInfo, setDeliveryInfo] = useState({});

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    setError(""); // clear error while typing
    setHandleReSubmit(true);
  };

  // Automatic Submitting
  const getPincode = async () => {
    try {
      const response = await FetchDeliveryByPincode(pincode);
      console.log(response);
      setDeliveryInfo(response);
    } catch (error) {
      console.log("error fetching pincode", error);
    }
  };
  const tatHours = deliveryInfo?.TAT;
  let estimatedDate = null;

  if (tatHours !== null) {
    const now = new Date();
    const estimatedDelivery = new Date(
      now.getTime() + tatHours * 60 * 60 * 1000
    );

    const day = estimatedDelivery.getDate().toString().padStart(2, "0");
    const month = (estimatedDelivery.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const year = estimatedDelivery.getFullYear();

    estimatedDate = `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (pincode.length === 6) {
      setIsEditable(false);
      setSavedPincode(pincode);
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
      }, 6000);
      return () => clearTimeout(timer);
    }
    getPincode(pincode);
  }, [pincode, handleReSubmit]);

  const enableEdit = () => {
    setIsEditable(true);
    setPincode(savedPincode);
    setHandleReSubmit(false);
  };
  console.log(deliveryInfo);
  return (
    <>
      <div
        className={`w-full bg-[#FFFAF3] border-2 border-[#F6EFE6] mx-auto shadow-md mt-2 rounded-xl ${
          error ? "border-2 border-red-400" : "border-2 border-[#F6EFE6]"
        }`}
      >
        <div className="flex flex-col px-4 py-3">
          {/* Main Row */}
          <div
            className="flex items-center justify-between"
            onClick={!isEditable ? enableEdit : undefined}
          >
            <div className="flex items-center gap-2">
              <img
                className="w-[24px] h-[24px]"
                src={location_icon}
                alt="location_icon"
              />

              {isEditable ? (
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  maxLength="6"
                  value={pincode}
                  onChange={handleChange}
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
      {error && (
        <p className="text-red-500 text-[12px] leading-none !mt-2 ml-2 font-medium">
          {error}
        </p>
      )}
      {/* Delivery Date - product-description page */}
      <div
        className={
          pathname === "product_description" && pincode.length === 6
            ? "block ml-2"
            : "hidden"
        }
      >
        <div className="flex items-center gap-x-[8px] mt-4 ml-2 ">
          <img
            className="w-[18px] h-[22px]"
            src={shopping_bag}
            alt="Shopping bag icon"
          />
          {deliveryInfo ? (
            <p className="text-[#484848] text-[15px] font-medium">
              Expected to deliver by{" "}
              <span className="font-bold">{estimatedDate} </span>
            </p>
          ) : (
            <p className="text-[#484848] text-[15px] font-medium">
              We Don't deliver at your location
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export default Pincode_Input;

import react from "react";

// Image
import location_icon from '../assets/Products/location.png'


function Pincode_Input() {
  return (
    <div className="w-full bg-white border border-[#ADADAD] mt-2 rounded-[8px]">

      <div className="flex items-center justify-between p-3 sm:p-4">

        <div className="flex w-[50%] sm:gap-x-2">
          <img className="w-[24px]" src={location_icon} alt="location_icon" />
          <input type="number" placeholder="Enter Pincode" maxlength="6" size="6" className="text-[#979797] focus:outline-none" />
        </div>

        <button type="button"className="text-primary text-[16px] font-semibold">Locate Me</button>
      </div>
    </div>
  );
};

export default Pincode_Input;
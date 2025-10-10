import React from 'react';
import down_arrow from '../assets/Products/down_arrow.png'

function QuantitySelector() {
    return (
        <div className="relative inline-block mt-2">

            <select className="appearance-none bg-white border border-[#B9B9B9] rounded-[8px] w-[65px] h-[36px] pr-5 text-center text-[16px] cursor-pointer focus:outline-none focus:border-primary"
                defaultValue="1" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <div className=" absolute right-1 top-1.5">
                <img src={down_arrow} alt="Down Arrow" />
            </div>
        </div>
    );
};

export default QuantitySelector;

  
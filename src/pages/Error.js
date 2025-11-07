import React from "react";
import { Link } from "react-router";


function Error() {
    return (
        <>
            <div className="whyus bg-[#FFF5E8] text-center py-[120px] font-[poppins]">
                <h1 className="font-atteron text-primary text-[100px] leading-[50px] md:leading-[140px] md:text-[200px]">404</h1>
                <h2 className="text-[#404040] text-[22px] font-light my-10">Page Not Found</h2>

                {/* Button */}
                <Link to="/" className="mt-10">
                    <button className="mx-auto border-2 border-[#4B001A] w-[210px] h-[56px] rounded-full text-primary text-[18px] font-medium hover:bg-primary hover:text-white">
                        Back to Home
                    </button>
                </Link>

            </div>
        </>
    );
}

export default Error;
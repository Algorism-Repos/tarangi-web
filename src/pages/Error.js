import React from "react";
import { Link } from "react-router";
import error from '../assets/404_error.png'


function Error() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="error-background bg-[#FFF5E8] text-center font-[poppins]">

                <div className="relative">
                    <img className="w-[523px] h-fit relative" src={error} alt="Error image" />
                    <h1 className="font-atteron text-primary text-[61px] absolute inset-0">Error</h1>
                </div>

                <h2 className="text-[#404040] text-[32px] font-medium">Page Not Found</h2>

                {/* Button */}
                <Link to="/" className="mt-[40px]" onClick={scrollToTop}>
                    <button className="mx-auto bg-primary w-[210px] h-[56px] rounded-full text-white text-[18px] hover:scale-110 duration-150 ">
                        Go to Homepage
                    </button>
                </Link>

            </div>
        </>
    );
}

export default Error;
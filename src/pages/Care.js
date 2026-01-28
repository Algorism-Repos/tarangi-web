import React from "react";

import bullet_icon from "../assets/bullet_point.png";


function Care() {
    const content = [
        "Avoid wearing your jewellery while sweating or exercising.",
        "Do not apply perfume, lotion, or sunscreen after wearing your jewellery.",
        "Remove jewellery before washing hands, bathing, or swimming.",
        "Keep away from hard surfaces, friction, and direct heat.",
        "Avoid wearing while sleeping.",
        "Store pieces in a plastic zip pouch or airtight box when not in use — avoid velvet boxes.",
        "Do not clean with harsh chemicals or silver polish liquids.",
        "Gently wipe with a soft, dry cotton cloth after each use to restore its shine."

    ];



    return (
        <>
            <div className="blog-banner text-white">
                <h1 className=" font-atteron text-[52px] sm:text-[80px] mt-32 sm:mt-0 text-center font-normal">Jewellery <br /> Care</h1>
            </div>

            {/* Content */}
            <div className="bg-light-sandal py-[50px]">
                <div className="max-w-[1150px] mx-auto px-3">
                    <h2 className="font-poppins text-[14px] sm:text-[21px] font-medium mb-12">Silver jewellery has a natural, soft lustre that can gently fade or tarnish over time if not cared for properly. To keep your Tarangi pieces shining beautifully, follow these simple steps — care for your jewels just as you care for yourself</h2>

                    {content.map((i) => {
                        return (
                            <>
                                <div className="flex flex-row items-center sm:gap-x-5 gap-x-3 mt-7 sm:ml-7 ml-2 ">
                                    <img src={bullet_icon} alt="listing-icon" />
                                    <h4 className="font-poppins text-[14px] sm:text-[21px] font-normal text-[#595959]">{i}</h4>
                                </div>
                            </>
                        )
                    })}
                </div>


            </div>
        </>
    )
}

export default Care
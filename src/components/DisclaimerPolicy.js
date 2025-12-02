import React from "react";

function DisclaimerPolicy() {

    const disclaimerPolicy = [
        {
            title: "1. General Information",
            content: "All information, content, product descriptions, images and materials on this website are provided on an “as is” and “as available” basis. While Tarangi strives to keep all information accurate and updated, we do not guarantee completeness, accuracy or error-free content. Tarangi may update or modify website information at any time without prior notice."
        },
        {
            title: "2. Handcrafted Jewellery",
            content: "All Tarangi products are handcrafted, and natural variations in colour, polish, weight, texture, or appearance are normal and not considered defects. Product photographs may appear slightly different due to lighting, screen settings or device variations."
        },
        {
            title: "3. No Professional Advice",
            content: "Any styling suggestions, jewellery care guidance or informational content on the website is general in nature and not intended as professional advice. Users are responsible for evaluating and using such information at their own discretion."
        },
        {
            title: "4. Limitation of Liability",
            content: "Tarangi shall not be liable for any direct, indirect, incidental or consequential losses arising from the use of the website, reliance on website content, or delay/non-performance caused by factors beyond our control. Our liability for any product purchased is limited solely to the value of that product."
        },
        {
            title: "5. Third-Party Links",
            content: "The website may contain links to third-party websites or services. Tarangi does not endorse or control these external sites and is not responsible for their content, policies, security practices or services. Accessing such links is entirely at your discretion."
        },
        {
            title: "6. Website Availability",
            content: "We do not guarantee uninterrupted, secure or error-free access to the website. Temporary unavailability may occur due to maintenance, technical issues, or events beyond our control."
        },
        {
            title: "7. Intellectual Property",
            content: "All content, designs, images, logos and materials on the website belong exclusively to Tarangi. Unauthorised copying, reproduction, distribution or commercial use is strictly prohibited."
        },
        {
            title: "8. Governing Law",
            content: "This Disclaimer is governed by the laws of India. Any disputes shall be subject exclusively to the jurisdiction of the courts in Coimbatore, Tamil Nadu"
        },
    ];


    return (
        <>
            <div className="bg-light-sandal py-[70px] font-poppins">
                <h1 className="font-atteron text-[42px] text-primary text-center tracking-[1px] font-semibold">DISCLAIMER POLICY</h1>

                <div className="max-w-[1286px] text-[#595959] px-5 space-y-[40px] mx-auto mt-[80px]">
                    <p className="font-normal text-[16px] sm:text-[19px]">This website is owned and operated by Tarangi Jewels (“Tarangi”, “we”, “our”, “us”). By accessing or using our website, you acknowledge and agree to the terms of this Disclaimer.</p>

                    {disclaimerPolicy.map((item) => (
                        <div className="font-normal text-[16px] sm:text-[19px]">
                            <h2 className="text-[#313131] font-medium text-[18px] mb-[8px] sm:text-[20px]">{item.title}</h2>
                            <p>{item.content}</p>
                        </div>
                    ))}

                    {/* 9 Point */}
                    <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]">
                        <h2 className="text-[#313131] font-medium text-[20px] mb-[8px]">9. Contact Information</h2>
                        <p>For any questions regarding this Disclaimer:</p>
                        {/* <h4 className="mt-3">Grievance Officer — Tarangi</h4> */}
                        <p><span className="font-semibold">Email:</span> tarangijewelsindia@gmail.com</p>
                        <p><span className="font-semibold">Phone:</span> +91 90030 58300</p>
                        <p><span className="font-semibold">Address:</span> 431-435,VNA Complex, NSR Road Saibaba Colony, Coimbatore-641011</p>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DisclaimerPolicy
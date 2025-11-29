import React from "react";

// image
import blogDescription_banner from "../assets/blog_description.png"

function Blog_Description() {

    const termsData = [
        {
            title: "1. Introduction",
            content: "These Terms and Conditions (the “Terms”) govern the access and use of the website owned and operated by Tarangi Jewels (“Tarangi”, “the Company”, “we”, “our”, “us”). By visiting, accessing or using the website, purchasing products through our e-commerce platform, interacting with our digital properties, or engaging with any service offered by Tarangi, you agree to be bound by these Terms in their entirety. These Terms operate as a legally binding contract between you and Tarangi, and they apply to all users, including browsers, customers, vendors, merchants and any individual who accesses or interacts with the website in any manner. You acknowledge that you have reviewed these Terms, understood them and consent to comply with all applicable provisions. If you do not agree with any part of these Terms, you must immediately discontinue use of the website and refrain from placing any orders."
        },
        {
            title: "2. Scope and Applicability of the Terms",
            content: "These Terms apply to all activities relating to the browsing of our website, creation of user accounts, placing of orders, purchase of products, participation in promotional activities, engagement with our social-commerce channels, and any interaction with Tarangi’s service ecosystem. The Terms encompass all online transactions made through the website as well as interactions made through authorised extensions of the brand such as officially operated social media pages or messaging platforms. Transactions made outside Tarangi’s authorised channels, including resale, unauthorised distribution, or third-party marketplaces, do not fall within the scope of these Terms and Tarangi shall not be held liable for any issues arising from such unauthorised engagements."
        },
        {
            title: "3. Right to Modify Terms",
            content: "Tarangi reserves the exclusive right to modify, update, amend, suspend or replace these Terms at any time without prior notice. Such revisions may occur to reflect operational changes, legal or regulatory updates, improvements in service standards or internal business processes. The updated Terms shall become effective immediately upon being posted on the website. Continued use of the website after such modifications shall constitute acceptance of the revised Terms, and it is your responsibility to periodically review this page to remain informed of any updates."
        },
        {
            title: "4. Eligibility and Compliance",
            content: "You represent that you are at least eighteen years of age, legally competent to enter into a binding contract under Indian law, and are using the website solely for lawful and legitimate purposes. You confirm that any information you provide to Tarangi, whether during account creation, order placement or communication with customer support, is accurate, complete and not misleading. Any misrepresentation or unauthorised use of another person’s identity may result in suspension of your access, cancellation of orders or legal action. Tarangi retains the right to refuse service, block access or cancel an order without providing a reason where misuse, fraud, violation of law or breach of these Terms is suspected."
        },
        {
            title: "5. Account Creation, Responsibility and Security",
            content: "You may choose to create an account on the Tarangi website to enable faster checkout, maintain order history or avail additional features offered by the platform. If you create an account, you are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. Tarangi shall not be liable for unauthorised access caused by compromised credentials, inadequate security measures or negligent behaviour on your part. You agree to notify Tarangi immediately upon discovering any unauthorised use or security breach. Tarangi may suspend or delete accounts that are inactive, fraudulent, misleading or in violation of these Terms."
        },
    ];


    return (
        <>
            {/* Container */}
            <div className="bg-light-sandal font-poppins px-5 py-[50px] sm:py-[150px]">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-[30px] text-primary font-medium sm:text-[42px]">How silver jewelry is made?</h1>
                    <p className="text-[#6E6E6E] mt-1">Nov 11, 2025</p>
                </div>

                {/* Loop data */}
                <div className="max-w-[1000px] mx-auto">
                    <img className="w-full h-[200px]  object-cover my-[40px] sm:h-[450px] sm:my-[80px]" src={blogDescription_banner} alt="Blog image" />

                    <div className="max-w-[1286px] text-[#595959] space-y-[40px] mx-auto ">

                        {termsData.map((item) => (
                            <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]">
                                <h2 className="text-[#313131] font-medium text-[18px] mb-[8px] sm:text-[20px]">{item.title}</h2>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accordian */}
                

            </div>
        </>
    );
}

export default Blog_Description
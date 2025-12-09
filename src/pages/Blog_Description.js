import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";


// image
import blogDescription_banner from "../assets/blog_description.png"
import ChevronIcon from '../assets/accordian_downarrow.png'
import ArrowLeft from '../assets/ArrowLeft_red.png'
import ArrowRight from '../assets/ArrowRight_red.png'

function Blog_Description() {
    const termsData = [
        {
            title: "1. Introduction",
            content: "These Terms and Conditions (the “Terms”) govern the access and use of the website owned and operated by Tarangi Jewels (“Tarangi”, “the Company”, “we”, “our”, “us”). By visiting, accessing or using the website, purchasing products through our e-commerce platform, interacting with our digital properties, or engaging with any service offered by Tarangi, you agree to be bound by these Terms in their entirety. These Terms operate as a legally binding contract between you and Tarangi, and they apply to all users, including browsers, customers, vendors, merchants and any individual who accesses or interacts with the website in any manner. You acknowledge that you have reviewed these Terms, understood them and consent to comply with all applicable provisions. If you do not agree with any part of these Terms, you must immediately discontinue use of the website and refrain from placing any orders.",
        },
        {
            title: "2. Scope and Applicability of the Terms",
            content: "These Terms apply to all activities relating to the browsing of our website, creation of user accounts, placing of orders, purchase of products, participation in promotional activities, engagement with our social-commerce channels, and any interaction with Tarangi’s service ecosystem. The Terms encompass all online transactions made through the website as well as interactions made through authorised extensions of the brand such as officially operated social media pages or messaging platforms. Transactions made outside Tarangi’s authorised channels, including resale, unauthorised distribution, or third-party marketplaces, do not fall within the scope of these Terms and Tarangi shall not be held liable for any issues arising from such unauthorised engagements.",
        },
        {
            title: "3. Right to Modify Terms",
            content:
                "Tarangi reserves the exclusive right to modify, update, amend, suspend or replace these Terms at any time without prior notice. Such revisions may occur to reflect operational changes, legal or regulatory updates, improvements in service standards or internal business processes. The updated Terms shall become effective immediately upon being posted on the website. Continued use of the website after such modifications shall constitute acceptance of the revised Terms, and it is your responsibility to periodically review this page to remain informed of any updates.",
        },
        {
            title: "4. Eligibility and Compliance",
            content: "You represent that you are at least eighteen years of age, legally competent to enter into a binding contract under Indian law, and are using the website solely for lawful and legitimate purposes. You confirm that any information you provide to Tarangi, whether during account creation, order placement or communication with customer support, is accurate, complete and not misleading. Any misrepresentation or unauthorised use of another person’s identity may result in suspension of your access, cancellation of orders or legal action. Tarangi retains the right to refuse service, block access or cancel an order without providing a reason where misuse, fraud, violation of law or breach of these Terms is suspected.",
        },
        {
            title: "5. Account Creation, Responsibility and Security",
            content: "You may choose to create an account on the Tarangi website to enable faster checkout, maintain order history or avail additional features offered by the platform. If you create an account, you are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. Tarangi shall not be liable for unauthorised access caused by compromised credentials, inadequate security measures or negligent behaviour on your part. You agree to notify Tarangi immediately upon discovering any unauthorised use or security breach. Tarangi may suspend or delete accounts that are inactive, fraudulent, misleading or in violation of these Terms.",
        },
    ];

    //  FAQ data .
    const faqData = [
        {
            q: "What is 925 sterling silver?",
            a: "925 sterling silver is an alloy containing 92.5% pure silver and 7.5% other metals (usually copper) to increase strength while retaining silver's luster.",
        },
        {
            q: "How should I care for my silver jewelry?",
            a: "Store your jewelry in soft, dry pouches and avoid contact with water, perfumes, or chemicals. To clean, gently rub with a soft polishing cloth. For long-term brilliance, have your silver jewelry professionally polished occasionally.",
        },
        {
            q: "Where can I buy handcrafted sterling silver jewelry?",
            a: "You can explore Tarangi's handcrafted sterling silver collections on our website or visit authorized retail partners listed on our store locator.",
        },
    ];
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    contentRefs.current = faqData.map((_, i) => contentRefs.current[i] ?? null);
    useEffect(() => {
        if (openIndex !== null && contentRefs.current[openIndex]) {
            void contentRefs.current[openIndex].scrollHeight;
        }
    }, [openIndex]);
    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <div className="bg-light-sandal font-poppins px-5 py-[50px] sm:py-[150px]">
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-[30px] text-primary font-medium sm:text-[42px]">How silver jewelry is made?</h1>
                    <p className="text-[#6E6E6E] mt-1">Nov 11, 2025</p>
                </div>

                {/* Loop data */}
                <div className="max-w-[1000px] mx-auto">
                    <img
                        className="w-full h-[200px] object-cover my-[40px] sm:h-[450px] sm:my-[80px]"
                        src={blogDescription_banner}
                        alt="Blog image"
                    />

                    <div className="max-w-[1286px] text-[#595959] space-y-[40px] mx-auto ">
                        {termsData.map((item, idx) => (
                            <div key={idx} className="font-[poppins] ">
                                <h2 className="text-[#313131] font-medium text-[18px] mb-[8px] sm:text-[20px]">{item.title}</h2>
                                <p className="text-[#595959] font-normal text-[16px] sm:text-[19px]">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accordion / FAQ */}
                <div className="max-w-[1000px] mx-auto mt-16">
                    <h3 className="text-[22px] sm:text-[32px] text-[#8C2742] font-semibold mb-8">
                        FAQ about sterling silver jewelry
                    </h3>

                    <div> {faqData.map((item, i) => {
                        const isOpen = openIndex === i;

                        return (
                            <div key={i} className={`px-4 py-3 mb-5 rounded-[8px] border-[1px] border-[#F3E4D1] transition-colors duration-300 ${isOpen ? "bg-[#F6E8D5]" : "bg-[#FFF5E8]"} border-b border-[#F6E8D5]`}>
                                <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`faq-content-${i}`} id={`faq-header-${i}`} className="w-full flex items-center justify-between gap-4 text-left focus:outline-none">
                                    <div className="flex-1 gap-y-10">
                                        <div className="text-[16px] sm:text-[20px] text-slate-800 font-medium">{`${i + 1}. ${item.q}`}
                                        </div>
                                    </div>

                                    {/* Chevron Icon */}
                                    <img src={ChevronIcon} alt="toggle" className={`w-[30px] h-[30px] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                {/* CONTENT */}
                                <div id={`faq-content-${i}`} role="region" aria-labelledby={`faq-header-${i}`} className="overflow-hidden transition-[max-height] duration-300 ease-in-out" style={{ maxHeight: isOpen ? `${contentRefs.current[i]?.scrollHeight || 999}px` : "0px", }} >
                                    <div ref={(el) => (contentRefs.current[i] = el)} className="mt-3 mb-2 text-[14px] sm:text-[18px] text-[#4B4B4B] bg-[#F6E8D5] p-4 rounded-md">{item.a} </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>

                {/* Bottom Navigation */}

                <div className="max-w-[1000px] bg-[#FFF5E8]  mt-20 sm:mt-32  mx-auto flex items-center justify-between ">
                    {/* Previous Button */}
                    <button className="flex items-center gap-2 font-poppins text-primary text-[16px] font-normal">
                        <img src={ArrowLeft} alt="Previous" className="w-[30px] h-[30px]" />
                        Previous
                    </button>

                    {/* Back to Home */}
                    <Link to="/home">
                        <button className="text-primary items-center mt-2 font-poppins text-[16px] font-normal hidden md:block">
                            Back to Home
                        </button>
                    </Link>

                    {/* Next Button */}
                    <button className="flex items-center gap-2 font-poppins text-primary text-[16px] font-normal">
                        Go to Next
                        <img src={ArrowRight} alt="Next" className="w-[30px] h-[30px]" />
                    </button>



                </div>
            </div>
        </>
    );
}

export default Blog_Description;

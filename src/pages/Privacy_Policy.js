import React, { useEffect } from "react";
import bullet_icon from "../assets/bullet_point.png";
import Grievance_policy from "../components/Grievance_policy";
import Refund_policy from "../components/Refund_policy";



function Privacy_Policy() {

    const privacyData = [
        {
            title: "1. Introduction",
            content: [
                "This Privacy Policy explains how Tarangi Jewels (“Tarangi”, “the Company”, “we”, “our”, “us”) collects, uses, stores, discloses, protects and manages your Personal Data when you access our website, communicate with us through our digital platforms or purchase our products. Tarangi recognises the importance of safeguarding customer privacy and is committed to maintaining the confidentiality, integrity and security of all Personal Data entrusted to us.By visiting, using or accessing the website, or by interacting with any service offered by Tarangi, you acknowledge that you have read, understood and agreed to this Privacy Policy. If you do not agree with any part of this Privacy Policy, you must discontinue the use of our website and services immediately.",
                "This Policy is formulated in accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 (“DPDP Act”), and reflects Tarangi’s dedication to responsible and lawful data handling practices."
            ],
            bullets: [
                "Your full name, contact number, shipping and billing address, email address, age, and information required for customer support.",
                "Details relating to purchases, order history, payment confirmations and browsing behaviour.",
                "Technical data such as cookies, IP address, browser type, device details and analytics.",
                "Any content voluntarily shared like reviews, testimonials, messages or media.",
                "Identity information such as PAN for high-value transactions, as required by law.",
            ],
        },
        {
            title: "2. Scope and Applicability",
            content: [
                "This Privacy Policy applies to all Personal Data collected by Tarangi through our website  mobile interfaces, social-commerce channels such as WhatsApp and Instagram, digital communication media, and customer support systems. The Privacy Policy governs all data provided by users, visitors, customers, prospective customers, and anyone interacting with Tarangi in relation to our products and services.",
                "This Privacy Policy does not apply to unaffiliated third-party websites, counterfeit pages, unauthorised resellers, or fraudulent platforms misrepresenting themselves as Tarangi. Tarangi bears no responsibility for the privacy practices of such unauthorised sources."
            ],
        },
        {
            title: "3. Definitions",
            content: [
                "For the purposes of this Privacy Policy, the following definitions shall apply:",
                "Personal Data” includes any data about an individual who is identifiable by or in relation to such data.",
                "“Processing” refers to the entire lifecycle of Personal Data, including collection, storage, use, disclosure, sharing, archiving, transfer or deletion.",
                "“Data Principal” means the individual to whom the Personal Data relates.",
                "“Consent” signifies a clear, specific, informed and unambiguous indication by the user agreeing to the Processing of their Personal Data.",
                "“Website” refers to and all digital assets operated under the Tarangi brand."
            ],
        },
        {
            title: "4. Information We Collect",
            content: [
                "Tarangi collects Personal Data to enable seamless order processing, improve website functionality, strengthen customer service and comply with legal obligations. Depending on your interactions with us, the information collected may include:"
            ],
            bullets: [
                "Your full name, contact number, shipping and billing address, email address, age, and any other information necessary to fulfil an order or provide customer support.",
                "Details relating to your purchases, order history, payment confirmation record, preferences and browsing behaviour. Tarangi does not store or access your debit or credit card information; such data is processed directly through secure third-party payment gateways.",
                "Technical information collected through cookies, IP addresses, browser type, device information, interaction logs, location approximations, session behaviour and website usage analytics.",
                "Any content voluntarily shared with Tarangi, including messages, reviews, testimonials, photographs, queries or interactions through WhatsApp, Instagram or email.",
                "Where required by law for high-value transactions, we may collect identity information such as PAN, subject to applicable regulatory guidelines."
            ],
        },
        {
            title: "5. How We Collect Your Data",
            content: [
                "Tarangi collects Personal Data in the following manner:"
            ],
            bullets: [
                "Data you provide directly when you place an order, contact customer support, sign up for updates, participate in contests, request returns or exchanges, or interact with us on social platforms.",
                "Data collected automatically when you browse our website through cookies, analytics tags, tracking tools and server logs.",
                "Data received from authorised third-party service providers, such as payment gateways and courier partners, strictly for the purpose of fulfilling your orders or improving service delivery.",
                "Data collected through consent-driven marketing channels, where you voluntarily subscribe to receive updates or promotional content."
            ],
        },
        {
            title: "6. Purpose of Processing Personal Data",
            content: [
                "Tarangi processes Personal Data only for lawful purposes and in accordance with the principles of necessity, reasonableness and Consent. Your data may be processed for:"
            ],
            bullets: [
                "Fulfilling your product orders, handling payments, and completing the delivery process.",
                "Providing customer support and responding to queries.Improving website functionality, user experience and customer engagement.",
                "Marketing and promotional communications where you have consented to receive such messages.",
                "Compliance with legal, regulatory, taxation and account-keeping requirements.",
                "Ensuring security, fraud prevention, and detection of unauthorised activity.",
                "Maintaining internal records, analytics and business operations."
            ],
            content2: [
                "Your Personal Data is never used for purposes unrelated to the functioning of Tarangi’s services without obtaining your explicit Consent."
            ]
        },
        {
            title: "7. Lawful Basis for Processing",
            content: [
                "Tarangi processes Personal Data under one or more of the following lawful bases recognised under the DPDP Act:"
            ],
            bullets: [
                "Your voluntary and informed Consent.",
                "Processing necessary to provide services or fulfil contractual obligations.",
                "Processing necessary for compliance with legal obligations.",
                "Processing required for the legitimate interests of Tarangi, provided such interests do not override your privacy rights."
            ],
        },
        {
            title: "8. Data Sharing and Disclosure",
            content: [
                "Tarangi may share your Personal Data with carefully selected third-party service providers strictly for operational purposes. These include:"
            ],
            bullets: [
                "Courier partners responsible for delivering your orders.Payment service providers facilitating secure transactions.Technology providers supporting hosting, analytics, and security.Professional advisers or auditors who assist Tarangi in regulatory compliance.",
                "All third parties engaged by Tarangi operate under contractual obligations to maintain confidentiality, protect Personal Data, and comply with security standards.",
                "Tarangi does not sell, rent or trade your Personal Data to unaffiliated entities for marketing or commercial gain.",
            ],
            content2: [
                "In certain cases, we may disclose data if required to do so under applicable laws, governmental requests or judicial directives."
            ]
        },
        {
            title: "9. Data Retention",
            content: [
                "Tarangi retains your Personal Data only for as long as is reasonably necessary to fulfil the purposes for which it was collected, including satisfying legal, regulatory, accounting and audit obligations. When data is no longer required, Tarangi will securely delete, anonymise or archive it in compliance with retention laws."
            ]
        },
        {
            title: "10. Your Rights as a Data Principal",
            content: [
                "Under the DPDP Act and applicable laws, you have several rights relating to your Personal Data:"
            ],
            bullets: [
                "You have the right to access information regarding the Personal Data Tarangi processes about you.",
                "You may request correction of inaccurate or incomplete data.",
                "You may withdraw Consent previously provided, in which case Tarangi may cease processing unless required by law.",
                "You may request deletion of Personal Data where such data is no longer necessary or legally required to be retained.",
                "You may request that Tarangi restrict or limit the Processing of certain Personal Data.",
                "You have the right to be informed about any significant changes to how your information is used."
            ],
            content2: [
                "Requests may be made to the Grievance Officer, and Tarangi will respond within statutory timelines."
            ]
        },
        {
            title: "11. Security Measures and Safeguards",
            content: [
                "Tarangi adopts reasonable technical and organisational measures to protect your Personal Data from unauthorised access, alteration, disclosure or destruction. Security frameworks include encryption, access controls, data minimisation, secure servers, restricted personnel access and routine system evaluations.",
                "Despite reasonable safeguards, no online system is fully immune to risks. Tarangi does not guarantee absolute security and cannot be held liable for breaches arising from factors beyond reasonable control, including device vulnerabilities, compromised networks or third-party misappropriation."
            ]
        },
        {
            title: "12. Cookies and Tracking Technologies",
            content: [
                "Tarangi uses cookies, pixels and other tracking technologies to optimise your browsing experience, recognise your preferences, analyse website traffic and improve functionality. Cookies allow us to understand usage patterns and personalise your interaction with the website.You may disable cookies through your browser settings; however, certain website features may not function optimally without them.",
                "Further details are available in our Cookie Policy."
            ]
        },
        {
            title: "13. Collection of Data from Minors",
            content: [
                "Tarangi does not knowingly collect Personal Data from individuals below the age of eighteen. If we discover that such data has been collected inadvertently, the information will be deleted in accordance with applicable law. Parents or guardians may contact us to request deletion or correction."
            ]
        },
        {
            title: "14. Marketing Communications and Consent",
            content: [
                "Tarangi may send promotional messages, newsletters, updates or product announcements to users who have explicitly consented to receive such communications. You may withdraw Consent at any time by using the “unsubscribe” option or by contacting Tarangi directly."
            ]
        },
        {
            title: "15. Links to External Websites",
            content: [
                "Our website may contain links to third-party websites or resources. Tarangi does not endorse, control or bear responsibility for the privacy practices, content or policies of such external websites. Your access of third-party content is governed by their respective privacy terms."
            ]
        },
        {
            title: "17. Data Breach Notification",
            content: [
                "In the event of a data breach that materially affects your rights or interests, Tarangi will take reasonable steps to notify you and relevant authorities as required by applicable law. Tarangi will also take corrective measures to minimise harm and restore data security."
            ]
        },
        {
            title: "18. Changes to This Privacy Policy",
            content: [
                "Tarangi reserves the right to amend or update this Privacy Policy from time to time to reflect operational changes, legal developments or improvements in our privacy practices. The updated version will be published on the website with the revised effective date. Continued use of the website implies acceptance of the amended Privacy Policy."
            ]
        },
        // {
        //     title: "19. Contact Details and Grievance Redressal",
        //     content: [
        //         "For questions regarding this Privacy Policy, or to exercise your data rights, you may contact our",
        //         "Data Protection and Grievance Officer:",
        //         "Data Protection/Grievance Officer — Tarangi",
        //         "Email: tarangijewelsindia@gmail.com",
        //         "Phone: +91 90030 58300",
        //         "Address: 431-435,VNA Complex, NSR Road,Saibaba Colony, Coimbatore-641011",
        //         "Working Hours: 10:30 AM – 8:00 PM IST",
        //     ],
        //     content2: [
        //         "Tarangi will acknowledge all complaints within 48 hours and endeavour to resolve them within the prescribed statutory timeframe."
        //     ]
        // },


    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);


    return (
        <>
            <div className=" blog-banner text-white">
                <h1 className="font-atteron text-[52px] sm:text-[80px] mt-32 sm:mt-0 text-center font-normal">Privacy Policy</h1>
            </div>

            <div className="bg-light-sandal py-[50px]">

                <div className="max-w-[1286px] text-[#595959] px-5 space-y-[40px] mx-auto ">

                    {privacyData.map((item) => (
                        <div className="font-[poppins] font-normal text-[16px] sm:text-[19px] space-y-4">

                            {/* Title */}
                            <h2 className="text-[#313131] font-medium text-[18px] sm:text-[21px]">
                                {item.title}
                            </h2>

                            {/* Content */}
                            {item.content.map((paragraph) => (
                                <p>{paragraph}</p>
                            ))}

                            {/* Bullets */}
                            {item.bullets && item.bullets.length > 0 && (
                                <div className="space-y-3">
                                    {item.bullets.map((point) => (
                                        <div className="flex items-center gap-3 pl-2 sm:pl-6">

                                            {/* <span className="text-[#CFA266] text-lg mt-1">➤</span> */}
                                            <img className="w-[16px]" src={bullet_icon} alt="listing icon" />
                                            <p>{point}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Second content */}
                            {item.content2 && item.content2.length > 0 && (
                                item.content2.map((paragraph2) => (
                                    <p>{paragraph2}</p>
                                ))
                            )}

                        </div>
                    ))}
                    <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]">
                        <h2 className="text-[#313131] font-medium text-[20px] mb-[15px]">19. Contact Details and Grievance Redressal</h2>
                        <p>For questions regarding this Privacy Policy, or to exercise your data rights, you may contact our Data Protection and Grievance Officer:</p>
                        <h4 className="mt-3">Data Protection Grievance Officer — Tarangi</h4>
                        <p><span className="font-semibold">Email:</span> tarangijewelsindia@gmail.com</p>
                        <p><span className="font-semibold">Phone:</span> +91 90030 58300</p>
                        <p><span className="font-semibold">Address:</span> 431-435,VNA Complex, NSR Road Saibaba Colony, Coimbatore-641011</p>
                        <p><span className="font-semibold">Working Hours:</span> 10:30 AM – 8:00 PM IST</p>

                        <p className="mt-3">Tarangi will acknowledge all complaints within 48 hours and endeavour to resolve them within the prescribed statutory timeframe.</p>
                    </div>


                </div>
                <Grievance_policy/>
                <Refund_policy/>
            </div>
        </>
    );
}

export default Privacy_Policy;
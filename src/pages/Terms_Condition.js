import React, { useEffect } from "react";

function Terms_Condition() {

    const termsData = [
        {
            title: "1. Introduction",
            content: "These Terms and Conditions (the “Terms”) govern the access and use of the website owned and operated by Tarangi Jewels (“Tarangi”, “the Company”, “we”, “our”, “us”). By visiting, accessing or using the website [Insert Website URL], purchasing products through our e-commerce platform, interacting with our digital properties, or engaging with any service offered by Tarangi, you agree to be bound by these Terms in their entirety. These Terms operate as a legally binding contract between you and Tarangi, and they apply to all users, including browsers, customers, vendors, merchants and any individual who accesses or interacts with the website in any manner. You acknowledge that you have reviewed these Terms, understood them and consent to comply with all applicable provisions. If you do not agree with any part of these Terms, you must immediately discontinue use of the website and refrain from placing any orders."
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
        {
            title: "6. Proprietary Rights and Intellectual Property",
            content: "All elements of the Tarangi website, including product images, jewellery designs, illustrations, graphics, written content, logos, trademarks, brand descriptors, artistic layouts, website architecture, user interface elements and digital media, constitute the exclusive intellectual property of Tarangi. The content is protected under applicable copyright, design, IP and trademark laws of India. Your use of the website does not confer ownership of any intellectual property rights. Any copying, reproducing, distributing, publishing, modifying, reverse-engineering, creating derivative works or commercially exploiting content from the website without the express written consent of Tarangi is strictly prohibited. Tarangi retains the right to take legal action against any person engaging in infringement, piracy, counterfeiting, misuse of product images, distribution of replicas or violation of our proprietary rights."
        },
        {
            title: "7. Product Nature, Representation and Handcrafted Variations",
            content: "Tarangi specialises in handcrafted silver jewellery. You acknowledge that handmade products inherently carry natural variations in colour tone, texture, finish, polish, weight, appearance and minute detailing. These variations reflect artisanal craftsmanship and are not considered defects. Photographs shown on the website are intended to accurately represent the products; however, slight differences may arise due to lighting conditions, camera settings, individual workmanship or screen display configurations. Tarangi does not warrant that product descriptions or photographs are free from minor discrepancies, although every effort is made to maintain accuracy and transparency. Custom-made products are crafted specifically based on customer instructions, and reasonable artistic deviations may occur."
        },
        {
            title: "8. Pricing Policy and Silver Market Fluctuation",
            content: "The prices displayed for products on our website are listed in Indian Rupees and include applicable taxes unless otherwise mentioned. Prices may change periodically and Tarangi reserves the right to revise prices before an order is confirmed or payment is made. For custom or made-to-order pieces, substantial fluctuations in silver prices may necessitate adjustments to the final payable amount. You acknowledge that raw material prices are influenced by global market conditions and Tarangi shall not be held liable for such revisions. Once payment is completed and a confirmation is issued, the price for that specific order becomes final."
        },
        {
            title: "9. Order Placement, Acceptance and Fulfilment",
            content: "Placing an order constitutes an offer to purchase the selected product from Tarangi. An order is considered accepted only when the product is dispatched or when explicit written confirmation of dispatch is issued. Until acceptance, Tarangi retains the right to reject or cancel an order for reasons including but not limited to payment failure, stock unavailability, suspicion of fraudulent activity, incomplete or incorrect details, operational constraints or legal compliance issues. Tarangi is under no obligation to justify such cancellations. If payment has been collected for a cancelled order, the amount shall be refunded according to the Refund Policy."
        },
        {
            title: "10. Payment Terms and Transaction Security",
            content: "Tarangi accepts payments through secure third-party gateways and authorised financial partners. You acknowledge that the safety of your banking information depends on the payment provider and your device security. Tarangi does not store or retain card or banking details. Payment failures arising from bank issues, gateway downtime or customer errors must be resolved directly with the payment provider. Tarangi shall not be liable for delays in order confirmation arising from failed or pending transactions. Any discrepancy in payments must be reported promptly for resolution."
        },
        {
            title: "11. Dispatch, Delivery and Shipping Timelines",
            content: "Tarangi endeavours to dispatch orders within the estimated timeframe communicated at checkout. Once the product is handed over to the courier, the responsibility for transit lies with the logistics partner, and Tarangi shall not be responsible for delays caused by courier operations, weather disruptions, public holidays, strikes, natural calamities or any other conditions beyond reasonable control. Delivery timelines depend on the destination, courier network efficiency and serviceability of the area. Tracking information will be provided upon dispatch, and you are responsible for monitoring delivery status. The risk associated with the product passes to you from the moment it is handed over to the courier for delivery."
        },
        {
            title: "12. Incorrect Address, Failed Delivery and Re-Delivery",
            content: "It is your obligation to provide accurate, complete and deliverable address details at the time of placing an order. If delivery fails due to an incorrect address, customer unavailability, refusal to accept the package or insufficient instructions, the order may be returned to Tarangi. Re-delivery may be arranged at your expense. Refunds will not be issued for failed deliveries caused by incorrect details provided by you, and Tarangi shall not be liable for losses arising due to such omissions."
        },
        {
            title: "13. Cancellation of Orders",
            content: "You may request cancellation of an order only before the product has been dispatched. Once dispatched, the order cannot be cancelled. Customised, engraved or made-to-order jewellery cannot be cancelled once production has commenced, irrespective of the dispatch status. Tarangi reserves the right to cancel orders unilaterally in situations where fulfilment is not feasible, and such cancellations will be communicated via your registered contact details."
        },
        {
            title: "14. Returns, Exchanges and Refunds",
            content: "Tarangi accepts return or exchange requests only in cases where the product is found to be damaged upon delivery, contains a manufacturing defect or is materially different from the product ordered. You must notify Tarangi within the prescribed return window and provide supporting evidence, including a complete unboxing video and clear photographs. Products must be unworn, unused and returned in their original condition, packaging and presentation, failing which the request may be rejected. Certain items such as customised jewellery, engraved products, hygiene-sensitive items including nose pins and toe rings and products showing signs of use are not eligible for return. Tarangi will process refunds only after successful quality inspection of the returned product. Refunds are made through the original payment method or a mutually agreed alternate method. Tarangi does not refund shipping fees, return courier charges (unless Tarangi is at fault), COD fees or additional surcharges."
        },
        {
            title: "15. Warranty Limitations and Customer Responsibility",
            content: "Tarangi offers a limited warranty that covers genuine manufacturing defects. The warranty does not extend to tarnishing, scratches, colour changes, or deterioration resulting from exposure to humidity, perfumes, chemicals, water, sweat or abrasive surfaces. Handmade sterling silver jewellery requires careful handling and proper storage, and Tarangi cannot be held responsible for wear and tear arising from individual usage patterns. Accidental damage, breakage, deformation or mishandling by the customer are excluded from warranty coverage."
        },
        {
            title: "16. Customer Behaviour and Acceptable Conduct",
            content: "You agree to behave respectfully when interacting with Tarangi staff or customer support representatives. Any abusive, threatening, defamatory, harassing, obscene or inappropriate conduct may result in denial of service, cancellation of orders or blocking of your access to Tarangi’s platforms. You agree not to interfere with the website, introduce viruses, hack or attempt to breach security features, extract data, copy product images, replicate jewellery designs or misuse website features for unlawful purposes."
        },
        {
            title: "17. Social Media Conduct and User-Generated Content",
            content: "If you voluntarily tag Tarangi or submit photographs, testimonials, reviews, videos or any other content on social media platforms, you grant Tarangi a non-exclusive, royalty-free, perpetual and global licence to repost, share, feature or use the content for marketing, promotional or brand-building purposes. You represent that the content is your own and does not infringe any third-party rights. Tarangi will always use such content responsibly and respectfully."
        },
        {
            title: "18. Restrictions on Resale and Commercial Exploitation",
            content: "Products purchased from Tarangi are intended exclusively for personal use. Any unauthorised resale, commercial distribution, reproduction, imitation, parallel import, or bulk purchasing intended for commercial resale is strictly prohibited. Tarangi may take legal action against any individual or entity found engaging in unauthorised commercial exploitation of our products or intellectual property."
        },
        {
            title: "19. Privacy, Data Security and Compliance",
            content: "Tarangi processes personal data in accordance with the Digital Personal Data Protection Act, 2023 and our Privacy Policy. By using our website, you consent to the collection, use, storage and processing of your data as outlined in the Privacy Policy. Tarangi employs reasonable security measures to protect customer data, but cannot guarantee absolute security due to inherent risks associated with the internet. Any data breaches suspected to have occurred due to your own negligence, compromised devices or unauthorised third-party actions shall not be attributed to Tarangi."
        },
        {
            title: "20. External Services and Third-Party Liability",
            content: "The website may feature links, tools, integrations or redirection to third-party services, including payment gateways, courier tracking pages, analytics tools and social media platforms. Tarangi does not control or endorse the content, reliability, security or privacy practices of such third-party platforms. Your interaction with external service providers is governed by their respective terms and policies. Tarangi shall not be liable for any losses, delays or issues arising from third-party services beyond its control."
        },
        {
            title: "21. Errors, Inaccuracies and Website Availability",
            content: "Tarangi does not guarantee that the website will be free from errors, inaccuracies, typographical mistakes, omissions, delays or technical defects. Product descriptions, pricing information and availability may be updated or corrected at any time without prior notice. Tarangi does not warrant uninterrupted, secure or error-free access to the website, and shall not be responsible for disruptions caused by maintenance, upgrades, server downtime, cyber-attacks or other technical challenges."
        },
        {
            title: "22. Indemnification and Customer Liability",
            content: "You agree to indemnify, defend and hold harmless Tarangi, its employees, directors, partners and representatives from any claims, liabilities, losses, damages, costs or expenses arising from your breach of these Terms, misuse of the website, violation of applicable laws or infringement of third-party rights. This obligation shall survive termination of your use of the website."
        },
        {
            title: "23. Limitation of Liability",
            content: "To the fullest extent permitted by law, Tarangi shall not be liable for any indirect, incidental, punitive, exemplary or consequential damages arising from your use of the website or purchase of products. Tarangi’s aggregate liability for any claim shall not exceed the purchase value of the product concerned. Tarangi shall not be liable for delays in delivery, courier failures, technical malfunctions, unauthorised access, loss of data, security breaches originating from your device, or damages arising from inaccurate information provided by you."
        },
        {
            title: "24. Arbitration and Dispute Resolution",
            content: "If any dispute arises between you and Tarangi, both parties shall first attempt to resolve the matter amicably through written communication. If the dispute remains unresolved for a period of thirty days, it shall be referred to a sole arbitrator mutually appointed by the parties in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Coimbatore, Tamil Nadu, the proceedings shall be conducted in English, and the substantive laws of India shall apply. Courts in Coimbatore shall have exclusive jurisdiction over all matters arising out of or relating to these Terms or the use of the website."
        },
        {
            title: "25. Severability",
            content: "If any provision of these Terms is held invalid or unenforceable under applicable law, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law. The invalid provision shall be replaced with a legally permissible clause that best reflects the original intent of the parties."
        },
        {
            title: "26. Entire Agreement",
            content: "These Terms, read together with the Privacy Policy, Cookie Policy, Refund/Return & Shipping Policy, Grievance Redressal Policy and Disclaimer, constitute the entire agreement between you and Tarangi with respect to the use of the website and supersede all prior agreements, understandings or communications, whether oral or written."
        }
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <div className=" blog-banner  text-white">
                <h1 className=" font-atteron text-[52px] sm:text-[80px] mt-32 sm:mt-0 text-center font-normal  ">Terms & Conditions</h1>
                <p className="font-[poppins] text-[16px] sm:text-[20px] px-5 mt-[20px] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
            </div>

            <div className="bg-light-sandal py-[50px]">
                <div className="max-w-[1286px] text-[#595959] px-5 space-y-[40px] mx-auto ">
                    {termsData.map((item) => (
                        <div className="font-[poppins] font-normal text-[16px] sm:text-[21px]">
                            <h2 className="text-[#313131] font-medium text-[20px] mb-[8px]">{item.title}</h2>
                            <p>{item.content}</p>
                        </div>
                    ))}
                    {/* 27 Point */}
                    <div className="font-[poppins] font-normal text-[16px] sm:text-[21px]">
                        <h2 className="text-[#313131] font-medium text-[20px] mb-[8px]">27. Contact Information</h2>
                        <p>For any questions, clarifications or concerns relating to these Terms, you may contact:</p>
                    </div>

                    {/* Address */}
                    <div className="text-[#313131] font-medium text-[20px]">
                        <h4>Grievance Officer — Tarangi</h4>
                        {/* <h4>Grievance Officer — Tarangi</h4> */}
                        <a href="mailto:tarangijewelsindia@gmail.com"><p>Email: tarangijewelsindia@gmail.com</p></a>
                        <a href="tel:9003058300"><p>Phone: +91 90030 58300</p></a>
                        <a href="https://share.google/6f6U8XByQoc0FWsBP" target="_blank">
                            <p>431-435,VNA Complex, NSR Road</p>
                            <p>Saibaba Colony, Coimbatore-641011</p>
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Terms_Condition
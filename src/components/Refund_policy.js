import React from "react";


function Refund_policy() {

    const RefundDate = [
        {
            title: "1. Introduction",
            content: [
                "This Refund, Return and Shipping Policy outlines in comprehensive detail the procedures, conditions and rights relating to the return, replacement, refund, cancellation and shipment of products purchased from Tarangi Jewels (“Tarangi”, “the Company”, “we”, “our”, “us”). The purpose of this Policy is to ensure absolute clarity, transparency and fairness in our dealings with customers. It sets out the expectations associated with purchases made through our website or authorised digital channels and carefully explains the manner in which claims are evaluated, deliveries are fulfilled and obligations are handled. By placing an order or interacting with the website, you acknowledge that you have read this Policy, understood it, and agreed to adhere to the terms herein."
            ]
        },

        {
            title: "2. Philosophy and Quality Commitment",
            content: [
                "Tarangi is committed to delivering superior, handcrafted sterling silver jewellery created with care, craftsmanship and attention to detail. Every piece offered by us undergoes quality inspections at various stages of production and packaging. Despite such diligence, certain concerns may arise during the course of delivery or customer use, and this Policy has been designed to address such situations in a manner that is fair to both customers and the brand while maintaining operational integrity."
            ]
        },

        {
            title: "3. Applicability of the Refund, Return & Shipping Policy",
            content: [
                "This Policy applies solely to purchases made through the official Tarangi website and Tarangi’s authorised digital platforms, including social-commerce interfaces operated directly by the Company. Purchases made through unauthorised sellers, counterfeit pages, independent resellers or third-party marketplaces do not fall under the scope of this Policy, and Tarangi shall not be liable for addressing claims associated with such unauthorised transactions."
            ]
        },

        {
            title: "4. Conditions for Eligibility: Returns and Exchanges",
            content: [
                "A product may qualify for return or exchange only if the item received by the customer is damaged upon arrival, exhibits a manufacturing defect or materially differs from the product ordered. For a request to be considered valid, the product must be in unworn, unused and intact condition and accompanied by all original packaging, accessories, invoices and authenticity materials supplied with the product. Tarangi retains the right to deny requests where the product shows signs of wear, alterations, breakage, misuse or any form of damage that does not correspond with the condition reported at the time of delivery.",
                "Customers must notify Tarangi of any such issues within the specified reporting window described below. Failure to adhere to the reporting timeline may result in the inability to process the request."
            ]
        },

        {
            title: "5. Reporting Window and Mandatory Evidence Requirements",
            content: [
                "Customers are required to report any damage, manufacturing defect or discrepancy within the return-eligibility timeframe beginning from the date of delivery. In order to evaluate the validity of such claims, Tarangi requires clear photographic evidence along with a complete, unedited unboxing video starting from the moment the outermost packaging is opened. This requirement is in place to protect both customers and Tarangi from potential misuse, fraudulent claims or disputes arising from incomplete evidence. Claims submitted without adequate documentation may be rejected after reasonable assessment."
            ]
        },

        {
            title: "6. Non-Returnable and Non-Exchangeable Products",
            content: [
                "Certain categories of products cannot be returned or exchanged due to hygiene factors, personalisation elements or inherent characteristics of the jewellery. Items such as nose pins, toe rings, engraved jewellery, customised pieces crafted specifically based on the customer’s instructions, personalised orders and items that have been altered in any form by the customer are strictly non-returnable. Additionally, products purchased during special promotions, clearance sales, limited-edition events or marked as “final sale” may also be ineligible for return unless defective. The decision regarding the eligibility of any product under this section shall rest solely with Tarangi."
            ]
        },

        {
            title: "7. Quality Inspection and Verification Procedures",
            content: [
                "Upon arrival at Tarangi’s facility, all returned products undergo a rigorous quality inspection process. This inspection includes physical assessment, comparison with reported concerns, evaluation of structural integrity and verification of authenticity markings. The approval of a return or exchange request is contingent on the product clearing this quality check. If the product fails inspection due to wear, tampering, customer-induced damage, missing components or misuse Tarangi reserves the right to reject the request and return the item to the customer without refund or replacement."
            ]
        },

        {
            title: "8. Refunds: Process, Method and Timelines",
            content: [
                "Refunds, where approved, are processed only after successful completion of the quality verification stage. Refunds shall be issued to the original method of payment unless otherwise agreed between the customer and Tarangi. Customers acknowledge that banks, payment gateways and financial processors may take additional time to complete the refund settlement, and Tarangi shall not be liable for delays arising from such external financial entities. Tarangi does not refund shipping fees, cash on delivery charges, payment gateway surcharges or additional charges unless the return is due to an error on our part. Refund values do not include gift packaging, customisation charges or express shipping fees."
            ]
        },

        {
            title: "9. Exchanges: Eligibility and Procedure",
            content: [
                "Where an exchange request is approved, Tarangi will arrange for the replacement item to be dispatched only after the returned product clears quality inspection. In the event that the same product or variant is unavailable, customers may be offered the choice of selecting another product of equal price or receiving store credit. Tarangi does not permit exchanges for products falling under the non-returnable category or for pieces that have been customised or personalised prior to delivery."
            ]
        },

        {
            title: "10. Return Shipping and Customer Responsibilities",
            content: [
                "Depending on the delivery location, Tarangi may either arrange for pickup through authorised courier partners or request the customer to self-ship the product. In cases where self-shipping is required, the product must be packed securely to prevent damage during transit. Tarangi may, at its discretion, reimburse standard courier charges if the return is deemed valid. However, express shipping charges, special packaging costs or value-added services will not be refunded. Tarangi shall not be responsible for products lost, delayed or damaged during customer-initiated return shipments."
            ]
        },

        {
            title: "11. Damage During Transit",
            content: [
                "Tarangi takes all reasonable measures to ensure secure packaging so that products reach customers safely. However, if a product is damaged during transportation, the customer must report the issue within the reporting timeframe with adequate evidence. Upon verification, Tarangi shall either replace the product or issue a refund. Damage resulting from improper unboxing, mishandling or personal negligence will not qualify as transit damage."
            ]
        },

        {
            title: "12. Cancellations Initiated by Customers",
            content: [
                "Customers may request cancellation of an order only prior to dispatch. Once the product has been dispatched and handed over to the courier partner, cancellation requests cannot be processed. Orders containing customised, engraved or made-to-order items cannot be cancelled once production has commenced. Tarangi may, at its discretion, consider cancellation requests in exceptional circumstances; however, cancellation approval shall be solely at the Company’s discretion.",
            ]
        },

        {
            title: "13. Cancellations Initiated by Tarangi",
            content: [
                "Tarangi reserves the right to cancel an order under circumstances including, but not limited to, product unavailability, payment irregularities, verification discrepancies, technical errors, pricing inaccuracies or concerns relating to fraudulent activity. Customers shall be notified of such cancellation using their registered contact information. If payment has been processed, the amount will be refunded in accordance with the Refund Policy."
            ]
        },

        {
            title: "14. Shipping Policy and Dispatch Timelines",
            content: [
                "Tarangi strives to dispatch all orders within the estimated timelines provided at the time of purchase. Dispatch times may vary depending on product availability, order volume, customisation requirements and other operational factors. Once an order is dispatched, Tarangi will share tracking details with the customer. The customer is responsible for monitoring delivery status using the tracking details provided. Tarangi is not liable for delays caused by courier capacity, remote zone delivery restrictions, weather conditions, government restrictions or any unforeseen logistical challenges."
            ]
        },

        {
            title: "15. Delivery of Orders and Passage of Risk",
            content: [
                "Delivery timelines are dependent on the courier partner’s serviceability. While Tarangi endeavours to ensure punctual delivery, the Company does not guarantee specific delivery dates. Risk associated with the product passes to the customer once the product is handed over to the courier partner. Tarangi shall not be responsible for loss, theft or damage to the package once it is in transit unless such damage qualifies as transit damage verified through evidence under this Policy."
            ]
        },

        {
            title: "16. Failed Deliveries and Re-Delivery Policies",
            content: [
                "If the courier partner is unable to deliver the product due to incorrect address details, customer unavailability, inability to reach the location or refusal to accept the package, the shipment may be returned to Tarangi’s facility. In such scenarios, customers may request re-delivery, subject to payment of additional shipping charges. Refunds shall not be processed for failed deliveries caused by errors or omissions in address details provided by the customer."
            ]
        },

        {
            title: "17. Force Majeure and Operational Contingencies",
            content: [
                "Tarangi shall not be held liable for any delay or failure in fulfilling its obligations under this Policy due to circumstances beyond reasonable control, including but not limited to natural disasters, pandemics, strikes, governmental actions, civil unrest, courier disruptions, system outages, unforeseen technical failures or any other events constituting force majeure. Tarangi reserves the right to suspend, delay or cancel orders if such events render fulfilment impossible or impractical."
            ]
        },

        {
            title: "18. Product Care, Authenticity and Post-Delivery Responsibilities",
            content: [
                "All Tarangi products are crafted using sterling silver and may require proper care to maintain their sheen and longevity. Customers are encouraged to store silver jewellery in airtight conditions and avoid exposure to moisture, perfumes and abrasive materials. Tarangi is not responsible for tarnishing, discolouration, scratches or wear arising from individual usage conditions after delivery. Claims relating to damage incurred after delivery shall not qualify for return or refund unless the damage is attributable to a manufacturing defect."
            ]
        },

        {
            title: "19. Packaging Requirements for Returns",
            content: [
                "Where return is approved, customers must return the product with all original components, including the jewellery box, authenticity documents, polishing cloth, pouches and protective casing (if any). Failure to return complete packaging may result in deduction of a portion of the refund amount or rejection of the return request. The customer is responsible for ensuring adequate packaging to avoid damage during transit."
            ]
        },

        {
            title: "20. Communication and Customer Support",
            content: [
                "All communication relating to returns, refunds, exchanges or shipping must be conducted through Tarangi’s authorised customer support channels. Customers are required to provide clear and accurate information, including order details, issue descriptions and evidence where requested. Communication made through unauthorised channels, unverified social media accounts or counterfeit profiles shall not be entertained."
            ]
        },

        {
            title: "21. Amendments to This Policy",
            content: [
                "Tarangi reserves the exclusive right to modify, revise, update or replace this Refund, Return & Shipping Policy at any time in order to reflect operational changes, legal updates or service enhancements. The amended Policy shall become effective upon being posted on the website with the updated effective date. Continued use of the website after such modifications shall constitute acceptance of the revised Policy."
            ]
        },
    ]

    return (
        <div className="bg-light-sandal py-[20px] font-poppins">
            <h1 className="font-atteron text-[28px] sm:text-[42px] text-primary text-center tracking-[1px] font-semibold">REFUND, RETURN & SHIPPING POLICY</h1>
            <div className="max-w-[1286px] text-[#595959] px-5 space-y-[40px] mx-auto mt-[80px]">
                {RefundDate.map((item) => (
                    <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]  space-y-4">

                        {/* Title */}
                        <h2 className="text-[#313131] font-medium text-[18px] sm:text-[21px]">
                            {item.title}
                        </h2>

                        {/* Content */}
                        {item.content.map((paragraph) => (
                            <p>{paragraph}</p>
                        ))}
                    </div>
                ))}
                <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]">
                    <h2 className="text-[#313131] font-medium text-[20px] mb-[15px]">22. Contact Details</h2>
                    <p>For any concerns, support requests or clarifications relating to this Policy, customers may contact:</p>
                    <h4 className="mt-3 font-semibold">Tarangi Jewels</h4>
                    <p><span className="font-semibold">Email:</span> tarangijewelsindia@gmail.com</p>
                    <p><span className="font-semibold">Phone:</span> +91 90030 58300</p>
                    <p><span className="font-semibold">Address:</span> 431-435,VNA Complex, NSR Road Saibaba Colony, Coimbatore-641011</p>
                    <p><span className="font-semibold">Working Hours:</span> 10:30 AM – 8:00 PM IST</p>

                    <p className="mt-3">Tarangi will endeavour to respond to customer queries promptly and within statutory timelines wherever applicable.</p>
                </div>
            </div>
        </div>

    );
}


export default Refund_policy;
// src/pages/OrdersSection.jsx
import React from "react";

import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import circle from "../assets/Ellipse 12.png";
import truck_icon from "../assets/truck_icon.png";

const OrdersSection = ({ setSelectedOrder, setShowOrderPopup }) => {
  const upcomingOrders = [
    {
      id: 1,
      date: "12 Oct 2025",
      number: "#123456",
      status: "Shipped",
      delivery: "20th Oct",
      products: [product_1, product_2],
    },
    {
      id: 2,
      date: "15 Oct 2025",
      number: "#654321",
      status: "Processing",
      delivery: "25th Oct",
      products: [product_2, product_1],
    },
  ];

  const deliveredOrders = [
    {
      id: 1,
      date: "05 Sep 2025",
      number: "#789012",
      deliveredOn: "10 Sep",
      products: [product_1, product_2],
    },
    {
      id: 2,
      date: "01 Aug 2025",
      number: "#890123",
      deliveredOn: "06 Aug",
      products: [product_2, product_1],
    },
  ];

  return (
    <div className="space-y-10 max-w-[634px]">
      <div>
        <h2 className="text-[#2A2A2A] text-[16px] font-semibold font-poppins mb-2">
          Upcoming Orders
        </h2>
        {upcomingOrders.map((order) => (
          <div
            key={order.id}
            className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-[#E0E0E0] pb-3 mb-4 w-full">
              <div className="flex gap-6 p-1">
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Date
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.date}
                  </span>
                </div>
                <div className="flex flex-col gap-x-2 text-start">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Number
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.number}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-[6px] mt-2 sm:mt-0">
                <div className="flex items-center justify-center gap-1 text-[12px] font-medium text-[#5A0010] bg-[#FFF5E8] border border-[#5A0010] rounded-full px-3 py-[3px]">
                  <img
                    src={circle}
                    alt="circle"
                    className="w-[8px] h-[8px]"
                  />
                  <span>{order.status}</span>
                </div>
                <button
                  className="text-[#5A0010] text-[12px] font-medium hover:underline"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderPopup(true);
                  }}
                >
                  View Order Details
                </button>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
              {order.products.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Product"
                  className="w-[90px] h-[90px] rounded-[8px] object-cover"
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-[12px] text-[#A84C32] bg-gradient-to-r from-[#F6D7E0] to-[#FFFFFF] px-3 py-2 mt-4 rounded-[8px] max-w-[230px]">
              <img src={truck_icon} alt="truck" className="w-4 h-4" />
              <span>Est. delivery by {order.delivery}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button className="flex-1 bg-[#4B001A] text-white text-[14px] font-semibold py-2.5 rounded-full">
                Track Order
              </button>
              <button className="flex-1 border border-[#4B001A] text-[#4B001A] text-[14px] font-semibold py-2.5 rounded-full">
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-[#2A2A2A] text-[16px] font-semibold font-poppins mb-2">
          Delivered
        </h2>
        {deliveredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6"
          >
            <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-3 mb-4">
              <div className="flex gap-6 p-1">
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Date
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.date}
                  </span>
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-[14px] text-[#4B4B4B] font-medium">
                    Order Number
                  </span>
                  <span className="text-[16px] text-[#2A2A2A] font-semibold mt-1">
                    {order.number}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-[6px] mt-2 sm:mt-0">
                <button
                  className="text-[#5A0010] text-[12px] font-medium hover:underline"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderPopup(true);
                  }}
                >
                  View Order Details
                </button>
              </div>
            </div>

            <p className="text-[14px] font-semibold text-[#2A2A2A] mb-3">
              Delivered on {order.deliveredOn}
            </p>

            <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
              {order.products.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Product"
                  className="w-[90px] h-[90px] rounded-[8px] object-cover"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button className="flex-1 bg-[#4B001A] text-white text-[14px] font-semibold py-2.5 rounded-full">
                Track Order
              </button>
              <button className="flex-1 border border-[#4B001A] text-[#4B001A] text-[14px] font-semibold py-2.5 rounded-full">
                Return Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;

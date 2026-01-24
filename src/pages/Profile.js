// src/pages/Profile.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CustomersOrders } from "../handler/api_Handler";
const Profile = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const { loggedCustomerId } = useContext(AppContext);
  const savedCustomerId = localStorage.getItem("customerId");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("guestOrders")) || [];
    setOrders(storedOrders);
  }, []);

  const uniqueOrders = orders.filter(
    (order, index, self) =>
      index ===
      self.findIndex((o) => String(o.orderId) === String(order.orderId)),
  );

  const sendTrackOrder = (orderId) => {
    const phoneNumber = "919003058300";
    const message = `Hi, I would like to track my order with the Order ID: ${orderId}`;
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };
  const sendCancelOrder = (orderId) => {
    const phoneNumber = "919003058300";
    const message = `Hi, I would like to cancel my Order with the Order ID:  ${orderId}`;
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-fit bg-[#FFF5E8] py-16 px-2 sm:px-6 lg:px-16 xl:px-28">
      <div className="max-w-[1280px] mx-auto space-y-20">
        <div className="text-center">
          <h1 className="font-atteron text-[#5A0010] text-[40px] leading-[42px] text-center">
            Orders
          </h1>
        </div>
        <div>
          {uniqueOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-[#4B4B4B] text-[20px] sm:text-[32px] mb-4 font-semibold">
                You have not placed any orders yet.
              </p>
              <Link
                to={"/products/:handle"}
                className="text-[15px] border-primary border-2 rounded-full py-3 px-4 text-primary"
              >
                Find Something You Love
              </Link>
            </div>
          ) : (
            uniqueOrders.reverse().map((order, index) => (
              <div
                key={index}
                className="border border-[#E0E0E0] rounded-lg bg-white p-5 shadow-sm mb-6 max-w-3xl mx-auto p-10"
              >
                <div className="flex justify-between pb-3 mb-4">
                  <span className="text-[20px] text-[#4B4B4B] font-medium">
                    Order ID : {order.orderId}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 bg-[#4B001A] text-white text-[16px] font-semibold py-4 rounded-full"
                    onClick={() => sendTrackOrder(order.orderId)}
                  >
                    Track Order
                  </button>

                  <button
                    className="flex-1 border border-[#4B001A] text-[#4B001A] text-[16px] font-semibold py-4 rounded-full"
                    onClick={() => sendCancelOrder(order.orderId)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

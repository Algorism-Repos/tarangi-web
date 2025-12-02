import React, { useEffect } from "react";
import closeIcon from "../assets/Close_brown_small.png";
import truck_icon from "../assets/truck_icon.png";

export default function OrderSummaryPopup({
  open,
  onClose,
  order,
  orderItems,
  subTotal,
  tax,
  shipping,
  total
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open || !order) return null;

  const isDelivered = !!order.deliveredOn; 
  const deliveryText = isDelivered
    ? `Delivered on ${order.deliveredOn}`
    : `Est. delivery by ${order.delivery}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="w-[466px] max-h-[90vh] overflow-y-auto bg-[#FFFAF3] rounded-[10px] shadow-md border border-[#EDEDED] p-5 relative animate-fadeIn">

        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-3">
          <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
        </button>

        <h3 className="font-semibold mb-4 text-base text-[#313131]">Order Details</h3>

        {/* Order Items */}
        <div className="space-y-4">
          {orderItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-[98px] h-[101px] rounded-md border border-[#f2eaea] overflow-hidden">
                <img src={item.product_img} alt={item.alt} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="text-[14px] text-[#6F6F6F]">{item.product_name}</div>
                <div className="text-[14px] text-[#6F6F6F]">Quantity: {item.quantity}</div>
                <div className="text-[18px] text-[#313131] font-semibold">
                  {item.free ? "Free" : `₹${item.price.toLocaleString()}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY BADGE — AUTOMATIC */}
        <div className="flex max-w-[205px] items-center gap-2 text-[12px] text-[#A84C32] bg-gradient-to-r from-[#DAB3C1] to-[#FFFFFF] px-3 py-2 mt-5">
          <img src={truck_icon} alt="truck icon" className="w-4 h-4 object-contain" />
          <span>{deliveryText}</span>
        </div>

        <div className="border-t border-[#EDEDED] my-4" />

        {/* Summary */}
        <div className="text-[14px] space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-[#6E0027]">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <div className="border-t border-[#EDEDED] my-3" />

          <div className="flex justify-between text-base font-semibold text-[#1E1E1E]">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

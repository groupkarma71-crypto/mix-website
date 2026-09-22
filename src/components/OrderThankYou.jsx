import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderThankYou() {
  const navigate = useNavigate();
  const amount = localStorage.getItem("ordertotal") || "0";
  const orderId = localStorage.getItem("orderReference") || "ORDER";
  const names = { phonepe:"PhonePe", paytm:"Paytm", bhim_upi:"BHIM UPI", whatspp_pay:"WhatsApp Pay" };
  const method = names[localStorage.getItem("selectedPaymentApp")] || "UPI";

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center text-green-600 text-3xl">✓</div>
        <h1 className="text-2xl font-bold text-[#25252d] mt-4">Thank You!</h1>
        <p className="text-sm text-[#616173] mt-2">Your payment completion has been recorded.</p>

        <div className="border border-[#e1e1ea] rounded-xl mt-6 text-left overflow-hidden">
          <div className="flex justify-between p-3 border-b"><span>Order ID</span><b>{orderId}</b></div>
          <div className="flex justify-between p-3 border-b"><span>Payment</span><b>{method}</b></div>
          <div className="flex justify-between p-3"><span>Order Total</span><b>₹{amount}</b></div>
        </div>

        <p className="text-xs text-[#6d5925] bg-[#fff8e8] p-3 rounded-lg mt-4">
          Payment status is based on your confirmation. Keep your UPI receipt for reference.
        </p>

        <button onClick={() => navigate("/")} className="w-full h-12 mt-5 bg-[rgb(159_32_137)] text-white rounded-md font-semibold">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
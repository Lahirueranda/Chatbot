import React, { useState } from "react";
import {
  Search,
  Package,
  CheckCircle,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ordersData from "../data/orders.json";

const OrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  const handleTrack = () => {
    setOrderData(null);
    setError("");

    setTimeout(() => {
      const foundOrder = ordersData.find((item) => item.id === orderId.trim());

      if (foundOrder) {
        setOrderData(foundOrder);
      } else {
        setError("Order not found. Try ID: 1001, 1002, or 1003");
      }
    }, 500);
  };

  // Calculate Order Total
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const steps = [
    { icon: <Package size={20} />, label: "Order Placed" },
    { icon: <CheckCircle size={20} />, label: "Processing" },
    { icon: <Truck size={20} />, label: "Shipped" },
    { icon: <MapPin size={20} />, label: "Delivered" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh] animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-amber-950 mb-4">
          Track Your Order
        </h2>
        <p className="text-amber-800/60">
          Enter your order ID to see real-time updates and details.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-2 rounded-full shadow-lg border border-amber-100 flex items-center max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Enter Order ID (e.g., 1003)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 px-6 py-3 bg-transparent outline-none text-amber-900 placeholder:text-amber-300"
        />
        <button
          onClick={handleTrack}
          className="bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition-colors font-medium">
          Track
        </button>
      </div>

      {error && (
        <div className="text-center text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 animate-in shake">
          {error}
        </div>
      )}

      {/* Results Card */}
      {orderData && (
        <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          {/* 1. Header Section */}
          <div className="p-8 border-b border-amber-50 bg-white relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                  Order #{orderData.id}
                </span>
                <h3 className="text-3xl font-serif font-bold text-amber-950">
                  {orderData.statusText}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm text-amber-400 font-medium block">
                  Expected Arrival
                </span>
                <span className="text-amber-900 font-bold">
                  {orderData.date}
                </span>
              </div>
            </div>

            {/* Progress Bar (Visual) */}
            <div className="relative flex justify-between mt-8 mb-4">
              <div className="absolute top-5 left-0 w-full h-1 bg-amber-100 rounded-full z-0"></div>
              <div
                className="absolute top-5 left-0 h-1 bg-amber-600 rounded-full z-0 transition-all duration-1000 ease-out"
                style={{ width: `${(orderData.status / 3) * 100}%` }}></div>

              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                      index <= orderData.status
                        ? "bg-amber-600 border-amber-600 text-white shadow-lg scale-110"
                        : "bg-white border-amber-200 text-amber-300"
                    }`}>
                    {step.icon}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wide mt-3 font-bold ${
                      index <= orderData.status
                        ? "text-amber-900"
                        : "text-amber-200"
                    }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Order Details Toggle */}
          <div className="bg-orange-50/30 border-t border-amber-100">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-between items-center p-4 text-sm font-bold text-amber-800 hover:bg-orange-50 transition-colors">
              <span>Order Details ({orderData.items.length} items)</span>
              {showDetails ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* 3. Product List */}
            {showDetails && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-4 mt-2">
                  {orderData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white p-3 rounded-xl border border-amber-100/50 shadow-sm">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-amber-50 rounded-lg overflow-hidden shrink-0 border border-amber-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name & Qty */}
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-amber-950 text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs text-amber-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Total Price for Row */}
                      <div className="font-bold text-amber-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4. Order Summary Footer */}
                <div className="mt-6 pt-4 border-t border-amber-200 flex justify-between items-center">
                  <span className="text-amber-600 font-medium text-sm">
                    Total Amount Paid
                  </span>
                  <span className="text-2xl font-serif font-bold text-amber-950">
                    ${calculateTotal(orderData.items).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;

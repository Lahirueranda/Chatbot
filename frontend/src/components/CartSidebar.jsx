import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex justify-between items-center bg-orange-50/50">
          <h2 className="text-2xl font-serif font-bold text-amber-950 flex items-center gap-2">
            Your Selection{" "}
            <span className="text-base font-sans font-normal text-amber-700">
              ({cartItems.length})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-100 rounded-full text-amber-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-amber-900/40 space-y-4">
              <ShoppingBag size={48} strokeWidth={1.5} />
              <p className="text-lg">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-amber-600 font-bold hover:underline">
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 animate-in slide-in-from-right-4 duration-500">
                <div className="w-20 h-24 bg-amber-50 rounded-lg overflow-hidden shrink-0 border border-amber-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-bold text-amber-950 text-lg leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-amber-600 uppercase tracking-wide mt-1">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-1 border border-amber-100">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded-md text-amber-800 disabled:opacity-30 transition-colors"
                        disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="font-medium text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded-md text-amber-800 transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="self-start text-amber-300 hover:text-red-500 transition-colors p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-amber-100 bg-orange-50/30 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-amber-800">Subtotal</span>
              <span className="font-serif font-bold text-amber-950 text-2xl">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-amber-600 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button className="w-full bg-amber-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

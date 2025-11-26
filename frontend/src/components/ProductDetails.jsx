import React from "react";
import { X, ShoppingCart, Heart, ShieldCheck, Clock } from "lucide-react";

const ProductDetails = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-amber-900 transition-colors backdrop-blur-md">
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-amber-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-orange-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-4">
              {product.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-amber-700/80 mb-6">
              <span className="flex items-center gap-1">
                <Clock size={16} /> Ships in 24h
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={16} /> Artisan Quality
              </span>
            </div>
            <p className="text-amber-900/70 text-lg leading-relaxed mb-6">
              {product.desc} Experience the harmonious blend of premium
              ingredients crafted by our master chocolatiers in Belgium.
            </p>
          </div>

          <div className="mt-auto space-y-6 pt-6 border-t border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-serif font-bold text-amber-900">
                ${product.price.toFixed(2)}
              </span>
              <button className="p-3 border border-amber-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-amber-300 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full bg-amber-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3">
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

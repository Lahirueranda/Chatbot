import React from "react";
import { Heart, Plus } from "lucide-react";

const ProductCard = ({
  product,
  addToCart,
  onProductClick,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-amber-100/50 flex flex-col h-full">
      {/* Clickable Area for Details */}
      <div
        onClick={onProductClick}
        className="relative aspect-4/5 overflow-hidden bg-amber-50 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-amber-950/0 group-hover:bg-amber-950/5 transition-colors duration-300" />
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 
          ${
            isWishlisted
              ? "bg-white text-red-500 opacity-100 translate-x-0"
              : "bg-white text-amber-900 hover:bg-amber-900 hover:text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          }`}>
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <div className="p-5 flex-1 flex flex-col">
        <div onClick={onProductClick} className="cursor-pointer">
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
            {product.category}
          </div>
          <h4 className="font-serif font-bold text-xl text-amber-950 mb-2 leading-tight group-hover:text-amber-700 transition-colors">
            {product.name}
          </h4>
          <p className="text-amber-800/60 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-end pt-4 border-t border-amber-50">
          <div className="flex flex-col">
            <span className="text-xs text-amber-400 mb-0.5 font-medium">
              Price
            </span>
            <span className="font-serif font-bold text-xl text-amber-950">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="group/btn relative overflow-hidden bg-amber-100 text-amber-900 px-5 py-2.5 rounded-lg font-medium text-sm transition-all hover:bg-amber-900 hover:text-white hover:shadow-md active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Add <Plus size={16} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

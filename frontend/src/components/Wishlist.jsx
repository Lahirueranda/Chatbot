import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

const Wishlist = ({
  wishlistItems,
  addToCart,
  removeFromWishlist,
  onNavigate,
  onProductClick,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-[60vh] animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-6">
          Your Wishlist
        </h2>
        <p className="text-amber-800/70 text-lg">
          {wishlistItems.length === 0
            ? "Your heart is currently empty."
            : "Save your favorites for a special occasion."}
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6 opacity-60">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-200">
            <Heart size={48} fill="currentColor" />
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-amber-900 font-bold hover:underline">
            Start Collection <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="relative group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[280px]">
              <ProductCard
                product={product}
                addToCart={addToCart}
                isWishlisted={true}
                onToggleWishlist={() => removeFromWishlist(product.id)}
                onProductClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";

const Navbar = ({
  cartCount,
  wishlistCount,
  onCartClick,
  onNavigate,
  onSearch,
  searchQuery,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-orange-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => {
            onNavigate("home");
            onSearch("");
            setIsSearchOpen(false);
          }}
          className="flex items-center gap-2 cursor-pointer group shrink-0">
          <div className="w-8 h-8 bg-amber-900 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-orange-50 font-bold group-hover:rotate-3 transition-transform">
            B
          </div>
          <h1
            className={`text-2xl font-serif font-bold tracking-tight text-amber-900 ${
              isSearchOpen ? "hidden md:block" : "block"
            }`}>
            Beyon chocolate
          </h1>
        </div>

        {/* Navigation Links */}
        {!isSearchOpen && (
          <div className="hidden md:flex space-x-8 text-sm font-medium text-amber-800/80">
            <button
              onClick={() => onNavigate("home")}
              className="hover:text-amber-600 transition-colors">
              Collections
            </button>
            <button
              onClick={() => onNavigate("orders")}
              className="hover:text-amber-600 transition-colors">
              Order Status
            </button>
            <button
              onClick={() => onNavigate("policy")}
              className="hover:text-amber-600 transition-colors">
              Return Policy
            </button>
          </div>
        )}

        {/* Icons Section */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`flex items-center transition-all duration-300 ease-out ${
              isSearchOpen
                ? "w-full md:w-64 bg-orange-50 rounded-full px-3 py-1.5 ring-2 ring-amber-100"
                : "w-8"
            }`}>
            {isSearchOpen ? (
              <>
                <Search className="w-4 h-4 text-amber-400 shrink-0 mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-amber-900 w-full placeholder:text-amber-900/40"
                />
                <button
                  onClick={() => {
                    onSearch("");
                    setIsSearchOpen(false);
                  }}
                  className="ml-2 text-amber-400 hover:text-amber-600">
                  <X size={14} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-orange-50 rounded-full text-amber-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button (New) */}
          <button
            onClick={() => onNavigate("wishlist")}
            className="relative p-2 hover:bg-orange-50 rounded-full text-amber-800 group transition-colors">
            <Heart className="w-5 h-5 group-hover:text-red-500 transition" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-in zoom-in">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-orange-50 rounded-full text-amber-800 group transition-colors">
            <ShoppingCart className="w-5 h-5 group-hover:text-amber-600 transition" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden p-2 hover:bg-orange-50 rounded-full text-amber-800">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

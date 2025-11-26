import React from "react";

const Footer = ({onNavigate}) => {
  return (
    <footer className="bg-amber-950 text-white py-16 border-t-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-10">
          <div className="w-12 h-12 bg-amber-900 border border-amber-700 rounded-xl flex items-center justify-center text-2xl font-serif font-bold mx-auto mb-4 shadow-inner">
            B
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-100 mb-3">
            Beyon chocolate
          </h2>
          <p className="text-amber-200/60 font-light tracking-wide">
            Crafting memories, one bite at a time.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm mb-10 font-medium text-amber-200">
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
        <p className="text-xs text-[#00] uppercase tracking-widest">
          &copy; 2024 Beyon chocolate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

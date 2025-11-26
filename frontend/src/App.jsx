import React, { useState } from "react";
import { Award, Truck, Leaf, Search as SearchIcon } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ChatWidget from "./components/ChatWidget";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import ProductDetails from "./components/ProductDetails";
import ReturnPolicy from "./components/ReturnPolicy";
import OrderStatus from "./components/OrderStatus";
import Wishlist from "./components/Wishlist";
import productsData from "./data/products.json";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  // --- WISHLIST LOGIC ---
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- SEARCH LOGIC ---
  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0 && currentView !== "home") {
      setCurrentView("home");
    }
  };

  // --- CART LOGIC ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- RENDER VIEW CONTENT ---
  const renderContent = () => {
    if (currentView === "orders") return <OrderStatus />;
    if (currentView === "policy") return <ReturnPolicy />;
    if (currentView === "wishlist") {
      return (
        <Wishlist
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          removeFromWishlist={removeFromWishlist}
          onNavigate={setCurrentView}
          onProductClick={setSelectedProduct}
        />
      );
    }

    // Default 'home' View
    return (
      <>
        {!searchQuery && <Hero />}
        {!searchQuery && (
          <section className="bg-white border-y border-amber-100 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "Ethically Sourced",
                  desc: "100% Fair Trade & Sustainable Cocoa",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Master Chocolatiers",
                  desc: "Handcrafted in Small Batches Daily",
                },
                {
                  icon: <Truck className="w-8 h-8" />,
                  title: "Next Day Delivery",
                  desc: "Guaranteed Freshness to your Door",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-900 group-hover:text-white transition-all duration-300 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-amber-950 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-amber-800/60 text-sm leading-relaxed max-w-xs">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <main className="max-w-7xl mx-auto px-6 py-20 min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            {searchQuery ? (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-3 block">
                  Search Results
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-6">
                  "{searchQuery}"
                </h3>
                {filteredProducts.length === 0 && (
                  <p className="text-amber-800/60 mt-4">
                    No chocolates found matching your search.
                  </p>
                )}
              </div>
            ) : (
              <>
                <span className="text-amber-600 font-medium tracking-widest text-xs uppercase mb-3 block">
                  The Collection
                </span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-6">
                  Curated Indulgences
                </h3>
                <p className="text-amber-800/70 text-lg leading-relaxed">
                  Explore our signature selection of truffles, bars, and gift
                  sets.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                onProductClick={() => setSelectedProduct(product)}
                isWishlisted={wishlistItems.some(
                  (item) => item.id === product.id
                )}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </main>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-orange-50/50 selection:bg-amber-200">
      <Navbar
        cartCount={totalItems}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setCurrentView}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {renderContent()}

      <Footer onNavigate={setCurrentView} />
      <ChatWidget />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    </div>
  );
};

export default App;

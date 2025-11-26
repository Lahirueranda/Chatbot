import React from "react";

const Hero = () => {
  return (
    <header className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://article.images.consumerreports.org/image/upload/w_945,f_auto,q_auto,ar_16:9,c_lfill/v1696263716/prod/content/dam/CRO-Images-2023/10October/Special-Projects/CR-SP-InlineHero-Heavy-Metals-in-Chocolate-Products-1023"
          alt="Pouring Chocolate"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-amber-950/90"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-10">
        <span className="uppercase tracking-[0.3em] text-sm font-bold text-amber-200 mb-6 block animate-fade-in drop-shadow-md">
          Handcrafted in Belgium
        </span>
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight drop-shadow-lg">
          Indulge in <br />{" "}
          <span className="text-amber-100 italic">Sweet Perfection</span>
        </h2>
        <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Experience the art of chocolate making. Sustainable cocoa, artisanal
          techniques, and flavors that tell a story.
        </p>
      </div>
    </header>
  );
};

export default Hero;

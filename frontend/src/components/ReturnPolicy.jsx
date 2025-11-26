import React from "react";
import { ShieldCheck, RefreshCw, Clock } from "lucide-react";
import policyData from "../data/returnPolicyData.json";

const ReturnPolicy = () => {
  const iconMap = {
    Clock: <Clock />,
    ShieldCheck: <ShieldCheck />,
    RefreshCw: <RefreshCw />,
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-6">
          {policyData.header.title}
        </h2>
        <p className="text-amber-800/70 text-lg max-w-2xl mx-auto">
          {policyData.header.description}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {policyData.features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl border border-amber-100 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-50 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
              {iconMap[item.icon]}
            </div>
            <h3 className="font-serif font-bold text-xl text-amber-900 mb-2">
              {item.title}
            </h3>
            <p className="text-amber-700/70 text-sm">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Detailed Policy Text Section */}
      <div className="prose prose-amber max-w-none text-amber-900/80">
        {policyData.policySections.map((section, index) => (
          <React.Fragment key={index}>
            <h3
              className={`font-serif text-2xl font-bold text-amber-950 ${
                index > 0 ? "mt-8" : ""
              }`}>
              {section.heading}
            </h3>
            <p>{section.content}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReturnPolicy;

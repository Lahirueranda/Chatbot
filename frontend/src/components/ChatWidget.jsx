import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Grip, Globe } from "lucide-react";

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 420, height: 510 });
  const [language, setLanguage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startDims = useRef({ w: 0, h: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // --- LANGUAGE SELECTION ---
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    if (lang === "si") {
      setMessages([
        {
          role: "bot",
          text: "ආයුබෝවන්! Beyon Chocolate වෙත සාදරයෙන් පිළිගනිමු! 🍫\n\nමට, අද දවසේ ඔබට උදව් කල හැක්කේ කෙසේද?",
        },
      ]);
    } else {
      setMessages([
        {
          role: "bot",
          text: "Welcome to Beyon Chocolate! 🍫\n\n How can I help you today?",
        },
      ]);
    }
  };

  // --- HELPER: FORMAT TEXT (BOLDS HEADERS) ---
  const formatMessage = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-amber-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // --- RESIZING LOGIC ---
  const startResizing = (e) => {
    e.preventDefault();
    isResizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startDims.current = { w: dimensions.width, h: dimensions.height };
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = useCallback((e) => {
    if (!isResizing.current) return;
    const deltaX = startPos.current.x - e.clientX;
    const deltaY = startPos.current.y - e.clientY;
    setDimensions({
      width: Math.max(300, Math.min(startDims.current.w + deltaX, 800)),
      height: Math.max(400, Math.min(startDims.current.h + deltaY, 800)),
    });
  }, []);

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  // --- SEND MESSAGE LOGIC ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, language: language }),
      });

      if (!response.ok) throw new Error("Failed to connect");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            language === "si"
              ? "සමාවන්න, දෝෂයක් ඇති විය."
              : "Server error. Is your backend running?",
        },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isChatOpen && (
        <div
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
          className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-amber-100 animate-in slide-in-from-bottom-10 fade-in duration-300 relative">
          {/* Resize Handle */}
          <div
            onMouseDown={startResizing}
            className="absolute top-0 left-0 w-6 h-6 z-50 cursor-nw-resize flex items-center justify-center text-amber-900/40 hover:text-amber-900 transition-colors bg-white/50 rounded-br-lg"
            title="Drag to resize">
            <Grip size={14} className="-rotate-45" />
          </div>

          {/* Header */}
          <div className="bg-amber-900 p-4 flex justify-between items-center text-white shadow-md select-none">
            <div className="flex items-center space-x-3 ml-2">
              <div className="relative">
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center border-2 border-amber-700">
                  🍫
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-amber-900"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Choco assistance</h3>
                <p className="text-amber-200/80 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-amber-200 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-orange-50/50 relative">
            {/* IF NO LANGUAGE SELECTED: SHOW SELECTION SCREEN */}
            {!language ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-6 bg-orange-50/80 backdrop-blur-sm z-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-2">
                  <Globe className="text-amber-600 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-amber-950">
                    Select Language
                  </h3>
                  <p className="text-amber-800/60 text-sm">භාෂාව තෝරන්න</p>
                </div>

                <div className="flex flex-col w-full gap-3 max-w-[200px]">
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className="bg-white border-2 border-amber-100 hover:border-amber-400 hover:bg-amber-50 text-amber-900 py-3 rounded-xl transition-all font-medium shadow-sm flex items-center justify-center gap-2">
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("si")}
                    className="bg-white border-2 border-amber-100 hover:border-amber-400 hover:bg-amber-50 text-amber-900 py-3 rounded-xl transition-all font-medium shadow-sm flex items-center justify-center gap-2">
                    🇱🇰 සිංහල (Sinhala)
                  </button>
                </div>
              </div>
            ) : (
              /* IF LANGUAGE SELECTED: SHOW CHAT */
              <div className="p-4 space-y-4 min-h-full">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}>
                    {msg.role === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center text-xs mr-2 mt-1 shrink-0">
                        AI
                      </div>
                    )}
                    <div
                      style={{ whiteSpace: "pre-wrap" }}
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-amber-600 text-white rounded-tr-none"
                          : "bg-white text-amber-950 border border-amber-100 rounded-tl-none"
                      }`}>
                      {formatMessage(msg.text)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start items-center gap-2 text-amber-700 text-xs italic ml-10">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area (Only show if language selected) */}
          {language && (
            <div className="p-4 bg-white border-t border-amber-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={
                    language === "si"
                      ? "පණිවිඩයක් ලියන්න..."
                      : "Ask about chocolate..."
                  }
                  className="w-full bg-orange-50 rounded-full pl-5 pr-12 py-3 text-sm text-amber-900 placeholder:text-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-transparent focus:border-amber-200 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 bg-amber-900 text-white rounded-full hover:bg-amber-800 disabled:opacity-50 hover:scale-105 transition-all shadow-md">
                  <Send size={16} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-amber-300 uppercase tracking-wider font-bold">
                  Powered by Beyon
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`${
          isChatOpen ? "scale-0" : "scale-100"
        } bg-amber-900 hover:bg-amber-800 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 border-orange-50`}>
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default ChatWidget;

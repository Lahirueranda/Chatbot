console.log("--- INITIALIZING SERVER ---");

const express = require("express");
const cors = require("cors");
const fs = require("fs"); 
const path = require("path"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// Gemini API key 
const GEN_AI_KEY = "AIzaSyAG-NRKauUHAuCH1UaXElzkBQABHxfcQgU"; 
const genAI = new GoogleGenerativeAI(GEN_AI_KEY);
const model = genAI.getGenerativeModel(
  { model: "gemini-2.5-pro" },
  { apiVersion: "v1beta" }
);

// This reads the JSON files
const loadStoreData = () => {
  try {
    const basePath = path.join(__dirname, "../frontend/src/data");

    const orders = fs.readFileSync(path.join(basePath, "orders.json"), "utf8");
    const products = fs.readFileSync(
      path.join(basePath, "products.json"),
      "utf8"
    );
    const policies = fs.readFileSync(
      path.join(basePath, "returnPolicyData.json"),
      "utf8"
    );
    const guidelines = fs.readFileSync(
      path.join(basePath, "SiteGuidlines.json"),
      "utf8"
    );

    return {
      orders: JSON.parse(orders),
      products: JSON.parse(products),
      policies: JSON.parse(policies),
      guidelines: JSON.parse(guidelines),
    };
  } catch (error) {
    console.error("Error reading JSON data files:", error);
    return null;
  }
};

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "I didn't receive a message." });
  }

  const data = loadStoreData();

  if (!data) {
    return res
      .status(500)
      .json({ response: "System Error: Unable to access store data." });
  }

  // --- CONTEXT & INSTRUCTIONS ---
  const STORE_CONTEXT = `
  You are "Choco Assistance", the AI customer support agent for 'Beyon Chocolate'.
  Your tone is warm, elegant, helpful, and slightly enthusiastic about chocolate.

  Here is the LIVE database you must refer to:

  === PRODUCT CATALOG ===
  ${JSON.stringify(data.products)}

  === CUSTOMER ORDERS ===
  ${JSON.stringify(data.orders)}

  === RETURN POLICY ===
  ${JSON.stringify(data.policies)}

  === SITE GUIDELINES (FAQ) ===
  ${JSON.stringify(data.guidelines)}

  **STYLING & FORMATTING RULES (STRICT):**
  1. **Beautiful Lists:** NEVER write lists in a single paragraph. ALWAYS use a new line for each item.
  2. **Emojis:** Use emojis to make the text visual and engaging.
     - 📦 for Delivered orders
     - 🚚 for Shipped orders
     - ⚙️ for Processing orders
     - 🍫 for Chocolate items
     - ✨ for Highlights
  3. **Order Status Format:**
     "📦 **Order #1001** (Delivered)\n• 2x Item Name\n• 1x Item Name"
  4. **Product Recommendations:**
     Group items by category with bold headers:
     "**Bestsellers**\n• Product A\n• Product B\n\n**Gifts**\n• Product C"
  5. **Brevity:** Keep the intro and outro short. Focus on the data.
  `;

  try {
    const fullPrompt = `${STORE_CONTEXT}\n\nUser Question: ${message}\nAI Response:`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({
      response: "I'm having trouble connecting to the chocolate mainframe.",
    });
  }
});

// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


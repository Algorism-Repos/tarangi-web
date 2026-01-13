const axios = require("axios");
const silverCache = require("./silverCache");

const METAL_API_KEY = process.env.METAL_API_KEY;

async function updateSilverRate() {
  try {
    const url = `https://api.metals.dev/v1/latest?api_key=TNJIKPQ4AYPHZUDTT0BS619DTT0BS&currency=INR&unit=g&symbols=XAG-COIM`;

    const response = await axios.get(url);
    const silverPerGram = Number(response.data.metals.silver);
    // console.log(response.data);
    silverCache.silverPerGram = silverPerGram;
    silverCache.silverPerKg = silverPerGram * 1000;
    silverCache.lastUpdated = new Date().toISOString();

    console.log("Silver updated:", silverCache.lastUpdated);
    return {
      silverPerGram,
      silverPerKg: silverPerGram * 1000,
      lastUpdated: silverCache.lastUpdated,
    };
  } catch (error) {
    console.error("Silver API error:", error.message);
  }
}

module.exports = { updateSilverRate };

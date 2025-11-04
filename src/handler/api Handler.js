import axios from "axios";

export async function FetchAllProductFromShopify() {
  try {
    const response = await axios.get(
        "https://tarangi-website.de.r.appspot.com/api/shopify/products"
      );
     console.log("res",response);
    return response.data || [];
  } catch (error) {
    console.error("error fetching cities:", error);
  }
}

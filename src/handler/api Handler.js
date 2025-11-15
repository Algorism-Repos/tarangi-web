import axios from "axios";

export async function FetchAllProductFromShopify() {
  try {
    const response = await axios.get(
        "https://tarangi-website.de.r.appspot.com/api/shopify/products"
      );
    //  console.log("res",response);
    return response.data || [];
  } catch (error) {
    console.error("error fetching product:", error);
  }
}

export async function FetchAllCollectionsFromShopify() {
  try {
    const response = await axios.get(
        "http://localhost:8080/api/shopify/collections"
      );
    //  console.log("res",response);
    return response.data || [];
  } catch (error) {
    console.error("error fetching collections:", error);
  }
}
export async function FetchAllProductByCollections(collectionId) {
  try {
    const response = await axios.get(
        `http://localhost:8080/api/shopify/products/${collectionId}`
      );
    // console.log("Products Response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
export async function checkOrCreateCustomer(customer) {
   try {
    const response = await axios.post("http://localhost:8080/api/shopify/check-or-create-customer", {
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.mobile,
    });

    return response.data.customerId;
  } catch (error) {
    console.error("Customer check/create failed:", error);
    throw error;
  }
}



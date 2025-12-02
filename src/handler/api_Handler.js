import axios from "axios";

let url = "http://localhost:8080/api/shopify";
// let url = "https://tarangijewels.com/api/shopify"


export async function FetchAllProductFromShopify() {
  try {
    const response = await axios.get(
      `${url}/products`
    );
    return response.data || [];
  } catch (error) {
    console.error("error fetching product:", error);
  }
}
export async function FetchAllCollectionsFromShopify() {
  try {
    const response = await axios.get(
      `${url}/collections`
    );
    return response.data || [];
  } catch (error) {
    console.error("error fetching collections:", error);
  }
}
export async function FetchAllProductByCollections(collectionId) {
  try {
    const response = await axios.get(
      `${url}/products/${collectionId}`
    );
    console.log(response.data)
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// check the login customer is exit in  shopify
export async function checkCustomer(logincredential) {
  console.log(logincredential)
  try {
    const response = await axios.post(
      `${url}/check-customer`,
      {
        contact: logincredential.contact
      }
    );
    console.log(response.data)
    return response;
  } catch (error) {
    console.error("Customer check  failed:", error);
  }
}

export async function checkOrCreateCustomer(customer) {
  try {
    const response = await axios.post(
      `${url}/check-or-create-customer`,
      {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.mobile,
      }
    );
    return response.data.customerId;
  } catch (error) {
    console.error("Customer check or create failed:", error);
  }
}
// fetch order details of customers based on customer id 
export async function CustomersOrders(customerId) {
  console.log(customerId)
  try {
    const response = await axios.post(
      `${url}/customer-orders`,
      {
        customerId: customerId
      }
    );
    console.log(response.data)
    return response;
  } catch (error) {
    console.error("CustomersOrders check  failed:", error);
  }
}



export async function FetchAllBlogsFromShopify() {
  try {
    const response = await axios.get(`${url}/blogs`);
    return response.data || [];
  } catch (error) {
    console.error("fetchings blogs failed:", error);
  }
}
export async function FetchBlogPosts(blogId) {
  try {
    const response = await axios.post(`${url}/blogs/${blogId}/articles`);
    return response.data;
  } catch (error) {
    console.error("fetchings blogs failed:", error);
  }
};
export async function FetchOrderByMail(email) {
  //   try {
  // const response = await axios.post(`http://localhost:8080/api/shopify/orders/by-email`, { email });
  //   return response.data;   
  // } catch (error) {
  //   console.error("fetchings orders  failed:", error);
  // }
};
import React, {  useContext } from "react";
// Component
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";

function Product_page() {
  const { productListFromShopify } = useContext(AppContext);
  const categorizedProducts = productListFromShopify.reduce((acc, product) => {
    const type = product.product_type || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push({
      id: product.id,
      title: product.title,
      image: product.image?.src,
      price: product.variants?.[0]?.price,
      vendor: product.vendor,
      created_at: product.created_at,
    });
    return acc;
  }, {});
  return (
    <>
      <div className="bg-[#FFF5E8] py-[50px] relative">
        <div className="max-w-[1350px] mx-auto lg:fle gap-x-[40px] my-[50px]">
          <Product_Filter productCatergory={categorizedProducts} />
        </div>
      </div>
    </>
  );
}
export default Product_page;

import React, { useContext, useEffect, useState } from "react";
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections } from "../handler/api_Handler";
import floating_up_arrow from "../assets/floating_up_arrow.png";
import { formatProduct } from "../utils/productFormatter";

function Product_page() {
  const { setProductListFromShopify, setCategorizedProduct } =
    useContext(AppContext);
  const location = useLocation();
  const { collectionId, category } = location.state || {};
  const [productListData, setProductListData] = useState([]);
  useEffect(() => {
    if (collectionId) {
      productList(collectionId);
    }
  }, [collectionId]);
  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      console.log(
        "respons from product_list fetch all products by collection",
        response
      );

      const productEdges = response?.data?.collection?.products?.edges ?? [];

      const formattedProducts = productEdges.map((item) =>
        formatProduct(item.node)
      );
      setProductListData(formattedProducts);
      setProductListFromShopify(formattedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // product catogory
  const categorized = productListData.reduce((acc, product) => {
    const type = product.productType || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});


  useEffect(() => {
    setCategorizedProduct(productListData);
  }, [productListData]);
   useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="bg-[#FFF5E8] py-[10px] sm:py-[50px] relative">
        <img src={floating_up_arrow} alt="floating_up_arrow" className="w-[50px] h-[48px] z-50 sm:w-[70px] sm:h-[67px] fixed bottom-20 lg:bottom-3 right-3  transform animate-bounce cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}} />
        <div className="max-w-[1350px] mx-auto lg:flex justify-between gap-x-[40px] my-[50px]">
          <Product_Filter
            productCatergory={categorized}
            collectionName={category}
          />
        </div>
      </div>
    </>
  );
}
export default Product_page;

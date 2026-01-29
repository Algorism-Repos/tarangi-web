import React, { useContext, useEffect, useState } from "react";
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections, FetchProductBySearch, FetchProductBySearchv } from "../handler/api_Handler";
import floating_up_arrow from "../assets/floating_up_arrow.png";
import { formatProduct } from "../utils/productFormatter";

function Product_page() {
   const location = useLocation();

  const { setProductListFromShopify, setCategorizedProduct,collection } =
    useContext(AppContext);
  
  const { collectionId, category ,searchKeyword } = location.state || {};
  const [baseProducts, setBaseProducts] = useState([]); // original API data
const [productListData, setProductListData] = useState([]); // filtered

const searchParams = new URLSearchParams(location.search);
const searchQuery = searchParams.get("search") || "";
const isSearch = searchQuery && searchQuery.trim() !== "";

console.log(searchQuery)
console.log(searchKeyword)

  useEffect(() => {
    if (collectionId) {
      productList(collectionId);
    }else if(isSearch){
      productList()
    }
  }, [collectionId]);




  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      console.log(
        "respons from productPage fetch all products/collection",
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



console.log(searchQuery)


  useEffect(() => {
  if (productListData.length) {
    setCategorizedProduct(productListData); // update context
    sessionStorage.setItem("allProducts", JSON.stringify(productListData));
  }
}, [productListData]);

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
  console.log(categorized)
  return (
    <>
      <div className="bg-[#FFF5E8] py-[10px] sm:py-[50px] relative">
        <img
          src={floating_up_arrow}
          alt="floating_up_arrow"
          className="w-[50px] h-[48px] z-50 sm:w-[70px] sm:h-[67px] fixed bottom-20 lg:bottom-3 right-3  transform animate-bounce cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <div className="max-w-[1350px] mx-auto lg:flex justify-between gap-x-[40px] my-[50px]">
          <Product_Filter
            productCatergory={categorized}
            collectionName={category}
            searchKeyword={searchKeyword}

          />
          
        </div>
      </div>
    </>
  );
}
export default Product_page;

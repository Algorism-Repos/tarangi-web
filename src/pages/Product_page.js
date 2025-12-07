import React, { useContext, useEffect, useState } from "react";
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections } from "../handler/api_Handler";
import floating_up_arrow from "../assets/floating_up_arrow.png"



function Product_page() {
  const { setProductListFromShopify, setCategorizedProduct } =
    useContext(AppContext);
  const location = useLocation();
  const { collectionId, category} = location.state || {};
  const [productListData, setProductListData] = useState([]);


  useEffect(() => {
    if (collectionId) {
      productList(collectionId);
    }
  }, [collectionId]);
  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      // console.log(
      //   "respons from product_list fetch all products by collection",
      //   response
      // );
       
      const productEdges = response?.data?.collection?.products?.edges ?? [];
      
      const formattedProducts = productEdges.map((item) =>
        formatProduct(item.node)
      );
       setProductListData(formattedProducts);
       setProductListFromShopify(formattedProducts)
    } catch (error) {
      console.log(error);
    }
  };

function formatProduct(productNode) {
  const {
    id,
    title,
    description,
    images,
    variants,
    featuredImage,
    vendor,
    productType,
    tags,
    createdAt,
  } = productNode;

  const allImages = images?.edges?.map((img) => img.node.url) || [];
  const variantEdges = variants?.edges || [];
  const firstVariant = variantEdges[0]?.node;

  const isSimpleProduct =
    variantEdges.length === 1 &&
    variantEdges[0].node.selectedOptions?.[0]?.value === "Default Title";

  if (isSimpleProduct) {
    return {
      productId: id,
      title,
      description,
      vendor,
      productType,
      tags,
      createdAt,
      type: "simple",
      price: firstVariant?.price,
      variantId: firstVariant?.id,
      compareAtPrice:
        firstVariant?.compareAtPrice !== undefined
          ? firstVariant.compareAtPrice
          : null,
      image: featuredImage?.url || allImages[0],
      images: allImages,
      variants: null,
    };
  }

  const formattedVariants = variantEdges.map((v) => ({
    variantId: v.node.id,
    price: v.node.price,
    compareAtPrice:
      v.node.compareAtPrice !== undefined ? v.node.compareAtPrice : null,
    inventoryQuantity: v.node.inventoryQuantity,
    image: v.node.image?.url || featuredImage?.url,
    // colorVariant: v.node.selectedOptions.map((opt) => [opt.name, opt.value]),
    colorVariant: v.node.selectedOptions[0].value,

  }));

  return {
    productId: id,
    title,
    description,
    vendor,
    productType,
    tags,
    createdAt,
    type: "variant",
    featuredImage: featuredImage?.url,
    images: allImages,
    variants: formattedVariants,
  };
}
  // product catogory
  const categorized = productListData.reduce((acc, product) => {
    const type = product.productType || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCategorizedProduct(productListData);
  }, [productListData]);
  return (
    <>
      <div className="bg-[#FFF5E8] py-[50px] relative">
        <img src={floating_up_arrow} alt="floating_up_arrow" className="w-[50px] h-[48px] z-50 sm:w-[70px] sm:h-[67px] fixed bottom-20 sm:bottom-3 right-3 transform animate-bounce cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}} />
        <div className="max-w-[1350px] mx-auto lg:flex justify-between gap-x-[40px] my-[50px]">
          <Product_Filter productCatergory={categorized} collectionName={category} />
        </div>
      </div>
    </>
  );
}
export default Product_page;

import React, { useContext, useEffect, useState } from "react";
// Component
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections } from "../handler/api_Handler";

function Product_page() {
  const { setProductListFromShopify } = useContext(AppContext);
  const location = useLocation();
  const { category, collectionId } = location.state || {};
  const [productListData, setProductListData] = useState([]);
  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      const edges = response?.data?.collection?.products?.edges || [];

      const formattedProducts = edges.map(({ node }) => {
        const productId = Number(node.id.replace("gid://shopify/Product/", ""));

        const variantGID = node.variants?.edges?.[0]?.node?.id || null;

        const variantId = variantGID
          ? Number(variantGID.replace("gid://shopify/ProductVariant/", ""))
          : null;
        return {
          id: Number(productId),
          admin_graphql_api_id: node.id,
          title: node.title,
          body_html: "",
          vendor: node.vendor,
          product_type: node.productType || "Uncategorized",
          created_at: node.createdAt,
          published_at: node.createdAt,
          updated_at: node.createdAt,
          status: "active",
          tags: node.tags,
          template_suffix: "",
          published_scope: "global",
          description: node.description,

          image: {
            id: Number(productId) + 1,
            alt: null,
            position: 1,
            product_id: Number(productId),
            created_at: node.createdAt,
            src: node.featuredImage?.url || "",
          },

          images: [
            {
              id: Number(productId) + 1,
              position: 1,
              product_id: Number(productId),
              src: node.featuredImage?.url || "",
            },
          ],

          options: [
            {
              id: Number(productId) + 1000,
              product_id: Number(productId),
              name: "Title",
              position: 1,
              values: ["Default Title"],
            },
          ],
          variants: [
            {
              id: variantId,
              product_id: Number(productId),
              title: "Default Title",
              inventory_quantity:
                node.variants?.edges?.[0]?.node?.inventoryQuantity || 0,

              price: node.variants?.edges?.[0]?.node?.price || "0.00",
              position: 1,
              created_at: node.createdAt,
              updated_at: node.createdAt,
            },
          ],
        };
      });
      setProductListFromShopify(formattedProducts);
      const products = edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        vendor: node.vendor,
        created_at: node.createdAt,
        image: node.featuredImage?.url,
        price: node.variants?.edges?.[0]?.node?.price || "0.00",
        product_type: node.productType || "Uncategorized",
        tags: node.tags || [],
        description: node.description,

      }));
      setProductListData(products);
    } catch (error) {
      console.log(error);
    }
  };
  const categorized = productListData.reduce((acc, product) => {
    const type = product.product_type || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    
    return acc;
  }, {});
  console.log(categorized);
  useEffect(() => {
    if (collectionId) {
      productList(collectionId);
    }
  }, [collectionId]);

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="bg-[#FFF5E8] py-[50px] relative ">
        <div className="max-w-[1350px] mx-auto lg:fle gap-x-[40px] my-[50px]">
          <Product_Filter productCatergory={categorized} />
        </div>
      </div>
    </>
  );
}
export default Product_page;
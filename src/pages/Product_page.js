import React, { useContext, useEffect, useState } from "react";
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections } from "../handler/api Handler";

function Product_page() {
  const { setProductListFromShopify,setallproduct } = useContext(AppContext);
  const location = useLocation();

  const { category, collectionId } = location.state || {};
  const [productListData, setProductListData] = useState([]);

  // converted graphql to rest
  const formatProducts = (edges) => {
    return edges.map(({ node }) => {
      const productId = Number(node.id.replace("gid://shopify/Product/", ""));

      //  images
      const productImages =
        node.images?.edges?.map((img, index) => ({
          id: Number(`${productId}${index + 1}`),
          product_id: productId,
          src: img.node.url,
          position: index + 1,
        })) || [];

      // variants
      const variants =
        node.variants?.edges?.map((variantEdge, index) => {
          const variant = variantEdge.node;
          return {
            id: Number(variant.id.replace("gid://shopify/ProductVariant/", "")),
            product_id: productId,
            title: variant.title || "",
            price: variant.price,
            compareAtPrice: variant.compareAtPrice,
            inventory_quantity: variant.inventoryQuantity,
            selected_options: variant.selectedOptions || [],
            // variant level image
            image: variant.image?.url || null,
            position: index + 1,
            created_at: node.createdAt,
            updated_at: node.createdAt,
          };
        }) || [];

      // color
      const optionValues = [
        ...new Set(
          variants.flatMap(
            (v) => v?.selected_options?.map((o) => o.value) || []
          )
        ),
      ];

      return {
        id: productId,
        admin_graphql_api_id: node.id,
        title: node.title,
        vendor: node.vendor,
        description: node.description,
        product_type: node.productType || "Uncategorized",
        tags: node.tags || [],
        created_at: node.createdAt,
        updated_at: node.updatedAt,
        status: "active",

        // Featured image for main listing
        image: {
          id: productId + 1,
          product_id: productId,
          src: node.featuredImage?.url || null,
          position: 1,
        },
        //  all product images and  variants

        images: productImages,
        variants,

        options: [
          {
            id: productId + 1000,
            product_id: productId,
            name: "Variant Options",
            position: 1,
            values: optionValues,
          },
        ],
      };
    });
  };

  // fetch product list
  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      const edges = response?.data?.collection?.products?.edges || [];

      // format  REST
      const formatted = formatProducts(edges);

      // Save in Context
      setProductListFromShopify(formatted);

      // Also store minimal list for filtering/UI

      const liteProducts = edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        vendor: node.vendor,
        created_at: node.createdAt,
        description: node.description,
        product_type: node.productType || "Uncategorized",
        tags: node.tags || [],
        image: node.featuredImage?.url,
        variants:
          node.variants?.edges?.map((v) => ({
            id: v.node.id,
            price: v.node.price,
            image: v.node.image?.url,
            options: v.node.selectedOptions,
          })) || [],
      }));

      setProductListData(liteProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // product catogory
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
  useEffect(() => {
    setallproduct(categorized)
  }, [productListData]);
  return (
    <>
      <div className="bg-[#FFF5E8] py-[50px] relative">
        <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">
          <Product_Filter productCatergory={categorized} />
        </div>
      </div>
    </>
  );
}

export default Product_page;

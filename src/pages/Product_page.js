// import React, { useContext, useEffect, useState } from "react";
// // Component
// import Product_Filter from "../components/Product_filter";
// import Product_Listing from "./Product_Listing";
// import { AppContext } from "../context/AppContext";
// import { useLocation } from "react-router";
// import { FetchAllProductByCollections } from "../handler/api Handler";

// function Product_page() {
//   const { setProductListFromShopify } = useContext(AppContext);
//   const location = useLocation();
//   const { category, collectionId } = location.state || {};
//   const [productListData, setProductListData] = useState([]);
//   const productList = async (collectionId) => {
//     try {
//       const response = await FetchAllProductByCollections(collectionId);
//       console.log(response);
//       const edges = response?.data?.collection?.products?.edges || [];

//       const formattedProducts = edges.map(({ node }) => {
//         const productId = Number(node.id.replace("gid://shopify/Product/", ""));

//         const variantGID = node.variants?.edges?.[0]?.node?.id || null;

//         const variantId = variantGID
//           ? Number(variantGID.replace("gid://shopify/ProductVariant/", ""))
//           : null;
//         return {
//           id: Number(productId),
//           admin_graphql_api_id: node.id,
//           title: node.title,
//           body_html: "",
//           vendor: node.vendor,
//           product_type: node.productType || "Uncategorized",
//           created_at: node.createdAt,
//           published_at: node.createdAt,
//           updated_at: node.createdAt,
//           status: "active",
//           tags: node.tags,
//           template_suffix: "",
//           published_scope: "global",
//           description: node.description,
//           image: {
//             id: Number(productId) + 1,
//             alt: null,
//             position: 1,
//             product_id: Number(productId),
//             created_at: node.createdAt,
//             src: node.featuredImage?.url || "",
//           },
// images:
//   node.images?.edges?.map((img, index) => ({
//     id: Number(productId) + index + 1,
//     product_id: Number(productId),
//     src: img.node.url,
//     position: index + 1,
//   })) || [],



//           options: [
//             {
//               id: Number(productId) + 1000,
//               product_id: Number(productId),
//               name: "Title",
//               position: 1,
//               values: ["Default Title"],
//             },
//           ],
//          variants:
//   node.variants?.edges?.map((variantEdge) => {
//     const variant = variantEdge.node;
//     const variantId = Number(
//       variant.id.replace("gid://shopify/ProductVariant/", "")
//     );

//     return {
//       id: variantId,
//       title: variant.title,
//       price: variant.price,
//       inventory_quantity: variant.inventoryQuantity,
//       selected_options: variant.selectedOptions, // <-- MULTIPLE COLORS / SIZES
//       variant_image: variant.image?.url || "", // <-- IMAGE FOR EACH COLOR
//       created_at: node.createdAt,
//       updated_at: node.createdAt,
//     };
//   }) || [],

//         };
//       });
//       setProductListFromShopify(formattedProducts);
//     const products = edges.map(({ node }) => ({
//   id: node.id,
//   title: node.title,
//   vendor: node.vendor,
//   created_at: node.createdAt,
//   description: node.description,
//   product_type: node.productType || "Uncategorized",
//   tags: node.tags || [],
//   image: node.featuredImage?.url,

//   // IMPORTANT: All variants
//   variants: node.variants?.edges?.map(v => ({
//     id: v.node.id,
//     price: v.node.price,
//     image: v.node.image?.url,
//     options: v.node.selectedOptions,  // <-- for color filter or UI
//   })) || [],
// }));

//       setProductListData(products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const categorized = productListData.reduce((acc, product) => {
//     const type = product.product_type || "Uncategorized";
//     if (!acc[type]) acc[type] = [];
//     acc[type].push(product);
//     return acc;
//   }, {});

//   useEffect(() => {
//     if (collectionId) {
//       productList(collectionId);
//     }
//   }, [collectionId]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);
//   return (
//     <>
//       <div className="bg-[#FFF5E8] py-[50px] relative ">
//         <div className="max-w-[1350px] mx-auto lg:fle gap-x-[40px] my-[50px]">
//           <Product_Filter productCatergory={categorized} />
//         </div>
//       </div>
//     </>
//   );
// }
// export default Product_page;

import React, { useContext, useEffect, useState } from "react";
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router";
import { FetchAllProductByCollections } from "../handler/api Handler";

function Product_page() {
  const { setProductListFromShopify } = useContext(AppContext);
  const location = useLocation();

  const { category, collectionId } = location.state || {};
  const [productListData, setProductListData] = useState([]);

  // ==========================================================
  // 🟦 FORMAT GRAPHQL PRODUCT → REST PRODUCT
  // ==========================================================
  const formatProducts = (edges) => {
    return edges.map(({ node }) => {
      const productId = Number(node.id.replace("gid://shopify/Product/", ""));

      // ---------------------------
      // 🔹 PRODUCT IMAGES
      // ---------------------------
      const productImages =
        node.images?.edges?.map((img, index) => ({
          id: Number(`${productId}${index + 1}`),
          product_id: productId,
          src: img.node.url,
          position: index + 1,
        })) || [];

      // ---------------------------
      // 🔹 PRODUCT VARIANTS
      // ---------------------------
      const variants =
        node.variants?.edges?.map((variantEdge, index) => {
          const variant = variantEdge.node;

          return {
            id: Number(
              variant.id.replace("gid://shopify/ProductVariant/", "")
            ),
            product_id: productId,
            title: variant.title || "",
            price: variant.price,
            inventory_quantity: variant.inventoryQuantity,
            selected_options: variant.selectedOptions || [],
            image: variant.image?.url || null, // <-- variant-level image
            position: index + 1,
            created_at: node.createdAt,
            updated_at: node.createdAt,
          };
        }) || [];

      // ---------------------------
      // 🔹 PRODUCT OPTIONS (COLOR / SIZE)
      // ---------------------------
      const optionValues = [
        ...new Set(
          variants.flatMap((v) =>
            v?.selected_options?.map((o) => o.value) || []
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

        images: productImages, // <-- all images

        variants, // <-- all variants

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

  // ==========================================================
  // FETCH PRODUCT LIST
  // ==========================================================
  const productList = async (collectionId) => {
    try {
      const response = await FetchAllProductByCollections(collectionId);
      const edges = response?.data?.collection?.products?.edges || [];

      // format → REST
      const formatted = formatProducts(edges);

      // Save in Context (global)
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

  // ==========================================================
  // GROUP PRODUCTS BY CATEGORY
  // ==========================================================
  const categorized = productListData.reduce((acc, product) => {
    const type = product.product_type || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});
 console.log(categorized)
  // ==========================================================
  // ON LOAD → FETCH PRODUCTS
  // ==========================================================
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
      <div className="bg-[#FFF5E8] py-[50px] relative">
        <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">
          <Product_Filter productCatergory={categorized} />
        </div>
      </div>
    </>
  );
}

export default Product_page;


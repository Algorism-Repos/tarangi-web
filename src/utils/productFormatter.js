export function formatProduct(productNode) {
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
     productDetails,
  } = productNode;

  // Extract all images
  const allImages = images?.edges?.map((img) => img.node.url) || [];

  // Variant edges
  const variantEdges = variants?.edges || [];
  const firstVariant = variantEdges[0]?.node;

  // Check if simple product
  const isSimpleProduct =
    variantEdges.length === 1 &&
    variantEdges[0]?.node?.selectedOptions?.[0]?.value === "Default Title";

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
      inventoryQuantity: firstVariant?.inventoryQuantity,
      compareAtPrice:
        firstVariant?.compareAtPrice !== undefined
          ? firstVariant.compareAtPrice
          : null,
      image: featuredImage?.url || allImages[0],
      images: allImages,
      variants: null,
        productDetails,

    };
  }

  // If product has multiple variants
  const formattedVariants = variantEdges.map((v) => ({
    variantId: v.node.id,
    price: v.node.price,
    compareAtPrice:
      v.node.compareAtPrice !== undefined ? v.node.compareAtPrice : null,
    inventoryQuantity: v.node.inventoryQuantity,
    image: v.node.image?.url || featuredImage?.url,
    colorVariant: v.node.selectedOptions?.[0]?.value,
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
    productDetails,

  };
}

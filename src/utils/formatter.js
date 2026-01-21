// Correct way to export
export function formatRawShopifyProducts(products) {
  return products.map((p) => {
    const isVariantProduct = p.variants && p.variants.length > 0;
    const allImages = p.images || [];
    const featuredImage = p.featuredImage || allImages[0] || null;

    if (!isVariantProduct) {
      return {
        productId: p.id,
        title: p.title,
        description: p.description || "",
        vendor: p.vendor || "",
        productType: p.productType || "",
        tags: p.tags || [],
        createdAt: p.createdAt || new Date().toISOString(),
        type: "simple",
        price: p.price || null,
        variantId: p.variantId || null,
        inventoryQuantity: p.inventoryQuantity ?? 0,
        compareAtPrice: p.compareAtPrice || null,
        image: featuredImage,
        images: allImages,
        variants: null,
        liked: p.liked ?? false,
      };
    }

    const formattedVariants = p.variants.map((v) => ({
      variantId: v.variantId,
      price: typeof v.price === "object" ? v.price.amount : v.price,
      compareAtPrice: v.compareAtPrice ? (typeof v.compareAtPrice === "object" ? v.compareAtPrice.amount : v.compareAtPrice) : null,
      inventoryQuantity: v.inventoryQuantity ?? 0,
      image: v.image || featuredImage,
      colorVariant: v.colorVariant || null,
    }));

    return {
      productId: p.id,
      title: p.title,
      description: p.description || "",
      vendor: p.vendor || "",
      productType: p.productType || "",
      tags: p.tags || [],
      createdAt: p.createdAt || new Date().toISOString(),
      type: "variant",
      featuredImage,
      images: allImages,
      variants: formattedVariants,
      liked: p.liked ?? false,
    };
  });
}

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";

export const AppContext = createContext();
export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pincodeDetails, setPincodeDetails] = useState({});
  const [deliveryDate, setdeliveryDate] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
const [recentlyViewed, setRecentlyViewed] = useState(() => {
  const saved = localStorage.getItem("recentlyViewed");
  return saved ? JSON.parse(saved) : [];
});  const [trendingProduct, setTrendingProduct] = useState(() => {
    const saved = localStorage.getItem("trendingProduct");
    return saved ? JSON.parse(saved) : [];
  });
 const [collection, setCollections] = useState(() => {
    const saved = localStorage.getItem("collection");
    return saved ? JSON.parse(saved) : [];
  });
 const [loggedCustomerId, setLoggedCustomerId] = useState(() => {
    try {
      const saved = localStorage.getItem("loggedCustomerId");
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem("loggedCustomerId");
      return null;
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
const [categorizedProduct, setCategorizedProduct] = useState(() => {
  try {
    const saved = localStorage.getItem("categorizedProduct");
    return saved ? JSON.parse(saved) : [];
  } catch {
    localStorage.removeItem("categorizedProduct");
    return [];
  }
});
  const [productListFromShopify, setProductListFromShopify] = useState(() => {
    const saved = localStorage.getItem("productListFromShopify");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const updateCartItemQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.variantId === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };
  const addToCart = (product) => {
    setCartItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const existing = safePrev.find(
        (item) => item.variantId === product.variantId,
      );

      if (existing) {
        return safePrev.map((item) =>
          item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...safePrev, { ...product, quantity: 1 }];
    });
  };
  useEffect(() => {
    if (trendingProduct.length > 0) {
      localStorage.setItem("trendingProduct", JSON.stringify(trendingProduct));
    }
  }, [trendingProduct]);

  useEffect(() => {
    if (loggedCustomerId && typeof loggedCustomerId === "object") {
      localStorage.setItem(
        "loggedCustomerId",
        JSON.stringify(loggedCustomerId),
      );
    }
  }, [loggedCustomerId]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const colorAssets = {
    Gold: gold_ellipse,
    Silver: silver_ellipse,
    RoseGold: brown_ellipse,
  };
  const removeFromCart = (variantId) => {
    setCartItems((prev) =>
      prev.filter((item) => item?.variantId !== variantId),
    );
  };
  const clearCart = () => setCartItems([]);
  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId,
      );
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (variantId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item?.productId !== variantId),
    );
  };
  const clearWishlist = () => setWishlistItems([]);

  const addToRecentlyViewed = (product) => {
  if (!product?.productId) return;

  setRecentlyViewed(prev => {
    const filtered = prev.filter(
      p => p.productId !== product.productId
    );
    const updated = [product, ...filtered].slice(0, 8);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    return updated;
  });
};
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem("recentlyViewed");
  };
useEffect(() => {
  if (Array.isArray(categorizedProduct) && categorizedProduct.length > 0) {
    localStorage.setItem(
      "categorizedProduct",
      JSON.stringify(categorizedProduct)
    );
  }
}, [categorizedProduct]);

  useEffect(() => {
    if (productListFromShopify && productListFromShopify.length > 0) {
      localStorage.setItem(
        "productListFromShopify",
        JSON.stringify(productListFromShopify),
      );
    }
  }, [productListFromShopify]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  useEffect(() => {
    if (collection && collection.length > 0) {
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }, [collection]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) setRecentlyViewed(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  return (
    <AppContext.Provider
      value={{
        productListFromShopify,
        setProductListFromShopify,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        filteredProducts,
        setFilteredProducts,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        updateCartItemQuantity,
        setRecentlyViewed,
        loggedCustomerId,
        setLoggedCustomerId,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        collection,
        setCollections,
        categorizedProduct,
        setCategorizedProduct,
        deliveryDate,
        setdeliveryDate,
        clearRecentlyViewed,
        trendingProduct,
        setTrendingProduct,
        pincodeDetails,
        setPincodeDetails,
        colorAssets,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppProvider;
AppProvider.propTypes = {
  children: PropTypes.node,
};

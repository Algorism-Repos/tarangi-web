import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const[trendingProduct,setTrendingProduct]=useState()
  const [collection, setCollections] = useState(() => {
    const saved = localStorage.getItem("collection");
    return saved ? JSON.parse(saved) : [];
  });
  const [deliveryDate, setdeliveryDate] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loggedCustomerId, setLoggedCustomerId] = useState(() => {
    return localStorage.getItem("loggedCustomerId") || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
const [categorizedProduct, setCategorizedProduct] = useState(() => {
  const saved = localStorage.getItem("categorizedProduct");
  return saved ? JSON.parse(saved) : null;
});

  useEffect(() => {
    if (loggedCustomerId) {
      localStorage.setItem("loggedCustomerId", loggedCustomerId);
    }
  }, [loggedCustomerId]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

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

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  const updateCartItemQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };
  useEffect(() => {
    if (categorizedProduct !== null) {
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
        JSON.stringify(productListFromShopify)
      );
    }
  }, [productListFromShopify]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  useEffect(() => {
    if (collection && collection.length > 0) {
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }, [collection]);

  const addToCart = (product) => {
    console.log(product)
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.variantId === product.variantId
      );

      if (existing) {
        return prev.map((item) =>
          item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };
  const removeFromCart = (variantId) => {
    setCartItems((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setCartItems([]);

  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromWishlist = (variantId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.variantId !== variantId)
    );
  };

  const clearWishlist = () => setWishlistItems([]);

const addToRecentlyViewed = (product) => {
  setRecentlyViewed((prev) => {
    const safePrev = Array.isArray(prev) ? prev : [];
    const filtered = safePrev.filter(
      (item) => item.variantId !== product.variantId
    );
    const updated = [product, ...filtered].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));

    return updated;
  });
};

const clearRecentlyViewed = () => {
  setRecentlyViewed([]);
  localStorage.removeItem("recentlyViewed");
};
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
        trendingProduct,setTrendingProduct
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

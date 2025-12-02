import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [collection, setCollections] = useState(false);
  const [allproduct, setallproduct] = useState();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loggedCustomerId, setLoggedCustomerId] = useState(() => {
    return localStorage.getItem("loggedCustomerId") || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
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
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === product.color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; // avoid duplicates
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => setWishlistItems([]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      // Avoid duplicates
      const filtered = prev.filter((item) => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10); // keep last 10
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return updated;
    });
  };

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
        allproduct, setallproduct
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

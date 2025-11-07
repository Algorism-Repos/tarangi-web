import { Link } from "react-router";
// Image
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Filled_LikeIcon from "../assets/Products/Filled_likeIcon.png";
import LikeIcon from "../assets/Products/Unfilled_likeIcon.png";

function Product_Listing({ productCatergory }) {
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState([]); // ✅ start empty

  const toggle = (product) => {
    setModalToggle(!modalToggle);
    setSelectedType(product);
  };

  // ✅ Update products once productCatergory is loaded
  useEffect(() => {
    if (productCatergory && productCatergory.length > 0) {
      setProducts(productCatergory.map((item) => ({ ...item, liked: false })));
    }
  }, [productCatergory]);

  const toggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const ScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };



  if (products.length === 0) {
    return (
      <p className="text-center w-full text-[18px] font-poppins text-[#747474]">
        No products found
      </p>
    );
  }

  return (
    <>
      <div
        className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-10 sm:gap-x-[30px] px-3.5"
        onClick={ScrollToTop}
      >
        {products.map((item) => {
          const isOutOfStock = item.variants[0].inventory_quantity === 0;

          return (
            <Link
              key={item.id}
              to="/productdescription"
              state={{ product: item }}
              className="font-poppins w-[170px] sm:w-[310px] mx-auto relative group"
            >
              <img
                className={`w-full h-fit object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg rounded-[16px] ${
                  isOutOfStock ? "opacity-60" : ""
                }`}
                src={item?.image?.src}
                alt={item?.alt || item?.title}
              />

              {/*  Like Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleLike(item.id);
                }}
                className="absolute right-3 top-3 w-[40px] h-[40px] opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out focus:outline-none"
              >
                <img
                  src={item.liked ? Filled_LikeIcon : LikeIcon}
                  alt={item.liked ? "Liked" : "Unliked"}
                  className="w-full h-full transition-transform duration-200 hover:scale-110"
                />
              </button>

              <div className="mt-2 flex justify-between sm:mt-4">
                <div>
                  <h3 className="text-[16px] font-semibold sm:text-[20px]">
                    ₹{parseInt(item.variants[0].price).toLocaleString("en-IN")}
                  </h3>
                  <p className="text-[14px] font-semibold text-[#6F6F6F] sm:text-[14px]">
                    {item?.title}
                  </p>
                </div>

                {isOutOfStock && (
                  <p className="text-primary font-semibold text-[14px] md:text-[20px]">
                    Sold Out
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* <Modal modal={modalToggle} active={toggle} productName={selectedType} /> */}
    </>
  );
}

export default Product_Listing;

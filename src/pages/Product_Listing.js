import { Link } from "react-router";
// Image
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

import LikeButton from "../components/LikeButton";

function Product_Listing({ productCatergory }) {
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState([]); // ✅ start empty

  const toggle = (product) => {
    setModalToggle(!modalToggle);
    setSelectedType(product);
  };

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
        className="w-full  mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-10 sm:gap-x-[30px] px-1.5"
        onClick={ScrollToTop}
      >
        {products.map((item) => {
          const isOutOfStock = item.variants[0].inventory_quantity === 0;

          return (
            
            <Link
              to="/productdescription"
              state={{ product: item }}
              className="font-poppins w-[170px] sm:w-[310px] mx-auto  relative hover:scale-105 transition duration-300 ease-in-out group "
            >
              <img
                className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${
                  item.variants[0].inventory_quantity === 0 ? "grayscale" : ""
                }`}
                src={item?.image?.src}
                alt={item?.alt || item?.title}
              />
              <LikeButton
                liked={item.liked}
                isOutOfStock={isOutOfStock}
                onToggle={() => toggleLike(item.id)}
              />

              {isOutOfStock && (
                <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                  Sold Out
                </p>
              )}

              <div className="mt-2 fle flex-wrap gap-2 justify-between sm:mt-3">
                <div>
                  <h1 className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">{item?.title}</h1>

                  {/* <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[17px] mt-1">
                    ₹{parseInt(item.variants[0].price).toLocaleString("en-IN")}
                  </h3> */}
                  {/* <p className="text-[11px] font-medium text-[#6F6F6F] sm:text-[14px]">
                    {item?.title}
                  </p> */}
                </div>
                {item.variants[0].inventory_quantity === 0 && (
                  <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                    Sold Out
                  </p>
                )}

                <div className="mt-1.5 flex items-center justify-between">

                  {/* <p className="text-[15px] text-[#6F6F6F]">Colors Available</p> */}
                  
                  <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                    ₹{parseInt(item.variants[0].price).toLocaleString("en-IN")}
                  </h3>

                  <div className="flex justify-center gap-x-2.5 mr-1">
                    <img
                      className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                      src={gold_ellipse}
                      alt="gold ellipse"
                    />
                    <img
                      className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                      src={silver_ellipse}
                      alt="Silver ellipse"
                    />
                    <img
                      className=" w-[20px] sm:w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                      src={brown_ellipse}
                      alt="brown ellipse"
                    />
                  </div>
                </div>
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

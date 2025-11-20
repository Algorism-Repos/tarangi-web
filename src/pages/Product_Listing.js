import { Link } from "react-router";
// Image
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { useEffect, useState } from "react";
import OutOfStockModal from "../components/OutOfStockModal";
import LikeButton from "../components/LikeButton";

function Product_Listing({ productCatergory }) {
  const [products, setProducts] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  //  Add default selectedColor for every product
  useEffect(() => {
    if (productCatergory && productCatergory.length > 0) {
      setProducts(
        productCatergory.map((item) => ({
          ...item,
          liked: false,
          selectedColor: "gold", // default
        }))
      );
    }
  }, [productCatergory]);

  //  Like button toggle
  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  //  Color change handler
  const handleColorChange = (id, color) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, selectedColor: color } : product
      )
    );
  };

  const handleOutOfStockClick = () => {
    setShowOutStockModal(true);
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
      <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-10 sm:gap-x-[30px] px-1.5 ">

        {products.map((item) => {
          const isOutOfStock = item.variants[0].inventory_quantity === 0;

          const colorImages = {
            gold: item.image?.src,
            silver: item.image?.src,
            brown: item.image?.src,
          };

          return (
            <Link
              key={item.id}
              to={!isOutOfStock ? "/productdescription" : "#"}
              state={!isOutOfStock ? { product: item } : {}}
              onClick={isOutOfStock ? handleOutOfStockClick : undefined}
              className="font-poppins w-[170px] sm:w-[310px] mx-auto relative hover:scale-105 transition duration-300 ease-in-out group"
            >
              {/* MAIN PRODUCT IMAGE */}
              <img
                className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "grayscale" : ""
                  }`}
                src={colorImages[item.selectedColor]}
                alt={item?.title}
              />

              {/*  Like Button */}
              <LikeButton
                liked={item.liked}
                isOutOfStock={isOutOfStock}
                onToggle={() => toggleLike(item.id)}
              />

              {/* SOLD OUT LABEL */}
              {isOutOfStock && (
                <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                  Sold Out
                </p>
              )}

              {/* PRODUCT DETAILS */}
              <div className="mt-2 flex flex-wrap gap-2 justify-between sm:mt-3">
                <div>
                  <h1 className="text-[13px] font-semibold sm:text-[18px] text-[#313131]">
                    {item?.title}
                  </h1>
                </div>

                <div className="mt-1.5 flex items-center justify-between w-full">
                  <h3 className="text-[13px] text-[#4E4E4E] font-medium sm:text-[18px] mt-1">
                    ₹{parseInt(item.variants[0].price).toLocaleString("en-IN")}
                  </h3>

                  {/* 🎨 COLOR TOGGLE BUTTONS */}
                  <div className="flex justify-center gap-x-2.5 mr-1">

                    {/* GOLD */}
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        handleColorChange(item.id, "gold");
                      }}
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all ${item.selectedColor === "gold"
                          ? "border-2 border-[#D4AF37]"
                          : "border border-primary"
                        }`}
                      src={gold_ellipse}
                      alt="gold ellipse"
                    />

                    {/* SILVER */}
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        handleColorChange(item.id, "silver");
                      }}
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all ${item.selectedColor === "silver"
                          ? "border-2 border-gray-400"
                          : "border border-primary"
                        }`}
                      src={silver_ellipse}
                      alt="silver ellipse"
                    />

                    {/* BROWN */}
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        handleColorChange(item.id, "brown");
                      }}
                      className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all ${item.selectedColor === "brown"
                          ? "border-2 border-[#8B4513]"
                          : "border border-primary"
                        }`}
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

      {/* OUT OF STOCK MODAL */}
      <OutOfStockModal
        open={showOutStockModal}
        onClose={() => setShowOutStockModal(false)}
      />
    </>
  );
}

export default Product_Listing;

import { Link } from "react-router";
// Image
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import { useEffect, useState } from "react";
import OutOfStockModal from "../components/OutOfStockModal";
import LikeButton from "../components/LikeButton";
import RestockModal from "../components/RestockModal";
import RestockSuccessModal from "../components/RestockSuccessModal";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";

const ELLIPSE_BY_COLOR = {
  gold: gold_ellipse,
  silver: silver_ellipse,
  brown: brown_ellipse,
};

const IMAGE_BY_COLOR = (item) => ({
  gold: item.image?.src, // gold = main image
  silver: product_1,
  brown: product_2,
});

function Product_Listing({ productCatergory }) {
  const [products, setProducts] = useState([]);
  const [showOutStockModal, setShowOutStockModal] = useState(false);
  const [showRestockSuccess, setShowRestockSuccess] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { loading, setLoading } = useContext(AppContext);
  // after form success
  const handleSuccess = () => {
    setShowRestockModal(false);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (productCatergory) {
      setProducts(productCatergory);
      setLoading(false);
    }
  }, [productCatergory])

  console.log(products);



  //  useEffect(() => {
  //   if (productCatergory && productCatergory.length > 0) {
  //     const prepared = productCatergory.map((item) => {
  //       const colorsFromData =
  //         Array.isArray(item.colors) && item.colors.length > 0
  //           ? item.colors
  //           : ["gold", "silver", "brown"];

  //       return {
  //         ...item,
  //         liked: false,
  //         colors: colorsFromData,
  //         selectedColor: colorsFromData[0],
  //       };
  //     });

  //     setProducts(prepared);
  //     setLoading(false);
  //   } else {
  //     setProducts([]);
  //     setLoading(false);
  //   }
  // }, [productCatergory]);




  //Extracting colors into an array from the variants
  const colorAssets = [
    {
      value: "Gold",
      imgUrl: gold_ellipse,
    },
    {
      value: "Silver",
      imgUrl: silver_ellipse,
    },
    {
      value: "RoseGold",
      imgUrl: brown_ellipse,
    },
  ];

  //Organising the colors that are available for the product
  const variantColors = products?.map(element => element?.variants?.map(item => item.colorVariant));
  console.log(variantColors);
  // const availableColors = colorAssets.filter(element => variantColors?.includes(element.value))
  const availableColors = variantColors.map(color => colorAssets.find(asset => asset.value == color)).filter(Boolean);
  console.log(availableColors);


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
      prev.map((product) => {
        if (product.id !== id) return product;
        if (!product.colors?.includes(color)) return product;
        return { ...product, selectedColor: color };
      })
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOutOfStockClick = () => {
    setShowOutStockModal(true);
  };

  const handleRestockClick = () => {
    setShowRestockModal(true);
  };
  if (loading) {
    return <LoadingScreen />;
  }


  if (products.length === 0) {
    return (
      <>
        <p className="text-center w-full text-[18px] font-poppins text-[#747474]">
          No products found
        </p>

        <RestockModal
          open={showRestockModal}
          onClose={() => setShowRestockModal(false)}
          onSuccess={() => {
            setShowRestockModal(false);
            setShowRestockSuccess(true);
          }}
        />

        <RestockSuccessModal
          open={showRestockSuccess}
          onClose={() => setShowRestockSuccess(false)}
        />
      </>
    );
  }



  return (
    <>
      <div className="w-full mx-auto h-fit grid grid-cols-2 xl:grid-cols-3 gap-y-10 sm:gap-x-[30px] px-1.5 ">
        {products.map((item) => {
          // const isOutOfStock = item.variants[0].inventory_quantity === 0;
          const isOutOfStock = "";
          const isRestocking = item.restock === true;

          const colorImages = IMAGE_BY_COLOR(item);

          return (
            <Link
              key={item.id}
              to={
                !isOutOfStock && !isRestocking
                  ? `/product_description/${item.title.replace(/\s+/g, "-")}`
                  : "#"
              }
              state={!isOutOfStock && !isRestocking ? { product: item } : {}}
              onClick={
                isOutOfStock
                  ? handleOutOfStockClick
                  : isRestocking
                    ? handleRestockClick
                    : undefined
              }
              className="font-poppins w-[170px] sm:w-[310px] mx-auto relative hover:scale-105 transition duration-300 ease-in-out group"
            >
              {/* MAIN PRODUCT IMAGE */}
              <img
                className={`w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[16px] object-cover ${isOutOfStock ? "grayscale" : ""
                  } ${isRestocking ? "backdrop-blur-xs bg-black/50" : ""}`}
                src={
                  (item.selectedColor && colorImages[item.selectedColor]) ||
                  item.image ||
                  item.variants?.[0]?.image
                }
                alt={item?.title}
              />

              {/*  Like Button */}
              <LikeButton
                liked={item.liked}
                isOutOfStock={isOutOfStock}
                isRestocking={isRestocking}
                onToggle={() => toggleLike(item.id)}
              />

              {/* SOLD OUT LABEL */}
              {isOutOfStock && (
                <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                  Sold Out
                </p>
              )}

              {/* RESTOCK SOON LABEL */}
              {!isOutOfStock && isRestocking && (
                <p className="bg-[#FFF5E8] text-[#404040] font-semibold text-[11px] md:text-[15px] px-4 py-1.5 rounded-full absolute right-2.5 top-2.5">
                  Restocking Soon
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
                    ₹
                    {(item?.price
                      ? parseInt(item.price)
                      : parseInt(item?.variants?.[0]?.price)
                    )?.toLocaleString("en-IN")}
                  </h3>

                  {/*  COLOR TOGGLE BUTTONS */}
                  {/* <div className="flex justify-center gap-x-2.5 mr-1">
                    {item.variants?.map((color) => (
                      <img
                        key={color}
                        onClick={(e) => {
                          e.preventDefault();
                          // handleColorChange(item.id, color);
                        }}
                        className={`w-[20px] sm:w-[24px] bg-white rounded-full cursor-pointer transition-all ${
                          item.selectedColor === color
                            ? "border-[3px] border-primary shadow-md"
                            : "border border-gray-300 hover:border-primary"
                        }`}
                        src={ELLIPSE_BY_COLOR[color]}
                        alt={`${color} ellipse`}
                      />
                    ))}
                  </div> */}
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

      {/* Restock modal */}
      <RestockModal
        open={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        onSuccess={handleSuccess}
      />

      <RestockSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

export default Product_Listing;

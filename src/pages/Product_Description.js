import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useLocation } from "react-router";

// images
import grey_arrow from "../assets/Products/grey_arrow.png";
import product_1 from "../assets/Products/product_1.png";
import product_2 from "../assets/Products/product_2.png";
import gold_ellipse from "../assets/Products/gold_ellipse.png";
import silver_ellipse from "../assets/Products/silver_ellipse.png";
import brown_ellipse from "../assets/Products/brown_ellipse.png";
import favorie_icon from "../assets/Products/favorite_icon.png";
import favorie_icon_white from "../assets/Products/Unfilled_likeIcon.png";
import { AppContext } from "../context/AppContext";
import pure_silver from "../assets/pure_silver_icon.png";
import shipping from "../assets/shipping_icon.png";
import plating from "../assets/plating_icon.png";

// components
import PincodeInput from "../components/Pincode_Input";
import Recently_Viewed from "../components/Recently-Viewed";
import AddToCartButton from "../components/AddToCartButton";
import Wishlist_Popup from "../components/Wishlist_Popup";

function Product_Description() {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart, filteredProducts, addToWishlist, addToRecentlyViewed, categorizedProduct } = useContext(AppContext);

  const [colorSelected, setColorSelected] = useState("Gold");

  const swiperRef = useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [wishIconSrc, setWishIconSrc] = useState(favorie_icon);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const { allproduct } = useContext(AppContext)

  function formatVariants(product) {
    if (!product || !product.variants) return [];

    return product.variants.map((variant) => ({
      variant_id: variant.id,
      image: variant.image || product.image?.src || "",
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      inventory_quantity: variant.inventory_quantity,
      product_id: variant.product_id,
      color:
        variant.selected_options?.find((opt) => opt.name === "Color")?.value ||
        "",
      description: product.description || "",
    }));
  }


  // function formatVariants(product) {
  //   if (!product || !product.variants) return [];

  //   return product.variants.map((variant) => {
  //     const variantImages = [];

  //     if (variant.image) {
  //       variantImages.push(variant.image);
  //     }


  //     if (product.images && Array.isArray(product.images)) {
  //       product.images.forEach((img) => {
  //         if (img.src) variantImages.push(img.src);
  //       });
  //     }

  //     const uniqueImages = [...new Set(variantImages)];

  //     return {
  //       variant_id: variant.id,
  //       images: uniqueImages,
  //       price: variant.price,
  //       compareAtPrice: variant.compareAtPrice,
  //       inventory_quantity: variant.inventory_quantity,
  //       product_id: variant.product_id,
  //       color:
  //         variant.selected_options?.find((opt) => opt.name === "Color")?.value ||
  //         "",
  //       description: product.description || "",
  //     };
  //   });
  // }



  const formattedVariants = formatVariants(product);
  console.log(formattedVariants);

  const uniqueColors = [
    ...new Set(clean?.variants?.map((v) => v.selected_options[0]?.value)),
  ];

  const [selectedColor, setselectedColor] = useState(uniqueColors[0]);
  const handleColorChange = (color) => {
    const found = clean.variants.find(
      (v) => v.selected_options[0]?.value === color
    );

    if (found) {
      setActiveVariant(found);
    }
  };

  const handleAddToWish = (product) => {
    console.log(product)
    addToWishlist({
      id: product.variants[0].id,
      title: product.title,
      price: parseInt(product.variants[0].price),
      image: product.image.src,
    });
  };














  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);



  function normalizeProduct(raw) {
    return {
      admin_graphql_api_id: raw.admin_graphql_api_id,
      created_at: raw.created_at,
      description: raw.description,
      id: raw.id,
      image: raw.image,
      images: raw.images || [],
      liked: raw.liked || false,
      options: raw.options || [],
      product_type: raw.product_type,
      status: raw.status,
      tags: raw.tags || [],
      title: raw.title,
      updated_at: raw.updated_at || null,
      variants: (raw.variants || []).map((v) => ({
        id: v.id,
        product_id: v.product_id,
        title: v.title || "",
        price: v.price,
        position: v.position,
        image: v.image,
        inventory_quantity: v.inventory_quantity,
        selected_options: v.selected_options || [],
        created_at: v.created_at,
        updated_at: v.updated_at,
      })),
      vendor: raw.vendor,
    };
  }

  function formatVariants(product) {
    if (!product || !product.variants) return [];
    return product.variants.map(variant => ({
      variant_id: variant.id,
      image: variant.image || product.image?.src || "",
      title: product.title,
      product_type: product.product_type,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      inventory_quantity: variant.inventory_quantity,
      product_id: variant.product_id,
      color: variant.selected_options?.find(opt => opt.name === "Color")?.value || "",
      description: product.description || "",
    }));
  }
  const productDetails = formatVariants(product);
  console.log(productDetails);

  const activeVariant = productDetails.find(element => element.color === colorSelected) || productDetails?.[0];
  // console.log(activeVariant);

  // click on a color toggle
  function handleColorChange(color) {
    setColorSelected(color);
    const id = productDetails.indexOf(color);
    console.log(id);
  }

  const clean = normalizeProduct(product);

  //Extracting colors into an array from the variants
  const colorAssets = [
    {
      value: "Gold",
      imgUrl: gold_ellipse
    },
    {
      value: "Silver",
      imgUrl: silver_ellipse
    },
    {
      value: "RoseGold",
      imgUrl: brown_ellipse
    },
  ];

  const variantColors = productDetails.map(element => element.color)
  console.log(variantColors);
  const availableColors = colorAssets.filter(element => variantColors.includes(element.value))
  console.log(availableColors);

  console.log(`Selected Color: ${colorSelected}`);
  console.log(categorizedProduct);



  return (
    <>
      {/* Backgound */}
      <div className="bg-[#FFF5E8] font-poppins py-[30px] sm:py-[70px]">
        {/* Container */}
        <div className="max-w-7xl mx-auto px-5 sm:px-0">
          {/* Product path */}
          <div className="flex items-center justify-center gap-x-[8px] text-[#6F6F6F] text-[16px] xl:justify-start">
            <p>{productDetails?.[0]?.product_type}</p>
            <img
              className="w-[30px] h-[30px]"
              src={grey_arrow}
              alt="Arrow Icon"
            />
            <p> {productDetails?.[0]?.title}</p>
          </div>

          <div className="flex flex-wrap items-start justify-around my-[20px] sm:my-[40px] xl:my-[70px]">
            {/* Product Image */}
            <div className="max-w-[400px] lg:mt-20">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  const id = swiper.activeIndex
                  setColorSelected(productDetails?.[id].color);
                }}
                spaceBetween={0}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
              >

                {productDetails.map((item) => (
                  <SwiperSlide>
                    <img src={item.image} className="sm:w-[388px] sm:h-[399px] rounded-[18px]" />
                  </SwiperSlide>
                ))}

              </Swiper>


            </div>

            {/* Product Detail */}
            <div className="lg:min-w-[633px]">
              <div className="space-y-[3px]">
                <h1 className="font-atteron text-primary text-[26px] sm:text-[32px] tracking-[1px]">
                  {activeVariant?.title}
                </h1>
                <h2 className="text-[26px] font-semibold sm:text-[32px]">
                  ₹{parseInt(activeVariant?.price).toLocaleString("en-IN")}
                </h2 >
    <p className="text-[#878787] text-[14px] font-poppins ">
      <span class="underline">Tax included</span>. Shipping calculated at checkout
    </p>

              </div >
    <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
  {/* Description */ }
              <div>
                <h3 className="text-[#6F6F6F] text-[14px] font-medium">
                  Description
                </h3>
                <p className="text-[#484848] text-[16px] font-medium ">
                  {activeVariant?.description}
                </p>

                <div className="max-w-[305px] flex flex-wrap justify-between  font-[poppins] text-center text-[#313131] my-5">
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={pure_silver}
                      alt="pure silver icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      92.5
                      <br /> Pure Silver
                    </p>
                  </div>
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={shipping}
                      alt="shipping icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Pan India Shipping
                    </p>
                  </div>
                  <div className="max-w-[75px] ">
                    <img
                      className="w-[42px] h-[42px] mx-auto"
                      src={plating}
                      alt="plating icon"
                    />
                    <p className="text-[14px] font-semibold ">
                      Life long plating
                    </p>
                  </div>
                </div>
              </div>
              <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

  {/* Pincode */ }
  <div className="space-y-6 sm:space-y-3">
    <h3 className="text-[#6F6F6F] text-[14px] font-medium">
      Check estimated delivery date with Pincode
    </h3>

    <PincodeInput />

              
              </div >

    {/*Colors Available Section */ }
    < div className = { clean?.variants.length >= 1 ? "block" : "hidden" } >

      <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />

  {/* Color Icons */ }
                <h3 className="font-poppins font-medium text-[14px] leading-normal text-[#6F6F6F] mt-3">Colors Available</h3>
                <div className="flex flex-row items-center mt-1 gap-x-3">
                  {availableColors.map((item) => (
                    <img
                      className={colorSelected === item.value ? "w-[40px] sm:h-[40px] border-4 rounded-full border-primary cursor-pointer" : "w-[40px] sm:h-[40px] hover:border-4 rounded-full border-primary cursor-pointer"}
                      src={item.imgUrl}
                      alt={`image_${item.value}`}
                      onClick={() => { handleColorChange(item.value) }}

                    />
                  ))}
                </div>

                <hr className="border-[0.50px] border-t-[#D9D9D9] w-full my-[16px]" />
              </div >


    {/* Buttons */ }
    < div className = "max-w-[500px] " >
      <div className="flex flex-col w-full sm:flex-row items-center gap-[16px]">
        <AddToCartButton product={product} />
        <Link to="/favourites" state={{ product }}>
          <button
            className="flex items-center justify-center gap-x-[8px] border-2 border-[#4B001A] w-full h-[52px] rounded-full text-primary text-[16px] font-medium mt-2  transition-all duration-300 ease-in-out hover:bg-[#4B001A] hover:text-white"
            onMouseEnter={() => setWishIconSrc(favorie_icon_white)}
            onMouseLeave={() => setWishIconSrc(favorie_icon)}
            // onClick={() => setShowWishlistPopup(true)}
            onClick={handleAddToWish}

          >
            <img
              className="w-[32px] h-[32px]"
              src={wishIconSrc}
              alt="like_icon"
            />
            Add to Wishlist
          </button>
        </Link>
      </div>
              </div >
            </div >
          </div >
        </div >

    {/* Suggested products */ }
    < div className = "max-w-[1300px] mx-auto my-[60px] lg:my-[130px] px-4 sm:px-0" >
          <div>
            <h1 className="font-atteron text-primary text-[26px] text-center sm:text-[30px] xl:text-left">
              you may also like
            </h1>

            <div className="flex flex-wrap justify-between gap-x-[15px] gap-y-6 mt-[25px] px-2 sm:gap-x-[24px]">
              {/* {matchingProducts.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="font-poppins w-[170px] sm:w-[300px] mx-auto lg:mx-0"
                  >
                    <img
                      className="w-[173px] h-[174px] sm:w-[304px] sm:h-[307px] rounded-[24px]"
                      src={item?.image?.src}
                      alt={item?.alt || item?.title}
                    />

                    <div className="mt-2 flex flex-wrap items-center justify-between sm:mt-4">
                      <div>
                        <h3 className="text-[16px] font-semibold sm:text-[20px]">
                          ₹{parseInt(item.variants[0].price)}
                        </h3>
                        <p className="text-[14px] font-medium text-[#6F6F6F] sm:text-[14px]">
                          {item?.title}
                        </p>
                      </div>

                      <div className="hidden sm:block">
                        <div className="mt-1 flex justify-end gap-x-3">
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={gold_ellipse}
                            alt="gold ellipse"
                          />
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={silver_ellipse}
                            alt="Silver ellipse"
                          />
                          <img
                            className="w-[24px] bg-white rounded-full border-primary hover:border-2 hover:p-[2px]"
                            src={brown_ellipse}
                            alt="brown ellipse"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>

          <Recently_Viewed />
        </div >
      </div >

    <Wishlist_Popup
      show={showWishlistPopup}
      onClose={() => setShowWishlistPopup(false)}
    />
    </>
  );
}

export default Product_Description;

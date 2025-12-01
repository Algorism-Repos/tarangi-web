import React, { useContext, useEffect, useState } from "react";
import down_arrow_red from "../assets/Products/down_arrow_red.png";
import sort_icon from "../assets/Products/sort_icon.png";
import filter_icon from "../assets/Products/filter_icon.png";
import close_icon from "../assets/Products/close_icon.png";
import down_arrow from "../assets/Products/down_arrow.png";
import Product_Listing from "../pages/Product_Listing";
import { AppContext } from "../context/AppContext";
import { ref } from "yup";

function Product_Filter({ productCatergory }) {
  const [product, setProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortOption, setSortOption] = useState("Latest");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tab, setTab] = useState("productCatergory");
  const [selectedSort, setSelectedSort] = useState("Latest");

  const { productListFromShopify, filteredProducts, setFilteredProducts } =
    useContext(AppContext);

  const SortOptions = [
    "Latest",
    "Featured",
    "Price High to Low",
    "Price Low to High",
  ];

  const priceRanges = [
    { label: "₹10,000 – ₹15,000" },
    { label: "₹15,000 – ₹25,000" },
    { label: "₹25,000 – ₹35,000" },
    { label: "₹35,000 – ₹50,000" },
    { label: "₹50,000 – ₹75,000" },
    { label: "₹75,000 – ₹100,000" },
    { label: "₹100,000 – ₹125,000" },
  ];

  const Occasion = [
    { label: "Daily wear" },
    { label: "Wedding" },
    { label: "Office Attire" },
    { label: "Casual" },
    { label: "Festival" },
  ];

  const [showMore, setShowMore] = useState(false);
  const visibleItems = showMore ? priceRanges : priceRanges.slice(0, 5);

  const [showMoreCategory, setShowMoreCategory] = useState(false);
  const [showMorePrice, setShowMorePrice] = useState(false);

  const categories = Object.keys(productCatergory);

  const visibleCategories = showMoreCategory
    ? categories
    : categories.slice(0, 5);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const parsePriceRange = (label) => {
    const [min, max] = label
      .replace(/₹|,/g, "")
      .split("–")
      .map((p) => Number(p.trim()));
    return { min, max };
  };

  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    if (sortBy === "Latest") {
      sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "Price High to Low") {
      sorted.sort(
        (a, b) =>
          Number(b.variants?.[0]?.price) - Number(a.variants?.[0]?.price)
      );
    } else if (sortBy === "Price Low to High") {
      sorted.sort(
        (a, b) =>
          Number(a.variants?.[0]?.price) - Number(b.variants?.[0]?.price)
      );
    } else if (sortBy === "Featured") {
      // handle featured if needed
    }
    return sorted;
  };

  const handleFilterChange = (categories = [], prices = []) => {
    setSelectedCategories(categories);
    setSelectedPrices(prices);
    let filtered = productListFromShopify;

    if (categories.length > 0) {
      filtered = filtered.filter((p) =>
        categories.includes(p.product_type || "Uncategorized")
      );
    }
    if (prices.length > 0) {
      filtered = filtered.filter((p) => {
        const price = Number(p.variants?.[0]?.price);
        return prices.some((range) => price >= range.min && price <= range.max);
      });
    }

    filtered = sortProducts(filtered, sortOption);
    setFilteredProducts(filtered);
  };




  // 🔹 Unified sort selection logic (used by desktop + mobile)
  const handleSortSelection = (option) => {
    setSortOption(option);
    setSelectedSort(option);

    setFilteredProducts((prev) => {
      const base =
        Array.isArray(prev) && prev.length ? prev : productListFromShopify || [];
      return sortProducts(base, option);
    });

    setShowSort(false);
    document.body.style.overflow = "auto";
    ScrollToTop();
  };

  const handleCheckbox = (type, filterType) => {
    let updated;
    if (filterType === "category") {
      updated = selectedCategories.includes(type)
        ? selectedCategories.filter((c) => c !== type)
        : [...selectedCategories, type];
      setSelectedCategories(updated);
      handleFilterChange(updated, selectedPrices);
    } else if (filterType === "price") {
      const range = parsePriceRange(type);
      updated = selectedPrices.some(
        (p) => p.min === range.min && p.max === range.max
      )
        ? selectedPrices.filter(
          (p) => p.min !== range.min || p.max !== range.max
        )
        : [...selectedPrices, range];
      setSelectedPrices(updated);
      handleFilterChange(selectedCategories, updated);
    }
  };

  // Desktop dropdown uses this wrapper
  const handleSortChange = (option) => {
    handleSortSelection(option);
  };

  useEffect(() => {
    const sorted = sortProducts(productListFromShopify, sortOption);
    setFilteredProducts(sorted);
  }, [productListFromShopify, sortOption, setFilteredProducts]);

  const refreshpage = () => {
    window.location.reload(false);
  };

  const filterToggleCount = selectedCategories.length + selectedPrices.length;

  console.log(productCatergory);

  return (
    <>
      <div>
        {/* Women Collection & Sort  */}
        <div className="max-w-[1350px] mx-auto flex flex-wrap justify-between px-4">
          <div className="lg:flex flex-wrap items-center gap-x-[18px]">
            <h2 className="font-atteron text-[26px] text-primary tracking-[1px] sm:text-[36px]">
              Collections
            </h2>
            <p className="font-poppins text-font-grey text-[14px] sm:mt-3 sm:text-[16px]">
              180 Designs
            </p>
          </div>

          {/* Desktop Sort dropdown */}
          <div className="lg:flex items-center gap-4 bg-light-sandal p-4 rounded-md hidden">
            <label className="font-poppins text-font-grey text-[18px]">
              Sort by
            </label>

            <div className="relative">
              <select
                className="appearance-none border border-[#B9B9B9] rounded-md py-2.5 pl-3 w-[190px] bg-white text-font-grey text-[14px] cursor-pointer outline-none"
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {SortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-1 top-2.5 pointer-events-none">
                <img src={down_arrow} alt="Down Arrow" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">
          {/* Filter column  */}
          <div>
            {/* Laptop Filter */}
            <div className="w-[275px] font-poppins text-font-grey hidden lg:block pl-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-[16px] font-semibold uppercase">
                    Filters
                  </p>
                  {filterToggleCount > 0 && (
                    <span className="bg-[#D6A76F] text-white text-[13px] items-center justify-center font-medium px-3  w-[29px] h-[19px] rounded-full">
                      {filterToggleCount}
                    </span>
                  )}
                </div>
                <button
                  className="text-primary text-[16px] font-semibold uppercase focus:underline"
                  onClick={refreshpage}
                >
                  Clear All
                </button>
              </div>

              <hr className="border border-[#C8C8C8] my-[25px]" />

              {/* Price Filter */}
              <div>
                <h3 className="text-primary text-[20px] font-semibold">
                  Price Range
                </h3>

                <div className="mt-6 space-y-3">
                  {visibleItems.map((items, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-between text-font-grey cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {/* Checkbox */}
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckbox(items.label, "price")
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                        <span className="text-[18px]">{items.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Show More / Show Less Button */}
                {priceRanges.length > 5 && (
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="flex mt-4 cursor-pointer gap-x-[8px] items-center select-none"
                  >
                    <img
                      className={`w-[26px] transform transition-transform duration-300 ${showMore ? "rotate-180" : ""
                        }`}
                      src={down_arrow_red}
                      alt="toggle_arrow"
                    />
                    <p className="text-primary text-[16px] font-semibold">
                      {showMore ? "Show less" : "Show more"}
                    </p>
                  </div>
                )}

                <hr className="border border-[#C8C8C8] my-[25px]" />
              </div>

              {/* Product Catergory */}
              <div>
                <h3 className="text-primary text-[20px] font-semibold">
                  Product Category
                </h3>

                <div className="mt-6 space-y-3">
                  {visibleCategories.map((type) => (
                    <label
                      key={type}
                      className="flex items-center justify-between text-font-grey cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {/* Checkbox */}
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckbox(type, "category")}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <span className="text-[18px]">{type}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Show more / Show less button */}
                {categories.length > 5 && (
                  <div
                    className="flex mt-4 cursor-pointer gap-x-[8px]"
                    onClick={() => setShowMoreCategory(!showMoreCategory)}
                  >
                    <img
                      className={`w-[26px] transform transition-transform duration-300 ${showMoreCategory ? "rotate-180" : ""
                        }`}
                      src={down_arrow_red}
                      alt="toggle_arrow"
                    />
                    <p className="text-primary text-[16px] font-semibold">
                      {showMoreCategory ? "Show less" : "Show more"}
                    </p>
                  </div>
                )}

                <hr className="border border-[#C8C8C8] my-[25px]" />
              </div>

              {/* Occasion */}
              <div>
                <h3 className="text-primary text-[20px] font-semibold">
                  Occasion
                </h3>

                <div className="mt-6 space-y-3">
                  {Occasion.map((items) => (
                    <label
                      key={items.label}
                      className="flex items-center justify-between text-font-grey cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {/* Checkbox */}
                        <label className="custom-checkbox">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <span className="text-[18px]">{items.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <hr className="border border-[#C8C8C8] my-[25px]" />
              </div>
            </div>

            {/* Mobile Version Filter bar */}
            <div className="w-full bg-[#EBBB85] fixed font-poppins bottom-0 p-5 lg:hidden px-4 z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between ">
                {/* SORT BUTTON */}
                <div
                  className="group flex items-center gap-x-[8px] cursor-pointer"
                  onClick={() => {
                    setShowSort((prev) => {
                      const newState = !prev;

                      if (newState) {
                        // opening sort → close filter & lock scroll
                        setShowFilter(false);
                        setShowMoreCategory(false);
                        setShowMorePrice(false);
                        document.body.style.overflow = "hidden";
                      } else {
                        // closing
                        document.body.style.overflow = "auto";
                      }

                      return newState;
                    });
                  }}
                >
                  <img
                    className="w-[24px] h-[24px]"
                    src={sort_icon}
                    alt="Sort Icon"
                  />
                  <button className="text-primary text-[18px] font-semibold">
                    Sort
                  </button>
                </div>

                {/* FILTER BUTTON */}
                <div
                  className="group flex items-center gap-x-[8px] cursor-pointer"
                  onClick={() => {
                    setShowFilter((prev) => {
                      const newState = !prev;

                      if (newState) {
                        setShowSort(false);
                        setShowMoreCategory(false);
                        setShowMorePrice(false);
                        document.body.style.overflow = "hidden";
                      } else {
                        document.body.style.overflow = "auto";
                      }

                      return newState;
                    });
                  }}
                >
                  <img
                    className="w-[24px] h-[24px]"
                    src={filter_icon}
                    alt="Filter Icon"
                  />
                  <button className="text-primary text-[18px] font-semibold">
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Sort popup with bg-black/40 + blur overlay */}
            {showSort && (
              <div
                className="fixed inset-0 bg-black/40  z-50 flex items-end lg:hidden"
                onClick={() => {
                  setShowSort(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <div
                  className="font-poppins bg-light-sandal w-full h-fit p-7 rounded-t-[30px] transition-all duration-300 ease-in-out"
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                  <div className="flex flex-col space-y-[20px] text-[#747474] relative">
                    <div className="relative flex items-center justify-center mb-4">
                      <h2 className="text-center text-[18px] font-semibold text-[#434343]">
                        Sort Designs By
                      </h2>

                      <img
                        className="w-[25px] h-[25px] cursor-pointer absolute right-0"
                        src={close_icon}
                        alt="Close icon"
                        onClick={() => {
                          setShowSort(false);
                          setShowMoreCategory(false);
                          setShowMorePrice(false);
                          document.body.style.overflow = "auto";
                          ScrollToTop();
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleSortSelection("Latest")}
                      className={`text-left text-[16px] font-poppins cursor-pointer 
                        ${selectedSort === "Latest"
                          ? "text-[#6E0027] font-semibold"
                          : "text-[#6E6E6E]"
                        }`}
                    >
                      Latest
                    </button>

                    <button
                      onClick={() => handleSortSelection("Featured")}
                      className={`text-left text-[16px] font-poppins cursor-pointer 
                        ${selectedSort === "Featured"
                          ? "text-[#6E0027] font-semibold"
                          : "text-[#6E6E6E]"
                        }`}
                    >
                      Featured
                    </button>

                    <button
                      onClick={() => handleSortSelection("Price High to Low")}
                      className={`text-left text-[16px] font-poppins cursor-pointer 
                        ${selectedSort === "Price High to Low"
                          ? "text-[#6E0027] font-semibold"
                          : "text-[#6E6E6E]"
                        }`}
                    >
                      Price High to Low
                    </button>

                    <button
                      onClick={() => handleSortSelection("Price Low to High")}
                      className={`text-left text-[16px] font-poppins cursor-pointer 
                        ${selectedSort === "Price Low to High"
                          ? "text-[#6E0027] font-semibold"
                          : "text-[#6E6E6E]"
                        }`}
                    >
                      Price Low to High
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Filter popup */}
            {showFilter && (
              <div
                className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center lg:hidden"
                onClick={() => {
                  setShowFilter(false);
                  setShowMoreCategory(false);
                  setShowMorePrice(false);
                  document.body.style.overflow = "auto";
                }}
              >
                {/* CARD */}
                <div
                  className="font-poppins bg-light-sandal w-full h-fit rounded-md shadow-xl p-5 max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* HEADER */}
                  <div className="relative flex items-center justify-center mb-4">
                    <h2 className="text-[16px] font-semibold text-[#434343]">
                      Filter
                    </h2>

                    <img
                      className="w-[22px] h-[22px] cursor-pointer absolute right-0"
                      src={close_icon}
                      alt="Close icon"
                      onClick={() => {
                        setShowFilter(false);
                        setShowMoreCategory(false);
                        setShowMorePrice(false);
                        document.body.style.overflow = "auto";
                        ScrollToTop();
                      }}
                    />
                  </div>

                  {/* BODY */}
                  <div className="flex gap-x-8 mt-4">
                    {/* TABS LEFT */}
                    <div className="flex flex-col text-[14px] text-[#747474] w-[184px]">
                      {/* Category row + badge */}
                      <div className="flex items-center justify-between w-full mb-3">
                        <button
                          className={`text-left ${tab === "productCatergory"
                            ? "text-primary font-medium"
                            : ""
                            }`}
                          onClick={() => setTab("productCatergory")}
                        >
                          Product Category
                        </button>

                        {filterToggleCount > 0 && (
                          <span className="bg-[#D6A76F] text-white text-[11px] font-medium min-w-[20px] h-[20px] rounded-full flex items-center justify-center">
                            {filterToggleCount}
                          </span>
                        )}
                      </div>

                      <hr className="border border-t-[#D9D9D9] w-full mb-3" />

                      <button
                        className={`text-left mb-3 ${tab === "priceRange"
                          ? "text-primary font-medium"
                          : ""
                          }`}
                        onClick={() => setTab("priceRange")}
                      >
                        Price Range
                      </button>
                      <hr className="border border-t-[#D9D9D9] w-full mb-3" />

                      <button
                        className={`text-left mb-3 ${tab === "occasion" ? "text-primary font-medium" : ""
                          }`}
                        onClick={() => setTab("occasion")}
                      >
                        Occasion
                      </button>

                      <hr className="border border-t-[#D9D9D9] w-full mb-3" />

                      <button
                        className="text-primary text-[13px] font-medium uppercase text-left"
                        onClick={refreshpage}
                      >
                        Clear All
                      </button>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex-1">
                      {/* Category */}

                      {tab === "productCatergory" && (
                        <div>
                          <div className="space-y-4">
                            {Object.keys(productCatergory)
                              .slice(
                                0,
                                showMoreCategory ? Object.keys(productCatergory).length : 5
                              )
                              .map((type) => (
                                <label
                                  key={type}
                                  className="flex items-center justify-between text-font-grey cursor-pointer"
                                >
                                  <div className="flex items-center space-x-2">
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(type)}
                                        onChange={() => handleCheckbox(type, "category")}
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                    <span className="text-[15px]">{type}</span>
                                  </div>
                                </label>
                              ))}
                          </div>


                          {/* Show more/less button */}
                          {Object.keys(productCatergory).length > 5 && (
                            <div
                              className="flex mt-4 cursor-pointer gap-x-[8px] items-center"
                              onClick={() =>
                                setShowMoreCategory(!showMoreCategory)
                              }
                            >
                              <img
                                className={`w-[20px] transform transition-transform duration-300 ${showMoreCategory ? "rotate-180" : ""
                                  }`}
                                src={down_arrow_red}
                                alt="toggle_arrow"
                              />
                              <p className="text-primary text-[14px] font-medium">
                                {showMoreCategory ? "Show less" : "Show more"}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Price Filter */}
                      {tab === "priceRange" && (
                        <div>
                          <div className="space-y-4">
                            {priceRanges
                              .slice(0, showMorePrice ? priceRanges.length : 5)
                              .map((items) => {
                                const range = parsePriceRange(items.label);
                                const checked = selectedPrices.some(
                                  (p) => p.min === range.min && p.max === range.max
                                );

                                return (
                                  <label
                                    key={items.label}
                                    className="flex items-center justify-between text-font-grey cursor-pointer"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <label className="custom-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={() => handleCheckbox(items.label, "price")}
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="text-[14px]">{items.label}</span>
                                    </div>
                                  </label>
                                );
                              })}
                          </div>

                          {priceRanges.length > 5 && (
                            <div
                              className="flex mt-4 cursor-pointer gap-x-[8px] items-center"
                              onClick={() => setShowMorePrice(!showMorePrice)}
                            >
                              <img
                                className={`w-[20px] transform transition-transform duration-300 ${showMorePrice ? "rotate-180" : ""
                                  }`}
                                src={down_arrow_red}
                                alt="toggle_arrow"
                              />
                              <p className="text-primary text-[14px] font-medium">
                                {showMorePrice ? "Show less" : "Show more"}
                              </p>
                            </div>
                          )}
                        </div>
                      )}


                      {/* Occasion */}
                      {tab === "occasion" && (
                        <div className="space-y-4">
                          {Occasion.map((items) => (
                            <label
                              key={items.label}
                              className="flex items-center justify-between text-font-grey cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <label className="custom-checkbox ">
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                                <span className="text-[15px]">
                                  {items.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side: products */}
          <Product_Listing productCatergory={filteredProducts} />
        </div>
      </div >
    </>
  );
}

export default Product_Filter;

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
  const { productListFromShopify, filteredProducts, setFilteredProducts } =
    useContext(AppContext);
  const SortOptions = ["Price High to Low", "Price Low to High"];
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

  // Convert productCatergory object keys to array
  const categories = Object.keys(productCatergory);

  // Limit display to 5 unless "show more" is active
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

  const handleFilterChange = (categories = [], prices = []) => {
    setSelectedCategories(categories);
    setSelectedPrices(prices);
    let filtered = productListFromShopify;
    if (categories.length > 0) {
      filtered = filtered.filter((p) =>
        categories.includes(p.product_type || "Uncateg  orized")
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

  const [products, setProducts] = useState([]);

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
    }
    return sorted;
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const handleSortSelection = (option) => {
    setSortOption(option);

    // choose the array you want to sort:
    // If you want to sort currently filtered list:
    setFilteredProducts((prev) => {
      const base =
        Array.isArray(prev) && prev.length
          ? prev
          : productListFromShopify || [];
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
  const handleSortChange = (option) => {
    setSortOption(option);
    const sorted = sortProducts(filteredProducts, option);
    setFilteredProducts(sorted);
  };
  useEffect(() => {
    const sorted = sortProducts(productListFromShopify, sortOption);
    setFilteredProducts(sorted);
    // setFilteredProducts(product);
  }, [productListFromShopify, sortOption]);

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

          {/* Drop down */}
          <div className="lg:flex items-center gap-4 bg-light-sandal p-4 rounded-md hidden">
            <label className="font-poppins text-font-grey text-[18px]">
              Sort by
            </label>

            <div className="relative">
              <select
                className="appearance-none border border-[#B9B9B9] rounded-md py-2.5 pl-3 w-[155px] bg-white text-font-grey text-[14px] cursor-pointer outline-none"
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
          {/* Filter  */}
          <div>
            {/* Laptop Filter */}
            <div className="w-[275px] font-poppins text-font-grey hidden lg:block pl-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-[16px] font-semibold uppercase">Filters</p>
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
                      src={showMore ? down_arrow_red : down_arrow_red}
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
                      src={showMore ? down_arrow_red : down_arrow_red}
                      alt="toggle_arrow"
                    />
                    <p className="text-primary text-[16px] font-semibold">
                      {showMoreCategory ? "Show less" : "Show more"}
                    </p>
                  </div>
                )}

                <hr className="border border-[#C8C8C8] my-[25px]" />
              </div>

              {/* occasion */}
              <div>
                <h3 className="text-primary text-[20px] font-semibold">
                  Occasion
                </h3>

                <div className="mt-6 space-y-3">
                  {Occasion.map((items) => (
                    <label className="flex items-center justify-between text-font-grey cursor-pointer">
                      <div className="flex items-center space-x-3">
                        {/* Checkbox */}
                        <label className="custom-checkbox">
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                        <span className="text-[18px]">{items.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <hr className="border border-[#C8C8C8] my-[25px]" />
              </div>
            </div>

            {/* Mobile Verion Filter */}
            <div className="w-full bg-[#EBBB85] fixed font-poppins bottom-0 p-5 lg:hidden px-4 z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between">
                {/* SORT BUTTON */}
                <div
                  className="group flex items-center gap-x-[8px] cursor-pointer"
                  onClick={() => {
                    setShowSort((prev) => {
                      const newState = !prev;

                      // 🔹 If Sort is opening → close Filter
                      if (newState) {
                        setShowFilter(false);
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
                        // Opening → close sort, lock scroll
                        setShowSort(false);
                        setShowMoreCategory(false); // reset category show more
                        setShowMorePrice(false);
                        document.body.style.overflow = "hidden";
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

            {/* Sort popup  */}
            <div
              className={
                showSort
                  ? "font-poppins bg-light-sandal w-full h-[302px] fixed inset-0 right-0 z-50 p-7 rounded-t-8 transition-all duration-300 ease-in-out lg:hidden"
                  : "hidden"
              }
            >
              <div className="flex flex-col space-y-[20px] text-[#747474]">
                <h2 className="text-center text-[18px] font-semibold text-[#434343]">
                  Sort Designs By
                </h2>

                <button
                  className="text-[16px] font-medium text-left focus:text-primary"
                  onClick={() => handleSortSelection("Latest")}
                >
                  Latest
                </button>

                <button
                  className="text-[16px] font-medium text-left focus:text-primary"
                  onClick={() => handleSortSelection("Featured")}
                >
                  Featured
                </button>

                <button
                  className="text-[16px] font-medium text-left focus:text-primary"
                  onClick={() => handleSortSelection("Price High to Low")}
                >
                  Price High to Low
                </button>

                <button
                  className="text-[16px] font-medium text-left focus:text-primary"
                  onClick={() => handleSortSelection("Price Low to High")}
                >
                  Price Low to High
                </button>
              </div>
            </div>

            {/* Filter popup */}
            <div
              className={
                showFilter === true
                  ? "font-poppins bg-light-sandal w-full h-[470px] fixed inset-0 right-0 z-50 p-6 overflow-y-scroll lg:hidden"
                  : "hidden"
              }
            >
              <div className="flex items-center justify-start gap-[16px]">
                <img
                  className="w-[22px] h-[22px] cursor-pointer"
                  src={close_icon}
                  alt="Close icon"
                  onClick={() => {
                    setShowFilter(false);
                    setShowMoreCategory(false); // reset category show more
                    setShowMorePrice(false);
                    document.body.style.overflow = "auto";
                    ScrollToTop();
                  }}
                />
                <h2 className="text-[16px] font-semibold text-center flex-col">
                  Filter
                </h2>
                {filterToggleCount > 0 && (
                  <span className="bg-[#D6A76F] text-white text-[13px] items-center justify-center font-medium px-3  w-[29px] h-[19px] rounded-full">
                    {filterToggleCount}
                  </span>
                )}
              </div>

              <div className="flex gap-x-16 justify-start mt-11  ">
                {/* Tabs */}
                <div className="flex flex-col items-start text-[14px] space-y-6 text-[#747474]">
                  <button
                    className={`${tab === "productCatergory"
                      ? "text-primary font-medium"
                      : ""
                      }`}
                    onClick={() => setTab("productCatergory")}
                  >
                    Category
                  </button>
                  <hr className="border border-t-[#D9D9D9] w-full " />
                  <button
                    className=" focus:text-primary"
                    onClick={() => setTab("priceRange")}
                  >
                    Price Range
                  </button>
                  <hr className="border border-t-[#D9D9D9] w-full" />
                  <button
                    className=" focus:text-primary "
                    onClick={() => setTab("occasion")}
                  >
                    Occasion
                  </button>
                  <hr className="border border-t-[#D9D9D9] w-full hidden" />
                  <button
                    className="text-primary text-[14px] font-medium uppercase "
                    onClick={refreshpage}
                  >
                    Clear All
                  </button>
                </div>

                {/* Category */}
                {tab === "productCatergory" && (
                  <div>
                    <div className="space-y-5">
                      {Object.keys(productCatergory)
                        .slice(
                          0,
                          showMoreCategory
                            ? Object.keys(productCatergory).length
                            : 5
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
                                  onChange={() =>
                                    handleCheckbox(type, "category")
                                  }
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
                        className="flex mt-4 cursor-pointer gap-x-[8px]"
                        onClick={() => setShowMoreCategory(!showMoreCategory)}
                      >
                        <img
                          className={`w-[26px] transform transition-transform duration-300 ${showMoreCategory ? "rotate-180" : ""
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
                    <div className="w-[170px] h-fit space-y-5 ">
                      {priceRanges
                        .slice(0, showMorePrice ? priceRanges.length : 5)
                        .map((items) => (
                          <label
                            key={items.label}
                            className="flex items-center justify-between text-font-grey cursor-pointer"
                          >
                            <div className="flex items-center space-x-2">
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckbox(items.label, "price")
                                  }
                                />
                                <span className="checkmark"></span>
                              </label>
                              <span className="text-[14px]">{items.label}</span>
                            </div>
                          </label>
                        ))}
                    </div>

                    {/* Show more/less button */}
                    {priceRanges.length > 5 && (
                      <div
                        className="flex mt-4 cursor-pointer gap-x-[8px]"
                        onClick={() => setShowMorePrice(!showMorePrice)}
                      >
                        <img
                          className={`w-[26px] transform transition-transform duration-300 ${showMorePrice ? "rotate-180" : ""
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
                  <div>
                    <div className="space-y-5">
                      {Occasion.map((items) => (
                        <label className="flex items-center justify-between text-font-grey cursor-pointer">
                          <div className="flex items-center space-x-2">
                            {/* Checkbox */}
                            <label className="custom-checkbox ">
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                            <span className="text-[15px]">{items.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*  */}
          <Product_Listing productCatergory={filteredProducts} />
        </div>
      </div>
    </>
  );
}

export default Product_Filter;

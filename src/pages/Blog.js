import React, { useState, useEffect } from "react";

// Images
import Search_icon from "../assets/search_icon_red.png";
import down_arrow from "../assets/Products/down_arrow.png";
import blog_1 from "../assets/blog_1.png";
import sort_icon from "../assets/Products/sort_icon.png";
import close_icon from "../assets/Products/close_icon.png"; // adjust path if needed

function Blog() {
  const SortOptions = ["Latest", "Featured", "Newest First", "Oldest First"];

  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Latest");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const blogData = [
    {
      src: blog_1,
      date: "Nov 11, 2025",
      heading: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi...",
    },
    {
      src: blog_1,
      date: "Nov 11, 2025",
      heading: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi...",
    },
    {
      src: blog_1,
      date: "Nov 11, 2025",
      heading: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi...",
    },
  ];

  return (
    <>
      {/* Banner */}
      <div className="relative blog-banner text-white">
        <h1 className="font-atteron text-[80px] font-normal mt-[150px] sm:mt-0 tracking-[1px]">Blogs</h1>
        {/* <p className="font-[poppins] text-[20px] mt-[20px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p> */}
      </div>

      {/* Main Section */}
      <div className="bg-light-sandal py-[75px] h-fit relative">
        {/* Search + Filters */}
        <div className="max-w-[1320px] mx-auto flex flex-col gap-10 md:flex-row md:items-center md:justify-between px-4 lg:gap-20">
          {/* Search (hidden for now on mobile & desktop) */}
          <div className="relative w-full md:flex-1 hidden">
            <input
              type="text"
              placeholder="Search for Products"
              className="w-full rounded-[12px] py-4 pl-4 pr-12 font-poppins text-[16px] placeholder:font-light placeholder:text-[#ABABAB] border border-[#B0B0B0] outline-none"
            />
            <img
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[32px] md:w-[42px]"
              src={Search_icon}
              alt="search icon"
            />
          </div>

          {/* Empty spacer for layout symmetry */}
          <div></div>

          {/* DESKTOP SORT */}
          <div className="relative flex items-center gap-4 hidden lg:flex">
            <label className="font-poppins text-font-grey text-[16px]">
              Sort by{" "}
            </label>

            <div className="relative">
              <select className="appearance-none border border-[#B9B9B9] rounded-md py-2.5 pl-3 pr-10 bg-white text-font-grey text-[14px] cursor-pointer outline-none">
                {SortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <img
                className="absolute right-2 top-1/2 -translate-y-1/2 w-[24px]"
                src={down_arrow}
                alt="Down Arrow"
              />
            </div>
          </div>
        </div>

        {/* MOBILE SORT BUTTON — FIXED FOOTER */}
        <div className="w-full bg-[#EBBB85] fixed font-poppins bottom-0 p-5 lg:hidden px-4 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between">
            <div
              className="group flex items-center gap-x-[8px] cursor-pointer"
              onClick={() => {
                setShowSort(true);
                document.body.style.overflow = "hidden";
              }}
            >
              <img className="w-[24px] h-[24px]" src={sort_icon} alt="Sort" />
              <button className="text-primary text-[18px] font-semibold">
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SORT POPUP – CARD FROM TOP */}
        {showSort && (
          <div
            className="fixed inset-0 bg-black/40  z-50 flex items-end lg:hidden"
            onClick={() => {
              setShowSort(false);
              document.body.style.overflow = "auto";
            }}
          >
            <div
              className="font-poppins bg-light-sandal w-full h-fit p-7 rounded-t-[30px] transition-all duration-300 ease-in-out shadow-xl "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative flex items-center justify-center mb-6">
                <h2 className="font-poppins text-[18px] font-semibold text-[#4A2B17]">
                  Sort Designs By
                </h2>

                <button
                  className="absolute right-0"
                  onClick={() => {
                    setShowSort(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  <img
                    src={close_icon}
                    alt="Close"
                    className="w-[22px] h-[22px]"
                  />
                </button>
              </div>

              {/* Sort Options */}
              <div className="flex flex-col gap-5">
                {SortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedSort(option);
                      setShowSort(false);
                      document.body.style.overflow = "auto";
                    }}
                    className={`text-left text-[16px] font-poppins cursor-pointer ${
                      selectedSort === option
                        ? "text-[#6E0027] font-semibold"
                        : "text-[#6E6E6E]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BLOG LIST */}
        <div className="max-w-[1320px] mx-auto px-4 my-[50px] flex flex-wrap gap-x-[15px] gap-y-[60px] justify-between">
          {blogData.map((items, i) => (
            <div key={i} className="max-w-[410px] mx-auto font-[poppins]">
              <img
                className="w-full object-cover rounded-[18px]"
                src={items.src}
                alt="Blog"
              />

              <p className="text-[#6E6E6E] text-[14px] mt-[24px]">
                {items.date}
              </p>
              <h1 className="text-[#404040] text-[24px] mt-2">
                {items.heading}
              </h1>
              <p className="text-[#6E0027] text-[16px]">
                {items.description}
              </p>
              <button className="text-[#6E0027] font-semibold mt-2">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;

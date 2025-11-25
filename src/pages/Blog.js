import React, { useEffect, useState } from "react";

// Images
import Search_icon from "../assets/search_icon_red.png";
import down_arrow from "../assets/Products/down_arrow.png";
import blog_1 from "../assets/blog_1.png";
import {
  FetchAllBlogsFromShopify,
  FetchBlogPosts,
} from "../handler/api Handler";
import { parseArticleBody } from "../utils/helper";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [allBlogData, setAllBlogData] = useState([]);
const [sortedBlogData, setSortedBlogData] = useState([]);
const [sortOption, setSortOption] = useState("Latest");
//  fetching blogs
  const Blogs = async () => {
    try {
      const response = await FetchAllBlogsFromShopify();
      console.log(response);
      setBlogs(response.blogs);
    } catch (error) {
      console.log(error);
    }
  };
//  fetching articles inside blogs
  const loadAllBlogArticles = async () => {
    if (!blogs.length) return;
    const blogIds = blogs.map((b) => b.id.replace("gid://shopify/Blog/", ""));
    const allData = [];
    for (const id of blogIds) {
      const articlesRes = await FetchBlogPosts(id);
      allData.push({
        blogId: id,
        blog: blogs.find((b) => b.id.includes(id)),
        articles: articlesRes.articles || [],
      });
    }
    setAllBlogData(allData);
  };
useEffect(() => {
  if (!allBlogData.length) return;
// All the articles in one array
  const extractedArticles = allBlogData.flatMap(item =>
    item.articles.map(article => ({
      ...article,
      blogId: item.blogId
    }))
  );
  // Sorting blog
  let sorted = [...extractedArticles];

  if (sortOption === "Latest") {
    sorted.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  else if (sortOption === "Oldest") {
    sorted.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  setSortedBlogData(sorted);
}, [allBlogData, sortOption]);
  console.log("allData", allBlogData);
  useEffect(() => {
    if (blogs.length > 0) {
      loadAllBlogArticles();
    }
  }, [blogs]);
  useEffect(() => {
    Blogs();
  }, []);

  const SortOptions = ["Latest", "Oldest"];
  return (
    <>
      {/* Banner */}
      <div className="blog-banner text-white">
        <h1 className="font-atteron text-[80px] font-normal ">Blog</h1>
        <p className="font-[poppins] text-[20px] mt-[20px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>

      {/* Blogs */}
      <div className="bg-light-sandal py-[75px]">
        {/* Search & Filters */}
        <div className="max-w-[1320px] mx-auto flex flex-col gap-10  md:flex-row md:items-center md:justify-between px-4 lg:gap-20">
          {/* Search */}
        

          {/* Filter */}
          <div className="relative flex items-center gap-4 md:gap-6 hidden lg:flex">
            <label className="font-poppins text-font-grey text-[14px] md:text-[16px]">
              Sort by
            </label>

            <div className="relative">
              <select
                className="appearance-none border border-[#B9B9B9] rounded-md py-2.5 pl-3 pr-10  bg-white text-font-grey text-[14px] cursor-pointer outline-none"
                onChange={(e) => setSortOption(e.target.value)}
              >
                {SortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <img
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[24px]"
                src={down_arrow}
                alt="Down Arrow"
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 my-[40px] flex flex-wrap gap-x-[15px] gap-y-[60px] justify-between">
      {sortedBlogData.map((article) => {
  const content = parseArticleBody(article.body);

                return (
                  <div className="max-w-[410px] mx-auto font-[poppins]">
                    <img className="w-[361px] h-fit sm:w-[414px] sm:h-[289px] object-cover rounded-[18px]"
                      src={article?.image?.src}
                      alt="Blog image"
                    />

                    <p className="text-[#6E6E6E] text-[14px] mt-[24px]">
                      {new Date(article.createdAt).toDateString()}
                    </p>
                    <h1 className="text-[#404040] text-[24px] mt-2">
                      {article.title}
                    </h1>
                    <h1 className="text-[#404040] text-[24px] mt-2">
                      {content.headings}
                    </h1>
                    <p className="text-[#6E0027] text-[16px]">
                      {content.paragraphs[0].slice(0, 120)}...
                    </p>
                    <button className="text-[#6E0027] font-semibold mt-2">
                      Read more
                    </button>
                  </div>
                );
              })
            }
        </div>
      </div>
    </>
  );
}

export default Blog;

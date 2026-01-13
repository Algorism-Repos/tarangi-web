
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

// Assets
import blogDescription_banner from "../assets/blog_description.png";
import ChevronIcon from "../assets/accordian_downarrow.png";
import ArrowLeft from "../assets/ArrowLeft_red.png";
import ArrowRight from "../assets/ArrowRight_red.png";

// Utils
import parse from "html-react-parser";

function Blog_Description() {
  const location = useLocation();
  const { blog, blogsList = [] } = location.state || {};   
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const currentIndex = blogsList.findIndex((b) => b.id === blog.id);
  const prevBlog = currentIndex > 0 ? blogsList[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsList.length - 1 ? blogsList[currentIndex + 1] : null;


  const splitContent = (html) => {
    const marker = "Frequently asked questions";
    const index = html.toLowerCase().indexOf(marker.toLowerCase());

    if (index === -1) {
      return { content: html, faq: null };
    }

    return {
      content: html.slice(0, index),
      faq: html.slice(index),
    };
  };

  const { content, faq } = splitContent(blog.body);


const extractFAQ = (faqHtml) => {
  if (!faqHtml) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(faqHtml, "text/html");

  const headings = [...doc.querySelectorAll("h4, h5")];

  return headings
    .map((heading) => {
      const question = heading.textContent.trim();

      //  Skip empty headings
      if (!question) return null;

      let answerHtml = "";
      let node = heading.nextElementSibling;

      // Collect answer until next heading
      while (node && !/^H\d$/.test(node.tagName)) {
        if (node.textContent.trim()) {
          answerHtml += node.outerHTML;
        }
        node = node.nextElementSibling;
      }

      //  Skip questions with no answer
      if (!answerHtml.trim()) return null;

      return {
        question,
        answer: answerHtml,
      };
    })
    .filter(Boolean);
};


  const faqData = extractFAQ(faq);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-light-sandal font-poppins px-5 py-[60px] sm:py-[120px]">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-[30px] sm:text-[42px] text-primary font-medium">
          {blog.title}
        </h1>
        <p className="text-[#6E6E6E] mt-1">
          {new Date(blog.createdAt).toDateString()}
        </p>
      </div>

      {/* IMAGE */}
      <div className="max-w-[1000px] mx-auto">
        <img
          src={blog?.image?.src}
          alt="Blog"
          className="w-full h-[200px] sm:h-[450px] object-cover my-[40px] sm:my-[80px]"
        />
      </div>

      {/* ARTICLE CONTENT */}
      <div className="max-w-[1000px] mx-auto blog-content text-[#595959] space-y-6">
        {parse(content)}
      </div>

      {/* FAQ SECTION */}
      {faqData.length > 0 && (
        <div className="max-w-[1000px] mx-auto mt-20">
          <h3 className="text-[22px] sm:text-[32px] text-[#8C2742] font-medium mb-8">
            FAQ about sterling silver jewelry
          </h3>

          {faqData.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`px-4 py-3 mb-5 rounded-[8px] border border-[#F3E4D1]
                ${isOpen ? "bg-[#F6E8D5]" : "bg-[#FFF5E8]"}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-[16px] sm:text-[20px] font-medium">
                    {item.question}
                  </span>
                  <img
                    src={ChevronIcon}
                    alt="toggle"
                    className={`w-6 h-6 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen
                      ? contentRefs.current[i]?.scrollHeight
                      : 0,
                  }}
                >
                  <div className="mt-3 text-[14px] sm:text-[18px] text-[#4B4B4B]">
                    {parse(item.answer)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div className="max-w-[1000px] mx-auto mt-20 flex justify-between items-center">
        {prevBlog ? (
          <Link to="/blogdescription" state={{ blog: prevBlog, blogsList }}>
            <button className="flex items-center gap-2 text-primary">
              <img src={ArrowLeft} alt="Prev" className="w-6" />
              Previous
            </button>
          </Link>
        ) : (
          <div />
        )}

        {nextBlog ? (
          <Link to="/blogdescription" state={{ blog: nextBlog, blogsList }}>
            <button className="flex items-center gap-2 text-primary">
              Next
              <img src={ArrowRight} alt="Next" className="w-6" />
            </button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Blog_Description;

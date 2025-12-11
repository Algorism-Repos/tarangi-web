import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

// image
import blogDescription_banner from "../assets/blog_description.png";
import ChevronIcon from "../assets/accordian_downarrow.png";
import ArrowLeft from "../assets/ArrowLeft_red.png";
import ArrowRight from "../assets/ArrowRight_red.png";
import { parseArticleBody } from "../utils/helper";
import parse from "html-react-parser";

function Blog_Description() {
  const location = useLocation();
  const { blog, blogsList = [] } = location.state || {};
  console.log(blog);
  //  FAQ data .

  const currentIndex = blogsList.findIndex((b) => b.id === blog.id);
  const [openIndex, setOpenIndex] = useState(null);

  // Calculate previous and next
  const prevBlog = currentIndex > 0 ? blogsList[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsList.length - 1 ? blogsList[currentIndex + 1] : null;
   
  function extractSections(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const sections = [];
    let current = null;

    [...doc.body.children].forEach((node) => {
      const tag = node.tagName;

      // Detect headings (h1–h6)
      if (/^H\d$/.test(tag)) {
        if (current) sections.push(current);

        current = {
          heading: node.textContent.trim(),
          paragraphs: [],
        };
        return;
      }

      if (
        tag === "P" &&
        node.querySelector("strong") &&
        node.textContent.trim().length < 70
      ) {
        if (current) sections.push(current);
        current = {
          heading: node.textContent.trim(),
          paragraphs: [],
        };
        return;
      }

      if (tag === "P" && current) {
        const txt = node.textContent.trim();
        if (txt) current.paragraphs.push(txt);
        return;
      }

      if (tag === "OL" && current) {
        const items = [...node.querySelectorAll("li")].map((li) =>
          li.textContent.trim()
        );
        current.paragraphs.push(...items);
        return;
      }
    });

    if (current) sections.push(current);
    return sections;
  }
    const sections = extractSections(blog.body);

const faqSections = sections.filter(
  (sec) =>
    sec.heading.toLowerCase().includes("faq") || /^\d+\./.test(sec.heading)
);
const faqData = faqSections.map((item) => ({
  q: item.heading,
  a: item.paragraphs.join("\n"), // join paragraphs into a single string
}));

  const contentRefs = useRef([]);
contentRefs.current = faqSections.map((_, i) => contentRefs.current[i] ?? null);
  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      void contentRefs.current[openIndex].scrollHeight;
    }
  }, [openIndex]);
  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  console.log(sections);
  console.log(blog);
// After you get 'sections' from extractSections(blog.body)


  return (
    <>
      <div className="bg-light-sandal font-poppins px-5 py-[50px] sm:py-[150px]">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-[30px] text-primary font-medium sm:text-[42px]">
            {blog.title}
          </h1>
          <p className="text-[#6E6E6E] mt-1">
            {" "}
            {new Date(blog.createdAt).toDateString()}
          </p>
        </div>

        {/* Loop data */}
        <div className="max-w-[1000px] mx-auto">
          <img
            className="w-full h-[200px] object-cover my-[40px] sm:h-[450px] sm:my-[80px]"
            src={blogDescription_banner}
            alt="Blog image"
          />

          <div className="max-w-[1286px] text-[#595959] space-y-[40px] mx-auto ">
            {sections?.map((item) => (
              <div className="font-[poppins] font-normal text-[16px] sm:text-[19px]">
                <h2 className="text-[#313131] font-medium text-[18px] mb-[8px] sm:text-[20px]">
                  {item.heading}
                </h2>
                <p className="text-[#595959] font-normal text-[16px] sm:text-[19px]">
                  {item.paragraphs}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion / FAQ */}
        <div className="max-w-[1000px] mx-auto mt-16">
          <h3 className="text-[22px] sm:text-[32px] text-[#8C2742] font-semibold mb-8">
            FAQ about sterling silver jewelry
          </h3>

          <div> {faqData.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className={`px-4 py-3 mb-5 rounded-[8px] border-[1px] border-[#F3E4D1] transition-colors duration-300 ${isOpen ? "bg-[#F6E8D5]" : "bg-[#FFF5E8]"} border-b border-[#F6E8D5]`}>
                <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`faq-content-${i}`} id={`faq-header-${i}`} className="w-full flex items-center justify-between gap-4 text-left focus:outline-none">
                  <div className="flex-1 gap-y-10">
                    <div className="text-[16px] sm:text-[20px] text-slate-800 font-medium">{`${i + 1}. ${item.q}`}
                    </div>
                  </div>

                  {/* Chevron Icon */}
                  <img src={ChevronIcon} alt="toggle" className={`w-[30px] h-[30px] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </button>

                {/* CONTENT */}
                <div id={`faq-content-${i}`} role="region" aria-labelledby={`faq-header-${i}`} className="overflow-hidden transition-[max-height] duration-300 ease-in-out" style={{ maxHeight: isOpen ? `${contentRefs.current[i]?.scrollHeight || 999}px` : "0px", }} >
                  <div ref={(el) => (contentRefs.current[i] = el)} className="mt-3 mb-2 text-[14px] sm:text-[18px] text-[#4B4B4B] bg-[#F6E8D5] p-4 rounded-md">{item.a} </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Bottom Navigation */}

        <div className="max-w-[1000px] bg-[#FFF5E8]  mt-20 sm:mt-32  mx-auto flex items-center justify-between ">
          {/* Previous Button */}

          {prevBlog ? (
            <Link to="/blogdescription" state={{ blog: prevBlog, blogsList }}>
              <button className="flex items-center gap-2 font-poppins text-primary text-[16px] font-normal">
                <img
                  src={ArrowLeft}
                  alt="Previous"
                  className="w-[30px] h-[30px]"
                />
                Previous
              </button>
            </Link>
          ) : (
            <div />
          )}
          {/* Back to Home */}
          <Link to="/home">
            <button className="text-primary items-center mt-2 font-poppins text-[16px] font-normal hidden md:block">
              Back to Home
            </button>
          </Link>

          {/* Next Button */}
          {nextBlog ? (
            <Link to="/blogdescription" state={{ blog: nextBlog, blogsList }}>
              <button className="flex items-center gap-2 font-poppins text-primary text-[16px] font-normal">
                Go to Next
                <img
                  src={ArrowRight}
                  alt="Next"
                  className="w-[30px] h-[30px]"
                />
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
      {/* })} */}

    {/* Accordian */ }
    < div className = "max-w-[1000px] mx-auto mt-20" >
        <h3 className="text-[22px] sm:text-[32px] text-[#8C2742] font-medium mb-8">
          FAQ about sterling silver jewelry
        </h3>
        <div>
          {" "}
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`px-4 py-3 mb-5 rounded-[8px] border-[1px] border-[#F3E4D1] transition-colors duration-300 ${isOpen ? "bg-[#F6E8D5]" : "bg-[#FFF5E8]"
                  } border-b border-[#F6E8D5]`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${i}`}
                  id={`faq-header-${i}`}
                  className="w-full flex items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <div className="flex-1 gap-y-10">
                    <div className="text-[16px] sm:text-[20px] text-slate-800 font-medium">
                      {`${i + 1}. ${item.q}`}
                    </div>
                  </div>
                  {/* Chevron Icon */}
                  <img
                    src={ChevronIcon}
                    alt="toggle"
                    className={`w-[30px] h-[30px] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>
                {/* CONTENT */}
                <div
                  id={`faq-content-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[i]?.scrollHeight || 999}px`
                      : "0px",
                  }}
                >
                  <div
                    ref={(el) => (contentRefs.current[i] = el)}
                    className="mt-3 mb-2 text-[14px] sm:text-[18px] text-[#4B4B4B] bg-[#F6E8D5] p-4 rounded-md"
                  >
                    {item.a}{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div >

    {/* Bottom Navigation */ }
    < div className = "max-w-[1000px] bg-[#FFF5E8]  mt-20 sm:mt-32  mx-auto flex items-center justify-between " >
      {/* Previous Button */ }
      < button className = "flex items-center gap-2 font-poppins text-primary text-[16px] font-normal" >
        <img src={ArrowLeft} alt="Previous" className="w-[30px] h-[30px]" />
  Previous
        </button >
    {/* Back to Home */ }
    < Link to = "/home" >
      <button className="text-primary items-center mt-2 font-poppins text-[16px] font-normal hidden md:block">
        Back to Home
      </button>
        </Link >
    {/* Next Button */ }
    < button className = "flex items-center gap-2 font-poppins text-primary text-[16px] font-normal" >
      Go to Next
        < img src = { ArrowRight } alt = "Next" className = "w-[30px] h-[30px]" />
        </button >
      </div >
    </>
  );
}

export default Blog_Description;

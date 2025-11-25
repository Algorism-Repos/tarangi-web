export function parseArticleBody(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const result = {
    headings: [],
    paragraphs: []
  };

  wrapper.querySelectorAll("h1, h2, h3, h4").forEach((h) => {
    result.headings.push(h.innerText.trim());
  });

  wrapper.querySelectorAll("p").forEach((p) => {
    result.paragraphs.push(p.innerText.trim());
  });

  return result;
}

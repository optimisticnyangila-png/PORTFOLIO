import { useEffect } from "react";

export default function SEO() {
  useEffect(() => {
    document.title = "Kevine Nyangila | Full Stack Developer";
    const description =
      "Modern portfolio of Kevine Nyangila featuring projects, skills, and experience.";
    const ensureMeta = (name, content, attr = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    ensureMeta("description", description);
    ensureMeta("og:title", "Kevine Nyangila Portfolio", "property");
    ensureMeta("og:description", description, "property");
  }, []);
  return null;
}

import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import TagPage from "./pages/TagPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [setParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = setSearchParams.get("page") ?? 1;

    if (location.pathname.includes("tags")) {
      //iska matlab tag wala page show karna hai
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    } else if (location.pathname.includes("categories")) {
      //iska matlab category wala page show karna hai
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    } else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
    </Routes>
  );
}

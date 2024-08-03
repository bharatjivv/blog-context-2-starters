import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";
import { baseUrl } from "../baseUrl";

const BlogPage = () => {
  const [Blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigation();
  const [setLoading, loading] = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${baseUrl}?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch (error) {
      console.log("Error in BlogID");
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div>
        <button onClick={() => navigation(-1)}>Back</button>
      </div>
      {loading ? (
        <p> Loading </p>
      ) : blog ? (
        <div>
          {" "}
          <BlogDetails post={blog} />
          <h2> Related Blogs </h2>
          {relatedBlogs.map((post) => {
            <div key={post.id}>
              <BlogDetails post={post} />
            </div>;
          })}
        </div>
      ) : (
        <div>
          <p> No Blog Found </p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

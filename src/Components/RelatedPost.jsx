import React from "react";
import BlogGrid from "./BlogGrid";

const RelatedPost = ({ recent }) => {
  return (
    <section className="recent-posts mt-5">
      <h2 className="text-start">Related Post</h2>

      <BlogGrid data={recent} />
    </section>
  );
};

export default RelatedPost;

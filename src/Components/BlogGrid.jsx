import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import BlogCard from "./Card";
import { usePost } from "../context/postContext";

const BlogGrid = ({ data }) => {
  return (
    <div className="blog-grid">
      <Row md={4}>
        {data.length !== 0 ? (
          data.map((post, i) => (
            <Col key={i} className="mb-4">
              <BlogCard post={post} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert children="Nothing Found! 😢" variant="danger" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BlogGrid;

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const BlogCard = ({ post }) => {
  //   let title = post.title
  //     .replace(/\b\w/g, function (l) {
  //       return l.toLowerCase();
  //     })
  //     .replace(/ /g, "-")
  //     .replace(/[^\w\s]+$/, "");

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </Card.Title>

        <Card.Text>{post.body.replace(/(<([^>]+)>)/gi, "")}</Card.Text>
        <small className="text-capitalize bg-light p-1 px-2 rounded border">
          {post.tags.join(", ")}
        </small>
        <br />
        <small className="date">
          {dateFormat(post.created_at, "mmmm dS, yyyy")}
        </small>
        <br />
        <Link
          to={`/blog/${post.id}`}
          className="btn btn-primary text-white mt-4"
        >
          Read More
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;

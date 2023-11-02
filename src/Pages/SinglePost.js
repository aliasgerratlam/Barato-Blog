import React, { useEffect } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import dateFormat from "dateformat";
import RelatedPost from "../Components/RelatedPost";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { usePost } from "../context/postContext";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data,
    fetchSingle,
    singlePost: singlePostData,
    isLoading,
    handleDelete,
  } = usePost();
  const { title, body, image, tags, created_at } = singlePostData;

  useEffect(() => {
    fetchSingle(id);
    window.scrollTo(0, 0);
  }, [id]);

  const recent = data.reduce((acc, post) => {
    if (post.tags.some((tag) => tags?.includes(tag))) {
      post.id !== singlePostData.id && acc.push(post);
    }
    return acc;
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <Container className="py-5">
      <div className=" text-end">
        <Button onClick={() => navigate(`/edit?id=${id}`)}>
          <MdModeEditOutline /> Edit
        </Button>
        <Button
          className="ms-3"
          variant="danger"
          onClick={() => handleDelete(id)}
        >
          <MdDelete /> Delete
        </Button>
      </div>
      <div className="d-flex align-items-center flex-column">
        <h1>{title}</h1>
        <div className="date">{dateFormat(created_at, "mmmm dS, yyyy")}</div>
      </div>
      <img src={image} alt={title} className="my-4" />
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="text-start"
      ></div>

      <div className="tags d-flex align-items-center mt-4">
        <h5>Tags: </h5>
        <ul className="list-unstyled m-0 d-flex align-items-center">
          {tags?.map((tag, i) => (
            <li key={i} className="m-1">
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
      {console.log(recent)}
      {!!recent.length && <RelatedPost recent={recent} />}
    </Container>
  );
};

export default SinglePost;

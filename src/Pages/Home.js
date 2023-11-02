import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Searchbar from "../Components/Searchbar";
import TopicsButton from "../Components/TopicsButton";
import BlogGrid from "../Components/BlogGrid";
import { useLocation, useNavigate } from "react-router";
import { usePost } from "../context/postContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, fetchData } = usePost();

  useEffect(() => {
    location.state && location.state.refresh && fetchData();
    navigate(location.pathname, { replace: true });
  }, [location.state && location.state.refresh]);

  return (
    <div className="home my-5">
      <Container>
        <Searchbar />
        <TopicsButton />
        <BlogGrid data={data} />
      </Container>
    </div>
  );
};

export default Home;

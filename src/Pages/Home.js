import React, { useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import TopicsButton from "../Components/TopicsButton";
import BlogGrid from "../Components/BlogGrid";
import { useLocation, useNavigate } from "react-router";
import { usePost } from "../context/postContext";
import { Box, Container } from "@chakra-ui/react";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, fetchData } = usePost();

  useEffect(() => {
    location.state && location.state.refresh && fetchData();
    navigate(location.pathname, { replace: true });
  }, [location.state && location.state.refresh]);

  return (
    <Box my="5" className="home">
      <Container maxW="container.xl">
        <Box
          p={10}
          borderRadius="3xl"
          bg={"gray.100"}
          textAlign={"center"}
          className="tags"
          my={50}
          boxShadow="inner"
        >
          <Searchbar />
          <TopicsButton />
        </Box>
        <BlogGrid data={data} />
      </Container>
    </Box>
  );
};

export default Home;

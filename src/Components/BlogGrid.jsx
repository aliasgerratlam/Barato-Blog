import React from "react";
import BlogCard from "./Card";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import { usePost } from "../context/postContext";
import { AiOutlineClose } from "react-icons/ai";

const BlogGrid = ({ data }) => {
  const { isLoading } = usePost();
  if (isLoading)
    return (
      <Grid md={4} templateColumns="repeat(3, 1fr)" gap="5">
        {[...Array.from({ length: 6 })].map((_, i) => (
          <Box padding="6" boxShadow="lg" bg="white" key={i}>
            <Skeleton height="160px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <Skeleton height="30px" mt="50px" w="100px" />
          </Box>
        ))}
      </Grid>
    );

  return (
    <Box className="blog-grid">
      {data.length !== 0 ? (
        <Grid md={4} templateColumns="repeat(3, 1fr)" gap="5">
          {data.map((post, i) => (
            <GridItem key={i} className="mb-4">
              <BlogCard post={post} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={"red.500"}
              rounded={"50px"}
              w={"55px"}
              h={"55px"}
              textAlign="center"
            >
              <AiOutlineClose size="30px" color={"white"} />
            </Flex>
          </Box>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Oops! No Blogs Found.
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default BlogGrid;

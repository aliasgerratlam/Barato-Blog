import React from "react";
import BlogGrid from "./BlogGrid";
import { AbsoluteCenter, Box, Divider, Heading } from "@chakra-ui/react";

const RelatedPost = ({ recent }) => {
  return (
    <Box
      as="section"
      bg={"whiteAlpha.600"}
      p="10"
      borderRadius="3xl"
      my="10"
      className="recent-posts"
    >
      <Box position="relative" p="10">
        <Divider colorScheme="red" />
        <AbsoluteCenter px="4">
          <Heading>Related Post</Heading>
        </AbsoluteCenter>
      </Box>

      <BlogGrid data={recent} />
    </Box>
  );
};

export default RelatedPost;

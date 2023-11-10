import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import dateFormat from "dateformat";
import RelatedPost from "../Components/RelatedPost";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { usePost } from "../context/postContext";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";

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
    <Box as="main">
      <Container maxW="container.xl">
        <div className=" text-end">
          <ButtonGroup my="5">
            <Button
              leftIcon={<MdKeyboardBackspace />}
              colorScheme="teal"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              Back to Home
            </Button>

            <Button
              variant="solid"
              colorScheme="whatsapp"
              onClick={() => navigate(`/edit?id=${id}`)}
            >
              <MdModeEditOutline /> Edit
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => handleDelete(id)}
            >
              <MdDelete /> Delete
            </Button>
          </ButtonGroup>
        </div>
        <Box bg={"whiteAlpha.600"} p={30} borderRadius={30}>
          <Box textAlign="left">
            <Heading fontWeight="700" as="h1" fontSize="5xl">
              {title}
            </Heading>
            <HStack mb="10" mt="3" gap="50px" align="center">
              <Text as="small" fontWeight="600" color="gray.500">
                Published: {dateFormat(created_at, "mmmm dS, yyyy")}
              </Text>
              <Stack direction="row">
                {tags?.map((tag, i) => (
                  <Badge colorScheme="green" key={i}>
                    {tag}
                  </Badge>
                ))}
              </Stack>
            </HStack>
          </Box>
          <Box>
            <Image
              src={image}
              maxW="full"
              alt={title}
              className="my-4"
              objectFit="cover"
              minW={"100%"}
              height="600px"
              objectPosition={"center"}
              borderRadius="3xl"
            />
          </Box>
          <Box
            dangerouslySetInnerHTML={{ __html: body }}
            textAlign="start"
          ></Box>
        </Box>

        {!!recent.length && <RelatedPost recent={recent} />}
      </Container>
    </Box>
  );
};

export default SinglePost;

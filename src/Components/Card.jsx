import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  Button,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Card,
  useColorModeValue,
  HStack,
  Tag,
} from "@chakra-ui/react";

const BlogCard = ({ post }) => {
  //   let title = post.title
  //     .replace(/\b\w/g, function (l) {
  //       return l.toLowerCase();
  //     })
  //     .replace(/ /g, "-")
  //     .replace(/[^\w\s]+$/, "");

  return (
    <Card maxW="sm" bg="gray.50">
      <CardBody pb={2}>
        <Image
          h={"250px"}
          w="100%"
          src={post.image}
          alt={post.title}
          borderRadius="lg"
          objectFit={"cover"}
          transform="scale(1.0)"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />

        <Stack mt="5" spacing="3">
          <Link to={`/blog/${post.id}`}>
            <Heading m={0} size="md" fontWeight={500}>
              {post.title}
            </Heading>
          </Link>
          <Text
            as="small"
            className="date"
            fontWeight="400"
            textAlign="center"
            p={0}
            color={useColorModeValue("gray.400", "gray.200")}
          >
            {dateFormat(post.created_at, "mmmm dS, yyyy")}
          </Text>
          <Text
            as="p"
            marginBottom={0}
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="sm"
            noOfLines={[1, 2, 3]}
          >
            {post.body.replace(/(<([^>]+)>)/gi, "")}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter w="100%" pt={0} justifyContent="center">
        <HStack mt={3} spacing={2}>
          {post.tags.map((tag, i) => (
            <Tag size="sm" key={i} variant="outline" colorScheme="orange">
              {tag}
            </Tag>
          ))}
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

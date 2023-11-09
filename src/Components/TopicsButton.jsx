import React from "react";
import { usePost } from "../context/postContext";
import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";

const TopicsButton = () => {
  const { data, dispatch, active } = usePost();
  const { topics } = usePost();

  const handleTopic = (name) => {
    dispatch({ type: "TOGGLE_TOPIC", payload: name });
  };

  const handleClear = () => {
    dispatch({ type: "TOGGLE_TOPIC_CLEAR" });
  };

  return (
    <>
      <Heading mb={30}>
        Search by Topics{" "}
        <Button
          size="sm"
          className={`border-0 ${!active && "disabled"}`}
          variant="transparent"
          isDisabled={!active.length}
          onClick={handleClear}
        >
          Clear all
        </Button>
      </Heading>
      <ButtonGroup>
        {topics.map((topic) => (
          <Button
            key={topic}
            colorScheme="teal"
            variant={active.includes(topic) ? `solid` : "outline"}
            isDisabled={!data.some((nav) => nav.tags.includes(topic))}
            onClick={() => handleTopic(topic)}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase()}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default TopicsButton;

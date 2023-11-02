import React from "react";
import { Button } from "react-bootstrap";
import { usePost } from "../context/postContext";

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
    <div className="tags mb-5 text-start">
      <h5>
        Search by Topics{" "}
        <Button
          size="sm"
          className={`border-0 ${!active && "disabled"}`}
          variant="transparent"
          disabled={!active.length}
          onClick={handleClear}
        >
          Clear all
        </Button>
      </h5>
      {topics.map((topic) => (
        <Button
          key={topic}
          variant={active.includes(topic) ? `primary` : "outline-primary"}
          disabled={!data.some((nav) => nav.tags.includes(topic))}
          className="me-2"
          onClick={() => handleTopic(topic)}
        >
          {topic}
        </Button>
      ))}
    </div>
  );
};

export default TopicsButton;

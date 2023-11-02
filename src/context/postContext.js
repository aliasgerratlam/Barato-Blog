import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router";

const BASE_URL = "http://localhost:8000/posts";
const PostContext = createContext();

const initalState = {
  originalData: [],
  data: [],
  isLoading: false,
  active: [],
  error: "",
  topics: [],
  singlePost: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "post/loaded":
      return {
        ...state,
        originalData: action.payload,
        data: action.payload,

        topics: action.payload.reduce((accumulator, currentPost) => {
          currentPost.tags.forEach((tag) => {
            if (!accumulator.includes(tag)) {
              accumulator.push(tag);
            }
          });
          return accumulator;
        }, []),
        isLoading: false,
      };

    case "post/created":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case "TOGGLE_TOPIC":
      let activeTopics = [...state.active];

      if (activeTopics.includes(action.payload)) {
        activeTopics = activeTopics.filter((ev) => ev !== action.payload);
        return {
          ...state,
          active: activeTopics,
          data: state.originalData.filter((nav) =>
            activeTopics.every((topic) => nav.tags.includes(topic))
          ),
        };
      } else {
        return {
          ...state,
          active: [...activeTopics, action.payload],
          data: state.data.filter((nav) => nav.tags.includes(action.payload)),
        };
      }

    case "TOGGLE_TOPIC_CLEAR":
      return {
        ...state,
        active: [],
        data: state.originalData,
      };

    case "SINGLE_POST":
      return {
        ...state,
        singlePost: action.payload,
        isLoading: false,
      };

    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "Search":
      return {
        ...state,
        data: action.payload,
      };

    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
};

const PostProvider = ({ children }) => {
  const navigate = useNavigate();

  const [
    { originalData, data, isLoading, error, topics, active, singlePost },
    dispatch,
  ] = useReducer(reducer, initalState);

  const fetchData = async () => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const jsonData = await response.json();

        dispatch({ type: "post/loaded", payload: jsonData });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      dispatch({
        type: "error",
        payload: "Fetching data from city is not successful",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function sendData(cityData) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(cityData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        dispatch({ type: "post/created", payload: [...data, jsonData] });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      dispatch({
        type: "error",
        payload: "Fetching data from city is not successful",
      });
    }
  }

  const fetchSingle = async (id) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        dispatch({ type: "SINGLE_POST", payload: jsonData });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      dispatch({
        type: "error",
        payload: "Fetching data from city is not successful",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete ?");

    if (confirmed) {
      try {
        const response = await fetch(BASE_URL + "/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          navigate("/", {
            state: {
              refresh: true,
            },
          });
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    }
  };

  async function sendEditPostData(cityData) {
    try {
      const response = await fetch(BASE_URL + "/" + cityData.id, {
        method: "PUT",
        body: JSON.stringify(cityData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        navigate("/", {
          state: {
            refresh: true,
          },
        });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  }

  return (
    <PostContext.Provider
      value={{
        originalData,
        data,
        isLoading,
        error,
        topics,
        active,
        singlePost,
        dispatch,
        sendData,
        fetchSingle,
        handleDelete,
        sendEditPostData,
        fetchData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined)
    console.log("You are using usePost context outside the Provider");
  return context;
};

export { PostProvider, usePost };

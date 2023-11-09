import React, { useEffect, useState } from "react";
import { usePost } from "../context/postContext";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const { data, originalData, dispatch } = usePost();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let searchPost = [];
    if (search.length > 0) {
      console.log("search", search.length > 0);
      searchPost = data.filter((product) =>
        `${product.title}`.toLowerCase().includes(search.toLowerCase())
      );
      dispatch({ type: "Search", payload: searchPost });
    } else {
      searchPost = originalData;
      dispatch({ type: "Search", payload: searchPost });
    }
  }, [search, originalData]);

  return (
    <InputGroup mb={50}>
      <InputLeftElement pointerEvents="none">
        <FiSearch />
      </InputLeftElement>
      <Input
        bg="white"
        type="search"
        borderRadius="3xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        size="lg"
      />
    </InputGroup>
  );
};

export default Searchbar;

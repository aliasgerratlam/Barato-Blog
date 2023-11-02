import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { usePost } from "../context/postContext";

const Searchbar = () => {
  const { data, originalData, dispatch } = usePost();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      const searchPost =
        search.length > 1
          ? data.filter((product) =>
              `${product.title}`.toLowerCase().includes(search.toLowerCase())
            )
          : originalData;
      dispatch({ type: "Search", payload: searchPost });
    }
  }, [search]);

  return (
    <Form className="mb-3">
      <Form.Group className="mb-3">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </Form.Group>
    </Form>
  );
};

export default Searchbar;

import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Box, FormLabel } from "@chakra-ui/react";

export default function MultipleSelect({
  label,
  options = [],
  selectValue = [],
  onSelectChange = () => {},
  className = "",
}) {
  const [data, setData] = useState(options);
  const [selectedBox, setSelectedBox] = useState(selectValue);
  const [showBox, setShowBox] = useState(false);
  const inputRef = useRef(null);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    onSelectChange(selectedBox);
  }, [selectedBox]);

  useEffect(() => {
    setSelectedBox(selectValue);
  }, [selectValue]);

  const handleClick = (list, e) => {
    e.preventDefault();
    if (!selectedBox.includes(list)) setSelectedBox((prev) => [...prev, list]);
  };

  const handleRemove = (item, e) => {
    e.preventDefault();
    setSelectedBox(selectedBox.filter((box) => box !== item));
    onSelectChange(selectedBox.filter((box) => box !== item));
  };

  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (showBox && !e.target.closest(".dropdown")) {
        // Check if the clicked element is an input field or a text area
        const isInputField =
          e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
        // console.log("isInputField", isInputField);
        if (!isInputField) setShowBox(false);
      }
    };

    document.addEventListener("mousedown", closeOpenMenus);

    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [showBox]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputData !== "") {
      if (selectedBox.includes(inputData)) return alert("Duplicate Value!");
      setSelectedBox((prev) => [...prev, inputData]);
      setData((prev) => [...prev, inputData]);
      inputRef.current.value = "";
    }
  };
  // console.log("selectedBox", selectedBox);
  return (
    <div className={className}>
      <FormLabel>{label}</FormLabel>
      <Box className="dropdown">
        <Box
          bg={"white"}
          className="multi-input"
          onClick={() => inputRef.current.focus()}
        >
          {selectedBox.length !== 0 && (
            <span className="select-items">
              {selectedBox.map((item, i) => (
                <span key={i} className="item">
                  {item}{" "}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(item, e)}
                    className="close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              ))}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            onFocus={() => setShowBox(true)}
            onChange={(e) => setInputData(e.target.value)}
          />
        </Box>

        {showBox && (
          <div className="suggestbox">
            <ul>
              {!data.length ? (
                <li>There is no category here</li>
              ) : (
                data.map((list, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={`${
                        selectedBox.includes(list) ? "active-item" : ""
                      }`}
                      onClick={(e) => handleClick(list, e)}
                    >
                      {list}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </Box>
    </div>
  );
}

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, ChakraBaseProvider, useColorModeValue } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Add from "./Pages/Add";
import SinglePost from "./Pages/SinglePost";
import EditPost from "./Pages/Edit";
import { PostProvider } from "./context/postContext";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Box className="App" bg={useColorModeValue("gray.300", "gray.900")}>
        <ToastContainer theme="colored" />
        <Header />
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/blog/:id" element={<SinglePost />} />
            <Route path="/edit" element={<EditPost />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </PostProvider>

        <Footer />
      </Box>
    </ChakraBaseProvider>
  );
}

export default App;

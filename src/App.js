import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Add from "./Pages/Add";
import SinglePost from "./Pages/SinglePost";
import EditPost from "./Pages/Edit";
import { PostProvider } from "./context/postContext";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <Header />
      <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<Add />} />
          <Route path="/blog/:id" element={<SinglePost />} />
          <Route path="/edit" element={<EditPost />} />
        </Routes>
      </PostProvider>

      <Footer />
    </div>
  );
}

export default App;

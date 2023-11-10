import React, { useRef, useState } from "react";
import MultipleSelect from "../Components/MultipleSelect/MultipleSelect";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import "react-datepicker/dist/react-datepicker.css";
import { usePost } from "../context/postContext";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Add = () => {
  const { topics, loading, sendData } = usePost();

  const [select, setSelect] = useState([]);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [startDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    image_id: "",
    image_signature: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleSelectChange = (selectedItems) => {
    setSelect(selectedItems);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    const { title, image, image_id, image_signature } = formData;
    let id = new Date().getTime();
    let newErrors = {};

    if (!title) {
      newErrors.title = "Please enter some title";
    }

    if (Object.keys(newErrors).length === 0) {
      const addBlogData = {
        title,
        body: editorRef.current.getContent(),
        tags: select,
        reactions: 0,
        image,
        image_id,
        image_signature,
        created_at: new Date(startDate).getTime(),
        userId: id + 1,
      };

      sendData(addBlogData);
      setFormData({ title: "", body: "" });
      navigate("/", {
        state: {
          refresh: true,
        },
      });
      toast("Wow so easy!");
    } else {
      setErrors(newErrors);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const imgData = new FormData();
    imgData.append("file", files[0]);
    imgData.append("upload_preset", "blog_image"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhioo5inz/image/upload",
      {
        method: "POST",
        body: imgData,
      }
    );

    const data = await response.json();
    console.log("dataIMG", data);
    setFormData({
      ...formData,
      image: data.secure_url,
      image_id: data.public_id,
      image_signature: data.signature,
    });
  };

  if (loading && !topics.length) return <h1>Loading...</h1>;
  return (
    <Box as="main" className="add-page">
      <Container maxW="container.xl" my="5">
        <Alert
          status="warning"
          p="8"
          borderRadius="15"
          justifyContent="center"
          shadow="inner"
        >
          <Heading color="gray.700" fontSize={30}>
            Share Your Thoughts
          </Heading>
        </Alert>

        <Box bg="whiteAlpha.800" p="10" borderRadius={30} my="5">
          <div className="add-form-post">
            <form className="text-start" onSubmit={(e) => e.preventDefault()}>
              <div className="my-4">
                <FormLabel className="form-label">
                  Upload Featured Image:{" "}
                </FormLabel>
                <input type="file" onChange={handleImageUpload} />
              </div>

              <FormControl className="mb-3" isInvalid={errors.title}>
                <FormLabel>Title Thought?</FormLabel>
                <Input
                  type="email"
                  name="title"
                  onChange={handleInputChange}
                  value={formData.title}
                />
                {console.log("errors.title.length", !formData.title)}
                {!formData.title && (
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                )}
              </FormControl>

              <Editor
                apiKey="qwoakchgxc2p3y5robo3exupv95th4fzb3lhhra0y529v2yt"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>In the moonlit night, whispers of the breeze,
                Stars weave tales, a celestial spree.
                Nature's verses unfold with grace,
                A symphony of night, an eternal embrace.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />

              <MultipleSelect
                label={"Add Tags Multiple here..."}
                onSelectChange={handleSelectChange}
                selectValue={select}
                options={topics}
                className="my-4"
              />

              <Button
                type="button"
                onClick={handleSubmit}
                className="w-100 mt-4"
                variant="solid"
                size="lg"
                colorScheme="blue"
              >
                Post 😉
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Add;

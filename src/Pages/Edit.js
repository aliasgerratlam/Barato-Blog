import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import MultipleSelect from "../Components/MultipleSelect/MultipleSelect";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router-dom";
import { usePost } from "../context/postContext";

const EditPost = () => {
  const { topics, isLoading: loading, data, sendEditPostData } = usePost();

  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState([]);
  const editorRef = useRef(null);
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    const editData = data.find((dat) => dat.id === Number(id));
    setPost(editData);
  }, [id]);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    if (post.title !== undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: post.title,
        body: post.body,
      }));
    }

    if (post.tags !== undefined) setSelect(post.tags);
  }, [post]);

  const handleSelectChange = (selectedItems) => {
    setSelect(selectedItems);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    const { title, image } = formData;
    let id = new Date().getTime();
    let newErrors = {};

    if (!title) {
      newErrors.title = "Please enter some title";
    }

    if (Object.keys(newErrors).length === 0) {
      const addBlogData = {
        ...post,
        title,
        body: editorRef.current.getContent(),
        userId: id + 1,
        tags: select,
        reactions: 0,
        image: image || post.image,
      };

      sendEditPostData(addBlogData);
      setFormData({ title: "", body: "" });
      toast("Edit Succesful!!");
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
    setFormData({ ...formData, image: data.secure_url });
  };

  if (loading && post.tags) return <h1>Loading...</h1>;
  return (
    <div className="add-page">
      <Container className="my-5">
        <div className="add-form-post">
          <Form className="text-start" onSubmit={(e) => e.preventDefault()}>
            <div className="my-4">
              <label className="form-label">Upload Featured Image: </label>
              <input type="file" onChange={handleImageUpload} />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>What is your title thought?</Form.Label>
              <Form.Control
                type="email"
                name="title"
                onChange={handleInputChange}
                value={formData.title}
              />
              <span style={{ color: "red" }}>{errors.title}</span>
            </Form.Group>

            <Editor
              apiKey="qwoakchgxc2p3y5robo3exupv95th4fzb3lhhra0y529v2yt"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={formData.body}
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

            <Button type="button" onClick={handleSubmit} className="w-100 mt-4">
              Update
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EditPost;

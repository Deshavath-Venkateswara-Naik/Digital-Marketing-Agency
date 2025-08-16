import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../config";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Deshavath Venkateswara Naik",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/blogs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      alert("Blog created successfully!");
      setFormData({ title: "", content: "", author: "Deshavath Venkateswara Naik", imageUrl: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <ReactQuill value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Add Blog</Button>
      </Form>
    </Container>
  );
};

export default AddBlog;

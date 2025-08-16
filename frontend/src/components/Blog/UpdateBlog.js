import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import api from "../../config";

const UpdateBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${api}/blogs/${id}`);
        const data = await res.json();
        setFormData({
          title: data.title,
          content: data.content,
          author: data.author,
          imageUrl: data.imageUrl,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${api}/blogs/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update blog");
      alert("Blog updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Update Blog</h2>
      <Form>
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
        <Button variant="primary" onClick={handleUpdate}>Update Blog</Button>
      </Form>
    </Container>
  );
};

export default UpdateBlog;

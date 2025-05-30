import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import api from "../../config";

const BlogTitleList = ({ blogTitles, onDelete, onModify }) => (
  <ListGroup className="mt-4">
    {blogTitles.map((title, index) => (
      <ListGroup.Item
        key={index}
        className="d-flex justify-content-between align-items-center"
      >
        {title}
        <div>
          <Button variant="danger" className="mx-2" onClick={() => onDelete(index)}>
            Delete
          </Button>
          <Button variant="info" onClick={() => onModify(index)}>
            Modify
          </Button>
        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Deshavath Venkateswara Naik",
    imageUrl: "",
  });

  const [blogTitles, setBlogTitles] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBlogTitles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const fetchBlogTitles = async () => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      setBlogTitles(data.map((blog) => blog.title));
    } catch (error) {
      console.error("Error fetching blog titles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      fetchBlogTitles();
      setFormData({
        title: "",
        content: "",
        author: "Deshavath Venkateswara Naik",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blogId = data.find((blog) => blog.title === blogTitles[index])?._id;
      if (!blogId) return;
      await fetch(`${api}/blogs/${blogId}`, { method: "DELETE" });
      fetchBlogTitles();
    } catch (error) {
      console.error(`Error deleting blog at index ${index}:`, error);
    }
  };

  const handleModify = async (index) => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blog = data.find((blog) => blog.title === blogTitles[index]);
      if (!blog) return;
      setSelectedBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        imageUrl: blog.imageUrl,
      });
      setShowModal(true);
    } catch (error) {
      console.error(`Error modifying blog at index ${index}:`, error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const sanitizedContent = formData.content.replace(/<\/?p>/g, "");
      const updatedData = { ...formData, content: sanitizedContent };
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blogId = data.find((blog) => blog.title === selectedBlog.title)?._id;
      if (!blogId) return;

      const updateRes = await fetch(`${api}/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (updateRes.ok) {
        fetchBlogTitles();
        setShowModal(false);
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Blog Panel</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Create Blog</Button>
      </Form>

      <BlogTitleList
        blogTitles={blogTitles}
        onDelete={handleDelete}
        onModify={handleModify}
      />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Blog Content</Form.Label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdateBlog}>
              Update Blog
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminBlog;

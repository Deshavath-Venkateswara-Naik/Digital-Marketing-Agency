import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import api from "../../config";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, features: formData.features.split(",") };
      const response = await fetch(`${api}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to create service");
      alert("Service added successfully!");
      navigate("/services");
    } catch (error) {
      console.error(error);
      alert("Error adding service");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Service</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Features (comma separated)</Form.Label>
          <Form.Control
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Service
        </Button>
      </Form>
    </Container>
  );
};

export default AddService;

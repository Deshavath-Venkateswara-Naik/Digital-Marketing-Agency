import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${api}/services/${id}`);
        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          features: data.features.join(","),
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...formData, features: formData.features.split(",") };
      const response = await fetch(`${api}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update service");
      alert("Service updated successfully!");
      navigate("/services");
    } catch (error) {
      console.error(error);
      alert("Error updating service");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Update Service</h2>
      <Form>
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

        <Button variant="primary" onClick={handleUpdate}>
          Update Service
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateService;

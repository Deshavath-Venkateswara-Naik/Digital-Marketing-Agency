// FRONTEND: src/components/ContactUsForm.jsx
import React, { useState } from "react";
import './ContactUsForm.css';
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatusMessage("Please fill all fields.");
      return;
    }

    const formData = { name, email, message };

    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatusMessage(data.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage("Error submitting form.");
    }
  };

  return (
    <Container className="contact-container mt-5">
      <Row>
        <Col md={12} lg={6} className="landing-contact-container p-5">
          <h1>CONTACT US</h1>
          <p>Send us a message, and we’ll get back to you.</p>
          <p><strong>Address:</strong> 7-180 Erragudur, Pamulapadu, Kurnool, AP - 518442</p>
          <p><strong>Email:</strong> deshavathvenkateswaranaik0193@gmail.com</p>
        </Col>
        <Col md={12} lg={6}>
          <Form className="p-5" onSubmit={handleSubmit} style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <h2>GET IN TOUCH</h2>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: "#007bff" }}>Submit Message</Button>
            {statusMessage && <div style={{ marginTop: "10px", color: "green" }}>{statusMessage}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsForm;
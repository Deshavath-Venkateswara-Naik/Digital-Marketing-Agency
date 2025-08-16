import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config";
import ShimmerServiceCard from "../ShimmerServiceCard";

const YourServiceCardComponent = ({ service, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
      <Card className="service-card" style={{ minHeight: "280px" }}>
        <Card.Body>
          <h1 className="services-page-heading" style={{ fontSize: "1.5rem" }}>
            {service.title}
          </h1>
          <p className="services-page-para" style={{ fontSize: "1rem" }}>
            {service.description}
          </p>

          {/* Admin Buttons */}
          <div className="mt-3 d-flex justify-content-between">
            <Button
              variant="info"
              onClick={() => navigate(`/adminservice/update/${service._id}`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(service._id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${api}/services`);
      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const response = await fetch(`${api}/services/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete service");
      fetchServices();
      alert("Service deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting service");
    }
  };

  return (
    <Container className="mt-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Services</h2>
        <Link to="/adminservice/add">
          <Button variant="success">+ Add Service</Button>
        </Link>
      </div>

      <Row>
        {loading
          ? Array(6).fill().map((_, idx) => <ShimmerServiceCard key={idx} />)
          : services.map((service) => (
              <YourServiceCardComponent
                key={service._id}
                service={service}
                onDelete={handleDelete}
              />
            ))}
      </Row>
    </Container>
  );
};

export default ServicesPage;

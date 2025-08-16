import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../config";
import "./Services.css";
import ShimmerServiceCard from "../ShimmerServiceCard";

const YourServiceCardComponent = ({ service }) => {
  return (
    <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
      <Link to={`/services/${service._id}`} className="nav-link">
        <Card className="service-card" style={{ minHeight: "280px" }}>
          <Card.Body>
            <h1
              className="services-page-heading"
              style={{ fontSize: "1.5rem" }}
            >
              {service.title}
            </h1>
            <p className="services-page-para" style={{ fontSize: "1rem" }}>
              {service.description}
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api}/services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5 min-vh-100">
      <h2 className="text-center mb-4">Our Services</h2>

      <Row>
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => <ShimmerServiceCard key={index} />)
          : services.map((service) => (
              <YourServiceCardComponent key={service._id} service={service} />
            ))}
      </Row>
    </Container>
  );
};

export default ServicesPage;

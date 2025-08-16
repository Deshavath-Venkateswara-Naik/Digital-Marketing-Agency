// src/components/ShimmerServiceCard.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Card } from "react-bootstrap";

const ShimmerServiceCard = () => {
  return (
    <Col xs={12} sm={6} md={6} lg={4} className="mb-4">
      <Card className="service-card" style={{ minHeight: "280px" }}>
        <Card.Body>
          <h1 style={{ fontSize: "1.5rem" }}>
            <Skeleton width={`70%`} />
          </h1>
          <p style={{ fontSize: "1rem" }}>
            <Skeleton count={3} />
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ShimmerServiceCard;

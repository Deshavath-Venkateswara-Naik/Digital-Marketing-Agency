import React from 'react';
import './Testimonials.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'CEO, StartupX',
    feedback: 'The team delivered a fantastic website that exceeded our expectations. Highly recommended!',
  },
  {
    name: 'Priya Desai',
    role: 'Marketing Head, BizMark',
    feedback: 'Their design and development skills are top-notch. Our clients love the new site!',
  },
  {
    name: 'Rohan Mehta',
    role: 'Founder, CreativeNest',
    feedback: 'Professional, fast, and reliable service. Would work with them again!',
  },
];

const Testimonials = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">What Our Clients Say</h2>
      <Row>
        {testimonials.map((testimonial, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>"{testimonial.feedback}"</Card.Text>
                <Card.Title className="mt-3">{testimonial.name}</Card.Title>
                <Card.Subtitle className="text-muted">{testimonial.role}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;

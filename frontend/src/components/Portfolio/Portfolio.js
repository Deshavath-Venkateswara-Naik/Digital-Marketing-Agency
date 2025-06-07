import React from 'react';
import './Portfolio.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const projects = [
  {
    title: 'SEO Landing Page',
    description: 'Designed and developed a high-converting SEO landing page for a marketing campaign.',
    image: 'https://via.placeholder.com/300x180',
    link: '#',
  },
  {
    title: 'E-commerce Redesign',
    description: 'Revamped an e-commerce store for better user experience and responsiveness.',
    image: 'https://via.placeholder.com/300x180',
    link: '#',
  },
  {
    title: 'Social Media Strategy Dashboard',
    description: 'Built a dashboard to manage and analyze social media campaigns.',
    image: 'https://via.placeholder.com/300x180',
    link: '#',
  },
];

const Portfolio = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Portfolio</h2>
      <Row>
        {projects.map((project, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={project.image} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="primary" href={project.link}>
                  View Project
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Portfolio;

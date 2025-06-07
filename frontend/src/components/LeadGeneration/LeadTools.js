import React from 'react';
import './LeadTools.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const tools = [
  {
    name: 'Email Capture Form',
    description: 'Customizable email forms for newsletter signups and offers.',
    icon: '📧',
  },
  {
    name: 'Exit-Intent Popup',
    description: 'Smart popup that shows when users try to leave the page.',
    icon: '🚪',
  },
  {
    name: 'Live Chat Widget',
    description: 'Real-time chat support for customer inquiries and lead conversion.',
    icon: '💬',
  },
  {
    name: 'Lead Scoring Dashboard',
    description: 'Visualize and score incoming leads based on user behavior.',
    icon: '📊',
  },
  {
    name: 'CTA Landing Pages',
    description: 'Landing pages optimized for conversions with call-to-action elements.',
    icon: '🔗',
  },
];

const LeadTools = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Lead Generation Tools</h2>
      <Row>
        {tools.map((tool, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>{tool.icon}</div>
                <Card.Title className="mt-2">{tool.name}</Card.Title>
                <Card.Text>{tool.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LeadTools;

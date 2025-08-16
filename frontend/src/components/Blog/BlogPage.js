import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./BlogPage.css";
import api from "../../config";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  const getFirstSentence = (text) => {
    const sanitizedContent = text.replace(/<\/?p>/g, "");
    const sentences = sanitizedContent.split(/[.!?]/);
    return sentences[0];
  };

  return (
    <Container className="blog-page-container">
      <h2 className="blog-page-title">Latest Blogs by Deshavath Venkateswara Naik</h2>
      <Row>
        {loading
          ? // 🔹 Show shimmer placeholders while loading
            Array(6)
              .fill()
              .map((_, index) => (
                <Col key={index} md={4}>
                  <Card className="blog-card m-2 p-2" style={{ minHeight: "350px" }}>
                    <Skeleton height={200} />
                    <Card.Body>
                      <Skeleton height={25} width={`80%`} />
                      <Skeleton height={20} width={`60%`} className="mb-2" />
                      <Skeleton count={2} />
                      <Skeleton height={35} width={100} style={{ marginTop: "10px" }} />
                    </Card.Body>
                  </Card>
                </Col>
              ))
          : // 🔹 Show actual blogs after loading
            blogPosts.map((post) => (
              <Col key={post._id} md={4}>
                <Card className="blog-card m-2 p-2" style={{ minHeight: "350px" }}>
                  <Card.Img
                    variant="top"
                    src={post.imageUrl}
                    className="blog-img"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      By {post.author}
                    </Card.Subtitle>
                    <Card.Text>{getFirstSentence(post.content)}</Card.Text>
                    <Link to={`/blog/${post._id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default BlogPage;

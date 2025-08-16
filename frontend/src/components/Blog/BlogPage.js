import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./BlogPage.css";
import api from "../../config";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🔹 for programmatic navigation

  useEffect(() => {
    fetch(`${api}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setLoading(false);
      });
  }, []);

  const getFirstSentence = (text) => {
    const sanitized = text.replace(/<\/?p>/g, "");
    const sentences = sanitized.split(/[.!?]/);
    return sentences[0];
  };

  return (
    <Container className="blog-page-container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Latest Blogs by Deshavath Venkateswara Naik</h2>
        <Button variant="success" onClick={() => navigate("/adminblog/add")}>
          + Add Blog
        </Button>
      </div>

      <Row>
        {loading
          ? Array(6)
              .fill()
              .map((_, idx) => (
                <Col key={idx} md={4}>
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
          : blogPosts.map((post) => (
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
                    <div className="d-flex justify-content-between">
                      <Link to={`/blog/${post._id}`}>
                        <Button variant="primary">Read More</Button>
                      </Link>
                      <Button
                        variant="info"
                        onClick={() => navigate(`/adminblog/update/${post._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default BlogPage;

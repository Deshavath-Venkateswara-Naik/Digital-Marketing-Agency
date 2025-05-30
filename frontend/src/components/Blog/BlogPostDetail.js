import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './Blog.css';
import api from '../../config';

const BlogPostDetail = () => {
  const [blogPost, setBlogPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${api}/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlogPost(data))
      .catch((error) => console.error('Error fetching blog post details:', error));
  }, [id]);

  return (
    <Container className="attach mt-5 min-vh-100">
      <Card className="blog-detail-card mt-5 border-0">
        <div className="d-flex justify-content-center">
          <Card.Img
            variant="top"
            src={blogPost.imageUrl}
            className="blog-detail-img img-fluid"
          />
        </div>
        <Card.Body>
          <Card.Title className="mb-3">{blogPost.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by Deshavath Venkateswara Naik |{' '}
            {blogPost.createdAt
              ? moment(blogPost.createdAt).format('MMM D, YYYY h:mm A')
              : ''}
          </Card.Subtitle>
          <div className="blog-content">
            <ReactQuill
              readOnly
              theme="snow"
              value={blogPost.content || ''}
              modules={{
                toolbar: false,
              }}
              className="border-0"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPostDetail;

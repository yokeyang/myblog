import React from 'react';
import { Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';
export const BlogPage = ({ blog }) =>(
  <Col md={8} mdOffset={1}>
    <div className="BlogPage">
      <div className="Header">
        <h3>{blog.title}</h3>
        <p className="target">{blog.time} | {blog.tag}</p>
      </div>
      <div className="contents">
        <p>{blog.contents}</p>
      </div>
      <div className="author">{blog.name}</div>
    </div>
  </Col>
);
export default BlogPage;

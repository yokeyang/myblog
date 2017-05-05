import React from "react";
import { Link } from "react-router-dom";
import {Col} from "react-bootstrap";

const Blog = props => (
  <Col md={8} xs={12} mdOffset={1}>
    <Link to={`/blog/page${props.id}`} className="title"><h3>{props.title}</h3></Link>
    <p className="target">{props.time} | {props.tag}</p>
    <div className="contents">
      <p>{props.contents.replace(/[.|。|!|！|；|;][\d|\D]*/g,':)').slice(0, 100)}</p>
      <p><Link to={`/blog/page${props.id}`}>Read More</Link></p>
    </div>
  </Col>
);

export const BlogPreview = ({ blogs }) =>(
  <div className="BlogPreview">
    <Col md={12} xs={12} className="pages">
      {blogs.map(blogData =>
        <Blog key={blogData.id} {...blogData} />,
      )}
    </Col>
  </div>
);

export default BlogPreview;

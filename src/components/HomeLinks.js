import React from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

export const HomeLinks =()=> (
  <div className="HomeLinks">
    <Col md={12} xs={12} className="text-center">
      <ul>
        <li><a href="https://github.com/yokeyang" target="_blank">Github</a></li>
        <li><a href="http://sighttp.qq.com/msgrd?v=1&uin=2423000138" target="_blank">TencentQQ</a></li>
        <li><a href="https://www.instagram.com/yokeyang1997/" target="_blank">Instagram</a></li>
        <li><a href="https://twitter.com/372510435" target="_blank">Twitter</a></li>
        <li><Link to="/Blog">Blog</Link></li>
      </ul>
    </Col>
  </div>
);
export default HomeLinks;

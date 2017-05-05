import React from 'react';
import {BrowserRouter as Router,Route,Link,browserHistory,Switch,Redirect} from 'react-router-dom';
import { Col } from 'react-bootstrap';

export const Home = props => (
  <div className="Home">
    <Col className="text-center">
      <h1 className="animated bounce">YOKE YANG</h1>
    </Col>
    <Col md={12} xs={12}>
      <div>
        <div className="tabs">
          <ul className="tab">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </div>
      </div>
    </Col>
    <Col md={12} xs={12}><div className='public_header app-content'>{props.children}</div></Col>
  </div>
);
export default Home;

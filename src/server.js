/* eslint no-console: "off"*/

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false });
import fs from 'fs';
const app = new Express();
const server = new Server(app);
var buf = new Buffer(1024);


// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser());

// universal routing and rendering
app.post('/list_post', function (req, res) {
  var str_json = JSON.stringify(req.body);
    fs.exists('./src/data/graph.json',
      function(exists){
        if(exists){
          fs.appendFile('./src/data/graph.json', '|'+str_json, 'utf8', function(){
            // 保存完成后的回调函数
            console.log("保存完成");
          });
        }else{
          fs.appendFile('./src/data/graph.json',str_json, 'utf8', function(){
            // 保存完成后的回调函数
            console.log("保存完成");
          });
        }
      }
    )
});
app.get('/list_get',function (req, res) {
  fs.open('./src/data/graph.json', 'r+', function(err, fd) {
     if (err) {
         return console.error(err);
     }
     fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        if (err){
           console.log(err);
        }
        res.send(JSON.stringify(buf.slice(0, bytes).toString()));
     });
  });
});
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});
// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});

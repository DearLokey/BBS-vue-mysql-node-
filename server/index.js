// node 后端服务器

const userApi = require('./api/userApi')
const bbsApi = require('./api/bbsApi')
const commentApi = require('./api/commentApi')
const aboutApi = require("./api/aboutApi")
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 后端api路由
app.use('/api/user', userApi);
app.use('/api/bbs',bbsApi);
app.use('/api/comment',commentApi);
app.use('/api/about',aboutApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
/**
 * reflen console 
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */
import http from 'http';
import https from 'https'; //use https in producation
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import path from 'path';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import config from './config';
import reactServer from '.';

const app = express();
const server = http.createServer(app);

// fill client shared settings for a shared file 

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: favicon in Gcloud has issue
// if (__DEV__) {
//   app.use(favicon(path.join(__dirname,'..','public','favicon','favicon.ico')));
//   app.enable('trust proxy');
// } else {
//   app.use(favicon(path.join(__dirname,'public','favicon','favicon.ico')));
// }

// Load frontend (react)
// -----------------------------------------------------------------------------
reactServer(app);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(config.port, config.ip, () => {
    console.info(`The server is running at http://${config.ip}:${config.port}/`);
});

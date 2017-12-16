/**
 * Convospot console 
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import path from 'path';
import http from 'http';
import https from 'https'; //use https in producation
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import config from './config';
import backendServer from './backend';
import frontendServer from './frontend';

const app = express();
const server = http.createServer(app);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (__DEV__) {
  app.enable('trust proxy');
}

// Load backend (api, auth, socketio, graphQL)
// -----------------------------------------------------------------------------
backendServer(app, server);

// Load frontend (react)
// -----------------------------------------------------------------------------
frontendServer(app);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(config.port, config.ip, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
});

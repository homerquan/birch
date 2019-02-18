/**
 * Convospot console
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

import Promise from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import apolloClient from './core/apolloClient';

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const frontend = (app) => {

  app.get('/hello', async (req, res) => {
    res.send('helo world');
        // or res.sendFile(....);
  });

  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', async (req, res, next) => {
    try {
      const css = new Set();

      const fetch = createFetch({
        baseUrl: config.serverUrl,
        cookie: req.headers.cookie,
        apolloClient,
      });

      // get states from cookie
      const clientSession = req.cookies[config.sessionCookieName];
      const clientRuntime = req.cookies[config.runtimeCookieName];

      const initialState = {
        session: clientSession ? JSON.parse(clientSession) : {} || null,
        runtime: clientRuntime ? JSON.parse(clientRuntime) : {} || null,
      };

      const store = configureStore(initialState, {
        cookie: req.headers.cookie,
        apolloClient,
        fetch,
        history: null,
      });

      store.dispatch(
        setRuntimeVariable({
          name: 'initialNow',
          value: Date.now(),
        }),
      );

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss: (...styles) => {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(style => css.add(style._getCss()));
        },
        fetch,
        // You can access redux through react-redux connect
        store,
        storeSubscription: null,
        // Apollo Client for use with react-apollo
        client: apolloClient,
      };

      const route = await router.resolve({
        ...context,
        path: req.path,
        query: req.query,
      });

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = { ...route };

      const rootComponent = (
        <App context={context} store={store}>
          {route.component}
        </App>
      );
      await getDataFromTree(rootComponent);
      // this is here because of Apollo redux APOLLO_QUERY_STOP action
      await Promise.delay(0);
      data.children = await ReactDOM.renderToString(rootComponent);
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [assets.vendor.js, assets.client.js];

      if (assets[route.chunk]) {
        data.scripts.push(assets[route.chunk].js);
      }

      // Furthermore invoked actions will be ignored, client will not receive them!
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Serializing store...');
      }
      data.app = {
        apiUrl: config.clientUrl,
        state: context.store.getState(),
      };

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  //
  // Error handling
  // -----------------------------------------------------------------------------
  const pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    console.error(pe.render(err));
    const html = ReactDOM.renderToStaticMarkup(
      <Html
        title="Internal Server Error"
        description={err.message}
        styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
      >
        {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
      </Html>,
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
  });
};

export default frontend;

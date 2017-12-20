

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  async action({ next }) {
    console.log('middleware: start');
    const child = await next();
    console.log('middleware: end');
    return child;
  },

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./conversations').default,
    require('./conversation').default,
    require('./knowledge').default,
    require('./contact').default,
    require('./login').default,
    require('./register').default,
    require('./about').default,
    require('./privacy').default,
    require('./admin').default,
    require('./debug').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'convospot dashboard'}`;
    route.description = route.description || '';

    return route;
  },

};

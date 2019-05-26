/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./login').default,
    require('./home').default,
    require('./sessions').default,
    require('./session').default,
    require('./apps').default,
    require('./app').default,
    require('./newBot').default,
    require('./knowledge').default,
    require('./profile').default,
    require('./register').default,
    require('./help').default,
    require('./privacy').default,
    require('./admin').default,
    require('./debug').default,
    require('./account').default,
    require('./plugins').default,
    require('./notifications').default,
    require('./forgotPassword').default,
    require('./resetPassword').default,
    require('./experience').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Reflen console'}`;
    route.description = route.description || '';

    return route;
  },

};

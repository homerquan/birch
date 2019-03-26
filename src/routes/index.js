/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./conversations').default,
    require('./conversationDetails').default,
    require('./bots').default,
    require('./bot').default,
    require('./newBot').default,
    require('./knowledge').default,
    require('./profile').default,
    require('./login').default,
    require('./register').default,
    require('./help').default,
    require('./privacy').default,
    require('./admin').default,
    require('./debug').default,
    require('./account').default,
    require('./plugins').default,
    require('./notifications').default,
    require('./styleGuide').default,
    require('./forgotPassword').default,
    require('./resetPassword').default,
    require('./experienceEditor').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'convospot dashboard'}`;
    route.description = route.description || '';

    return route;
  },

};

import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

const chunk = 'legal';

export default {

  path: '/legal',
  chunk,
  async action() {
    const data = await require.ensure([], require => require('./legal.md'), 'legal');
    return {
      title: data.title,
      chunk,
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};

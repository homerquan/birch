/*
* @Author: Homer
* @Date:   2017-12-31 18:26:19
* @Last Modified by:   homer
* @Last Modified time: 2019-05-28 21:35:04
*/
import React from 'react';
import CreateAppPage from '../../pages/CreateAppPage';
import Layout from '../../components/Layout';

const title = 'Create a new property & app';
const chunk = 'createApp';

export default {
  path: '/create-app',
  chunk,
  action() {
    return {
      title,
      chunk,
      component: (
        <Layout>
          <CreateAppPage title={title} />
        </Layout>
      ),
    };
  },
};

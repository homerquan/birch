import React from 'react';
import Knowledge from './Knowledge';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';


const title = 'Knowledge';

export default {
  path: '/:id/Knowledge',
  chunk: 'knowledge',
  action({ store, params, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'knowledge',
      component: (
        <Layout>
          <Knowledge title={title} appId={params.id} />
        </Layout>
      ),
    };
  },
};

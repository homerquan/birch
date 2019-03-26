import React from 'react';
import Conversations from './Conversations';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Live Conversations';

export default {
  path: '/:id/conversations',
  chunk: 'conversations',
  action({ store, params, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'conversations',
      component: (
        <Layout>
          <Conversations
            title={title}
            botId={params.id}
          />
        </Layout>
      ),
    };
  },
};
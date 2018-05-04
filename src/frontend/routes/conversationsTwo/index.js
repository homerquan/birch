import React from 'react';
import Conversations from './Conversations';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Live Conversations';

export default {
  path: '/:id/conversations-two',
  chunk: 'conversations-two',
  action({ store, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'conversations-two',
      component: (
        <Layout>
          <Conversations
            title={title}
            // botId={params.id}
            botId="asdf-1234-asdf-1234"
          />
        </Layout>
      ),
    };
  },
};

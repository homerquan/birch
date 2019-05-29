import React from 'react';
import SessionsPage from '../../pages/SessionsPage';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Live sessions';
const chunk = 'sessions';

export default {
  path: '/app/:aid/sessions',
  chunk,
  action({ store, params, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk,
      component: (
        <Layout>
          <SessionsPage
            title={title}
            appId={params.aid}
          />
        </Layout>
      ),
    };
  },
};

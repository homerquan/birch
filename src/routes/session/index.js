/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: Michael
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-28 16:15:27
 */
import React from 'react';
import Session from '../../pages/session';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Session Details';
const chunk = 'session';

export default {
  path: '/app/:aid/session/:sid',
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
          <Session title={title} appId={params.aid} sessionId={params.sid}/>
        </Layout>
      ),
    };
  },
};

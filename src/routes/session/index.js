/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: Michael
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-24 16:15:48
 */
import React from 'react';
import Session from '../../pages/session';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Conversation Details';
const chunk = 'session';

export default {
  path: '/:aid/session/:sid',
  chunk,
  action({ store, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk,
      component: (
        <Layout>
          <ConversationDetailsView title={title} appId={params.aid} sessionId={params.sid}/>
        </Layout>
      ),
    };
  },
};

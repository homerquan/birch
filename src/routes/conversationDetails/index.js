/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: Michael
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2019-04-26 13:21:03
 */
import React from 'react';
import ConversationDetailsView from './ConversationDetailsView';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Conversation Details';

export default {
  path: '/conversation-details',
  chunk: 'conversation-details',
  action({ store, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'bots',
      component: (
        <Layout>
          <ConversationDetailsView title={title} />
        </Layout>
      ),
    };
  },
};

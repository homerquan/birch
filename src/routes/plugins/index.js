/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not
 * be copiedand/or distributed without permission
 *
 * @Author: Michael
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2019-04-26 13:21:05
 */
import React from 'react';
import Plugins from './Plugins';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

export default {
  path: '/:id/plugins',
  chunk: 'plugins',
  action({ store, params, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title: 'Plugins',
      chunk: 'plugins',
      component: (
        <Layout>
          <Plugins
            conversationId={params.id}
          />
        </Layout>
      ),
    };
  },
};

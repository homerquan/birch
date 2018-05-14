/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not
 * be copiedand/or distributed without permission
 *
 * @Author: Michael
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   Michael
 * @Last Modified time: 2018-05-04
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
           botId={params.id}
          />
        </Layout>
      ),
    };
  },
};

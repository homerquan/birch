/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not
 * be copiedand/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2019-04-26 13:21:02
 */
import React from 'react';
import Bots from './Bots';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Properties & Apps';

export default {
  path: '/apps',
  chunk: 'bots',
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
          <Bots title={title} />
        </Layout>
      ),
    };
  },
};

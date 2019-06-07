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
 * @Last Modified time: 2019-05-28 21:34:46
 */
import React from 'react';
import AppsPage from '../../pages/AppsPage';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';

const title = 'Properties & Apps';

export default {
  path: '/apps',
  chunk: 'apps',
  action({ store, path, query }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'apps',
      component: (
        <Layout>
          <AppsPage title={title} page={query.page} limit={query.limit} filter={query.filter} sort={query.sort} />
        </Layout>
      ),
    };
  },
};

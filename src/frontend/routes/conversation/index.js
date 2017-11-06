/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 19:39:09
 */
import React from 'react';
import Conversation from './Conversation';
import Layout from '../../components/Layout';

export default {

  path: '/conversation',

  action() {
    return {
      title: 'conversation',
      component: <Layout><Conversation /></Layout>,
    };
  },

};

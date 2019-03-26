/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or
 * distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 13:49:02
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 14:01:45
 */

import GridOneOne from '../../components/Layout/GridOneOne';
import GridOneTwo from '../../components/Layout/GridOneTwo';
import GridOneThree from '../../components/Layout/GridOneThree';
import GridOneFull from './GridOneFull';
import Tabs from '../../components/Layout/Tabs';

const grids = {
  'grid-one-one': GridOneOne,
  'grid-one-two': GridOneTwo,
  'grid-one-three': GridOneThree,
  'grid-one-full': GridOneFull,
  'tabs': Tabs,
};

export default grids;
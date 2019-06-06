import React from 'react';
import { FiExternalLink as OpenIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import Blockies from 'react-blockies';
import Link from '../share/Link';

export const columns = () => ([
  {
    name: '_id',
    label: ' ',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <Blockies
          seed={value}
          size={10}
          scale={3}
          color="#c4c4c4"
          bgColor="#fafafa"
          spotColor="#666666"
        />
        ),
    },
  },
  {
    name: 'status',
    label: 'status',
  },
]);

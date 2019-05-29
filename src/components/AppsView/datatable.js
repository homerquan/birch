/*
* @Author: homer
* @Date:   2019-05-28 23:14:56
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 02:59:46
*/
import React from 'react';
import { FiMoreVertical as MoreIcon, FiCode as CodeIcon, FiExternalLink as OpenIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';

export const tableColumns = (openCodeModal, selectApp) => ([
  {
    key: 'name',
    label: 'Name',
    style: {
      width: 160,
    },
  },
  {
    key: 'hostname',
    label: 'Hostname',
    style: {
      width: 160,
    },
  },
  {
    key: 'embedCode',
    label: 'Embed code',
    render: code => (
      <IconButton onClick={() => openCodeModal(code)}>
        <CodeIcon />
      </IconButton>
    ),
  },
  {
    key: '_id',
    label: 'Select',
    render: id => (
      <IconButton onClick={() => selectApp(id)}>
        <OpenIcon />
      </IconButton>
    ),
  },
  {
    style: {
      width: 30,
    },
    render: () => (
      <div>
        <IconButton tooltip="More">
          <MoreIcon />
        </IconButton>
      </div>
    ),
  },
]);

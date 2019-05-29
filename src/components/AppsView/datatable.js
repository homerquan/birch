/*
* @Author: homer
* @Date:   2019-05-28 23:14:56
* @Last Modified by:   homer
* @Last Modified time: 2019-05-28 23:18:55
*/
import React from 'react';
import CodeIcon from 'material-ui/svg-icons/action/code';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import MoreIcon from 'react-material-icons/icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

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
        <EyeIcon />
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
/*
* @Author: homer
* @Date:   2019-05-28 23:14:56
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 19:26:16
*/
import React from 'react';
import { FiMoreVertical as MoreIcon, FiCode as CodeIcon, FiExternalLink as OpenIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import { genEmbedCode } from '../../utils';


export const columns = (openCodeModal, selectApp) => ([
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: '_id',
    label: 'Id',
  },
  {
    name: 'token',
    label: 'Embed code',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        // gen js code by id and token
        const code = genEmbedCode(tableMeta.rowData[1], value);
        return (
          <IconButton onClick={event => openCodeModal(code, event)}>
            <CodeIcon />
          </IconButton>
        );
      },
    },
  },
  {
    name: 'hostname',
    label: 'Hostname',
  },
  {
    name: "_id",
    label: 'More',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <div>
          <IconButton tooltip="More">
            <MoreIcon />
          </IconButton>
        </div>),
    },
  },
]);

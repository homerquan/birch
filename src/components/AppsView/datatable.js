/*
* @Author: homer
* @Date:   2019-05-28 23:14:56
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 20:39:04
*/
import React from 'react';
import { FiMoreVertical as MoreIcon, FiCode as CodeIcon, FiExternalLink as OpenIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import { genEmbedCode } from '../../utils';
import Link from '../share/Link';

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
      customBodyRender: (value, tableMeta, updateValue) => {
        const detailUrl = `/app/${value}/details`;
        return (
        <div>
          <IconButton tooltip="More">
            <Link href={detailUrl}>
              <MoreIcon />
            </Link>
          </IconButton>
        </div>)
      },
    },
  },
]);

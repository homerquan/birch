import React from 'react';
import { FiEye as OnlineIcon, FiEyeOff as OfflineIcon, FiMonitor as MonitorIcon, FiMoreVertical as MoreIcon } from 'react-icons/fi';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Toggle from '@material-ui/core/Switch';
import Blockies from 'react-blockies';
import moment from 'moment';
import Link from '../share/Link';

export const columns = (addPinned, openDrawer) => ([
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
    name: '_id',
    label: 'From',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <div>
          <div>
            <span>{value}</span>
          </div>
        </div>
        ),
    },
  },
  {
    name: 'status',
    label: 'Status',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
      		value === 'online' ? <OnlineIcon /> : <OfflineIcon />
      	),
    },
  },
  {
    name: 'updatedAt',
    label: 'Last Updated',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>{moment(value).fromNow()}</span>
      ),
    },
  },
  {
    name: 'actionConnections',
    label: 'Actions',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <span>awaiting data</span>
      ),
    },
  },
  {
    label: 'Monitor',
    name: '_id',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Tooltip title="Monitor the session">  
          <MonitorIcon onClick={() => openDrawer(value)}/>
        </Tooltip>
      ),
    },
  },
  {
    label: 'Details',
    name: '_id',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Tooltip title="Show details">
          <Link href="./details">
            <MoreIcon />
          </Link>
        </Tooltip>
      ),
    },
  },
]);


import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import DataTables from "material-ui-datatables";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import IconButton from "material-ui/IconButton";
import OnlineIcon from "react-material-icons/icons/action/swap-horiz";
import OffIcon from "react-material-icons/icons/notification/sync-disabled";
import MoreIcon from "react-material-icons/icons/navigation/more-vert";
import Blockies from "react-blockies";
import moment from 'moment';

import s from "./ConversationsView.css";

const styles = {
  chip: {
    margin: 2,
    display: "inline-block"
  }
};

const tableColumns = [
  {
    key: "id",
    style: {
      width: 10
    },
    render: (id, all) => (
      <div>
        <Blockies
          seed={id}
          size={10}
          scale={3}
          color="#c4c4c4"
          bgColor="#fafafa"
          spotColor="#666666"
        />
      </div>
    )
  },
  {
    key: "id",
    label: "Visitor",
    style: {
      width: 160
    },
    render: (id, all) => (
      <div>
        <div className={s.visitorName}>Anomynous</div>
        <div className={s.visitorId}>{id}</div>
      </div>
    )
  },
  {
    key: "status",
    label: "Status",
    style: {
      width: 40
    },
    sortable: true,
    render: (online, all) => {
      return online === 'online' ? <OnlineIcon /> : <OffIcon />
    }
  },
  {
    key: "intentions",
    label: "Intentions",
    render: (intentions, all) => (
      <div> 
        {intentions && intentions.length ? (
          intentions.map((intention, index) =>
            <Chip
              key={index}
              style={styles.chip}>
                {intention.name}
            </Chip>
          )
        ) : (
          <span>waiting data</span>
        )}  
      </div>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: (actions, all) => (
      <div>
       {actions && actions.length ? (
          actions.map((action, index) =>
            <Chip 
              key={index} 
              style={styles.chip}
            >
              <Avatar size={32}>{action.source.charAt(0)}</Avatar> {action.name} { action.status === 'in-progress' && <img src="/images/loader.gif" /> }
            </Chip>
          )
        ) : (
          <span>waiting actions</span>
        )}  
      </div>
    )
  },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    sortable: true,
    render: (updatedAt, all) => (
      <span>{moment(updatedAt).format('LLL')}</span>
    )
  },
  {
    key: "id",
    style: {
      width: 30
    },
    render: (id, all) => (
      <div>
        <IconButton tooltip="More">
          <MoreIcon />
        </IconButton>
      </div>
    )
  }
];

// /https://github.com/hyojin/material-ui-datatables/issues/46
const sortByStringAscending = (array, condition)  => array.sort((a, b) => a[condition].localeCompare(b[condition]))
const sortByStringDescending = (array, condition)  => array.sort((a, b) => b[condition].localeCompare(a[condition]))

const ConversationsTable = ({ conversations, openDrawer, handleSortOrderChange }) => {
  // console.log('Conversations: ', conversations)
  let data = sortByStringDescending(conversations, 'status')
  const handleSort = (key, order) => {
    // console.log('Key: ', key)
    // console.log('Order: ', order)
    order === 'desc' ? sortByStringDescending(data, key) : sortByStringAscending(data, key)
  }
  
  return (
    <DataTables
      height={"auto"}
      selectable={false}
      showRowHover={true}
      columns={tableColumns}
      data={data}
      showCheckboxes={false}
      onCellClick={openDrawer}
      onSortOrderChange={handleSort}
      page={1}
      count={100}
    />
  );
};

ConversationsTable.propTypes = {
  
};

export default withStyles(s)(ConversationsTable);

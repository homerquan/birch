import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DataTables from 'material-ui-datatables';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import OnlineIcon from 'react-material-icons/icons/action/swap-horiz';
import OffIcon from 'react-material-icons/icons/notification/sync-disabled';
import MoreIcon from 'react-material-icons/icons/navigation/more-vert';
import ChatIcon from 'react-material-icons/icons/communication/chat-bubble';
import { grey500 } from 'material-ui/styles/colors';
import Blockies from 'react-blockies';
import moment from 'moment';
import Toggle from 'material-ui/Toggle';

import s from './ConversationsTable.css';

const styles = {
  chipDark: {
    margin: 2,
    display: 'inline-block',
    backgroundColor: 'rgb(179, 179, 179)',
  },
  chip: {
    margin: 2,
    display: 'inline-block',
  },
};

const tableColumns = (addPinned, openDrawer) => ([
  {
    key: 'id',
    style: {
      width: 10,
    },
    render: id => (
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
    ),
  },
  {
    key: 'id',
    label: 'Visitor',
    style: {
      width: 160,
    },
    render: id => (
      <div>
        <div className={s.visitorName}>
          Anomynous
          <span>{id}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    style: {
      width: 40,
    },
    sortable: true,
    render: online => (
      online === 'online' ? <OnlineIcon /> : <OffIcon />
    ),
  },
  {
    key: 'intentions',
    label: 'Intentions',
    render: intentions => (
      <div>
        {intentions && intentions.length
          ? intentions.map((intention, index, array) => (
            <span key={intention.id}>
              <Chip
                style={array.length === (index + 1) ? styles.chip : styles.chipDark}
              >
                {intention.name}
              </Chip>
              <br />
            </span>
          ),
        ) : (
          <span>waiting data</span>
        )}
      </div>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: actions => (
      <div>
        {actions && actions.length ? (
          actions.map(action => (
            <span key={action.id}>
              <Chip
                style={styles.chip}
              >
                <Avatar size={32}>
                  {action.source.charAt(0)}
                </Avatar> {action.name} { action.status === 'in-progress' && <img src="/images/loader.gif" alt="loading" /> }
              </Chip>
              <br />
            </span>
          ))
        ) : (
          <span>waiting actions</span>
        )}
      </div>
    ),
  },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    sortable: true,
    render: updatedAt => (
      <span>{moment(updatedAt).format('LLL')}</span>
    ),
  },
  {
    key: 'pinToTop',
    label: 'Pin to Top',
    style: {
      width: 40,
    },
    render: (pinToTop, all) => {
      const { id } = all;

      return (<Toggle
        name={id}
        toggled={pinToTop}
        onToggle={passedId => addPinned(passedId)}
      />);
    },
  },
  {
    style: {
      width: 30,
    },
    render: (name, all) => (
      <IconButton onClick={() => openDrawer(all.id)}>
        <ChatIcon color={grey500} />
      </IconButton>
    ),
  },
  {
    key: 'id',
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

class ConversationsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      rowSize: 10,
    };

    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
  }

  handleNextPageClick = () => {
    this.setState({ page: this.state.page + 1 });
  }

  handlePreviousPageClick = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleRowSizeChange = (rowSizeIndex, rowSize) => {
    this.setState({ page: 1, rowSize });
  }

  handleSortOrderChange(key, order, array) {  // eslint-disable-line
    // Original idea here: https://github.com/hyojin/material-ui-datatables/issues/46
    // First sort by pinned/not pinned then sort the passed in key/order
    array.sort((a, b) => {
      if (a.pinToTop && !b.pinToTop) {
        return -1;
      }

      if (!a.pinToTop && b.pinToTop) {
        return 1;
      }

      if (order === 'desc') {
        return b[key].localeCompare(a[key]);
      }

      return a[key].localeCompare(b[key]);
    });
  }

  render() {
    const { conversations, openDrawer, addPinned } = this.props;
    const { rowSize, page } = this.state;

    // Build the initial conversation array, moving pinned conversations
    // to the top.
    const pinned = conversations.filter(conv => conv.pinToTop);
    const notPinned = conversations.filter(conv => !conv.pinToTop);
    const data = [
      ...pinned,
      ...notPinned,
    ];

    const displayData = data.slice(rowSize * (page - 1), rowSize * page);

    return (
      <DataTables
        height="auto"
        selectable={false}
        showRowHover
        columns={tableColumns(addPinned, openDrawer)}
        data={displayData}
        showCheckboxes={false}
        onSortOrderChange={(key, order) => this.handleSortOrderChange(key, order, displayData)}
        onNextPageClick={this.handleNextPageClick}
        onPreviousPageClick={this.handlePreviousPageClick}
        onRowSizeChange={this.handleRowSizeChange}
        page={page}
        rowSize={rowSize}
        count={conversations.length}
      />
    );
  }
}

ConversationsTable.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      actions: PropTypes.array,
      client: PropTypes.string,
      id: PropTypes.string,
      intentions: PropTypes.array,
      pinToTop: PropTypes.bool,
      mode: PropTypes.string,
      updatedAt: PropTypes.string,
      visito: PropTypes.string,
    }),
  ).isRequired,
  openDrawer: PropTypes.func.isRequired,
  addPinned: PropTypes.func.isRequired,
};

export default withStyles(s)(ConversationsTable);

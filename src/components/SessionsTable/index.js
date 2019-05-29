import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DataTables from 'material-ui-datatables';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import OnlineIcon from 'react-material-icons/icons/action/swap-horiz';
import OffIcon from 'react-material-icons/icons/notification/sync-disabled';
import MoreIcon from 'react-material-icons/icons/navigation/more-vert';
import ChatIcon from 'react-material-icons/icons/communication/chat-bubble';
import { grey500, deepPurple500, deepPurple800, white } from '@material-ui/core/colors';
import Blockies from 'react-blockies';
import moment from 'moment';
import Toggle from '@material-ui/core/Switch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import s from './style.css';
import datatableTheme from '../datatableTheme';

const styles = {
  chipDark: {
    margin: 2,
    display: 'inline-block',
    backgroundColor: 'rgb(179, 179, 179)',
  },
  chip: {
    margin: 2,
    display: 'inline-block',
    backgroundColor: deepPurple500,
    color: white,
  },
};

const tableColumns = (addPinned, openDrawer) => ([
  {
    key: '_id',
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
    key: '_id',
    label: 'From',
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
    label: 'Context',
    style: {
      width: 100,
    },
    render: intentions => (
      <div className="intentionsContainer" style={{ overflowX: 'scroll' }}>
        {intentions && intentions.length
          ? intentions.map((intention, index, array) => (
            <Chip
              key={intention.name}
              style={array.length === (index + 1) ? styles.chip : styles.chipDark}
              labelColor={array.length === (index + 1) ? white : ''}
            >
              {intention.name}
            </Chip>
          ),
        ) : (
          <span>awaiting data</span>
        )}
      </div>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    style: {
      width: 100,
    },
    render: actions => (
      <div className="actionsContainer" style={{ overflowX: 'scroll' }}>
        {actions && actions.length ? (
          actions.map((action, index, array) => (
            <Chip
              key={action.id}
              style={array.length === (index + 1) ? styles.chip : styles.chipDark}
              labelColor={array.length === (index + 1) ? white : ''}
            >
              <Avatar
                backgroundColor={array.length === (index + 1) ? deepPurple800 : ''}
                size={32}
              >
                {action.source.charAt(0)}
              </Avatar> {action.name} { action.status === 'in-progress' && <img src="/images/loader.gif" alt="loading" /> }
            </Chip>
          ))
        ) : (
          <span>awaiting actions</span>
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
    render: (pinToTop, item) => (<Toggle
      name={item._id}
      tooltip="Pin to Top"
      toggled={pinToTop}
      onToggle={passedId => addPinned(passedId)}
    />),
  },
  {
    label: 'Open',
    style: {
      width: 30,
    },
    render: (name, item) => (
      <IconButton
        tooltip="Open"
        onClick={() => openDrawer(item._id)}
      >
        <ChatIcon color={grey500} />
      </IconButton>
    ),
  },
  {
    key: '_id',
    label: 'More',
    style: {
      width: 30,
    },
    render: (id) => {
      const sessionUrl = `./session/${id}`;
      return (
        <div>
          <IconButton
            href={sessionUrl}
            tooltip="More"
          >
            <MoreIcon />
          </IconButton>
        </div>
      );
    },
  },
]);

class SessionsTable extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    openDrawer: PropTypes.func.isRequired,
    addPinned: PropTypes.func.isRequired,
  }

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

  componentDidMount() {
    const intentionsContainers = document.getElementsByClassName('intentionsContainer');
    [...intentionsContainers].forEach(intention => intention.scrollLeft = 10000); // eslint-disable-line

    const actionsContainers = document.getElementsByClassName('actionsContainer');
    [...actionsContainers].forEach(action => action.scrollLeft = 10000); // eslint-disable-line
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
    const { items, openDrawer, addPinned } = this.props;
    const { rowSize, page } = this.state;

    // Build the initial conversation array, moving pinned items
    // to the top.
    const pinned = items.filter(conv => conv.pinToTop);
    const notPinned = items.filter(conv => !conv.pinToTop);
    const data = [
      ...pinned,
      ...notPinned,
    ];

    const displayData = data.slice(rowSize * (page - 1), rowSize * page);

    return (
      <MuiThemeProvider muiTheme={createMuiTheme(datatableTheme)}>
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
          count={items.length}
          tableHeaderColumnStyle={{ color: 'black' }}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(SessionsTable);

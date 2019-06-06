import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MUIDataTable from 'mui-datatables';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Toggle from '@material-ui/core/Switch';
import {
  FiCloud as OnlineIcon,
  FiCloudOff as OffIcon,
  FiMoreVertical as MoreIcon,
  FiEye as MonitorIcon,
} from 'react-icons/fi';
import { grey500, deepPurple500, deepPurple800, white } from '@material-ui/core/colors';
import { columns } from './datatable';
import theme from '../theme';
import s from './style.css';

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

    const options = {
      print: false,
      download: false,
      selectableRows: false,
      count: items.length ? items.length : 0,
      onRowClick: (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
        this.selectApp(rowData[1]);
      },
    };

    return (
      <ThemeProvider theme={theme}>
        <MUIDataTable
          options={options}
          columns={columns(addPinned, openDrawer)}
          data={displayData}
        />
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(SessionsTable);

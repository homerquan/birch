/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 01:26:21
*/

import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DataTables from 'material-ui-datatables';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from 'material-ui/IconButton';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import AddIcon from 'react-material-icons/icons/content/add';
import CodeIcon from 'material-ui/svg-icons/action/code';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import MoreIcon from 'react-material-icons/icons/navigation/more-vert';
import {
  Toolbar,
  ToolbarGroup,
} from 'material-ui/Toolbar';
import { openSnackbar } from 'mui-redux-alerts-next';
import datatableTheme from '../datatableTheme';
import * as runtimeActions from '../../actions/runtime';
import lightTheme from '../theme';
import s from './style.css';
import NewApp from '../NewApp';
import CopyCodeModal from './CopyCodeModal';

const appsQuery = gql`
query Apps($userId: String) {
  appConnection(first:10,filter:{_owner:$userId}) {
     count
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          name
          token
          updatedAt
          _owner
        }
      }
  } 
}
`;

const tableColumns = (openCodeModal, selectApp) => ([
  {
    key: 'name',
    label: 'Name',
    style: {
      width: 160,
    },
  },
  {
    key: 'host',
    label: 'Host',
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
    key: 'id',
    label: 'View',
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

const confirmCopy = { message: 'Embed code has been copied to your clipboard', autoHideDuration: 600000 };

class AppsView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
      selectedConversation: null,
      newAppModalIsOpen: false,
      codeModalIsOpen: false,
      codeModalCode: '',
    };

    this.closeNewAppModal = this.closeNewAppModal.bind(this);
    this.openNewAppModal = this.openNewAppModal.bind(this);
    this.openCodeModal = this.openCodeModal.bind(this);
    this.closeCodeModal = this.closeCodeModal.bind(this);
  }

  selectApp = (conversationId) => {
    const conversations = this.transform(this.props.data.botsFeed.bots.edges);
    const selected = conversations.find(convo => convo.id === conversationId);

    this.props.actions.setRuntimeVariable({
      name: 'selectedApp',
      value: selected,
    });

    window.location.replace(`/${selected.id}/conversations`);
  };

  closeNewAppModal() {
    this.setState({ newAppModalIsOpen: false });
  }

  openCodeModal(code) {
    this.setState({
      codeModalIsOpen: true,
      codeModalCode: code,
    });
  }

  closeCodeModal() {
    this.setState({
      codeModalIsOpen: false,
      codeModalCode: '',
    });
  }

  openNewAppModal() {
    this.setState({ newAppModalIsOpen: true });
  }

  render() {
    const { newAppModalIsOpen, codeModalIsOpen, codeModalCode } = this.state;
    const { appConnection, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild />
            <ToolbarGroup>
              <IconButton tooltip="Add" onClick={this.openNewAppModal}>
                <AddIcon />
              </IconButton>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {appConnection.edges.length && appConnection.count > 0 ? (
            <MuiThemeProvider muiTheme={getMuiTheme(datatableTheme)}>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover
                columns={tableColumns(this.openCodeModal, this.selectApp)}
                data={this.transformConnectionNode(appConnection.edges)}
                showCheckboxes={false}
                page={1}
                count={100}
              />
            </MuiThemeProvider>
          ) : (
            <div>
              <div className={s.nothing}>
                <div className={s.fun}>
                  <img src="/images/nothing.png" alt="No Apps" />
                </div>
              </div>
            </div>
          )}
        </div>

        {newAppModalIsOpen &&
          <NewApp
            close={this.closeNewAppModal}
          />
        }

        {codeModalIsOpen &&
          <CopyCodeModal
            close={this.closeCodeModal}
            code={codeModalCode}
            dipatchConfirm={() => this.props.openSnackbar(confirmCopy)}
          />
        }

      </MuiThemeProvider>
    );
  }
}

AppsView.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    botsFeed: PropTypes.object,
  }).isRequired,
  actions: PropTypes.shape({
    setRuntimeVariable: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.isRequired,
};

function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(runtimeActions, dispatch),
    openSnackbar: bindActionCreators(openSnackbar, dispatch),
  };
}

export default withStyles(s)(
  compose(
    graphql(appsQuery, {
      options: props => ({
        variables: { userId: props.userId },
      }),
    }),
  )(connect(selectProps, mapDispatchToProps)(AppsView)),
);

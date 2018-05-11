/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-01 00:34:13
*/

import React from 'react';
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

import datatableTheme from '../datatableTheme';
import * as runtimeActions from '../../actions/runtime';
import lightTheme from '../theme';
import s from './BotsView.css';
import NewApp from '../NewApp/NewApp';
import CopyCodeModal from './CopyCodeModal';

const botsQuery = gql`
  query BotsFeed($clientId: String!) {
    botsFeed(clientId: $clientId) {
      bots(first:1) {
        totalCount
        edges {
          cursor,
          node{
            id,
            name,
            host
            embedCode,
            mode,
            updatedAt
          }
        }
      }
    }
  }
`;

const tableColumns = (openCodeModal, selectBot) => ([
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
      <IconButton onClick={() => selectBot(id)}>
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

class BotsView extends React.Component {
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

  selectBot = (conversationId) => {
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

  transform = data => (_.map(data, 'node'));

  render() {
    const { newAppModalIsOpen, codeModalIsOpen, codeModalCode } = this.state;
    const { botsFeed, loading, refetch } = this.props.data;

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

          {botsFeed.bots && botsFeed.bots.totalCount > 0 ? (
            <MuiThemeProvider muiTheme={getMuiTheme(datatableTheme)}>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover
                columns={tableColumns(this.openCodeModal, this.selectBot)}
                data={this.transform(botsFeed.bots.edges)}
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
          />
        }

      </MuiThemeProvider>
    );
  }
}

BotsView.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    botsFeed: PropTypes.object,
  }).isRequired,
  actions: PropTypes.shape({
    setRuntimeVariable: PropTypes.func,
  }).isRequired,
};

function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(runtimeActions, dispatch),
  };
}

export default withStyles(s)(
  compose(
    graphql(botsQuery, {
      options: props => ({
        variables: { clientId: props.clientId },
      }),
    }),
  )(connect(selectProps, mapDispatchToProps)(BotsView)),
);

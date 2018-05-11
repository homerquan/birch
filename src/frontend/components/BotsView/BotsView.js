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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DataTables from 'material-ui-datatables';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from 'material-ui/IconButton';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import AddIcon from 'react-material-icons/icons/content/add';
import {
  Toolbar,
  ToolbarGroup,
} from 'material-ui/Toolbar';

import * as runtimeActions from '../../actions/runtime';
import config from '../../config';
import lightTheme from '../theme';
import s from './BotsView.css';
import NewApp from './NewApp';

const botsQuery = gql`
  query BotsQuery($clientId: String!) {
    bots(clientId: $clientId) {
      id
      name
      host
      token
    }
  }
`;

const tableColumns = [
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
      width: 60,
    },
  },
  {
    key: 'token',
    label: 'Embed code',
    render: (token, all) => (
      <div>
        <code className={s.smallCode}>
           &lt;script
           src=&quot;{config.widgetUrl}&quot;
           bid=&quot;{all.id}&quot;
           token=&quot;{token}&quot;
           async&gt;&lt;/script&gt;
        </code>
      </div>
    ),
  },
];

class BotsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
      selectedConversation: null,
      newAppModalIsOpen: false,
    };

    this.closeNewAppModal = this.closeNewAppModal.bind(this);
    this.openNewAppModal = this.openNewAppModal.bind(this);
  }

  selectBot = (index) => {
    const selected = this.props.data.bots[index];

    this.props.actions.setRuntimeVariable({
      name: 'selectedApp',
      value: selected,
    });

    window.location.replace(`/${selected.id}/conversations`);
  };

  closeNewAppModal() {
    this.setState({ newAppModalIsOpen: false });
  }

  openNewAppModal() {
    this.setState({ newAppModalIsOpen: true });
  }

  render() {
    const { newAppModalIsOpen } = this.state;
    const { bots, loading, refetch } = this.props.data;

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

          {bots && bots.length ? (
            <DataTables
              height={'auto'}
              selectable={false}
              showRowHover
              columns={tableColumns}
              data={bots}
              showCheckboxes={false}
              onCellClick={this.selectBot}
              page={1}
              count={100}
            />
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

      </MuiThemeProvider>
    );
  }
}

BotsView.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    bots: PropTypes.object,
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

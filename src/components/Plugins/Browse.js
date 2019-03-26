import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import PlusIcon from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

import s from './Browse.css';

const pluginsFeedQuery = gql`
  query PluginsFeed($conversationId: String) {
    pluginsFeed(conversationId: $conversationId) {
      plugins(first:1){
        totalCount,
        pageInfo{
          endCursor,
          hasNextPage
        }
        edges {
          cursor,
          node {
            id,
            type
            name
            installed
            image
            description
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
      currentType: 'all',
      selectedPlugin: {},
    };

    this.openDrawer = this.openDrawer.bind(this);
  }

  handleToggle = () => this.setState({ drawerIsOpen: !this.state.drawerIsOpen });

  openDrawer(pluginId) {
    const { data: { pluginsFeed: { plugins } } } = this.props;

    this.setState({
      selectedPlugin: this.transform(plugins.edges).find(plugin => plugin.id === pluginId),
      drawerIsOpen: true,
    });
  }

  transform = data => (_.map(data, 'node'));

  render() {
    const { loading, refetch, data: { pluginsFeed } } = this.props;
    const { currentType } = this.state;

    if (loading || !pluginsFeed) {
      return 'Loading';
    }

    const displayPlugins = this.transform(pluginsFeed.plugins.edges).filter((plugin) => {
      if (plugin.installed) {
        return false;
      }

      if (currentType === 'all') {
        return true;
      }

      return plugin.type === currentType;
    });

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <DropDownMenu
              value={currentType}
              onChange={(e, i, value) => this.setState({ currentType: value })}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem value={'all'} primaryText="All" />
              <MenuItem value={'data'} primaryText="Data" />
              <MenuItem value={'action'} primaryText="Action" />
              <MenuItem value={'model'} primaryText="Model" />
              <MenuItem value={'other'} primaryText="Other" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
              <ReloadIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <ul className={s.pluginList}>
          {displayPlugins.map(plugin => (
            <li key={plugin.id}>
              <img src={plugin.image} className={s.image} alt="Plugin" />
              <div className={s.content}>
                <h3>{plugin.name} <span>{plugin.type}</span></h3>
                <p className={s.by}>{plugin.author}</p>
                <p className={s.text}>{plugin.description}</p>
                <div>
                  <button
                    className={s.details}
                    onClick={() => this.openDrawer(plugin.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
              <RaisedButton
                label="Add to Application"
                labelPosition="after"
                icon={<PlusIcon />}
                primary
                className={s.raisedButton}
              />
            </li>
          ))}
        </ul>

        <Drawer
          docked={false}
          width="75%"
          openSecondary
          open={this.state.drawerIsOpen}
          onRequestChange={this.handleToggle}
          containerClassName={s.drawer}
        >
          <div className={s.sideBar}>
            <img src={this.state.selectedPlugin.image} className={s.sideBarImage} alt="Plugin" />
            <RaisedButton
              label="Install"
              primary
              fullWidth
              className={s.drawerInstallBtn}
            />
          </div>
          <div className={s.mainContainer}>
            <h2>{this.state.selectedPlugin.name}</h2>
            <p>{this.state.selectedPlugin.description}</p>
          </div>
        </Drawer>
      </div>
    );
  }
}

Browse.propTypes = {
  loading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    pluginsFeed: PropTypes.object,
  }).isRequired,
};

export default withStyles(s)(
  compose(
    graphql(pluginsFeedQuery, {
      options: props => ({
        variables: { conversationId: props.conversationid },
      }),
    }),
  )(Browse),
);

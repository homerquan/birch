import React, { Component } from 'react';
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
import fakeData from './fakeData.json';

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
      currentCategory: 'all',
      selectedPlugin: {},
    };

    this.openDrawer = this.openDrawer.bind(this);
  }

  handleToggle = () => this.setState({ drawerIsOpen: !this.state.drawerIsOpen });

  openDrawer(pluginId) {
    this.setState({
      selectedPlugin: fakeData.plugins.find(plugin => plugin.id === pluginId),
      drawerIsOpen: true,
    });
  }

  render() {
    const { currentCategory } = this.state;
    const refetch = () => ('');

    const displayPlugins = fakeData.plugins.filter((plugin) => {
      if (currentCategory === 'all') {
        return true;
      }

      return plugin.category === currentCategory;
    });

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <DropDownMenu
              value={currentCategory}
              onChange={(e, i, value) => this.setState({ currentCategory: value })}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem value={'all'} primaryText="All" />
              <MenuItem value={'data model'} primaryText="Data Model" />
              <MenuItem value={'action'} primaryText="Action" />
              <MenuItem value={'knowledge'} primaryText="Knowledge" />
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
              <div className={s.imgPlaceholder} />
              <div className={s.content}>
                <h3>{plugin.name} <span>{plugin.category}</span></h3>
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
            <div className={s.fakeImage} />
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

export default withStyles(s)(Browse);

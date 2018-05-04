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
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import s from './Browse.css';
import fakeData from './fakeData.json';

class Installed extends Component {
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
      selectedPlugin: fakeData.installed.find(plugin => plugin.id === pluginId),
      drawerIsOpen: true,
    });
  }

  render() {
    const { currentCategory } = this.state;
    const refetch = () => ('');

    const displayPlugins = fakeData.installed.filter((plugin) => {
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

        {displayPlugins.length > 0
          ? (
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
                        Configure
                      </button>
                    </div>
                  </div>
                  <RaisedButton
                    label="Remove"
                    labelPosition="after"
                    icon={<PlusIcon />}
                    primary
                    className={s.raisedButton}
                  />
                </li>
              ))}
            </ul>
          ) : <p className={s.noPluginsInstalled}>You have no Plugins installed.</p>}

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
              label="Remove"
              secondary
              fullWidth
              className={s.drawerInstallBtn}
            />
          </div>
          <div className={s.mainContainer}>
            <h2>{this.state.selectedPlugin.name}</h2>
            <p>{this.state.selectedPlugin.description}</p>
            <Divider />
            <h2>Options</h2>
            <div className={s.formGroup}>
              <TextField
                hintText="Hint Text"
                floatingLabelText="Configuration Option One"
              />
            </div>
            <div className={s.formGroup}>
              <TextField
                hintText="Hint Text"
                floatingLabelText="Configuration Option Two"
              />
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(s)(Installed);

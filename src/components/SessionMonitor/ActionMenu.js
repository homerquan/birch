import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {FiPlus as AddIcon} from 'react-icons/fi';
import {FiPaperclip as AttachFileIcon} from 'react-icons/fi';
import {FiPlus as DescriptionIcon} from 'react-icons/fi';

import SubMenu from './SubMenu';

const styles = {
  popupStyle: {
    padding: '0px',
    border: 'none',
    marginLeft: '12px',
    width: '180px',
  },
  subHeaderStyle: {
    lineHeight: '16px',
    paddingTop: '10px',
    paddingLeft: '12px',
    paddingBottom: '5px',
    fontSize: '14px',
  },
  listStyle: {
    padding: 0,
  },
  listItemStyle: {
    fontSize: '14px',
  },
  innerDivStyle: {
    padding: '8px 16px 8px 40px',
  },
  smallIcon: {
    width: 16,
    height: 16,
    margin: '7px 7px',
  },
};

const ActionMenu = ({ plugins }) => (
  <Popup
    trigger={<IconButton><AddIcon /></IconButton>}
    position="top left"
    on="click"
    mouseLeaveDelay={300}
    closeOnDocumentClick
    contentStyle={styles.popupStyle}
    arrow={false}
    offsetY={10}
  >
    <List style={styles.listStyle}>
      <ListSubheader style={styles.subHeaderStyle}>General Actions</ListSubheader>
      <ListItem
        style={styles.listItemStyle}
        innerDivStyle={styles.innerDivStyle}
        primaryText="File"
        leftIcon={<AttachFileIcon style={styles.smallIcon} />}
      />
      <ListItem
        style={styles.listItemStyle}
        innerDivStyle={styles.innerDivStyle}
        primaryText="Post"
        leftIcon={<DescriptionIcon style={styles.smallIcon} />}
      />
      <ListSubheader style={styles.subHeaderStyle}>Plugins</ListSubheader>
      {plugins.map(plugin => <SubMenu key={plugin.name} plugin={plugin} />)}
    </List>
  </Popup>
);

ActionMenu.propTypes = {
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sub: PropTypes.array,
    }),
  ).isRequired,
};

export default ActionMenu;

import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import AttachFileIcon from 'material-ui/svg-icons/editor/attach-file';
import DescriptionIcon from 'material-ui/svg-icons/action/description';

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
      <Subheader style={styles.subHeaderStyle}>General Actions</Subheader>
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
      <Subheader style={styles.subHeaderStyle}>Plugins</Subheader>
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

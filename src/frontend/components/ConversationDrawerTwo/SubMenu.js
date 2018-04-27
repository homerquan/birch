import React from 'react';
import Popup from 'reactjs-popup';
import { List, ListItem } from 'material-ui/List';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import PermContactIcon from 'material-ui/svg-icons/action/perm-contact-calendar';

const styles = {
  popupStyle: {
    padding: '0px',
    border: 'none',
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
  subInnerDivStyle: {
    padding: '8px 16px',
  },
  smallIcon: {
    width: 16,
    height: 16,
    margin: '7px 7px',
  },
};

const SubMenu = () => {
  return (
    <Popup
      trigger={
        <ListItem
          style={styles.listItemStyle}
          innerDivStyle={styles.innerDivStyle}
          primaryText="Google Calendar" 
          leftIcon={<PermContactIcon style={styles.smallIcon} />} 
          rightIcon={<ChevronRight style={styles.smallIcon} />}
        />
      }
      position="right top"
      on="hover"
      mouseLeaveDelay={300}
      closeOnDocumentClick
      contentStyle={styles.popupStyle}
      arrow={false}
      offsetX={8}
    >
      <List style={styles.listStyle}>
        <ListItem
          style={styles.listItemStyle}
          innerDivStyle={styles.subInnerDivStyle}
          primaryText="Create an Event"
        />
        <ListItem
          style={styles.listItemStyle}
          innerDivStyle={styles.subInnerDivStyle}
          primaryText="Cancel Event"
        />
      </List>
    </Popup>
  );
};

export default SubMenu;

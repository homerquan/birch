/*
* @Author: homer
* @Date:   2019-05-29 15:49:34
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 15:57:00
*/

import React from 'react';
import ListItem from '@material-ui/core/ListItem';

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

export default ListItemLink;
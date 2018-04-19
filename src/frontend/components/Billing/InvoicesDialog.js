import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import { deepPurple500, green500 } from 'material-ui/styles/colors';


import s from './AddCreditCardDialog.css';

const rowRight = {
  textAlign: 'right',
  cursor: 'pointer',
};


const AddCreditCard = ({
  title,
  actions,
  open,
  onRequestClose,
}) => (
  <Dialog
    title={title}
    actions={actions}
    modal={false}
    open={open}
    onRequestClose={onRequestClose}
  >
    <div>
      <Table className={s.table}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>0001</TableRowColumn>
            <TableRowColumn>Reflen</TableRowColumn>
            <TableRowColumn style={rowRight}><ViewIcon color={green500} /></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>0002</TableRowColumn>
            <TableRowColumn>ConvoSpot</TableRowColumn>
            <TableRowColumn style={rowRight}><ViewIcon color={green500} /></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>0003</TableRowColumn>
            <TableRowColumn>Reflen</TableRowColumn>
            <TableRowColumn style={rowRight}><ViewIcon color={green500} /></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Dialog>
);

AddCreditCard.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default withStyles(s)(AddCreditCard);

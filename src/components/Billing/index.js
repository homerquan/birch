import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCreditCardDialog from './AddCreditCardDialog';
import InvoicesDialog from './InvoicesDialog';
import s from './style.css';

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditCardDialogOpen: false,
      invoicesDialogOpen: false,
    };

    this.handleCCDialogOpen = this.handleCCDialogOpen.bind(this);
    this.handleCCDialogClose = this.handleCCDialogClose.bind(this);
    this.handleAddCreditCard = this.handleAddCreditCard.bind(this);
    this.handleInvoicesDialogOpen = this.handleInvoicesDialogOpen.bind(this);
    this.handleInvoicesDialogClose = this.handleInvoicesDialogClose.bind(this);
  }

  handleCCDialogOpen() {
    this.setState({ creditCardDialogOpen: true });
  }

  handleCCDialogClose() {
    this.setState({ creditCardDialogOpen: false });
  }

  handleAddCreditCard() {
    // make call to save card info ...

    this.setState({ creditCardDialogOpen: false });
  }

  handleInvoicesDialogOpen() {
    this.setState({ invoicesDialogOpen: true });
  }

  handleInvoicesDialogClose() {
    this.setState({ invoicesDialogOpen: false });
  }
  
  render() {
    const creditCardActions = [
      <Button label="Save" onClick={this.handleAddCreditCard} />,
      <Button label="Cancel" secondary onClick={this.handleCCDialogClose} />,
    ];

    const invoicesActions = [
      <Button label="Close" onClick={this.handleInvoicesDialogClose} />,
    ];

    return (
      <div className={s.container}>
        <div>
          <h3 className={s.sectionTitle}>Billing Information</h3>
        </div>

        <div>
          <p className={s.noCCText}>This account does not have a credit card.</p>
          <Button variant="contained"
            primary
            label="Add Credit Card"
            onClick={this.handleCCDialogOpen}
          />

          <Table className={s.table}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>Current Usage</TableCell>
                <TableCell>Not Available</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Platform Credits</TableCell>
                <TableCell>$0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className={s.divider}>
          <Divider />
        </div>

        <div>
          <h3 className={s.sectionTitle}>Invoices</h3>
        </div>
        <div>
          <Button variant="contained"
            label="View Invoices"
            onClick={this.handleInvoicesDialogOpen}
          />
        </div>

        <AddCreditCardDialog
          title="Add New Card"
          actions={creditCardActions}
          open={this.state.creditCardDialogOpen}
          onRequestClose={this.handleCCDialogClose}
        />

        <InvoicesDialog
          title="Past Invoices"
          actions={invoicesActions}
          open={this.state.invoicesDialogOpen}
          onRequestClose={this.handleInvoicesDialogClose}
        />

      </div>
    );
  }
}

export default withStyles(s)(Billing);

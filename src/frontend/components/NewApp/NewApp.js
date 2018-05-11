import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import s from './NewApp.css';
import Info from './Info';
import Properties from './Properties';
import Finish from './Finish';

class NewApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.nextPage = this.nextPage.bind(this);
    this.backPage = this.backPage.bind(this);
  }

  nextPage() {
    const { page } = this.state;

    if (page < 3) {
      this.setState({ page: page + 1 });
    } else {
      this.props.close();
    }
  }

  backPage() {
    const { page } = this.state;

    if (page > 1) {
      this.setState({ page: page - 1 });
    }
  }

  render() {
    const { page } = this.state;

    return (
      <div className={s.container}>
        <div className={s.background} onClick={this.props.close} />
        <div className={s.mainContainer}>
          <div className={s.main}>
            <div className={s.sidebar}>
              <List>
                <ListItem
                  style={{ paddingLeft: '50px', color: 'white' }}
                  primaryText="Name"
                  leftCheckbox={
                    <Checkbox
                      iconStyle={{ fill: 'white' }}
                      checkedIcon={<CheckCircleIcon />}
                      uncheckedIcon={<RadioButtonUnchecked />}
                    />}
                />
                <ListItem
                  style={{ paddingLeft: '50px', color: 'white' }}
                  primaryText="Properties"
                  leftCheckbox={
                    <Checkbox
                      iconStyle={{ fill: 'white' }}
                      checkedIcon={<CheckCircleIcon />}
                      uncheckedIcon={<RadioButtonUnchecked />}
                    />}
                />
                <ListItem
                  style={{ paddingLeft: '50px', color: 'white' }}
                  primaryText="Finish"
                  leftCheckbox={
                    <Checkbox
                      iconStyle={{ fill: 'white' }}
                      checkedIcon={<CheckCircleIcon />}
                      uncheckedIcon={<RadioButtonUnchecked />}
                    />}
                />
              </List>
            </div>
            <div className={s.body}>
              {page === 1 && <Info next={this.nextPage} />}
              {page === 2 && <Properties next={this.nextPage} back={this.backPage} />}
              {page === 3 && <Finish next={this.nextPage} back={this.backPage} text="Some test text" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewApp.propTypes = {
  close: PropTypes.func.isRequired,
};

export default withStyles(s)(NewApp);

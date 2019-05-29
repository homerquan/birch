import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Info from './Info';
import Properties from './Properties';
import Finish from './Finish';
import s from './style.css';

class NewApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pagesComplete: [
        false,
        false,
        false,
      ],
    };

    this.nextPage = this.nextPage.bind(this);
    this.backPage = this.backPage.bind(this);
  }

  nextPage() {
    const { page, pagesComplete } = this.state;

    if (page < 2) {
      pagesComplete[page] = true;

      this.setState({
        page: page + 1,
        pagesComplete,
      });
    } else {
      this.props.close();
    }
  }

  backPage() {
    const { page, pagesComplete } = this.state;

    if (page > 0) {
      pagesComplete[page - 1] = false;

      this.setState({
        page: page - 1,
        pagesComplete,
      });
    }
  }

  renderSidebarIcons = (step, page, completed) => {
    if (completed) {
      return <CheckCircleIcon color="white" />;
    }

    if (page === step) {
      return <RadioButtonChecked color="white" />;
    }

    return <RadioButtonUnchecked color="white" />;
  }

  render() {
    const { page, pagesComplete } = this.state;

    return (
      <div className={s.container}>
        <div className={s.background} onClick={this.props.close} />
        <div className={s.mainContainer}>
          <div className={s.main}>
            <div className={s.sidebar}>
              <List>
                <ListItem style={{ color: 'white' }} primaryText="Name" leftIcon={this.renderSidebarIcons(0, page, pagesComplete[0])} />
                <ListItem style={{ color: 'white' }} primaryText="Properties" leftIcon={this.renderSidebarIcons(1, page, pagesComplete[1])} />
                <ListItem style={{ color: 'white' }} primaryText="Finish" leftIcon={this.renderSidebarIcons(2, page, pagesComplete[2])} />
              </List>
            </div>
            <div className={s.body}>
              {page === 0 && <Info next={this.nextPage} />}
              {page === 1 && <Properties next={this.nextPage} back={this.backPage} />}
              {page === 2 && <Finish next={this.nextPage} back={this.backPage} text="Some test text" />}
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

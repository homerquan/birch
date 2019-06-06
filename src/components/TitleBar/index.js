import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

class Title extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {

    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <ul className={classes.breadcrumb}>
          <li>
            <a href="/" className={classes.homeLink}>Home</a><span className={classes.separator}>|</span>
          </li>
          <li>
            {this.props.title}
          </li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Title);

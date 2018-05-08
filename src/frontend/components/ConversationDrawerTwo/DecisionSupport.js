import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';

import s from './DecisionSupport.css';

const DecisionSupport = () => {
  const styles = {
    badgeRootStyle: {
      padding: 0,
    },
    badgeStyle: {
      top: -3,
      right: 1,
      width: 18,
      height: 18,
      fontSize: 10,
    },
  };

  return (
    <div>
      <Paper className={s.decisionThinking}>
        <p className={s.decisionThinkingText}>Filling out referral form...</p>
        <LinearProgress mode="indeterminate" />
      </Paper>
      <Paper className={s.decisionAction} zDepth={3}>
        <p className={s.decisionActionText}>
          <b>Recommend: </b> Real-time engagement driven by augmented intelligence.
        </p>
        <div className={s.decisionButtons}>
          <FlatButton label="Cancel" primary />
          <Badge
            badgeContent={4}
            primary
            style={styles.badgeRootStyle}
            badgeStyle={styles.badgeStyle}
          >
            <FlatButton label="Accept" />
          </Badge>
        </div>
      </Paper>
    </div>
  );
};

// DecisionSupport.propTypes = {

// };

export default withStyles(s)(DecisionSupport);

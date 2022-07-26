import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import classnames from 'classnames';

import s from './DecisionSupport.css';

const DecisionSupport = ({ isOpen, enableTraining, openTraining }) => {

  const containerClass = classnames(
    s.decisionSupportContainer,
    { [s.active]: isOpen },
  );

  return (
    <Paper className={containerClass} zDepth={3}>
      <div>
        <p className={s.decisionThinkingText}>Filling out referral form...</p>
        <LinearProgress mode="indeterminate" />
      </div>

      <div>
        <p className={s.decisionActionText}>
          <b>Recommend: </b> Real-time engagement driven by augmented intelligence.
        </p>
        <div className={s.decisionButtons}>
          <div>
            <Button variant="contained"
              color="primary"
              onClick={openTraining}
              disabled={!enableTraining}
            >
            Edit
            </Button>
          </div>
          <div>
            <Badge
              badgeContent={4}
            >
              <Button label="Accept" />
            </Badge>
            <Button label="Cancel" primary />
          </div>
        </div>
      </div>
    </Paper>
  );
};

DecisionSupport.propTypes = {
  isOpen: PropTypes.number.isRequired,
  enableTraining: PropTypes.bool.isRequired,
  openTraining: PropTypes.func.isRequired,
};

export default withStyles(s)(DecisionSupport);

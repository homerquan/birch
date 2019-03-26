import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Body,
} from '../styled/ExperienceCard';

class ExperienceCard extends React.Component {
  render() {
    return (
      <Container onClick={this.props.onClick}>
        <Header>
          {this.props.headerTitle}
        </Header>
        <Body>
          <p>Card content here</p>
        </Body>
      </Container>
    );
  }
}

ExperienceCard.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  limitToOne: PropTypes.bool.isRequired,
};

export default ExperienceCard;

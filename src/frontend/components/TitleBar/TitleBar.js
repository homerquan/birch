import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styled from 'styled-components';
import theme from '../theme';
import { white } from 'material-ui/styles/colors';

import s from './TitleBar.css';

const { borderShadow, palette } = theme;

const TitleContainer = styled.div`
    padding: 15px 20px;
    box-shadow: ${borderShadow};
    background-color: ${white};
`;

const Breadcrumbs = styled.ul`
  display: flex;
  padding: 0;
  list-style-type: none;
  margin: 0;

  li {
    a, h3 {
      font-size: 16px;
    }

    a {
      color: ${palette.textColor};
      text-decoration: none;
      font-weight: 600;
      transition: 0.03s;

      &:hover {
        color: ${palette.primary1Color};
      }
    }

    .separator {
      margin: 0 5px;
    }

    h3 {
      margin: 0;
      color: ${palette.textColorLight};
      font-weight: 400;
    }
  }
`;


class Title extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <TitleContainer>
        <Breadcrumbs>
          <li>
            <a href="/">Home</a> <span className="separator">|</span>
          </li>
          <li>
            <h3>{this.props.title}</h3>
          </li>
        </Breadcrumbs>
      </TitleContainer>
    );
  }
}

export default withStyles(s)(Title);

import styled from 'styled-components';
import { white } from 'material-ui/styles/colors';

import theme from '../theme';

const { borderShadow, palette } = theme;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: ${borderShadow};
  background-color: ${white};
`;

export const Breadcrumbs = styled.ul`
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

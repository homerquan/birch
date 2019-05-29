import styled from 'styled-components';
import { white } from '@material-ui/core/colors';

import theme from '../theme';

const { palette, borderShadow } = theme;

export const Container = styled.div`
  background-color: ${white};
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;

  &:hover {
    box-shadow: ${borderShadow};
    cursor: pointer;
  }
`;

export const Header = styled.div`
  background-color: ${palette.primary1Color};
  color: ${white};
  padding: 10px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const Body = styled.div`
  padding: 10px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;

  p {
    margin: 0;
  }
`;

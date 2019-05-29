import styled from 'styled-components';
import { white } from '@material-ui/core/colors';

import theme from '../theme';

const { palette } = theme;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette.primary1Color};
`;

export const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin: 0;
  color: ${white};
`;

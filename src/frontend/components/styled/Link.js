import styled from 'styled-components';

import theme from '../theme';
import Link from '../Link';

export default styled(Link)`
  color: ${theme.palette.primary1Color};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

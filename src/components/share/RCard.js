import { white, grey100 } from '@material-ui/core/colors';

import styled from 'styled-components';
import theme from '../theme';

const { palette, shadows, shape: { borderRadius } } = theme;

export const RCard = styled.div`
  background-color: ${palette.background.paper};
  box-shadow: ${shadows[2]};
  border-radius: ${borderRadius}px;
  margin-bottom: 20px;
  width: 100%;
`;

export const RCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  
  h2 {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    padding-left: 10px;
  }

  .title-container {
    display: flex;
  }

  .title-icon {
    height: 22px;
    width: 22px;
  }

  .button-container {
    justify-self: flex-end;
    margin-top: -12px;
    margin-right: -12px;
  }
`;

export const RCardBody = styled.div`
  padding: 0px 15px 15px 15px;
`;

export const RCardFooter = styled.a`
  display: flex;
  align-items: center;
  padding: 15px;
  border-top: 1px solid ${palette.divider};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${palette.grey['50']};
  }

  .link-text {
    color: ${palette.textColor};
    padding-left: 10px;
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }
`;

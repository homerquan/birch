import { white, grey100 } from 'material-ui/styles/colors';

import styled from 'styled-components';
import theme from '../theme';

const { palette, borderShadow } = theme;

export const RCard = styled.div`
  background-color: ${white};
  box-shadow: ${borderShadow};
  margin-bottom: 20px;
  width: 100%;
`;

export const RCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 0 15px;
  
  h2 {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    padding-left: 10px;
  }

  .title-container {
    display: flex;
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
  border-top: 1px solid ${palette.borderColor};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${grey100};
  }

  .link-text {
    color: ${palette.textColor};
    padding-left: 10px;
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }
`;

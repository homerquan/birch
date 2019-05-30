/*
* @Author: homer
* @Date:   2019-05-29 21:21:10
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 22:10:02
*/
import styled from 'styled-components';
import { white, grey500 } from '@material-ui/core/colors';

import theme from '../theme';

const { palette, borderShadow } = theme;

export const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Search = styled.div`
  background-color: ${props => (props.isFocused ? white : '#dfe1e2')};
  box-shadow: ${props => (props.isFocused ? borderShadow : 'none')};
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  z-index: 2;
  max-width: 400px;
  width: 100%;
  height: 45px;

  input {
    background-color: transparent;
    margin-left: 10px;
    border: none;
    width: 100%;
    outline: none;
    margin: 6px 0 6px 10px;

    &::placeholder {
      color: ${grey500};
      font-weight: 300;
    }
  }
`;

export const SearchResultsContainer = styled.div`  
  position: absolute;
  background-color: ${white};
  top: 32px;
  width: 100%;
  left: 0;
  box-shadow: ${borderShadow};
  z-index: 2;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 10px;
  }
`;

export const SearchContainerBG = styled.div`
  opacity: ${props => (props.isFocused ? 1 : 0)};
  height: ${props => (props.isFocused ? 'auto' : 0)};
  position: fixed;
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.25);
  z-index: 1;
  transition: height 0ms 0ms, opacity 250ms 0ms;
`;

export const HackySearchBG = styled.div`
  opacity: ${props => (props.isFocused ? 1 : 0)};
  height: ${props => (props.isFocused ? '48px' : 0)};
  position: fixed;
  top: 0px;
  right: 0;
  left: 0;
  background-color: transparent;
  z-index: 1;
  transition: height 0ms 0ms, opacity 250ms 0ms;
`;

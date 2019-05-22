import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white, black, grey400, grey800 } from 'material-ui/styles/colors';
import ArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import theme from '../theme';
import { closeConsole } from '../../actions/console';

const ConsoleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100vh;
  bottom: ${props => (props.isOpen ? '0vh' : '-100vh')};
  transition: .3s;
  background-color: grey;
`;

const CloseButton = styled.button`
  width: 15%;
  height: 8px;
  background-color: red;
  border-radius: 15px;
  border: none;
  position: absolute;
  top: 4px;
  left: 42.5%;
  background-color: ${grey400};

  &:focus {
    outline: none;
    cursor: pointer;
  }
`;

const HistoryContainer = styled.div`
  background-color: ${black};
  border: 10px solid ${grey800};
  border-top: 16px solid ${grey800};
  min-height: 30vh;
`;

const CommandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${black};
  border-left: 10px solid ${grey800};
  border-right: 10px solid ${grey800};
  border-bottom: 10px solid ${grey800};
`;

const Input = styled.input`
    background-color: ${black};
    display: flex;
    flex: 1;
    width: 100%;
    border: none;
    color: ${white};
    padding: 15px 10px;
    padding-left: 0;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
`;

class Console extends BaseComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeConsole: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <ConsoleContainer isOpen={this.props.isOpen}>
          <CloseButton onClick={this.props.closeConsole} />
          <HistoryContainer>
            <p>History Container</p>
          </HistoryContainer>
          <CommandContainer>
            <ArrowIcon color={white} style={{ width: '36px', height: '36px' }} />
            <Input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
          </CommandContainer>
        </ConsoleContainer>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.console.isOpen,
});

const mapPropsToDispatch = dispatch => ({
  closeConsole: bindActionCreators(closeConsole, dispatch),
});

export default connect(mapStateToProps, mapPropsToDispatch)(Console);

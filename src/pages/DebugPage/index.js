import React from 'react';
import PropTypes from 'prop-types';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../components/theme';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import DebugView from '../../components/DebugView';

class DebugPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  logoutHandler(event) {
    event.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <DebugView />
            </Section>
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}

export default DebugPage;

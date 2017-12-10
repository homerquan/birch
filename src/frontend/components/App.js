
import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
  // Apollo Client
  client: PropTypes.object.isRequired,
};


class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.Children.only(this.props.children);
  }

}

export default App;

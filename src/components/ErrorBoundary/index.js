import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    console.log("render ErrorBOundry");

    if (this.state.hasError) {
      console.log('fasfdsalfadsfsadf');
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    console.log("render ErrorBOundry no errro");
    return this.props.children;
  }
}

export default ErrorBoundary;

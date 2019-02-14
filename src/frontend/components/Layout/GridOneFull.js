import React from 'react';
import { Slot } from 'react-page-layout';

class GridOneFull extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Slot name="titleBar" />
        <Slot name="main" style={{ height: '100%' }} />
      </div>
    );
  }
}

export default GridOneFull;

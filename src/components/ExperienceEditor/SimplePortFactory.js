import * as React from 'react';
import * as SRD from 'storm-react-diagrams';

class SimplePortFactory extends SRD.AbstractPortFactory {
  cb;

  constructor(type, cb) {
    super(type);
    this.cb = cb;
  }

  getNewInstance(initialConfig) {
    return this.cb(initialConfig);
  }
}

export default SimplePortFactory;

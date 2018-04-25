'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _spacing = require('material-ui/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Open Sans, Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: _colors.deepPurple500,
    primary2Color: _colors.deepPurple700,
    primary3Color: _colors.grey600,
    accent1Color: _colors.pinkA200,
    accent2Color: _colors.grey100,
    accent3Color: _colors.pinkA100,
    textColor: _colors.darkBlack
  }
};
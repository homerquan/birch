'use strict';

const colors = require('material-ui/styles/colors');
const spacing = require('material-ui/styles/spacing');

function interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spacing2 = interopRequireDefault(spacing);


Object.defineProperty(exports, '__esModule', {
  value: true,
});


exports.default = {
  spacing: spacing2.default,
  fontFamily: 'Open Sans, Roboto, sans-serif',
  borderRadius: 2,
  borderShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  palette: {
    primary1Color: colors.deepPurple500,
    primary2Color: colors.deepPurple700,
    primary3Color: colors.grey600,
    accent1Color: colors.green100,
    accent2Color: colors.grey100,
    accent3Color: colors.pinkA100,
    textColor: colors.darkBlack,
    textColorLight: colors.grey400,
    borderColor: colors.grey300,
  },

  appBar: {
    height: 48,
  },
};

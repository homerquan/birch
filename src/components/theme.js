'use strict';

const colors = require('material-ui/styles/colors');
const spacing = require('material-ui/styles/spacing');

function interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spacing2 = interopRequireDefault(spacing);


Object.defineProperty(exports, '__esModule', {
  value: true,
});


exports.default = {
  root: {},
  spacing: spacing2.default,
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'Open Sans',
      'Roboto',
      'Roboto',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  palette: {
    primary1Color: colors.deepPurple500,
    primary1Highlight: colors.deepPurple400,
    primary2Color: colors.deepPurple700,
    primary3Color: colors.grey600,
    accent1Color: colors.green100,
    accent2Color: colors.grey100,
    accent3Color: colors.pinkA100,
    textColor: colors.darkBlack,
    textColorLight: colors.grey400,
    borderColor: colors.grey300,
  },
  checked: {},
  appBar: {
    height: 48,
  },
};

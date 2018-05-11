Object.defineProperty(exports, '__esModule', {
  value: true,
});

const colors = require('material-ui/styles/colors');

const spacing = require('material-ui/styles/spacing');

const spacing2 = _interopRequireDefault(spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  spacing: spacing2.default,
  fontFamily: 'Open Sans, Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: colors.deepPurple500,
    primary2Color: colors.deepPurple700,
    primary3Color: colors.grey600,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey600,
    textColor: colors.darkBlack,
  },
};

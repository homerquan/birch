import * as colors from '@material-ui/core/colors';

export default {
  root: {},
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
    primary2Color: colors.deepPurple700,
    primary3Color: colors.grey600,
    accent1Color: colors.pinkA200,
    accent2Color: colors.pinkA400,
    accent3Color: colors.pinkA100,
    textColor: colors.fullWhite,
  },
  appBar: {
    height: 48,
    textColor: colors.fullWhite,
    titleFontWeight: 300,
  },
  snackbar: {
    textColor: colors.fullWhite,
    backgroundColor: colors.fullBlack,
    actionColor: colors.deepPurple500,
  },
};

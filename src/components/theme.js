import { createMuiTheme } from '@material-ui/core/styles';

const typograph = {
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
};

const palette = {
  primary: { main: '#4527a0' },
  secondary: { main: 'rgb(0, 115, 227)' },
};

const themeName = 'reflen default';

export default createMuiTheme({ typograph, palette, themeName });

import theme from '../theme';

const { palette } = theme;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
  },
  breadcrumb: {
  	display: 'flex',
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    color: palette.text.primary,
    fontWeight: '600',
  },
  homeLink: {
  	textDecoration: 'none',
    color: palette.text.disabled,
  },
  separator: {
  	color: palette.text.divider,
  	margin: '0 5px',
  },
};

export default styles;

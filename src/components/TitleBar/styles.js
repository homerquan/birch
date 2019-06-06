import theme from '../theme';
import { spacing } from '@material-ui/system';

const { palette, borderRadius, borderShadow } = theme;

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
    color: palette.text.disabled,
    fontWeight: '400',
  },
  homeLink: {
  	textDecoration: 'none',
    color: palette.text.secondary,
  },
  separator: {
  	color: palette.text.divider,
  	margin: '0 5px',
  },
};

export default styles;

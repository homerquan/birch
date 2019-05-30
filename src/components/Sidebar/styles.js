/*
* @Author: homer
* @Date:   2019-05-29 23:56:14
* @Last Modified by:   homer
* @Last Modified time: 2019-05-30 00:23:52
*/

import theme from '../theme';
import { spacing } from '@material-ui/system';
import { deepPurple500, white } from '@material-ui/core/colors';

const { palette, borderRadius, borderShadow } = theme;

const styles = {
  
   // .link
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
  },
   // .leftMenu
  leftMenu: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: 'var(--fixed-menu-width)',
    backgroundColor: deepPurple500,
  },
   // .rightMenu
  rightMenu: {
    marginLeft: 'var(--fixed-menu-width)',
  },
  // .fixedButton
  fixedButton: {
    marginLeft: '14px',
    marginTop: '6px',
    marginBottom: '12px',
  },
  // .logo
  logo: {
    marginLeft: '10px',
    marginTop: '10px',
    cursor: 'pointer',
    paddingLeft: spacing.desktopGutter,
    marginTop: 24,
    marginBottom: 8,
  },
  // .bottomSection
  bottomSection: {
    position: 'absolute',
    bottom: '2px',
  },
  // .logoText
  logoText: {
    fontWeight: '100',
    margin: '12px 0px',
  },
  drawer: {
    width: 320,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
  large: {
    width: 60,
    height: 60,
    padding: 0,
  },
  largeIcon: {
    width: 48,
    height: 48,
  },
  darkLink: {
    color: '#757575',
    fontWeight: '600',
    paddingLeft: 10,
  },
  iconItem: {
    paddingLeft: 10,
  },
};

export default styles;

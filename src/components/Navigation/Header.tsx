import { forwardRef, useState, useEffect } from 'react';

import { AppBar, Toolbar, Hidden, IconButton, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import cx from 'classnames';

import HeaderLinks from './HeaderLinks';
import Logo from './Logo';
import Navigator from './Navigator';
import { boxShadow, drawerWidth, transition } from 'assets/styles';
import { useRowFlexStyles } from 'assets/styles/flex';
import ROUTES from 'constants/routes';
import { Link } from 'gatsby';

export const headerHeight = '52px';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appBar: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      zIndex: 999, // lightbox zIndex: 1000,
      backgroundRepeat: 'no-repeat',
      filter: 'none',
      textShadow: '1px 1px 1px rgba(0,0,0,.3)',
      backgroundColor: '#000',
      color: theme.palette.common.white,
      borderBottom: '1px solid #333',
    },
    drawerBrandHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1),
      height: '50px',
    },
    mobileBrand: {
      width: '100%',
      color: 'white',
    },
    transparent: {
      background: 'transparent',
      color: 'white',
    },
    container: {
      minHeight: 'auto',
      height: `calc(${headerHeight} - 2px)`,
      flex: 1,
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start',
      },
    },
    leftContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      [theme.breakpoints.down('xs')]: {
        flexGrow: 0,
      },
    },
    brand: {
      fontSize: '22px',
      color: theme.palette.secondary.main,
      textTransform: 'none',
      letterSpacing: '0.1em',
      '&:hover,&:focus': {
        color: theme.palette.secondary.dark,
        background: 'transparent',
      },
    },
    defaultColor: {
      background: 'inherit',
    },
    scrollColor: {
      background: 'blue',
    },
    appResponsive: {
      margin: '20px 10px',
      width: '100%',
      color: 'rgba(255,255,255, 0.7)',
      position: 'absolute',
    },

    drawerPaper: {
      border: 'none',
      bottom: '0',
      transitionProperty: 'top, bottom, width',
      transitionDuration: '.2s, .2s, .35s',
      transitionTimingFunction: 'linear, linear, ease',
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      ...transition,
    },
  })
);

interface Props {
  changeColorOnScroll?: number;
  transparent?: boolean;
}

export const Header = forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const flexStyles = useRowFlexStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(open => !open);

  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset;
    const changeColorOffset = 400;
    if (windowsScrollTop > changeColorOffset) {
      document?.body.getElementsByTagName('header')[0].classList.remove(classes.defaultColor);
      document?.body.getElementsByTagName('header')[0].classList.add(classes.scrollColor);
    } else {
      document?.body.getElementsByTagName('header')[0].classList.add(classes.defaultColor);
      document?.body.getElementsByTagName('header')[0].classList.remove(classes.scrollColor);
    }
  };

  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange);
    }
    return () => {
      if (props.changeColorOnScroll) window.removeEventListener('scroll', headerColorChange);
    };
  });

  return (
    <AppBar
      color="default"
      className={cx({
        [classes.appBar]: true,
        [classes.transparent]: props.transparent !== undefined,
      })}
      position="sticky"
      ref={ref}
    >
      <Toolbar className={classes.container}>
        <Hidden xsDown>
          <HeaderLinks />
        </Hidden>
        <Hidden smUp>
          <Box width="100%" className={flexStyles.relativeParent}>
            <IconButton color="inherit" aria-label="open menu" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
            <Link to={ROUTES.LANDING}               className={flexStyles.centeredChild}
>
            <Logo
              logoSize={40}
              fontSize={20}
              // onClick={() => history.push(ROUTES.LANDING)}
            />
            </Link>
            <div className={flexStyles.rightChild}></div>
          </Box>
        </Hidden>
      </Toolbar>
      <Hidden smUp implementation="css">
        <Navigator open={mobileOpen} onClose={handleDrawerToggle} />
      </Hidden>
    </AppBar>
  );
});

export default Header;

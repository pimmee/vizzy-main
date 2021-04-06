import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { Link, withRouter, RouteComponentProps, useHistory } from 'react-router-dom';

import {
  useMediaQuery,
  SvgIconProps,
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  makeStyles,
  Theme,
  fade,
  Typography,
  IconButton,
  Badge,
  Popper,
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import DiscoverIcon from '@material-ui/icons/Flare';
import HelpIcon from '@material-ui/icons/Help';
import LoginIcon from '@material-ui/icons/LockOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CommunityIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/Person';
import cx from 'classnames';
import { Link } from 'gatsby';
import Logo from './Logo';
import { primaryMainButton } from 'assets/styles';
import { useRowFlexStyles } from 'assets/styles/flex';
import DefaultTooltip from 'components/DefaultTooltip';
// import UserNotificationButton from 'components/UserNotificationButton';
import ROUTES, { NavigationTab } from 'constants/routes';
// import { setTheme } from 'modules/info/actions';
// import { RootState, useSelector } from 'store';
import { UserNotification, UserNotifcationType } from 'types/user';
// import { getDiscoveryPath } from 'views/Discover/Discover';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      fontSize: '14px',
      listStyle: 'none',
      height: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      color: 'inherit',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    groupContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    listItem: {
      float: 'left',
      width: 'auto',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',

      // drawer
      [theme.breakpoints.down('xs')]: {
        width: 250,
      },
    },
    navLink: {
      outline: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '16px',
      padding: theme.spacing(1),
      textTransform: 'none',
      lineHeight: '20px',
      textDecoration: 'none',
      '&:hover,&:focus': {
        textDecoration: 'none',
        color: '#fff',
      },
      // drawer
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 30px)',
        textAlign: 'left',
        padding: 0,
      },
    },
    navLinkActive: {
      position: 'relative',
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          right: '50%',
          transform: 'translate(50%, 0)',
          bottom: 10,
          width: 20,
          height: 1,
          borderRadius: theme.shape.borderRadius,
          background: theme.palette.primary.main,
        },
      },
      [theme.breakpoints.down('xs')]: {
        background: fade('#fff', 0.12),
      },
    },
    icon: {
      margin: theme.spacing(1),
    },
    twitterButton: {
      padding: 6,
      borderRadius: '30px',
      '&$signup': {
        ...primaryMainButton,
        '& > a': {
          color: '#fff',
        },
      },
    },
    signup: {},
  })
);

interface LinkItem {
  path: string;
  name: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

export const getLeftHeaderLinks = (isLoggedIn: boolean): LinkItem[] => {
  return [
    {
      path: ROUTES.DISCOVER,
      name: 'Discover',
      icon: DiscoverIcon, // Used on mobile sidebar
    },
    {
      path: ROUTES.CREATIONS,
      name: 'Creations',
      icon: CommunityIcon,
    },

    // {
    //   path: getDiscoveryPath(NavigationTab.PRICING),
    //   name: 'Pricing',
    //   icon: PricingIcon,
    // },
    {
      path: ROUTES.FAQ,// getDiscoveryPath(NavigationTab.FAQ),
      name: 'FAQ',
      icon: HelpIcon,
    },
  ];
};

export const getRightHeaderlinks = (isLoggedIn: boolean): LinkItem[] => {
  return isLoggedIn
    ? [
        {
          path: ROUTES.PROFILE,
          name: 'Profile',
          icon: ProfileIcon,
        },
      ]
    : [
        {
          path: ROUTES.SIGN_IN,
          name: 'Login',
          icon: LoginIcon,
        },
        {
          path: ROUTES.SIGN_UP,
          name: 'Sign up',
          icon: LoginIcon,
        },
      ];
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location?: any;
}

const linkGroup = (
  links: LinkItem[],
  classes: Record<string, string>,
  isMobile: boolean,
  path: string,
  searchPath?: string
) => {
  return (
    <>
      {links.map((route: LinkItem) =>
        isMobile ? (
          <ListItem
            className={cx(classes.listItem, {
              [classes.navLinkActive]: isMobile && path === route.path,
            })}
            button
            dense
          >
            <ListItemIcon color="inherit">
              <route.icon htmlColor="white" />
            </ListItemIcon>
            <ListItemText>
              <Link to={route.path} className={classes.navLink}>
                {route.name}
              </Link>
            </ListItemText>
          </ListItem>
        ) : (
          <div
            className={cx(classes.listItem, {
              [classes.navLinkActive]: searchPath
                ? path + searchPath === route.path
                : path === route.path,
            })}
            key={route.name}
          >
            {isMobile && <route.icon className={classes.icon} />}

            <div
              className={cx(classes.twitterButton, {
                [classes.signup]: route.path === ROUTES.SIGN_UP,
              })}
            >
              <Link to={route.path} className={classes.navLink}>
                {route.name}
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

function HeaderLinks(props: Props) {
  const classes = useStyles();
  const flexStyles = useRowFlexStyles();
  // const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  // const activeTheme = useSelector(state => state.info.theme);
  // const path = props.location.pathname;
  const user = {}; // TODO

  const path = 'todo';
  // useEffect(() => {
  //   const theme = localStorage.getItem('theme');
  //   if ((theme === 'dark' || theme === 'light') && theme !== activeTheme) {
  //     dispatch(setTheme(theme));
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const newTheme = activeTheme === 'light' ? 'dark' : 'light';
  //   dispatch(setTheme(newTheme));
  //   localStorage.setItem('theme', newTheme);
  // };

  const onClickNotification = (notification: UserNotification) => {
    switch (notification.type) {
      case UserNotifcationType.NEW_PROJECT_COMMENT:
        if (notification.projectId && notification.commentId) {
          // history.push(
          //   `${ROUTES.PROJECT}?id=${notification.projectId}&commentId=${notification.commentId}`
          // );
        }
        break;
      case UserNotifcationType.NEW_PROJECT_LIKE:
        if (notification.projectId) {
          //history.push(`${ROUTES.PROJECT}?id=${notification.projectId}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={cx(classes.list)}>
      {isMobile ? (
        <>
          {linkGroup(getLeftHeaderLinks(!!user), classes, isMobile, path)}
          {linkGroup(getRightHeaderlinks(!!user), classes, isMobile, path)}
        </>
      ) : (
        <>
          <Link to={ROUTES.LANDING}>
            <Logo logoSize={40} fontSize={20}></Logo>
          </Link>
          <div className={cx(classes.groupContainer, flexStyles.autoChild)}>
            {linkGroup(
              getLeftHeaderLinks(!!user),
              classes,
              isMobile,
              path,
              // props.location.search // temporary for Pricing / FAQ in top menu
            )}
          </div>
          <div className={flexStyles.centeredChild}>
            <Typography>
              <span role="img" aria-label="alpha version" style={{ paddingRight: 6, fontSize: 12 }}>
                ⚡️
              </span>
              {`Alpha v${process.env.REACT_APP_VERSION}`}{' '}
            </Typography>
          </div>
          <div className={cx(classes.groupContainer)}>
            {/* <DefaultTooltip title={`Activate ${activeTheme === 'light' ? 'dark' : 'light'} theme`}>
              <IconButton onClick={toggleTheme} size="small">
                {activeTheme === 'light' ? (
                  <Brightness7Icon style={{ color: '#fff' }} />
                ) : (
                  <Brightness3Icon />
                )}
              </IconButton>
            </DefaultTooltip> */}
            {/* <UserNotificationButton onNotificationClick={onClickNotification} /> */}
            {linkGroup(getRightHeaderlinks(!!user), classes, isMobile, path)}
          </div>
        </>
      )}
    </div>
  );
}

// const mapStateToProps = (state: RootState) => ({
//   authUser: state.auth.authUser,
// });

export default HeaderLinks;

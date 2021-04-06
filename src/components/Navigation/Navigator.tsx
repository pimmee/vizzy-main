import { Fragment, useState } from 'react';

import {
  Hidden,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import TemplateIcon from '@material-ui/icons/Brush';
import HomeIcon from '@material-ui/icons/Home';
import FAQIcon from '@material-ui/icons/LiveHelp';
import EasyIcon from '@material-ui/icons/Movie';
import AdvancedIcon from '@material-ui/icons/MovieFilter';
import PricingIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/Person';
import LyricsIcon from '@material-ui/icons/TextFields';
import cx from 'classnames';

import { headerHeight } from 'components/Navigation/Header';
import ROUTES, { NavigationTab } from 'constants/routes';
// import { useSearchQuery } from 'utils/hooks/useSearchQuery';

const getCategories = (isMobile: boolean) => {
  if (isMobile) {
    return [
      {
        id: 'Discover',
        children: [
          // { name: 'Templates', id: NavigationTab.TEMPLATES, icon: <TemplateIcon /> },
          { name: 'Quick Mode', id: ROUTES.COMMUNITY, icon: <EasyIcon /> },
          {
            name: 'Creator Mode',
            id: NavigationTab.CREATOR_MODE,
            icon: <AdvancedIcon />,
          },
          { name: 'Lyrics Mode', id: NavigationTab.LYRICS, icon: <LyricsIcon /> },
          { name: 'Community', id: ROUTES.COMMUNITY, icon: <PeopleIcon /> },
        ],
      },
      {
        id: 'Info',
        children: [
          { name: 'Profile', id: ROUTES.PROFILE, icon: <ProfileIcon /> },
          // { name: 'Pricing', id: NavigationTab.PRICING, icon: <PricingIcon /> },
          { name: 'FAQ', id: NavigationTab.FAQ, icon: <FAQIcon /> },
        ],
      },
    ];
  } else {
    return [
      {
        id: 'Discover',
        children: [
          // { name: 'Templates', id: NavigationTab.TEMPLATES, icon: <TemplateIcon /> },
          // { name: 'Quick Mode', id: NavigationTab.COMMUNITY, icon: <EasyIcon /> },
          { name: 'Creator Mode', id: NavigationTab.CREATOR_MODE, icon: <AdvancedIcon /> },
          { name: 'Lyrics Mode', id: NavigationTab.LYRICS, icon: <LyricsIcon /> },
          { name: 'Community', id: ROUTES.COMMUNITY, icon: <PeopleIcon /> },
        ],
      },
      {
        id: 'Info',
        children: [
          // { name: 'Pricing', id: NavigationTab.PRICING, icon: <PricingIcon /> },
          { name: 'FAQ', id: NavigationTab.FAQ, icon: <FAQIcon /> },
        ],
      },
    ];
  }
};

export const drawerWidth = 220;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        top: headerHeight,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    categoryHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    categoryHeaderPrimary: {},
    item: {
      paddingTop: 2,
      paddingBottom: 2,
      '&:hover,&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemCategory: {
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
    },
    itemActiveItem: {
      color: theme.palette.primary.main,
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  open?: boolean;
  onClose?: () => void;
  onClickTab?: (tab: NavigationTab | string) => void;
}
function Navigator({ open, onClose, onClickTab }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory();
  // const query = useSearchQuery();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  // const activeTab = query.get('tab') as NavigationTab | null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleClickTab = (tab: NavigationTab | string) => {
  //   onClose && onClose();
  //   if (onClickTab) {
  //     onClickTab(tab);
  //   } else {
  //     if (
  //       tab === ROUTES.PROFILE ||
  //       tab === ROUTES.DISCOVER ||
  //       tab === ROUTES.PRICING ||
  //       tab === ROUTES.FAQ ||
  //       tab === ROUTES.COMMUNITY
  //     ) {
  //       history.push(tab);
  //     } else {
  //       history.push(`${ROUTES.DISCOVER}?tab=${tab}`);
  //     }
  //   }
  // };

  const drawer = (
    <div>
      <Divider />
      <List disablePadding>
        <ListItem
          className={cx(
            classes.item,
            classes.itemCategory,
            // activeTab === null && classes.itemActiveItem
          )}
          button
          // onClick={() => handleClickTab(ROUTES.DISCOVER)}
        >
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Overview
          </ListItemText>
        </ListItem>
        {getCategories(isMobile).map(({ id, children }) => (
          <Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ name, id, icon }) => (
              <ListItem
                key={name}
                button
                // className={cx(classes.item, activeTab === id && classes.itemActiveItem)}
                // onClick={() => handleClickTab(id)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {name}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={open !== undefined ? open : mobileOpen}
          onClose={onClose ? onClose : handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Navigator;

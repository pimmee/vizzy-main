import { useState } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Typography, Avatar, Grow } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AdminIcon from '@material-ui/icons/Block';
import CommentIcon from '@material-ui/icons/Comment';
import HeartIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Launch';
import MenuIcon from '@material-ui/icons/MoreHoriz';
import EyeIcon from '@material-ui/icons/Visibility';
import cx from 'classnames';
import { Link } from 'gatsby';
import { primaryDark } from 'assets/theme/editor/editorColors';
import { SimpleDropdown } from 'components/Dropdown';
import WeeklyProjectAward from 'components/Icons/WeeklyProjectAwardIcon';
import DefaultTooltip from 'components/DefaultTooltip';
import ROUTES from 'constants/routes';
import { CommunityProject, ProjectMeta } from 'types/project';
import { AchievementID } from 'types/user';
// import { getProjectUrl } from 'utils/editor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      color: '#717790',
      position: 'relative',
      width: '100%',
      height: '100%',
      '&$interactive': {
        cursor: 'pointer',
      },
      '&:hover': {
        '&:after': {
          clipPath: 'inset(0rem 0 0rem 0rem round 10px)',
          // borderColor: theme.palette.border.main,
        },
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: '-2rem',
        left: 0,
        margin: '-1rem',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: '-1',
        border: '1px solid transparent',
        clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
        contain: 'strict',
        transition: theme.transitions.create('border'),
        // transition: 'clip-path 0.3s ease 0.1s',
      },
    },
    interactive: {},
    header: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '1rem',
      order: 3,
      justifyContent: 'space-between',
    },
    info: {
      display: 'flex',
      width: '100%',
      marginRight: theme.spacing(1),
      color: 'white',
    },
    title: {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
    },
    creator: {
      color: '#c0c3d0',
    },
    wrapper: {
      opacity: '0.99',
      position: 'relative',
      height: 0,
      borderRadius: '6px',
      paddingTop: '56.25%',
      overflow: 'hidden',
      background: '#444857',
      backgroundSize: 'cover',
      '&$achievements': {
        boxShadow: 'rgb(50, 235, 122) 0px 0px 10px 0px',
      },
    },
    previewImg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    video: {
      width: 'calc(200% + 5px)',
      height: 'calc(200% + 5px)',
      border: 0,
      position: 'absolute',
      top: -2,
      left: -2,
      background: 'white',
      transform: 'scale(0.5)',
      transformOrigin: 'top left',
    },
    coverLink: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      border: '0 !important',
      zIndex: 1,
    },
    titleAndCreator: {
      flex: 1,
      marginRight: '1rem',
      width: '95%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    stats: {
      position: 'absolute',
      bottom: '-44px',
      left: '-7px',
      padding: '0 0 0 7px',
      height: '45px',
      zIndex: 1,
      display: ' flex',
      alignItems: 'center',
      overflow: 'hidden',
    },
    editButton: {
      zIndex: 2,
      color: theme.palette.common.white,
      '&:hover': {
        color: primaryDark,
      },
    },
    statsButton: {
      ...theme.typography.caption,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1),
      background: 'rgba(0,0,0,0.9)',
      borderRadius: theme.shape.borderRadius,
      zIndex: 2,
      padding: '0.25rem 0.5rem 0.2rem',
      color: 'white',
      cursor: 'pointer',
      transform: 'translateY(-50%)',
      opacity: 0,
      transitionTimingFunction: 'cubic-bezier(0.2, 0.15, 0.1, 1),ease',
      transitionDelay: '0.2s',
      '&$active': {
        transform: 'translateY(0)',
        opacity: 1,
      },
      '& > svg': {
        marginRight: theme.spacing(0.75),
      },
      '&:hover': {
        background: 'white',
        color: 'black',
      },
    },
    heartIcon: {
      '&:hover': {
        '& > svg': {
          color: 'red',
        },
      },
    },
    comments: {
      maxHeight: 500,
    },
    avatar: { marginRight: theme.spacing(1.5) },
    active: {},
    achievements: {},
  })
);

enum Action {
  OPEN_PROJECT = 'OPEN_PROJECT',
  VIEW_COMMENTS = 'VIEW_COMMENTS',
  VIEW_PROJECT = 'VIEW_PROJECT',

  ADMIN_UNPUBLISH_PROJECT = 'ADMIN_UNPUBLISH_PROJECT',
  ADMIN_DELETE_PROJECT = 'ADMIN_DELETE_PROJECt',
  ADMIN_BAN_USER = 'ADMIN_BAN_USER',
}

interface Props {
  project: CommunityProject | ProjectMeta;
  overrideTitle?: string;
  overrideAvatar?: string;
  overrideUsername?: string;
  className?: string;
  onLikeProject?: (projectId: string) => void;
  onClickProject?: (projectId: string) => void;
  onClick?: (projectId: string) => void;
  onClickViewComments?: (projectId: string) => void;
  isAdmin?: boolean;
  adminUnpublishProject?: (projectId: string) => void;
  adminDeleteProject?: (projectId: string) => void;
  adminBanUser?: (projectId: string) => void;
  interactive: boolean;
  onClickUser?: (userId: string) => void;
}

export default function CommunityProjectCard({
  project,
  overrideTitle,
  overrideAvatar,
  overrideUsername,
  onLikeProject,
  onClickProject,
  onClick,
  onClickViewComments,
  isAdmin,
  adminUnpublishProject,
  adminDeleteProject,
  adminBanUser,
  className,
  interactive,
  onClickUser,
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState('');
  const [mouseOver, setMouseOver] = useState(false);
  const {
    name,
    achievements,
    userId: creatorId,
    id: projectId,
    thumbnail,
    comments,
    clicks,
    likes,
  } = project;
  const userAvatar = overrideAvatar || (project as CommunityProject).userAvatar;
  const creator = overrideUsername || (project as CommunityProject).username;
  const mouseEntered = () => {
    setMouseOver(true);
  };

  const mouseLeaved = () => {
    setMouseOver(false);
  };

  const handleClickLike = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onLikeProject && onLikeProject(projectId);
  };

  const click = () => {
    onClickProject && onClickProject(projectId);
    if (onClick) {
      onClick(projectId);
    } else {
      setRedirect(`${ROUTES.PROJECT}?id=${projectId}`);
    }
  };

  const handleClickEdit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    onClickProject && onClickProject(projectId);
  };

  const projectAchievements = (achievements || []).reduce(
    (total, a) => {
      total[a.id] += 1;
      return total;
    },
    { [AchievementID.WEEK_PROJECT]: 0 }
  );

  const handleMenuClick = (actionId: string) => {
    switch (actionId) {
      case Action.OPEN_PROJECT:
        handleClickEdit();
        break;
      case Action.VIEW_COMMENTS:
        onClickViewComments && onClickViewComments(projectId);
        break;
      case Action.ADMIN_UNPUBLISH_PROJECT:
        adminUnpublishProject && adminUnpublishProject(projectId);
        break;
      case Action.ADMIN_DELETE_PROJECT:
        adminDeleteProject && adminDeleteProject(projectId);
        break;
      case Action.ADMIN_BAN_USER:
        adminBanUser && adminBanUser(creatorId);
        break;
      default:
        break;
    }
  };

  const dropdownItems = [
    {
      actionId: Action.OPEN_PROJECT,
      name: 'Open in editor',
      icon: <EditIcon fontSize="inherit" />,
    },
    {
      actionId: Action.VIEW_COMMENTS,
      name: 'View comments',
      icon: <CommentIcon fontSize="inherit" />,
    },
  ];
  if (isAdmin) {
    dropdownItems.push(
      ...[
        {
          actionId: Action.ADMIN_UNPUBLISH_PROJECT,
          name: 'ADMIN - Unpublish project',
          icon: <AdminIcon fontSize="inherit" />,
        },
        {
          actionId: Action.ADMIN_DELETE_PROJECT,
          name: 'ADMIN - Delete project',
          icon: <AdminIcon fontSize="inherit" />,
        },
        {
          actionId: Action.ADMIN_BAN_USER,
          name: 'ADMIN - Ban user',
          icon: <AdminIcon fontSize="inherit" />,
        },
      ]
    );
  }

  const displayName = overrideTitle !== undefined ? overrideTitle : name;

  return (
    <div
      className={cx(
        classes.root,
        mouseOver && classes.active,
        interactive && classes.interactive,
        className
      )}
      onMouseEnter={mouseEntered}
      onMouseLeave={mouseLeaved}
      onClick={interactive ? click : undefined}
    >
      <header className={classes.header}>
        <div className={classes.info}>
          {userAvatar && (
            <Avatar
              src={userAvatar}
              className={classes.avatar}
              variant="rounded"
              alt="user-profile-picture"
            />
          )}
          <div className={classes.titleAndCreator}>
            <div className={classes.title}>
              <DefaultTooltip title={displayName}>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ textTransform: 'none' }}
                >
                  {displayName || 'Untitled project'}
                </Typography>
              </DefaultTooltip>
              {Object.keys(projectAchievements).map(aId => {
                const amount = projectAchievements[aId as AchievementID];
                return amount ? (
                  <WeeklyProjectAward key={aId} style={{ marginLeft: 8 }} />
                ) : null;
              })}
            </div>
            <DefaultTooltip title={creator}>
              <Link to={`${ROUTES.USER}?uid=${creatorId}`}>
                <Typography variant="body2" className={classes.creator} noWrap>
                  {creator}
                </Typography>
              </Link>
            </DefaultTooltip>
          </div>
          {interactive && (
            <SimpleDropdown
              icon={<MenuIcon color="inherit" fontSize="large" />}
              onSelect={handleMenuClick}
              items={dropdownItems}
            />
          )}
        </div>
      </header>
      <div
        className={cx(classes.wrapper, {
          [classes.achievements]: !!achievements,
        })}
      >
        <img className={classes.previewImg} src={thumbnail} alt="project" />
      </div>
      {interactive && (
        <footer className={cx(classes.stats, mouseOver && classes.active)}>
          <Grow in={mouseOver} {...(mouseOver ? { timeout: 1000 } : {})}>
            <button
              className={cx(
                classes.statsButton,
                classes.heartIcon,
                mouseOver && classes.active
              )}
              onClick={handleClickLike}
            >
              <HeartIcon fontSize="small" />
              {likes}
            </button>
          </Grow>
          <Grow
            in={mouseOver}
            style={{ transformOrigin: 'top right' }}
            {...(mouseOver ? { timeout: 500 } : {})}
          >
            <button
              className={cx(classes.statsButton, mouseOver && classes.active)}
            >
              <EyeIcon fontSize="small" />
              {clicks}
            </button>
          </Grow>
          <Grow
            in={mouseOver}
            style={{ transformOrigin: 'top right' }}
            {...(mouseOver ? { timeout: 500 } : {})}
          >
            <button
              className={cx(classes.statsButton, mouseOver && classes.active)}
              onClick={event => {
                event.stopPropagation();
                onClickViewComments && onClickViewComments(projectId);
              }}
            >
              <CommentIcon fontSize="small" />
              {comments?.length || 0}
            </button>
          </Grow>
        </footer>
      )}
    </div>
  );
}

CommunityProjectCard.defaultProps = {
  interactive: true,
};

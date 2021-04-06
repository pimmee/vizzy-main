import React, { useState } from 'react';

import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  TextField,
  Dialog,
} from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import cx from 'classnames';

import CommunityProjectCard from './CommunityProjectCard';
import AlertDialog from './Dialog/AlertDialog';
import ROUTES from 'constants/routes';
import { useFirebase } from 'fbase';
import { useSelector } from '../store';
import { CommunityProject } from 'types/project';
import CommunityCommentSection from 'components/ProjectCommentSection';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      alignItems: 'start',
      justifyItems: 'center',
      gridGap: '4rem 3rem',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(30%, 1fr))',
        '&$sizeSmall': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(20%, 1fr))',
        },
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(20%, 1fr))',
        '&$sizeSmall': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(15%, 1fr))',
        },
      },
    },
    paperComments: {
      [theme.breakpoints.up('md')]: {
        width: 600,
        maxHeight: 600,
      },
    },

    sizeSmall: {},
  })
);

interface Props {
  projects: CommunityProject[];
  initialSize?: 'small';
  onClickProject?: (id: string) => void;
}

export const ProjectGrid = ({
  projects,
  onClickProject,
  initialSize = 'small',
}: Props) => {
  const classes = useStyles();
  const firebase = useFirebase();
  const [size, setSize] = useState(initialSize);
  const isAdmin = useSelector(state =>
    state.auth.user ? !!state.auth.user.isAdmin : false
  );
  const [commentsProjectId, setCommentsProjectId] = useState<string>('');

  // ADMIN ACTIONS
  const [adminActionReason, setAdminActionReason] = useState<string>('');
  const [projectToUnpublish, setProjectToUnpublish] = useState<
    string | undefined
  >();
  const [projectToDelete, setProjectToDelete] = useState<string | undefined>();
  const [userToBan, setUserToBan] = useState<string | undefined>();
  const [daysToBan, setDaysToBan] = useState<number>(1);

  const handleClickLike = (projectId: string) => {
    firebase.likeProject(projectId);
  };

  const handleProjectClick = (projectId: string) => {
    firebase.increaseProjectClick(projectId);
  };

  const handleClickBan = (userId: string) => {
    setUserToBan(userId);
  };

  const handleClickUnpublish = (projectId: string) => {
    setProjectToUnpublish(projectId);
  };

  const handleClickDelete = (projectId: string) => {
    setProjectToDelete(projectId);
  };

  const confirmBanUser = () => {
    if (isAdmin && userToBan && daysToBan) {
      firebase._ADMIN_banUser(userToBan, daysToBan, adminActionReason);
    }
  };

  const confirmUnpublish = () => {
    if (isAdmin && projectToUnpublish) {
      firebase._ADMIN_unpublishProject(projectToUnpublish, adminActionReason);
    }
  };

  const confirmDelete = () => {
    if (isAdmin && projectToDelete) {
      firebase._ADMIN_deleteProject(projectToDelete, adminActionReason);
    }
  };
  const onClickViewComments = (projectId: string) => {
    setCommentsProjectId(projectId);
  };

  return (
    <>
      <Dialog
        open={!!commentsProjectId}
        onClose={(event: any) => {
          event?.stopPropagation();
          setCommentsProjectId('');
        }}
        PaperProps={{ className: classes.paperComments }}
      >
        <CommunityCommentSection projectId={commentsProjectId} />
      </Dialog>
      <AlertDialog
        title="Unpublish project"
        open={!!projectToUnpublish}
        onClose={() => setProjectToUnpublish(undefined)}
        onAccept={confirmUnpublish}
        text={'This will set isCommunityProject = false. Are you sure?'}
        additionalContent={
          <>
            <Alert severity="info">{`Your project {project.name} has been unpublished by an admin ${adminActionReason}`}</Alert>
            <TextField
              placeholder="Reason"
              value={adminActionReason}
              onChange={event => setAdminActionReason(event.target.value)}
            />
          </>
        }
      />
      <AlertDialog
        title="Delete project"
        open={!!projectToDelete}
        onClose={() => setProjectToDelete(undefined)}
        onAccept={confirmDelete}
        text={'This will delete the project. Are you sure?'}
        additionalContent={
          <>
            <Alert severity="info">{`Your project {project.name} has been deleted by an admin ${adminActionReason}`}</Alert>
            <TextField
              placeholder="Reason"
              value={adminActionReason}
              onChange={event => setAdminActionReason(event.target.value)}
            />
          </>
        }
      />
      <AlertDialog
        title="Ban user"
        open={!!userToBan}
        onClose={() => setUserToBan(undefined)}
        onAccept={confirmBanUser}
        text={
          'This will ban the user and prevent from saving anything. Are you sure?'
        }
        additionalContent={
          <>
            <Alert
              severity="info"
              style={{ marginBottom: 8 }}
            >{`You've been banned for ${daysToBan} days ${adminActionReason}`}</Alert>
            <TextField
              label="Reason"
              variant="outlined"
              size="small"
              value={adminActionReason}
              onChange={event => setAdminActionReason(event.target.value)}
            />
            <TextField
              label="Days to ban"
              value={daysToBan}
              type="number"
              size="small"
              variant="outlined"
              onChange={event => setDaysToBan(Number(event.target.value))}
              style={{ marginLeft: 8 }}
            />
          </>
        }
      />
      <div
        className={cx(classes.grid, {
          [classes.sizeSmall]: size === 'small',
        })}
      >
        {!projects.length
          ? Array.from(new Array(9)).map((_, i) => (
              <Box key={i} width={210} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={210} height={118} />
                <Box pt={0.5}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))
          : projects.map(project => (
              <CommunityProjectCard
                project={project}
                key={project.id}
                onClick={onClickProject}
                onClickViewComments={onClickViewComments}
                isAdmin={isAdmin}
                onLikeProject={handleClickLike}
                onClickProject={handleProjectClick}
                adminUnpublishProject={handleClickUnpublish}
                adminBanUser={handleClickBan}
                adminDeleteProject={handleClickDelete}
              />
            ))}
      </div>
    </>
  );
};

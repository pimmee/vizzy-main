import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';

// import { TextArea } from '@blueprintjs/core';
import { Typography, IconButton, Button, Grid, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Skeleton } from '@material-ui/lab';
import MarkdownIt from 'markdown-it';

import CommunityCommentSection from 'components/ProjectCommentSection';
import { TwitterButton } from 'components/Button';
import DefaultTooltip from 'components/DefaultTooltip';
import ROUTES from 'constants/routes';
import { useCurrentUser, useFirebase } from 'fbase';
// import { getProjectUrl } from 'utils/editor';
import { Link } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
    row: {
      padding: theme.spacing(3),
      width: '100%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    rightContainer: {},
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        width: '70%',
      },
      position: 'relative',
      borderRadius: theme.shape.borderRadiusSmooth,
      background: theme.palette.background.paper,
    },
    openProjectButton: {
      marginTop: theme.spacing(2),
    },
    imageContainer: {
      minWidth: 300,
      minHeight: (300 * 9) / 16,
      backgroundColor: 'rgba(0,0,0,0.025)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    titleHeader: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    image: {
      cursor: 'pointer',
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: theme.shape.borderRadius,
      transition: 'box-shadow 0.3s ease-in-out',

      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.8)',
        transition: 'box-shadow 0.3s ease-in-out',
      },
    },
    progress: {
      left: '50%',
      top: '50%',
    },
    likeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },

    descriptionContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    textArea: {
      minWidth: 350,
      minHeight: 120,
    },
  })
);

export default function ProjectPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const md = useRef<MarkdownIt>(new MarkdownIt());
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const [imgSrc, setImgSrc] = useState('');
  const [userId, setUserId] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('Loading description');

  const urlSstring = window.location.href;
  const url = new URL(urlSstring);
  const firebase = useFirebase();

  const projectId = url.searchParams.get('id');

  const setMarkdown = (newDesc: string) => {
    const result = md.current.render(newDesc);

    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = result;
    }
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setMarkdown(e.target.value);
  };

  const saveDescription = async () => {
    if (!projectId) return;
    if (description.length > 1000) {
      alert('Description too long');
      return;
    }
    try {
      firebase.setProjectDescription(projectId, description);
    } catch (err) {
      alert('Failed to update description');
      return;
    }
    setIsEditingDescription(false);
  };

  const onOpenProject = () => {
    if (projectId) {
      firebase.increaseProjectClick(projectId);
    }
  };

  const isOwner = user && userId === user.id;

  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        try {
          const project: any = await firebase.getProject(projectId);
          if (project) {
            const userDoc = await firebase.user(project.userId).get(); // Fetch username
            const userData = userDoc.data();
            setImgSrc(project.thumbnail);
            if (userData) {
              setCreator(userData.username);
            } else {
              setCreator('Anonymous');
            }

            if (project.description) {
              setDescription(project.description);
              setMarkdown(project.description);
            } else {
              setDescription(
                `No description of project found. ${
                  isOwner
                    ? 'You can submit a short description of the project by clicking the pencil to the right!'
                    : ''
                }`
              );
            }

            setProjectTitle(project.name);
            setUserId(project.userId);
          } else {
            alert("Couldn't find project");
          }
        } catch (err) {
          alert("Couldn't load project");
        }
      }
    };
    loadProject();
  }, [firebase, isOwner, projectId]);

  if (!projectId) return <div>No project found</div>;

  const handleClickLike = () => {
    firebase.likeProject(projectId);
  };

  const disableRating =
    user && user.likedProjects && user.likedProjects.includes(projectId);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container className={classes.row} spacing={4}>
          <Grid className={classes.imageContainer} item md={4} xs={12}>
            {imgSrc === '' ? (
              <Box width={300}>
                <Skeleton variant="rect" width={300} height={(300 * 9) / 16} />
                <Box pt={0.5}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ) : (
              <img
                className={classes.image}
                src={imgSrc}
                alt="Project thumbnail (you set this in the editor)"
              />
            )}
            <Link to={`https://app.vizzy.io?project=${projectId}`}>
              <TwitterButton
                variant="contained"
                className={classes.openProjectButton}
                onClick={onOpenProject}
              >
                Open project
              </TwitterButton>
            </Link>
            <DefaultTooltip
              title={
                !user
                  ? 'You must be logged in to rate'
                  : disableRating
                  ? 'You have liked this project'
                  : 'Like'
              }
            >
              <IconButton
                onClick={handleClickLike}
                size="medium"
                className={classes.likeButton}
              >
                <ThumbUpIcon
                  fontSize="inherit"
                  color={disableRating ? 'secondary' : 'inherit'}
                />
              </IconButton>
            </DefaultTooltip>
          </Grid>

          <Grid item className={classes.rightContainer} md={8} xs={12}>
            <div className={classes.titleHeader}>
              <Typography variant="h4">{projectTitle}</Typography>
              <Typography
                variant="subtitle2"
                component="a"
                href={`${ROUTES.USER}?uid=${userId}`}
              >
                {creator ? 'by ' + creator : ''}
              </Typography>
            </div>

            <div className={classes.descriptionContainer}>
              {isEditingDescription && (
                <div>
                  <textarea
                    className={classes.textArea}
                    value={description}
                    onChange={onDescriptionChange}
                  />
                  <Button onClick={saveDescription}>Save</Button>
                </div>
              )}
              <div
                style={{
                  display: isEditingDescription ? 'none' : 'flex',
                }}
              >
                <div ref={descriptionRef} />
              </div>
              <div>
                {isOwner && !isEditingDescription && (
                  <IconButton onClick={() => setIsEditingDescription(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        {/* <Divider variant="middle" /> */}

        <CommunityCommentSection projectId={projectId} />
      </div>
    </div>
  );
}

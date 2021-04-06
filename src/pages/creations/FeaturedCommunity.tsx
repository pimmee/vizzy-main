import { useState } from 'react';

import {
  Card,
  Container,
  DialogTitle,
  Divider,
  Fade,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ExploreProjectsMoasic from './ExploreProjectsMosaic';
import FeaturedImage from 'assets/images/featured/2021_week11.jpg';
import mainTheme from 'assets/theme/main';
import FeaturedVideo from 'assets/videos/featured/2021_week11.mp4';
import { TwitterButton } from 'components/Button';
import InputDialog, { Field } from 'components/Dialog/InputDialog';
import WeeklyProjectAwardIcon from 'components/Icons/WeeklyProjectAwardIcon';
import ROUTES, { NavigationTab } from 'constants/routes';
import { useFirebase } from 'fbase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      width: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundPosition: 'center 200px,50%',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
    },
    flexWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    widthContainer: {
      width: '85%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    imageSrc: {
      width: '100%',
      height: '100%',
      backgroundPosition: 'center center',
    },
    container: {
      height: '100vh',
    },
    topRowContainer: {
      display: 'flex',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    mainFeatured: {
      position: 'relative',
      flexBasis: '70%',
      display: 'flex',
      height: '30vh',
      minHeight: 250,
      content: '',
      boxShadow: '0 0 10px rgba(0,0,0,0.8)',
      top: 0,
      bottom: 0,
      borderRadius: '100px / 10px',
      transition: 'box-shadow .2s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0 0 15px rgba(0,0,0,0.8)',
        transition: 'box-shadow 0.3s ease-in-out',
      },
    },
    featuredImage: {
      width: '105%',
      position: 'relative',
      background: `rgb(${0.21 * 255}, ${0.35 * 255}, ${0.6 * 255})`, // week 50
    },

    staffPickSection: {
      margin: theme.spacing(3),
      width: '30%',
      color: 'white',
    },
    featuredTextSection: {
      position: 'absolute',
      padding: theme.spacing(3),
      // color: 'black',
      color: 'white',
      width: '100%',
      height: '30vh',
    },
    button: {
      color: 'white',
      // color: '#black',
    },
    featuredTitle: {
      margin: 3,
    },
    creatorTitle: {},
    featuredDescription: {
      [theme.breakpoints.up('md')]: {
        width: '50%',
      },
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
        theme.spacing(1) + 6
      }px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    imageButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    submitCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '30%',
      padding: theme.spacing(2, 5),
      position: 'relative',
    },
    buttonContainer: {
      marginTop: theme.spacing(0.5),
      color: 'white',
    },

    callToAction: {
      fontWeight: 400,
      transition: 'all 0.1s ease',
      width: 160,
      '&:hover': {
        boxShadow: `${theme.palette.common.white} 0px 0px 6px 0px`,
        transform: 'scale(1.03)',
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(1),
      },
    },
    submitTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitTitleText: {
      ...mainTheme.typography.h6,
    },
    awardIcon: {
      marginLeft: theme.spacing(1.5),
    },
    submitText: { paddingTop: theme.spacing(3), textAlign: 'center' },
    topRight: {
      marginBottom: theme.spacing(3),
      // position: 'absolute',
      // top: theme.spacing
    },
  })
);

interface VideoProps {
  mouseOver: boolean;
  posterUrl: string;
  videoUrl: string;
}

const videoStyles = makeStyles((theme: Theme) =>
  createStyles({
    vidSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      overflow: 'hidden',
      transition: 'opacity 3s ease-in-out;',
    },
  })
);

const Video = (props: VideoProps) => {
  const classes = videoStyles();
  return (
    <Fade in={props.mouseOver} timeout={1000}>
      <div>
        {props.mouseOver && (
          <video
            loop
            autoPlay
            muted
            className={classes.vidSrc}
            poster={props.posterUrl}
            src={props.videoUrl}
            style={{ display: props.mouseOver ? '' : 'none' }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </Fade>
  );
};

const CommunityTab = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const classes = useStyles();
  const firebase = useFirebase();

  // Featured project info
  const creator = 'Cubiq The Creator';
  const projectName = 'Cubiq Music Liquify';
  const projectId = 'dURGmqk-t0-ib_V8tb29A';
  const description = `Smooth intro, moving liquid effect background, easy to use, mirror effect, nice looking bar, No GIF or Video.`;

  const openFeaturedProject = () => {
    setRedirect(projectId);
  };

  const toggleSubmitModal = () => {
    setShowSubmitModal(show => !show);
  };

  const handleSubmit = (fields: Field[]) => {
    const { 0: project, 1: description } = fields;

    firebase.submitTemplate(project.value, description.value);
  };

  // if (redirect) {
  //   return (
  //     <Redirect
  //       push
  //       to={`${ROUTES.DISCOVER}?tab=${NavigationTab.PROJECT}&id=${redirect}`}
  //     />
  //   );
  // }

  return (
    <>
      {/* <InputDialog
        open={showSubmitModal}
        title={
          <DialogTitle className={classes.submitTitle} disableTypography>
            <Typography variant="h6" className={classes.submitTitleText}>
              Submit to win Project of the Week!
            </Typography>
            <WeeklyProjectAwardIcon className={classes.awardIcon} />
          </DialogTitle>
        }
        onClose={() => setShowSubmitModal(false)}
        fields={['Project ID', 'Description']}
        textAreaConfig={{ Description: 4 }}
        onSubmit={handleSubmit}
      /> */}
      <div className={classes.root}>
        <div className={classes.widthContainer}>
          <Container className={classes.container} maxWidth="lg">
            <Typography variant="h4" className={classes.featuredTitle}>
              Featured project of the week
            </Typography>
            <div className={classes.topRowContainer}>
              <div
                className={classes.mainFeatured}
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                onClick={openFeaturedProject}
              >
                <div className={classes.featuredImage}>
                  <Video
                    videoUrl={FeaturedVideo}
                    posterUrl={FeaturedImage}
                    mouseOver={mouseOver}
                  />
                  <div
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${FeaturedImage})`,
                    }}
                  />
                </div>
                <div className={classes.featuredTextSection}>
                  <h2 className={classes.creatorTitle}>
                    {creator} - {projectName}
                  </h2>
                  <div className={classes.flexWrap}>
                    <div className={classes.featuredDescription}>
                      {description}
                    </div>

                    <div className={classes.buttonContainer}>
                      <TwitterButton
                        className={classes.callToAction}
                        color="inherit"
                        variant="outlined"
                        onClick={openFeaturedProject}
                      >
                        Open
                      </TwitterButton>
                    </div>
                  </div>
                </div>
                <div className={classes.featuredTextSection}>
                  Staff pick week 11
                </div>
              </div>
              <Card className={classes.submitCard}>
                <WeeklyProjectAwardIcon className={classes.topRight} />
                <TwitterButton
                  onClick={toggleSubmitModal}
                  size="small"
                  variant="contained"
                >
                  Submit to win
                </TwitterButton>
                <Typography variant="caption" className={classes.submitText}>
                  The featured project of the week is hand selected by the staff
                  of Vizzy.
                </Typography>
              </Card>
            </div>
            <Divider variant="middle" style={{ marginTop: 20 }} />

            <ExploreProjectsMoasic />
          </Container>
        </div>
      </div>
    </>
  );
};

export default CommunityTab;

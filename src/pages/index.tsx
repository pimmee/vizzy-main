import React from 'react';
import { Tween } from 'react-gsap';
// import { useDispatch } from 'react-redux'
import { Controller, Scene } from 'react-scrollmagic';

import {
  Button,
  Typography,
  Grid,
  useMediaQuery,
  Container,
  Box,
  Divider,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import cx from 'classnames';

// import 'lazysizes'

import communityImage from 'assets/images/misc/community.webp';
import animationsImage from 'assets/images/misc/easings.webp';
import editorImage from 'assets/images/misc/effects_demo.webp';
import macDisplayImage from 'assets/images/misc/mac_display.webp';
import { primaryMainButtonDark, unstyledLink } from 'assets/styles';
import { defaultGradiantBackground } from 'assets/theme/editor/editorColors';
import visualizerVideo from 'assets/videos/custom_path_tease.mp4';
import backgroundVideo from 'assets/videos/demo_shuffle_video.mp4';
import TwitterButton from 'components/Button/TwitterButton';
import Footer from 'components/Footer';
// import GoogleOptimizer from 'components/GoogleOptimizer'
import Header from 'components/Navigation/Header';
// import SEO from 'components/SEO'
// import TextDivider from 'components/TextDivider'
// import { UnstyledLink } from 'components/UnstyledLink'
import ROUTES from 'constants/routes';
// import { useFirebase } from 'fbase'
// import { setIsLoadingProject } from 'modules/editor/view/actions';
import ExampleUsages from 'components/ExampleUsages';
import { Link } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: 'hidden',
      maxWidth: '100%',
      background: defaultGradiantBackground, //theme.palette.background.default,
    },
    mainContainer: {
      height: '80vh',
      // borderBottom: `1px solid ${theme.palette.border.main}`,
      [theme.breakpoints.down('sm')]: {
        height: '65vh',
      },
      color: 'rgba(255,255,255,0.7)',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 1),
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(0),
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
      },
      // [theme.breakpoints.up('xl')]: {
      //   paddingLeft: theme.spacing(20),
      //   paddingRight: theme.spacing(20),
      //   marginLeft: theme.spacing(25),
      // },
    },
    callToAction: {
      ...primaryMainButtonDark,
      fontWeight: 400,
      transition: 'all 0.3s ease',
      width: 230,
      '&:hover': {
        boxShadow: `${theme.palette.common.white} 0px 0px 10px 0px`,
        transform: 'scale(1.1)',
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(3),
      },
    },
    topContainer: {
      position: 'relative',
    },
    mainLeftContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'flex-start',
      },
    },
    mainLeftContent: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(5, 2, 0),
      },
    },
    videoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(3),
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
    },
    textGrid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      [theme.breakpoints.down('sm')]: {
        '& > button': {
          alignSelf: 'center',
        },
      },
    },
    video: {
      overflow: 'hidden',
      width: '70%',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid #222`,
    },
    title: {
      color: 'white',
      '&:after:': {
        content: '""',
        //background: 'rgba(0,0,0,0.8)',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 50,
      },
      [theme.breakpoints.up('lg')]: {
        fontWeight: 400,
        fontSize: '4.3rem',
      },
      [theme.breakpoints.up(theme.breakpoints.values.lg + 220)]: {
        fontSize: '5rem',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '5.4rem',
      },
    },
    subtitle: {
      [theme.breakpoints.down(theme.breakpoints.values.lg + 220)]: {
        ...theme.typography.subtitle1,
      },
    },
    section: {
      padding: theme.spacing(3, 1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 2),
      },
    },
    sectionDivider: {
      opacity: 0,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(5),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(16, 0),
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(30, 0),
      },
    },
    featureImageWrapper: {
      display: 'flex',
      flexBasis: '100%',
      height: '100%',
      position: 'relative',
      '&:after': {
        content: '""',
        display: 'block',
        height: 0,
        overflow: 'hidden',
        paddingTop: '55%',
      },
    },
    featureImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      borderRadius: 5,
      objectFit: 'none',
      // border: `1px solid ${theme.palette.border.dark}`,
    },
    featureButton: {
      display: 'block',
      width: 200,
      padding: theme.spacing(1, 3),
      fontSize: 22,
      marginTop: theme.spacing(3),
      textTransform: 'none',
      // '&$dark': {
      //   background: theme.palette.primary.dark,
      //   color: '#fff',
      //   '&:hover': {
      //     background: primaryXDark,
      //   },
      // },
    },
    // ...templateGridStyles(theme),
    bold: {
      fontWeight: 500,
    },
    heroContainer: {
      position: 'relative',
      display: 'inline-block',
      pointerEvents: 'none',
      zIndex: 10,
      userSelect: 'none',
    },
    unstyledLink: {
      ...unstyledLink,
    },
    macDisplay: {
      position: 'absolute',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 100,
      top: 0,
      left: 0,
      width: '100%',
      perspective: '1600px',
      perspectiveOrigin: 'top',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
    },
    macDisplayImage: {
      display: 'block',
      position: 'relative',
      width: '640px',
      height: 'auto',
      maxWidth: '100%',
      zIndex: 1,
      '&$tablet': {
        width: 440,
      },
      '&$mobile': {
        width: 380,
      },
    },
    headerText: {
      marginBottom: theme.spacing(10),
      '&$mobile': {
        marginBottom: 220,
      },
    },
    freeHeaderText: {
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    horizontalList: {
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: theme.spacing(0.25),
      paddingRight: theme.spacing(0.25),
    },
    demoVideo: {
      position: 'absolute',
      width: '100%',
      left: '0',
      top: '0',
      transformStyle: 'preserve-3d',
      transformOrigin: 'top center',
      userSelect: 'none',
      zIndex: 2,
      borderRadius: 20,
      // border: `1px solid ${theme.palette.border.main}`,
    },
    flexColumnCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    scrollDisplaySrc: {},
    mobile: {},
    tablet: {},
    reversed: {},
    dark: {},
  })
);

const darkVariant = true;

function Landing() {
  const classes = useStyles();
  // const firebase = useFirebase()
  // const dispatch = useDispatch()
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickCTA = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    // dispatch(setIsLoadingProject(true))
    // firebase.logEvent('CTA_click')
    // history.push(ROUTES.EDITOR);
    return false;
  };

  return (
    <div className={classes.root}>
      {/* <GoogleOptimizer />
      <SEO
        title="Music Video Maker"
        description="Create free music visualizers in our powerful online video editor. Attract more listeners and grow your audience with our professional looking music videos."
      /> */}
      <Header />
      <Grid
        container
        className={classes.mainContainer}
        style={{ color: darkVariant ? 'rgba(255,255,255, 0.7)' : 'rgba(0' }}
      >
        <Grid item sm={6} xs={12} className={classes.mainLeftContainer}>
          <div className={classes.mainLeftContent}>
            <Typography variant="h1" gutterBottom className={classes.title}>
              Visualize your sound
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              className={classes.subtitle}
            >
              Create a professional music video in our powerful Online Editor.{' '}
              {isDesktop && <br />}
              Attract{' '}
              <span
                style={
                  darkVariant ? { fontWeight: 700, color: '#fff' } : undefined
                }
              >
                more listeners
              </span>{' '}
              and enforce your brand.
            </Typography>
            {!isMobile && (
              <Link onClick={handleClickCTA} to={ROUTES.EDITOR}>
                <TwitterButton
                  color="primary"
                  variant="contained"
                  className={cx(classes.callToAction, {
                    [classes.dark]: darkVariant,
                  })}
                >
                  Create video now
                </TwitterButton>
              </Link>
            )}
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.videoContainer}>
          <video
            className={classes.video}
            loop
            autoPlay
            muted
            src={backgroundVideo}
            crossOrigin="anonymous"
          />
        </Grid>
      </Grid>

      <ExampleUsages />

      <Container maxWidth="lg" className={classes.flexColumnCenter}>
        {!isMobile && (
          <>
            <Typography
              variant="h2"
              gutterBottom
              className={cx(classes.freeHeaderText, {
                [classes.mobile]: isMobile,
              })}
              align="center"
            >
              Free Music Visualizer
            </Typography>
            <Typography variant="h4" style={{ width: '100%' }} gutterBottom>
              <ul className={classes.horizontalList}>
                <li style={{ float: 'left', marginRight: 50 }}>1080p</li>
                <li style={{ float: 'left', marginRight: 50 }}>60fps</li>
                <li style={{ float: 'left', marginRight: 0 }}>No watermark</li>
              </ul>
            </Typography>
          </>
        )}

        <div className={classes.heroContainer}>
          <Controller>
            <Scene
              duration={isMobile ? 500 : 1000}
              triggerElement="#trigger"
              indicators={false}
            >
              {(progress: number) => {
                if (typeof window !== `undefined`) {
                  const video = document.getElementById(
                    'demo_video'
                  ) as HTMLVideoElement;
                  if (video && video.paused && progress > 0.2) {
                    video.play();
                  } else if (video && !video.paused && progress < 0.2) {
                    video.pause();
                  }
                  return (
                    <>
                      <div className={classes.macDisplay} id="trigger">
                        <Tween
                          from={{
                            css: {
                              transform:
                                'translate3d(0px, calc(0px + 3.8%), 0px) scale(0.97) rotateX(-69deg)',
                            },
                            ease: 'Circ.easeOutExpo',
                          }}
                          to={{
                            css: {
                              transform: `translate3d(${
                                isDesktop
                                  ? '-300px'
                                  : !isMobile
                                  ? '-200px'
                                  : '0px'
                              }, calc(${
                                isMobile
                                  ? '220px'
                                  : isTablet
                                  ? '415px'
                                  : '400px'
                              } + 3.8%), 0px) scale(1) rotateX(0deg)`,
                            },
                            ease: 'Circ.easeOutExpo',
                          }}
                          totalProgress={progress}
                          paused
                        >
                          <video
                            id="demo_video"
                            className={classes.demoVideo}
                            loop
                            autoPlay={false}
                            muted
                            src={visualizerVideo}
                            crossOrigin="anonymous"
                          />
                        </Tween>
                      </div>
                    </>
                  );
                } else {
                  return <div />;
                }
              }}
            </Scene>
            <Scene duration={isMobile ? 500 : 500} triggerElement="#trigger">
              {(progress: number) => (
                <Tween
                  from={{
                    css: {
                      opacity: 1,
                    },
                    ease: 'Circ.easeOutExpo',
                  }}
                  to={{
                    css: {
                      opacity: 0,
                    },
                    ease: 'Circ.easeOutExpo',
                  }}
                  totalProgress={progress}
                  paused
                >
                  <img
                    src={macDisplayImage}
                    className={cx(classes.macDisplayImage, {
                      [classes.mobile]: isMobile,
                      [classes.tablet]: isTablet,
                    })}
                    alt=""
                  />
                </Tween>
              )}
            </Scene>
          </Controller>
        </div>
      </Container>
      <div className={cx(classes.section, classes.reversed)}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            className={cx(classes.headerText, { [classes.mobile]: isMobile })}
          >
            There's nothing you can't visualize with Vizzy
          </Typography>
          <Grid container spacing={isMobile ? 5 : 10}>
            <Grid item sm={7} xs={12}></Grid>
            <Grid
              item
              sm={5}
              xs={12}
              className={cx(classes.textGrid, { [classes.mobile]: isMobile })}
            >
              <Typography variant="h4" gutterBottom className={classes.bold}>
                Your sound. <br />
                Mind-blowing visuals.
              </Typography>
              <Typography variant="subtitle1">
                Dancing visuals, animated text and fun editing right here in
                your browser. Start from scratch or get started quickly by using
                one of our templates.
              </Typography>
              <Link to={ROUTES.DISCOVER}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.featureButton}
                >
                  Get started
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Divider className={classes.sectionDivider} />
          <Grid
            container
            spacing={isMobile ? 5 : 10}
            wrap={isMobile ? 'wrap-reverse' : 'wrap'}
          >
            <Grid
              item
              sm={5}
              xs={12}
              className={cx(classes.textGrid, { [classes.mobile]: isMobile })}
            >
              <Typography variant="h4" gutterBottom className={classes.bold}>
                Animate. <br />
                Animate anything.
              </Typography>
              <Typography variant="subtitle1">
                You can make something move, react to audio or even write your
                own math forumla if you want. Our powerful animation engine is
                made to be flexible.
              </Typography>
              {!isMobile && (
                <Link to={ROUTES.EDITOR}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.featureButton}
                  >
                    Launch Edtior
                  </Button>
                </Link>
              )}
            </Grid>
            <Grid item sm={7} xs={12}>
              <div className={classes.featureImageWrapper}>
                <img
                  data-src={animationsImage}
                  alt=""
                  className={cx(classes.featureImage, 'lazyload')}
                ></img>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.sectionDivider} />
          <Grid
            container
            spacing={isMobile ? 5 : 10}
            wrap={isMobile ? 'wrap-reverse' : 'wrap'}
          >
            <Grid item sm={7} xs={12}>
              <div className={classes.featureImageWrapper}>
                <img
                  data-src={editorImage}
                  alt=""
                  className={cx(classes.featureImage, 'lazyload')}
                ></img>
              </div>
            </Grid>
            <Grid
              item
              sm={5}
              xs={12}
              className={cx(classes.textGrid, { [classes.mobile]: isMobile })}
            >
              <Typography variant="h4" gutterBottom className={classes.bold}>
                Go deep. <br />
                Use your imagination.
              </Typography>
              <Typography variant="subtitle1">
                Combine your sound with our spectacular effects to create
                anything you can imagine. Our Online Editor is equipped with
                hundreds of features - allowing you to create something truly
                unique.
              </Typography>
              {!isMobile && (
                <Link to={ROUTES.EDITOR}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.featureButton}
                  >
                    Launch Edtior
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
          <Divider className={classes.sectionDivider} />
          <Grid container spacing={isMobile ? 5 : 10}>
            <Grid
              item
              sm={5}
              xs={12}
              className={cx(classes.textGrid, { [classes.mobile]: isMobile })}
            >
              <Typography variant="h4" gutterBottom className={classes.bold}>
                Community. <br />
                Sharing is caring.
              </Typography>
              <Typography variant="subtitle1">
                Making a cool video doesn't have to be all business. We believe
                that as a community we can inspire each other by sharing our
                ideas and creations - making the world's music come to life
                together.
              </Typography>
              <Link to={ROUTES.COMMUNITY}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.featureButton}
                >
                  Browse videos
                </Button>
              </Link>
            </Grid>
            <Grid item sm={7} xs={12}>
              <div className={classes.featureImageWrapper}>
                <img
                  data-src={communityImage}
                  alt=""
                  className={cx(classes.featureImage, 'lazyload')}
                ></img>
              </div>
            </Grid>
          </Grid>
          {/* <TextDivider margin="large"></TextDivider> */}
          {/* <Grid container direction="row" spacing={isMobile ? 3 : 10}>
            {templates.map(c => (
              <Grid item key={c.projectId} xs={12} sm={6} md={4}>
                <Card className={classes.templateCard}>
                  <CardMedia className={classes.templateCardBody}>
                    <DisplayTemplate template={c} previewButton customizeButton />
                  </CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid> */}

          <Box
            display="flex"
            justifyContent="center"
            marginTop={isMobile ? 10 : 15}
            marginBottom={5}
          >
            <Link to={ROUTES.EDITOR}>
              <TwitterButton
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                size="large"
              >
                Create free video
              </TwitterButton>
            </Link>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;

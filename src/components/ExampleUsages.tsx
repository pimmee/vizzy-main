import { Hidden, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import facebookLogo from 'assets/images/social/facebook.png';
import instagramLogo from 'assets/images/social/instagram.png';
import twitterLogo from 'assets/images/social/twitter.png';
import vimeoLogo from 'assets/images/social/vimeo.png';
import youtubeLogo from 'assets/images/social/youtube.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(0,0,0,0)',
      width: '100%',
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(1),
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '60%',
      justifyContent: 'space-around',
      alignItems: 'center',
      justifyItems: 'center',
      color: theme.palette.type === 'dark' ? '#fff' : '#000',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
      },
    },
    description: {
      fontWeight: 500,
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(6),
      },
    },
    socialMediaContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        flexGrow: 1,
        width: 'auto',
      },
    },
    socialMedia: {
      ...theme.typography.body1,
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      userSelect: 'none',
    },
    socialLogo: {
      width: 20,
      height: 20,
      marginRight: theme.spacing(1),
    },
  })
);

export default function ExampleUsages() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.description}>Perfect for</Typography>
        <div className={classes.socialMediaContainer}>
          <div className={classes.socialMedia}>
            <img className={classes.socialLogo} src={youtubeLogo} alt="youtube" />
            Youtube
          </div>
          <div className={classes.socialMedia}>
            <img className={classes.socialLogo} src={facebookLogo} alt="facebook" />
            Facebook
          </div>
          <div className={classes.socialMedia}>
            <img className={classes.socialLogo} src={twitterLogo} alt="twitter" />
            Twitter
          </div>
          <Hidden xsDown>
            <div className={classes.socialMedia}>
              <img className={classes.socialLogo} src={instagramLogo} alt="instagram" />
              Instagram
            </div>
            <div className={classes.socialMedia}>
              <img className={classes.socialLogo} src={vimeoLogo} alt="vimeo" />
              Vimeo
            </div>
          </Hidden>
        </div>
      </div>
    </div>
  );
}

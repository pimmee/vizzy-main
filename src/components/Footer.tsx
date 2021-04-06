import { Container, Typography, Link, Grid, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ROUTES, { NavigationTab } from 'constants/routes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://vizzy.io">
        Vizzy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      padding: theme.spacing(1, 0),
    },
  })
);
const footers = [
  {
    title: 'Getting started',
    description: [
      { title: 'Editor', url: ROUTES.EDITOR },
      { title: 'Templates', url: ROUTES.TEMPLATES },
      { title: 'Community Videos', url: ROUTES.COMMUNITY },
      //{ title: 'Lyric videos', url: ROUTES.LYRICS },
    ],
  },
  // {
  //   title: 'Resources',
  //   description: [
  //     //{ title: 'Tutorials', url: ROUTES.TUTORIALS },
  //     // { title: 'Changelog', url: ROUTES.CHANGELOG },
  //     // { title: 'Community Wiki', url: 'https://vizzy.fandom.com/' },
  //     //{ title: 'Roadmap', url: ROUTES.ROADMAP },
  //   ],
  // },
  {
    title: 'Legal',
    description: [
      { title: 'Privacy policy', url: ROUTES.PRIVACY },
      { title: 'Terms of use', url: ROUTES.TERMS_OF_SERVICE },
    ],
  },
  {
    title: 'Company',
    description: [
      { title: 'Contact us', url: 'mailto:info@vizzy.io' },
      { title: 'Discord', url: 'https://discord.gg/du4YKzf' },
    ],
  },
];

function Footer() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
        {footers.map(footer => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul className={classes.list}>
              {footer.description.map(item => (
                <li key={item.title} className={classes.listItem}>
                  <Link href={item.url} variant="subtitle1" color="textSecondary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Footer;

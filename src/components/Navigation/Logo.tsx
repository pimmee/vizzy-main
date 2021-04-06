import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Logo from 'assets/images/misc/only-logo.webp';

interface Props {
  logoSize?: number;
  fontSize?: number;
  onClick?: () => void;
  className?: string;
}

export default function LogoComponent(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fontSize = props.fontSize || 12;
  return (
    <Box
      marginLeft={isMobile ? 0 : 2}
      marginRight={isMobile ? 0 : 1}
      display="flex"
      flexDirection="row"
      alignContent="center"
      alignItems="center"
      style={{ cursor: 'pointer' }}
      width={props.logoSize ? props.logoSize * 2 : 25 + fontSize + 10}
      onClick={props.onClick}
      className={props.className}
    >
      <img width={props.logoSize || 24} height="auto" src={Logo} alt="vizzy"></img>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography
          style={{
            fontSize,
            marginLeft: 5,
            position: 'absolute',
            transform: `translateX(${fontSize / 3}px)`,
          }}
          variant="h5"
        >
          VIZZY
        </Typography>
      </Box>
    </Box>
  );
}

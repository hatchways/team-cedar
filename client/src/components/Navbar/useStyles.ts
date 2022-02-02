import { makeStyles } from '@mui/styles';
import { theme } from '../../themes/theme';

export const useStyles = makeStyles(() => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 800,
  },
  navbarItem: {
    color: theme.palette.grey[900],
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    },
  },

  navbarLogoLg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  navbarLogoSm: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

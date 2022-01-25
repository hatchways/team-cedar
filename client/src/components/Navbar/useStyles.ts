import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transparentNavbar: {
    boxShadow: 'none',
    background: 'none',
  },
  navbarItem: {
    color: theme.palette.grey[900],
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
  },
  navbarLogoLg: {
    width: 180,
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

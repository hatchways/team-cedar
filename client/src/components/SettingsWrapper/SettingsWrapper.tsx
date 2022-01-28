import React from 'react';
import { Box, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      background: '#fff',
      padding: 2,
      width: '100%',
      paddingTop: '20px',
      boxShadow:
        '0px 1.7px 4px rgba(0, 0, 0, 0.01), 0px 4.6px 11.1px rgba(0, 0, 0, 0.015), 0px 11.2px 26.8px rgba(0, 0, 0, 0.02),0px 37px 89px rgba(0, 0, 0, 0.03)',
      [theme.breakpoints.down('sm')]: {
        width: '390px',
      },
    },
  }),
);

interface SettingsWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const SettingsWrapper: React.FC<SettingsWrapperProps> = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.box}>{children}</Box>;
};

export default SettingsWrapper;

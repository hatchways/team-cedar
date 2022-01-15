import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import CurrentBooking from '../../components/CurrentBooking/CurrentBooking';
import NextBooking from '../../components/NextBooking/NextBooking';

export default function ManageBooking(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <Grid xs={12} md={7} lg={7} item>
        <NextBooking />
        <CurrentBooking />
      </Grid>
      <Grid xs={12} md={5} lg={5} item>
        <Calendar />
      </Grid>
    </Grid>
  );
}

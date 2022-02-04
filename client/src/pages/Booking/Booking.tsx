import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import CurrentBooking from '../../components/CurrentBooking/CurrentBooking';
import NextBooking from '../../components/NextBooking/NextBooking';
import { theme } from '../../themes/theme';
import TabPanel from '../../components/TabPanel/TabPanel';
import BookingPayment from '../../components/BookingPayment/BookingPaymet';
import PaymentDetails from '../../components/PaymentDetails/PaymentDetails';

export default function Booking(): JSX.Element {
  return (
    <Grid container>
      <Grid xs={12} sm={6} md={4} lg={5} item>
        <BookingPayment />
      </Grid>
      <Grid xs={12} sm={6} md={8} lg={7} item>
        <PaymentDetails />
      </Grid>
    </Grid>
  );
}

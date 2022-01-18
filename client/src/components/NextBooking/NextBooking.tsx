import React from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BookingProfile from '../BookingProfile/BookingProfile';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import { format } from 'date-fns';

interface NextBookingProps {
  username: string;
  date: Date;
  img?: string;
  from: number;
  to: number;
  period: string;
}

const NextBooking = ({ username, date, img, from, to, period }: NextBookingProps): JSX.Element => {
  return (
    <BookingWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11, textTransform: 'uppercase' }}>
          your next bookings:
        </Typography>
        <SettingsIcon color={'disabled'} />
      </Box>
      <Box sx={{ padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontSize: 18, fontWeight: 500 }}>
          {format(date, 'dd MMMM yyyy')},&nbsp;{`${from}-${to}`}&nbsp;
          {period}
        </Typography>
      </Box>

      <BookingProfile username={username} fontSize={16} img={img} />
    </BookingWrapper>
  );
};

export default NextBooking;

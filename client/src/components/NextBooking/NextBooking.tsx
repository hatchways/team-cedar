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
  from: Date;
  to: Date;
}

const NextBooking = ({ username, date, img, from, to }: NextBookingProps): JSX.Element => {
  const getDate = new Date(date);
  const getFrom = new Date(from);
  const getTo = new Date(to);

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
          {format(getDate, 'dd MMMM yyyy')},&nbsp;{`${format(getFrom, 'hh')}-${format(getTo, 'hh')}`}&nbsp;
          {format(getTo, 'a')}
        </Typography>
      </Box>

      <BookingProfile username={username} fontSize={16} img={img} />
    </BookingWrapper>
  );
};

export default NextBooking;

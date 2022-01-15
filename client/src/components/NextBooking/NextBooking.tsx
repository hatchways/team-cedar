import React from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BookingProfile from '../BookingProfile/BookingProfile';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import { format } from 'date-fns';

const NextBooking = (): JSX.Element => {
  const nextBooking = {
    username: 'Norma Byes',
    date: new Date(),
    img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
    from: 10,
    to: 12,
    period: 'AM',
  };
  return (
    <BookingWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11 }}>YOUR NEXT BOOKING:</Typography>
        <SettingsIcon color={'disabled'} />
      </Box>
      <Box sx={{ padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontSize: 18, fontWeight: 500 }}>
          {format(nextBooking.date, 'dd MMMM yyyy')},&nbsp;{`${nextBooking.from}-${nextBooking.to}`}&nbsp;
          {nextBooking.period}
        </Typography>
      </Box>

      <BookingProfile username={nextBooking.username} fontSize={16} img={nextBooking.img} />
    </BookingWrapper>
  );
};

export default NextBooking;

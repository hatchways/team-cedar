import React from 'react';
import { Box, Typography } from '@mui/material';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import BookingContent from '../BookingContent/BookingContent';

const currentBooking = [
  {
    id: 1,
    username: 'Charles Compton',
    date: new Date(),
    img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
    from: 7,
    to: 9,
    period: 'AM',
    accept: true,
  },
  {
    id: 2,
    username: 'Joan Blakeney',
    date: new Date(2022, 1, 13),
    from: 8,
    to: 12,
    period: 'AM',
    accept: true,
  },
];
const pastBooking = [
  {
    id: 1,
    username: 'Michael Carhanan',
    date: new Date(2020, 8, 24),
    img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
    from: 7,
    to: 9,
    period: 'AM',
    accept: true,
  },
  {
    id: 2,
    username: 'Blakeney',
    date: new Date(2020, 3, 6),
    from: 8,
    to: 12,
    period: 'AM',
    accept: true,
  },
];
const CurrentBooking = (): JSX.Element => {
  return (
    <BookingWrapper marginTop={3}>
      <Box sx={{ padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11 }}>CURRENT BOOKINGS:</Typography>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: 380,
          pr: 1,
          '::-webkit-scrollbar': {
            width: 6,
            bgcolor: 'rgba(0, 0, 0, 0.26)',
            borderRadius: 2,
          },
          '::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0, 0, 0, 0.21)', borderRadius: 2 },
        }}
      >
        <Box>
          {currentBooking.map((item) => (
            <BookingContent
              key={item.id}
              username={item.username}
              date={item.date}
              from={item.from}
              to={item.to}
              period={item.period}
              accept={item.accept}
              img={item.img}
            />
          ))}
        </Box>
        <Box sx={{ padding: 1, mb: 1 }}>
          <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11, mb: 2 }}>PAST BOOKINGS:</Typography>
          <Box>
            {pastBooking.map((item) => (
              <BookingContent
                key={item.id}
                username={item.username}
                date={item.date}
                from={item.from}
                to={item.to}
                period={item.period}
                accept={item.accept}
                img={item.img}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </BookingWrapper>
  );
};

export default CurrentBooking;

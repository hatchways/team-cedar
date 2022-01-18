import React from 'react';
import { Box, Typography } from '@mui/material';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import BookingContent from '../BookingContent/BookingContent';

type BookingData = {
  id: number;
  username: string;
  date: Date;
  img?: string;
  from: number;
  to: number;
  period: string;
  accept: boolean;
};
interface CurrentBookingProps {
  currentData: BookingData[];
  pastData: BookingData[];
}

const CurrentBooking = ({ currentData, pastData }: CurrentBookingProps): JSX.Element => {
  return (
    <BookingWrapper marginTop={3}>
      <Box sx={{ padding: 1, mb: 1 }}>
        <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11, textTransform: 'uppercase' }}>
          current bookings:
        </Typography>
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
          {currentData.map((item) => (
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
          <Typography sx={{ color: 'black', fontWeight: 900, mt: 2, fontSize: 11, mb: 2, textTransform: 'uppercase' }}>
            past bookings:
          </Typography>
          <Box>
            {pastData.map((item) => (
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

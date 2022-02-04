import React from 'react';
import { Box, Typography } from '@mui/material';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import BookingContent from '../BookingContent/BookingContent';

import { Request } from '../../interface/RequestApiData';

interface CurrentBookingProps {
  currentData: Request[];
  pastData: Request[];
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
              key={item?._id}
              username={item?.sitterId.name}
              date={item?.start}
              from={item?.start}
              to={item?.end}
              accept={item?.accepted}
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
                key={item?._id}
                username={item?.sitterId.name}
                date={item?.start}
                from={item?.start}
                to={item?.end}
                accept={item?.accepted}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </BookingWrapper>
  );
};

export default CurrentBooking;

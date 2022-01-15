import React from 'react';
import { Box } from '@mui/material';

interface BookingWrapperProps {
  children: JSX.Element | JSX.Element[];
  marginTop?: number;
}

const BookingWrapper: React.FC<BookingWrapperProps> = ({ children, marginTop }) => {
  return (
    <Box
      sx={{
        background: '#fff',
        mt: marginTop ? marginTop : 8,
        ml: { xs: 7, md: 20, lg: 20 },
        padding: { xs: 2, md: 3, lg: 3 },
        borderRadius: 2,
        width: { xs: '80%', md: '60%', lg: '60%' },
        boxShadow:
          '0px 1.7px 4px rgba(0, 0, 0, 0.01), 0px 4.6px 11.1px rgba(0, 0, 0, 0.015), 0px 11.2px 26.8px rgba(0, 0, 0, 0.02),0px 37px 89px rgba(0, 0, 0, 0.03)',
      }}
    >
      {children}
    </Box>
  );
};

export default BookingWrapper;

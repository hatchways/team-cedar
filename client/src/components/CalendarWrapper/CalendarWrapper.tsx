import React from 'react';
import { Box } from '@mui/material';

interface CalendarWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        background: '#fff',
        mb: { xs: 5, md: 10, lg: 10 },
        mt: { xs: 5, sm: 8, md: 8, lg: 8 },
        mr: { xs: 5, sm: 5, md: 10, lg: 10 },
        ml: { xs: 3, sm: 6, md: 0, lg: 0 },
        padding: { xs: 1, sm: 0, md: 2, lg: 2 },
        borderRadius: 2,
        width: { xs: '90%', sm: '80%', md: '80%', lg: '80%' },
        boxShadow:
          '0px 1.7px 4px rgba(0, 0, 0, 0.01), 0px 4.6px 11.1px rgba(0, 0, 0, 0.015), 0px 11.2px 26.8px rgba(0, 0, 0, 0.02),0px 37px 89px rgba(0, 0, 0, 0.03)',
      }}
    >
      {children}
    </Box>
  );
};

export default CalendarWrapper;

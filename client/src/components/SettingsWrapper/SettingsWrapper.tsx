import React from 'react';
import { Box, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface SettingsWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const SettingsWrapper: React.FC<SettingsWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        background: '#fff',
        padding: { xs: 2, sm: 2, md: 8, lg: 8 },
        pb: 3,
        mb: 2,
        boxShadow:
          '0px 1.7px 4px rgba(0, 0, 0, 0.01), 0px 4.6px 11.1px rgba(0, 0, 0, 0.015), 0px 11.2px 26.8px rgba(0, 0, 0, 0.02),0px 37px 89px rgba(0, 0, 0, 0.03)',
      }}
    >
      {children}
    </Box>
  );
};

export default SettingsWrapper;

import React from 'react';
import { Box } from '@mui/material';

interface PageContainerProps {
  children: JSX.Element;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minWidth: 800,
        width: '95%',
        margin: '40px auto',
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;

import React from 'react';
import { Box } from '@mui/material';

interface PageContainerProps {
  children: JSX.Element;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: '40px auto',
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;

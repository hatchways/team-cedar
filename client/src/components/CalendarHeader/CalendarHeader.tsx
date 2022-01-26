import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { addMonths, format, subMonths } from 'date-fns';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { KeyboardArrowRight } from '@mui/icons-material';
interface CalendarWrapperProps {
  setCurrentMonth: (date: Date) => void;
  currentMonth: Date;
}

const CalendarHeader: React.FC<CalendarWrapperProps> = ({ currentMonth, setCurrentMonth }) => {
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  return (
    <Grid
      sx={{
        margin: 1,
        padding: 1,
      }}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box sx={{ ml: 1 }}>
        <IconButton onClick={prevMonth}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      <Box sx={{ justifyContent: 'center' }}>
        <Typography color={'primary'} variant="h6" component="h6">
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
      </Box>
      <Box sx={{ mr: 5, pr: 1 }}>
        <IconButton onClick={nextMonth}>
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default CalendarHeader;

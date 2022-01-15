import React, { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { format } from 'date-fns';

interface CalendarWrapperProps {
  date: Date;
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CalendarDatesButton: React.FC<CalendarWrapperProps> = ({ date, currentMonth, selectedDate, setSelectedDate }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const formatDateByYear = format(date, 'yyyy-MM-dd');
  const formatDate = format(date, 'd');
  const formatCurrentMonth = format(currentMonth, 'MM');
  const formatDatesMonth = format(date, 'MM');
  const handleSelectDate = (event: MouseEvent<HTMLButtonElement>) => {
    const getClickedDate = new Date(event.currentTarget.value);
    setSelectedDate(getClickedDate);
  };
  return (
    <ToggleButtonGroup
      sx={{
        ml: 1,
        mb: 1,
        pr: 2,
        pl: 1,
        pt: '3px',
        pb: '3px',
      }}
      color="primary"
    >
      <ToggleButton
        disabled={formatCurrentMonth !== formatDatesMonth}
        sx={{
          border: 'none',
          ':hover': {
            color: 'white',
            bgcolor: 'primary.main',
            borderRadius: '100%',
          },
          width: 30,
          height: 30,
          fontSize: 12,
          color: 'text.primary',
          '&.Mui-selected': {
            color: 'white',
            bgcolor: 'primary.main',
            borderRadius: '100%',
          },
          '&.Mui-disabled': {
            border: 'none',
          },
        }}
        value={date}
        onClick={handleSelectDate}
        selected={currentDate === formatDateByYear || formatDateByYear === format(selectedDate, 'yyyy-MM-dd')}
      >
        {formatDate}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CalendarDatesButton;

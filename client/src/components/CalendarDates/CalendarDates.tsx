import { Box } from '@mui/material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import CalendarDatesButton from '../CalendarDatesButton/CalendarDatesButton';

interface CalendarDateProps {
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
const CalendarDates: React.FC<CalendarDateProps> = ({ currentMonth, selectedDate, setSelectedDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 6 });
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 5 });
  let date = weekStart;

  const dates = [];

  while (date <= weekEnd) {
    dates.push(
      <CalendarDatesButton
        key={format(date, 'T')}
        date={date}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />,
    );
    date = addDays(date, 1);
  }
  return (
    <Box
      sx={{
        margin: { xs: 1, sm: 0, md: 1, lg: 1 },
        padding: { xs: 0, sm: 0, md: 0, lg: 1 },
      }}
    >
      {dates}
    </Box>
  );
};

export default CalendarDates;

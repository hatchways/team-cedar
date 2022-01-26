import React, { useState } from 'react';
import CalendarWrapper from '../CalendarWrapper/CalendarWrapper';
import CalendarDates from '../CalendarDates/CalendarDates';
import CalendarHeader from '../CalendarHeader/CalendarHeader';

const Calendar = (): JSX.Element => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <CalendarWrapper>
      <CalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <CalendarDates currentMonth={currentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </CalendarWrapper>
  );
};

export default Calendar;

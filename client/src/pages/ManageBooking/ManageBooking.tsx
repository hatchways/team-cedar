import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Tab, Tabs, useMediaQuery } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import CurrentBooking from '../../components/CurrentBooking/CurrentBooking';
import NextBooking from '../../components/NextBooking/NextBooking';
import { theme } from '../../themes/theme';
import TabPanel from '../../components/TabPanel/TabPanel';

const currentBooking = [
  {
    id: 1,
    username: 'Charles Compton',
    date: new Date(),
    img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
    from: 7,
    to: 9,
    period: 'AM',
    accept: true,
  },
  {
    id: 2,
    username: 'Joan Blakeney',
    date: new Date(2022, 1, 13),
    from: 8,
    to: 12,
    period: 'AM',
    accept: true,
  },
];
const pastBooking = [
  {
    id: 1,
    username: 'Michael Carhanan',
    date: new Date(2020, 8, 24),
    img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
    from: 7,
    to: 9,
    period: 'AM',
    accept: true,
  },
  {
    id: 2,
    username: 'Blakeney',
    date: new Date(2020, 3, 6),
    from: 8,
    to: 12,
    period: 'AM',
    accept: true,
  },
];
const nextBooking = {
  username: 'Norma Byes',
  date: new Date(),
  img: 'https://cdn.pixabay.com/photo/2021/09/12/18/07/robin-6619184_960_720.jpg',
  from: 10,
  to: 12,
  period: 'AM',
};

export default function ManageBooking(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      {matches ? (
        <Grid xs={12} item>
          <Tabs value={value} onChange={handleChange} centered sx={{ mt: 3 }}>
            <Tab label="Bookings" />
            <Tab label="Calendar" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <NextBooking
              username={nextBooking.username}
              date={nextBooking.date}
              img={nextBooking.img}
              from={nextBooking.from}
              to={nextBooking.to}
              period={nextBooking.period}
            />
            <CurrentBooking currentData={currentBooking} pastData={pastBooking} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Calendar />
          </TabPanel>
        </Grid>
      ) : (
        <>
          <Grid xs={12} sm={6} md={7} lg={7} item>
            <NextBooking
              username={nextBooking.username}
              date={nextBooking.date}
              img={nextBooking.img}
              from={nextBooking.from}
              to={nextBooking.to}
              period={nextBooking.period}
            />
            <CurrentBooking currentData={currentBooking} pastData={pastBooking} />
          </Grid>
          <Grid xs={12} sm={6} md={5} lg={5} item>
            <Calendar />
          </Grid>
        </>
      )}
    </Grid>
  );
}

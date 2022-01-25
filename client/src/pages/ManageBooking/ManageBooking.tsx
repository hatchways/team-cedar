import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Tab, Tabs, useMediaQuery } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import CurrentBooking from '../../components/CurrentBooking/CurrentBooking';
import NextBooking from '../../components/NextBooking/NextBooking';
import { theme } from '../../themes/theme';
import TabPanel from '../../components/TabPanel/TabPanel';
import bookingRequest from '../../helpers/APICalls/bookingRequest';
import { Request } from '../../interface/RequestApiData';

export default function ManageBooking(): JSX.Element {
  const [value, setValue] = useState(0);
  const [request, setRequst] = useState<Request[] | undefined>();
  const [nextBooking, setNextBooking] = useState<Request | undefined>();
  const [currentBooking, setCurrentBooking] = useState<Request[] | undefined>();
  const [pastBooking, setPastBooking] = useState<Request[] | undefined>();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    const fetchBookingData = async () => {
      const getData = await bookingRequest();
      setRequst(getData.requests);
    };
    fetchBookingData();
  }, []);
  useEffect(() => {
    const getNextBookingData = request
      ?.filter((data) => data.accepted === false && data.declined === false)
      .sort((a, b) => {
        return new Date(a.start).getDate() - new Date(b.start).getDate();
      })
      .pop();
    setNextBooking(getNextBookingData);
    const getCurrentBookingData = request
      ?.filter((data) => data.accepted === true && data.declined === false && new Date(data.end) >= new Date())
      .sort((a, b) => {
        return new Date(a.updatedAt).getDate() - new Date(b.updatedAt).getDate();
      });
    setCurrentBooking(getCurrentBookingData);
    const getPastBookingData = request
      ?.filter((data) => data.accepted === true && data.declined === false && new Date(data.end) < new Date())
      .sort((a, b) => {
        return new Date(a.start).getDate() - new Date(b.start).getDate();
      });
    setPastBooking(getPastBookingData);
  }, [request]);

  if (request === undefined) return <CircularProgress />;
  if (currentBooking === undefined) return <CircularProgress />;
  if (nextBooking === undefined) return <CircularProgress />;
  if (pastBooking === undefined) return <CircularProgress />;
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
              username={nextBooking?.sitterId.name}
              date={nextBooking?.start}
              from={nextBooking?.start}
              to={nextBooking?.end}
            />
            <CurrentBooking currentData={currentBooking} pastData={pastBooking} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Calendar nextBookingDate={nextBooking?.start} />
          </TabPanel>
        </Grid>
      ) : (
        <>
          <Grid xs={12} sm={6} md={7} lg={7} item>
            <NextBooking
              username={nextBooking?.sitterId.name}
              date={nextBooking?.start}
              from={nextBooking?.start}
              to={nextBooking?.end}
            />
            <CurrentBooking currentData={currentBooking} pastData={pastBooking} />
          </Grid>
          <Grid xs={12} sm={6} md={5} lg={5} item>
            <Calendar nextBookingDate={nextBooking?.start} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

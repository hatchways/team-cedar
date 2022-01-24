import * as React from 'react';
import { Grid, Avatar, Paper, Typography, Container, Button, TextField, Stack, Rating } from '@mui/material';
import useStyles from './useStyles';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();
  const profile = {
    firstName: 'Johnathon',
    lastName: 'Smith',
    descrption: 'Loving Pet Sitter',
    location: 'Toronto',
    availability: 'Monday, Tuesday, Wednesday',
    about: '',
    rate: '$30/hr',
  };

  const handleSubmit = () => {
    console.log('todo for an integration ticket');
  };
  return (
    <Container className={classes.root}>
      <Grid
        container
        direction="column"
        md={8}
        elevation={5}
        spacing={2}
        className={classes.profileContainer}
        component={Paper}
      >
        <Grid item>
          <Avatar alt="Profile Pic" src={`https://robohash.org/test@gmail.com`} className={classes.profilePic} />
        </Grid>
        <Typography align="center" variant="h4" className={classes.name}>
          {`${profile.firstName} ${profile.lastName}`}
        </Typography>
        <Typography align="center" className={classes.description}>
          {`${profile.descrption}`}
        </Typography>
        <Grid item className={classes.locationContainer}>
          <LocationOnIcon sx={{ color: 'red', marginTop: '8px' }} />
          <Typography align="center" className={classes.location}>
            {`${profile.location}`}
          </Typography>
        </Grid>
        <Typography>Availability: {`${profile.availability}`}</Typography>
        <Grid item className={classes.aboutContainer}>
          <Typography variant="h6" className={classes.about}>
            About Me: {`${profile.about}`}
          </Typography>
        </Grid>
        <Grid item className={classes.reviewCountainer}>
          <Typography color="textPrimary" className={classes.reviews}>
            Rating and Reviews (0)
          </Typography>
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <Button variant="contained" startIcon={<CreateIcon />} className={classes.button}>
            write a review
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        md={4}
        elevation={5}
        spacing={1}
        component={Paper}
        className={classes.submitFormContainer}
      >
        <Grid container direction="column" item spacing={3} className={classes.alignment}>
          <Grid item>
            <Typography align="center" variant="h5" className={classes.rate}>
              {profile.rate}
            </Typography>
          </Grid>
          <Formik
            initialValues={{
              dropIn: new Date(),
              dropOff: new Date(),
            }}
            validationSchema={Yup.object().shape({
              dropIn: Yup.date().required('Please enter a dropin date'),
              dropOff: Yup.date().required('Please enter a dropoff date'),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <Typography align="left" className={classes.titles}>
                      drop-in
                    </Typography>

                    <DateTimePicker
                      value={values.dropIn}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography align="left" className={classes.titles}>
                      drop-off
                    </Typography>

                    <DateTimePicker
                      value={values.dropOff}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                {isSubmitting ? (
                  <Typography className={classes.titles}> request sent </Typography>
                ) : (
                  <Button variant="contained" className={classes.button1}>
                    send request
                  </Button>
                )}
              </form>
            )}
          </Formik>
          <Button variant="contained" className={classes.button}>
            message
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

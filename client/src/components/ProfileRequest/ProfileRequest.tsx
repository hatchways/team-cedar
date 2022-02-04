import { Grid, Typography, Button, Stack, TextField, InputLabel } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import createRequest from '../../helpers/APICalls/createRequest';
import { useSnackBar } from '../../context/useSnackbarContext';
import { add } from 'date-fns';

interface ProfileRequestProps {
  rate?: number;
  sitterId: string;
}

const ProfileRequest = ({ rate, sitterId }: ProfileRequestProps): JSX.Element => {
  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = (
    { dropIn, dropOff }: { dropIn: Date; dropOff: Date },
    { setSubmitting }: FormikHelpers<{ dropIn: Date; dropOff: Date }>,
  ) => {
    const start = dropIn;
    const end = dropOff;
    createRequest({ sitterId, start, end }).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Request Sent');
      } else {
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Grid container sx={{ p: 2, justifyContent: 'center' }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography textAlign={'end'} variant="h5" sx={{ fontWeight: 600, fontSize: 24 }} color={'primary'}>
          $&nbsp;{rate}/hr
        </Typography>
      </Grid>

      <Formik
        initialValues={{
          dropIn: add(new Date(), { hours: 2 }),
          dropOff: add(new Date(), { hours: 4 }),
        }}
        validationSchema={Yup.object().shape({
          dropIn: Yup.date().required('Please enter a dropin date'),
          dropOff: Yup.date().required('Please enter a dropoff date'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sx={{ padding: 1, mb: 1, width: 350 }}>
                <Stack spacing={1}>
                  <InputLabel
                    sx={{
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                    shrink
                    htmlFor="dropIn"
                  >
                    Drop In
                  </InputLabel>
                  <DateTimePicker
                    value={values.dropIn}
                    onChange={(dropIn) => {
                      setFieldValue('dropIn', dropIn);
                    }}
                    minDateTime={new Date()}
                    renderInput={(params) => <TextField fullWidth sx={{ mb: 1, pb: 1 }} id="dropIn" {...params} />}
                  />
                  <InputLabel
                    sx={{
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                    shrink
                    htmlFor="dropOff"
                  >
                    Drop Off
                  </InputLabel>
                  <DateTimePicker
                    value={values.dropOff}
                    onChange={(dropOff) => {
                      setFieldValue('dropOff', dropOff);
                    }}
                    minDateTime={new Date()}
                    renderInput={(params) => <TextField fullWidth sx={{ mb: 1, pb: 1 }} id="dropOff" {...params} />}
                  />
                </Stack>
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} sx={{ padding: 1, mb: 1, width: 350 }}>
              {isSubmitting ? (
                <Typography
                  color={'primary'}
                  sx={{ fontSize: 24, fontWeight: 600, textTransform: 'uppercase', textAlign: 'center' }}
                >
                  request sent
                </Typography>
              ) : (
                <Button type="submit" fullWidth sx={{ height: 50 }} variant="contained">
                  send request
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sx={{ padding: 1, mb: 1, width: 350 }}>
              <Button fullWidth sx={{ height: 50 }} variant="outlined">
                message
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default ProfileRequest;

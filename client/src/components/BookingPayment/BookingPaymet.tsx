import { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookingProfile from '../BookingProfile/BookingProfile';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import { currentPayment } from '../../helpers/APICalls/currentPayment';
import { paidPayment } from '../../helpers/APICalls/paidPayment';
import { GetPaymentDataSuccess } from '../../interface/GetPaymentApiData';
import { useSnackBar } from '../../context/useSnackbarContext';

const BookingPayment = (): JSX.Element => {
  const [getPayment, setPayment] = useState<GetPaymentDataSuccess[] | undefined>();
  const [paymentType, setPaymentType] = useState('current');
  const { updateSnackBarMessage } = useSnackBar();
  const handlePaymentButtonChange = (event: React.MouseEvent<HTMLElement>, newPayment: string) => {
    setPaymentType(newPayment);
  };

  useEffect(() => {
    const fetchCurrentPayment = async () => {
      const getData = await currentPayment();
      if (getData.error) {
        updateSnackBarMessage(getData.error.message);
      }
      setPayment(getData.success?.payment);
    };
    const fetchPaidPayment = async () => {
      const getData = await paidPayment();
      if (getData.error) {
        updateSnackBarMessage(getData.error.message);
      }
      setPayment(getData.success?.payment);
    };
    if (paymentType === 'current') {
      fetchCurrentPayment();
    }
    if (paymentType === 'paid') {
      fetchPaidPayment();
    }
  }, [updateSnackBarMessage, paymentType]);

  console.log(getPayment);
  return (
    <BookingWrapper>
      <Box sx={{ maxWidth: 550 }}>
        <Stack spacing={1} direction="row">
          <ToggleButtonGroup
            color="primary"
            sx={{ margin: 1, p: 1 }}
            value={paymentType}
            exclusive
            onChange={handlePaymentButtonChange}
          >
            <ToggleButton sx={{ border: 0, mr: 1, pr: 1 }} value="current">
              Current
            </ToggleButton>

            <ToggleButton sx={{ border: 0 }} value="paid">
              Paid
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Divider sx={{ borderColor: 'black' }} />

        <Box
          sx={{
            bgcolor: 'background.paper',
            mt: 2,
          }}
        >
          {getPayment?.map((item) => (
            <Card key={item._id} elevation={0} variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, mb: 1 }}>
                    <BookingProfile username={item.sitterId.name} />
                    <Typography sx={{ fontWeight: 600, fontSize: 16, color: 'primary.main' }}>${item.rate}</Typography>
                  </Box>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Stack
                      direction="row"
                      sx={{
                        color: 'primary.main',
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 18, mt: '4px' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                        &nbsp;{item.hoursOfService.startTime}-{item.hoursOfService.endTime}
                      </Typography>
                    </Stack>
                    <Chip label={item.paid ? 'Paid' : 'UnPaid'} variant="outlined" />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </BookingWrapper>
  );
};

export default BookingPayment;

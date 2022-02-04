import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from '@mui/material';

import PaymentDetailWrapper from '../PaymentDetailWrapper/PaymentDetailWrapper';
import PaymentDetailsTable from '../PaymentDetailsTable/PaymentDetailsTable';

const PaymentDetails = (): JSX.Element => {
  const [value, setValue] = useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <PaymentDetailWrapper>
      <Grid container>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Stack direction={'row'} spacing={2}>
            <Box sx={{ width: 150, p: 1 }}>
              <img
                alt="Profile Image"
                style={{ textAlign: 'center', width: '100%', overflow: 'hidden' }}
                src={'https://robohash.org/${loggedInUser.email}'}
              />
            </Box>
            <Stack direction="column" spacing={1} justifyContent={'center'}>
              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 24 }}>
                Name
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 18 }}>
                This will be the description
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mb: 1, mt: 1, p: 3, ml: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 28 }}>
            Payment Details
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 6, m: 1 }}>
          <PaymentDetailsTable />
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 3, mb: 2, pt: 3 }}>
            <FormControl>
              <FormLabel id="payment-methods">
                <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>
                  Payment Method
                </Typography>
              </FormLabel>

              <RadioGroup
                aria-labelledby="payment-methods"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Visa - 1234" />
                <FormControlLabel value="male" control={<Radio />} label="MasterCard - 1234" />
              </RadioGroup>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Pay
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </PaymentDetailWrapper>
  );
};

export default PaymentDetails;

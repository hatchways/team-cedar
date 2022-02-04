import React from 'react';
import { Paper, ToggleButton, Stack, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PaymentCardContent from '../PaymentCardContent/PaymentCardContent';

interface PaymentCardProps {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  name: string;
  paymentId: string;
  selectedPayment?: string;
  setSelectedPayment: (id: string) => void;
}
const PaymentCard = ({
  brand,
  last4,
  expMonth,
  expYear,
  name,
  selectedPayment,
  setSelectedPayment,
  paymentId,
}: PaymentCardProps): JSX.Element => {
  return (
    <Grid component={Paper} container variant="outlined" sx={{ minWidth: 280, maxWidth: 360, height: 200 }}>
      <Grid item xs={10}>
        <PaymentCardContent brand={brand} last4={last4} expMonth={expMonth} expYear={expYear} name={name} />
      </Grid>
      <Grid item xs={2}>
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" sx={{ padding: 1, margin: 1 }}>
          <ToggleButton
            value="check"
            sx={{
              borderWidth: 1,
              borderRadius: '100%',
              color: 'white',
              ':hover': {
                color: 'white',
                bgcolor: 'primary.main',
                borderRadius: '100%',
              },
              width: 30,
              height: 30,
              fontSize: 12,
              '&.Mui-selected': {
                color: 'white',
                bgcolor: 'primary.main',
                borderRadius: '100%',
              },
            }}
            selected={selectedPayment === paymentId}
            onChange={() => {
              setSelectedPayment(paymentId);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PaymentCard;

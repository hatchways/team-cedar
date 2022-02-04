import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';

interface PaymentCardContentProps {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  name: string;
}

const PaymentCardContent = ({ brand, last4, expMonth, expYear, name }: PaymentCardContentProps): JSX.Element => {
  const lastYear = expYear.toString().slice(-2);

  return (
    <Grid item xs={12} sx={{ p: 2, ml: 1 }}>
      <Box sx={{ mb: 2, mt: 2 }}>
        <img src={require(`../../images/cards/${brand.toLowerCase()}.svg`).default} alt={brand} width="60" />
      </Box>
      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 900, fontSize: 17 }} variant="h3">
          ****&nbsp;****&nbsp;****&nbsp;{last4}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 14 }} color={'GrayText'}>
          Exp.&nbsp;Date {expMonth}/{lastYear}
        </Typography>
      </Stack>
      <Stack sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 18 }}>{name}</Typography>
      </Stack>
    </Grid>
  );
};

export default PaymentCardContent;

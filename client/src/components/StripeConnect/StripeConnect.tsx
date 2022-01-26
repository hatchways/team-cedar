import React, { useState } from 'react';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import { Grid, Button, CircularProgress } from '@mui/material';
import stripe from '../../helpers/APICalls/stripe';

interface StripeProps {
  header: string;
}

const StripeConnect: React.FC<StripeProps> = ({ header }) => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(true);
    stripe();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingHeader header={header} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button size="large" color="primary" variant="contained" onClick={onClick}>
          {clicked ? <CircularProgress style={{ color: 'white' }} /> : 'Create a Stripe Account'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default StripeConnect;

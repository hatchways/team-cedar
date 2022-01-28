import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import { Grid, Button, CircularProgress, Typography } from '@mui/material';
import stripe from '../../helpers/APICalls/stripe';

interface StripeProps {
  header: string;
}

const StripeConnect: React.FC<StripeProps> = ({ header }) => {
  const stripeExists = false;
  const [clicked, setClicked] = useState(false);
  const [redirecting, setRedirecting] = useState<string>('');

  const onClick = async () => {
    setClicked(true);
    const stripeResponse = await stripe();
    if (stripeResponse.success?.stripeAccount.url) {
      setRedirecting(stripeResponse.success.stripeAccount.url);
    }
  };

  if (redirecting) {
    window.location.href = redirecting;
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingHeader header={header} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Switch>
          <Route exact path="/profile/settings/payment-methods">
            {stripeExists ? (
              <Typography>You have a Stripe account</Typography>
            ) : (
              <Button size="large" color="primary" variant="contained" onClick={onClick}>
                {clicked ? <CircularProgress style={{ color: 'white' }} /> : 'Create a Stripe Account'}
              </Button>
            )}
          </Route>
          <Route path="/profile/settings/payment-methods/refresh">
            <Typography>We&apos;re sorry, please try again in a few minutes</Typography>
          </Route>
          <Route path="/profile/settings/payment-methods/return">
            <Typography>Congrats on your new Stripe account</Typography>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default StripeConnect;

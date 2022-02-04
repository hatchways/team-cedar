import React, { useEffect, useState, SyntheticEvent } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Button, CircularProgress, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface PaymentFormProps {
  handleClose: () => void;
}

const PaymentForm = ({ handleClose }: PaymentFormProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const { updateSnackBarMessage } = useSnackBar();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState(false);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setProcess(true);
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/profile/settings/payment-methods/return',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };
  if (errorMessage) {
    updateSnackBarMessage(errorMessage);
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('setup_intent_client_secret');
    clientSecret &&
      stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
        switch (setupIntent?.status) {
          case 'succeeded':
            updateSnackBarMessage('Success! Your payment method has been saved.');
            break;

          case 'processing':
            updateSnackBarMessage("Processing payment details. We'll update you when processing is complete.");
            break;

          case 'requires_payment_method':
            updateSnackBarMessage('Failed to process payment details. Please try another payment method.');
            break;
        }
      });
  }, [stripe, updateSnackBarMessage]);
  if (!elements) return <CircularProgress />;
  return (
    <form>
      <PaymentElement onReady={() => setLoading(false)} />
      {loading ? (
        <Skeleton variant="rectangular" />
      ) : (
        <>
          <LoadingButton
            disabled={!stripe}
            onClick={handleSubmit}
            sx={{ height: 50, p: 1, mb: 2, mt: 2 }}
            fullWidth
            variant="contained"
            loading={process}
            loadingIndicator="Processing..."
          >
            Submit
          </LoadingButton>
          <Button fullWidth onClick={handleClose} variant="outlined" sx={{ height: 50, p: 1 }}>
            Cancel
          </Button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;

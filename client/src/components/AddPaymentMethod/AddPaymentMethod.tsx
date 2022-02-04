import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../../utils/stripePublishableKey';
import paymentMethods from '../../helpers/APICalls/paymentMethods';
import { PaymentMethodApiData } from '../../interface/PaymentMethodApiData';
import { CircularProgress } from '@mui/material';
import { useSnackBar } from '../../context/useSnackbarContext';
import PaymentForm from '../PaymentForm/PaymentForm';

interface AddPaymentMethodProps {
  handleClose: () => void;
}

const AddPaymentMethod = ({ handleClose }: AddPaymentMethodProps): JSX.Element => {
  const { updateSnackBarMessage } = useSnackBar();
  const [getPayment, setPayment] = useState<PaymentMethodApiData | undefined>();
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const getData = await paymentMethods();
      setPayment(getData);
    };
    fetchPaymentMethods();
  }, []);
  const stripeTheme = 'stripe' as const;
  const appearance = {
    theme: stripeTheme,
    variables: {
      colorPrimary: '#f14140',
    },
  };

  const options = {
    clientSecret: getPayment?.success?.client_secret,
    appearance: appearance,
  };
  if (getPayment === undefined) return <CircularProgress />;
  if (getPayment.error) {
    updateSnackBarMessage(getPayment.error.message);
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm handleClose={handleClose} />
    </Elements>
  );
};

export default AddPaymentMethod;

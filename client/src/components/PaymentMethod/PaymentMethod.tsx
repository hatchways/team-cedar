import React, { useEffect, useState } from 'react';

import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSnackBar } from '../../context/useSnackbarContext';
import PaymentCard from '../PaymentCard/PaymentCard';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import getPaymentMethod from '../../helpers/APICalls/getPaymentMethods';
import { listPaymentMethods, GetPaymentMethodApiData } from '../../interface/GetPaymentMethodApiData';
import AddPaymentMethod from '../AddPaymentMethod/AddPaymentMethod';
import { useAuth } from '../../context/useAuthContext';

interface PaymentMethodProps {
  header: string;
}

const PaymentMethod = ({ header }: PaymentMethodProps): JSX.Element => {
  const [getPayment, setPayment] = useState<GetPaymentMethodApiData | undefined>();
  const [selectedPayment, setSelectedPayment] = useState<string>();
  const [addNewPayment, setAddNewPayment] = React.useState(false);
  const { profile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const getData = await getPaymentMethod();
      setPayment(getData);
      setSelectedPayment(getData.success?.listPaymentMethods.data[0].id);
      if (getData.error) {
        updateSnackBarMessage(getData.error);
      }
    };
    fetchPaymentMethods();
  }, [updateSnackBarMessage]);
  const handleOpen = () => setAddNewPayment(true);
  const handleClose = () => setAddNewPayment(false);

  if (getPayment === undefined) return <CircularProgress />;
  console.log(getPayment);
  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingHeader header={header} />
      </Grid>

      {addNewPayment ? (
        <>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16, textTransform: 'capitalize' }} color={'GrayText'}>
              add new payment profiles;
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ p: 2, justifyContent: 'center', alignItems: 'center' }}>
            <AddPaymentMethod handleClose={handleClose} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16, textTransform: 'capitalize' }} color={'GrayText'}>
              saved payment profiles;
            </Typography>
          </Grid>
          {getPayment?.success?.listPaymentMethods.data.map((item) => (
            <Grid key={item.id} item xs={12} md={6} lg={6} sx={{ p: { xs: 0, sm: 0, md: 2, lg: 2 }, mb: 2 }}>
              <PaymentCard
                paymentId={item.id}
                brand={item.card.brand}
                last4={item.card.last4}
                expMonth={item.card.exp_month}
                expYear={item.card.exp_year}
                name={profile.name}
                setSelectedPayment={setSelectedPayment}
                selectedPayment={selectedPayment}
              />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ p: 2, mt: 1 }}>
            <Button variant="outlined" sx={{ width: 200, height: 50, textTransform: 'none' }} onClick={handleOpen}>
              Add new payment profile
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PaymentMethod;

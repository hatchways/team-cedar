import React, { useEffect, useState } from 'react';
import { Grid, Link, Popper } from '@mui/material';
import NotificaitonContent from '../NotificationContent/NotificationContent';
import { getUnReadNotification, markNotificationsAsRead } from '../../helpers/APICalls/getNotification';
import { NotificationsDataSuccess } from '../../interface/NotificationApiData';
import { useSnackBar } from '../../context/useSnackbarContext';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Notificaitons = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [unReadNotification, setUnReadNotification] = useState<NotificationsDataSuccess[] | undefined>();
  const { updateSnackBarMessage } = useSnackBar();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    markNotificationsAsRead();
    if (anchorEl) {
      setUnReadNotification([]);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification' : undefined;

  useEffect(() => {
    const fetchUnReadData = async () => {
      const getData = await getUnReadNotification();
      if (getData.error) {
        updateSnackBarMessage(getData.error.message);
      }
      setUnReadNotification(getData.success?.notifications);
    };
    fetchUnReadData();
  }, [updateSnackBarMessage]);

  return (
    <Grid sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <Link
        sx={{
          color: '#212121',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'color 120ms ease-in-out',
          '&:hover': {
            color: 'primary.main',
          },
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {unReadNotification === undefined || unReadNotification === null || unReadNotification?.length === 0 ? (
          <>Notification</>
        ) : (
          <>
            Notification
            <FiberManualRecordIcon sx={{ color: '#64dd17', fontSize: 14, pb: '3px' }} />
          </>
        )}
      </Link>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <NotificaitonContent unReadNotification={unReadNotification} />
      </Popper>
    </Grid>
  );
};

export default Notificaitons;

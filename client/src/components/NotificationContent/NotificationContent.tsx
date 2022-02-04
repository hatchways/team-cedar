import React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Popper, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BookingProfile from '../BookingProfile/BookingProfile';
import BookingWrapper from '../BookingWrapper/BookingWrapper';
import { format } from 'date-fns';
import { NotificationsDataSuccess } from '../../interface/NotificationApiData';

interface NotificationContentProps {
  unReadNotification: NotificationsDataSuccess[] | undefined | null;
}

const NotificaitonContent = ({ unReadNotification }: NotificationContentProps): JSX.Element => {
  return (
    <Box sx={{ minWidth: 550, p: 2 }}>
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '9px solid black',
          margin: '0 auto',
          pb: '1px',
        }}
      />
      <Box
        sx={{
          width: 1,
          height: 2,
          borderBottom: '3px solid black',
        }}
      />
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
        }}
      >
        {unReadNotification === undefined || unReadNotification === null || unReadNotification.length === 0 ? (
          <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 600, p: 2 }}>
            No Unread Notification
          </Typography>
        ) : (
          unReadNotification.map((item) => (
            <Card key={item._id} sx={{ p: 2 }} elevation={0}>
              <CardActionArea sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, p: 2 }}
                  image={`https://robohash.org/${item.type}`}
                  alt={item.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }} component="h5" variant="h5">
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography sx={{ fontWeight: 600, fontSize: 16, pt: 1 }} component="h5" variant="h5">
                        {item.description}
                      </Typography>
                    )}
                    <Typography
                      sx={{ fontWeight: 700, pb: 1, textTransform: 'capitalize' }}
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {item.type}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: 17 }} component="h5" variant="h5">
                      {format(new Date(item.time), 'mm/dd/yyyy')}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default NotificaitonContent;

import React from 'react';
import { Grid, Typography, CardContent, Card, CardMedia, CardActions, Rating, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '../../interface/Profile';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import Review from '../Review/Review';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const rate = Number(profile.rate);
  const pricePerHour = rate ? Math.round(rate / 100) : 0;
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 400,
        width: '80%',
        marginBottom: '20px',
      }}
    >
      <CardContent sx={{ textAlign: 'center', height: 150, width: '100%', paddingBottom: 0 }}>
        <ProfilePhoto photoURL={profile.photo!} />
      </CardContent>
      <CardContent>
        <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>
          {profile.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          {profile.occupation}
        </Typography>

        <CardActions sx={{ flex: '0 0 %20', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Review readOnly />
        </CardActions>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {profile.description}
        </Typography>
      </CardContent>

      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={1}>
            <LocationOnIcon color="primary" />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              {profile.address}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ fontWeight: 700, textAlign: 'right' }}>
              ${pricePerHour}/hr
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

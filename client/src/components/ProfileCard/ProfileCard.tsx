import React from 'react';
import { Grid, Typography, CardContent, Card, CardMedia, CardActions, Rating, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Profile } from '../../interface/Profile';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const addRating = (newValue: number) => {
    console.log('rated', newValue);
  };

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
        <ProfilePhoto photoURL={profile.photoURL!} />
      </CardContent>
      <CardContent>
        <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>
          {profile.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          {profile.occupation}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {profile.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ flex: '0 0 %20', justifyContent: 'center', alignItems: 'flex-end' }}>
        <Rating
          value={profile.rating}
          precision={0.5}
          onChange={(_event, newValue) => {
            if (newValue) {
              addRating(newValue);
            }
          }}
        />
      </CardActions>
      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={1}>
            <LocationOnIcon color="primary" />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              {profile.location}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" sx={{ fontWeight: 700, textAlign: 'right' }}>
              ${profile.pricePerHour}/hr
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

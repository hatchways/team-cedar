import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Button, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { Profile } from '../../interface/Profile';
import { profiles } from '../../mocks/mockProfiles';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} justifyContent="space-around">
          <Typography sx={{ textAlign: 'center', paddingBottom: '16px' }} variant="h4">
            All Profiles
          </Typography>
        </Grid>
        {profiles.map((profile) => (
          <Grid
            item
            key={profile.userId}
            xs={4}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ProfileCard profile={profile} />
          </Grid>
        ))}
        <Grid item xs={12} textAlign="center">
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              console.log('show more');
            }}
          >
            Show more
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

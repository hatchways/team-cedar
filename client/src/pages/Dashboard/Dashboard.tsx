import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Button, Typography, Box } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { Profile } from '../../interface/Profile';
import searchPetSitters from '../../helpers/APICalls/searchPetSitters';
import CustomSearch from '../../components/CustomSearch/CustomSearch';

export default function Dashboard(): JSX.Element {
  const [getProfiles, setProfiles] = useState<Profile[] | undefined>();
  const [searchData, setSearchData] = useState<string | null>();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    const fetchProfileData = async () => {
      const location = searchData ? searchData : '';
      const getData = await searchPetSitters({ location: location });
      setProfiles(getData.petsitter);
    };
    fetchProfileData();
  }, [searchData]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (getProfiles === undefined) return <CircularProgress />;
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} justifyContent="space-around">
          <Typography sx={{ textAlign: 'center', paddingBottom: '16px', fontWeight: 700 }} variant="h3">
            Your search results
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 4 }}>
            <CustomSearch searchData={searchData} setSearchData={setSearchData} />
          </Box>
        </Grid>
        {getProfiles?.map((profile) => (
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
          <Button size="large" variant="outlined">
            Show more
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

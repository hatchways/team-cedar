import * as React from 'react';
import { Grid, Paper, useMediaQuery, Tab, Tabs } from '@mui/material';
import { theme } from '../../themes/theme';
import TabPanel from '../../components/TabPanel/TabPanel';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';
import ProfileRequest from '../../components/ProfileRequest/ProfileRequest';

import { useAuth } from '../../context/useAuthContext';


export default function ProfileDetails(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const { profile } = useAuth();


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (profile?.type !== 'PetSitter') {
    return (
      <Grid xs={12} sm={12} md={12} lg={12} item>
        <Paper
          elevation={5}
          sx={{
            ml: { xs: 5, sm: 5, md: 5, lg: 10 },
            mr: { xs: 5, sm: 5, md: 5, lg: 10 },
            padding: { xs: 1, sm: 2, md: 3, lg: 3 },
            mt: 8,
            mb: 8,
          }}
        >
          <ProfileDetail

            name={profile?.name}
            descrption={profile?.description}
            location={profile?.address}
            photoURL={profile?.photo}
            type={profile?.type}

          />
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid container>
      {matches ? (
        <Grid xs={12} item>
          <Tabs value={value} onChange={handleChange} centered sx={{ mt: 3 }}>
            <Tab label="Profile" />
            <Tab label="Request" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid xs={12} sm={12} md={7} lg={7} item>
              <Paper
                elevation={5}
                sx={{
                  ml: { xs: 5, sm: 5, md: 5, lg: 10 },
                  mr: { xs: 5, sm: 5, md: 5, lg: 0 },
                  padding: { xs: 1, sm: 2, md: 3, lg: 3 },
                  mt: 8,
                  mb: 8,
                }}
              >
                <ProfileDetail

                  name={profile?.name}
                  descrption={profile?.description}
                  location={profile?.address}
                  photoURL={profile?.photo}
                  type={profile?.type}

                />
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Paper
                elevation={5}
                sx={{
                  mb: { xs: 5, md: 10, lg: 10 },
                  mt: { xs: 5, sm: 5, md: 8, lg: 8 },
                  mr: { xs: 5, sm: 5, md: 5, lg: 5 },
                  ml: { xs: 3, sm: 6, md: 5, lg: 10 },
                  padding: { xs: 1, sm: 0, md: 2, lg: 2 },
                }}
              >

                <ProfileRequest rate={profile?.rate} sitterId={profile._id} />

              </Paper>
            </Grid>
          </TabPanel>
        </Grid>
      ) : (
        <>
          <Grid xs={12} sm={12} md={7} lg={7} item>
            <Paper
              elevation={5}
              sx={{
                ml: { xs: 5, sm: 5, md: 10, lg: 10 },
                mr: { xs: 5, sm: 5, md: 0, lg: 0 },
                padding: { xs: 1, sm: 2, md: 3, lg: 3 },
                mt: 8,
                mb: 8,
              }}
            >
              <ProfileDetail

                name={profile?.name}
                descrption={profile?.description}
                location={profile?.address}
                photoURL={profile?.photo}
                type={profile?.type}

              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Paper
              elevation={5}
              sx={{
                mb: { xs: 5, md: 10, lg: 10 },
                mt: { xs: 5, sm: 5, md: 8, lg: 8 },
                mr: { xs: 5, sm: 5, md: 5, lg: 5 },
                ml: { xs: 3, sm: 6, md: 5, lg: 10 },
                padding: { xs: 1, sm: 0, md: 2, lg: 2 },
              }}
            >

              <ProfileRequest rate={profile?.rate} sitterId={profile._id} />

            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
}

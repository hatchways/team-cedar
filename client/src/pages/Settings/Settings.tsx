import { cloneElement } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Box, CircularProgress, Grid, Link, Theme } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { createStyles, makeStyles } from '@mui/styles';
import SettingsWrapper from '../../components/SettingsWrapper/SettingsWrapper';
import EditProfile from './EditProfile/EditProfile';
import EditProfilePhoto from './EditProfilePhoto/EditProfilePhoto';
import StripeConnect from '../../components/StripeConnect/StripeConnect';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import { AccountType } from '../../types/AccountType';

const useStyles = makeStyles({
  activeLink: {
    fontWeight: 700,
    color: '#000',
  },
});

const settingsMenu = [
  {
    name: 'Edit profile',
    to: '/profile/settings/edit-profile',
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    component: <EditProfile header="Edit Profile" />,
  },
  {
    name: 'Profile photo',
    to: '/profile/settings/profile-photo',
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    component: <EditProfilePhoto header="Profile Photo" />,
  },
  {
    name: 'Availability',
    to: '/profile/settings/availability',
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    component: <SettingHeader header="Availability" />,
  },
  {
    name: 'Payment methods',
    to: '/profile/settings/payment-methods',
    canView: [AccountType.PET_SITTER],
    component: <StripeConnect header="Payment Methods" />,
  },
  {
    name: 'Payment',
    to: '/profile/settings/payment-methods',
    canView: [AccountType.PET_OWNER],
    component: <PaymentMethod header="Payment Methods" />,
  },
];

export default function Settings(): JSX.Element {
  const { loggedInUser, profile } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser || !profile) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  const filterMenuItems = settingsMenu.filter((item) => item?.canView?.includes(profile?.type || 'pet_owner'));
  return (
    <PageContainer>
      <Grid sx={{ width: { xs: '90%', sm: '90%', md: '90%', lg: '75%' }, margin: '0 auto' }} container>
        <Grid xs={2} md={3} lg={3} item>
          {filterMenuItems.map((item) => (
            <Box
              sx={{
                margin: '20px 0',
              }}
              key={item.name}
            >
              <Link
                sx={{
                  fontSize: 20,
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 100ms ease-in-out',
                  '&:hover': {
                    color: '#000',
                  },
                }}
                component={NavLink}
                activeClassName={classes.activeLink}
                to={item.to}
              >
                {item.name}
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid xs={10} md={9} lg={9} item sx={{ p: 2 }}>
          <Switch>
            <Route exact path="/profile/settings">
              <Redirect to="/profile/settings/edit-profile" />
            </Route>
            <SettingsWrapper>
              {filterMenuItems.map((item) => (
                <Route
                  key={item.name}
                  path={item.to}
                  render={(props) =>
                    cloneElement(item.component, {
                      ...props,
                      currentUser: loggedInUser,
                      currentProfile: profile,
                    })
                  }
                />
              ))}
            </SettingsWrapper>
            <Route path="*">
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

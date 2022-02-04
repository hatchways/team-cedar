import React, { useState } from 'react';

import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
} from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import { AccountType } from '../../types/AccountType';
import lovingSitterLogo from '../../images/logo.svg';
import lovingSitterLogoSm from '../../images/logoSm.svg';
import { useStyles } from './useStyles';
import { NavLink } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import Notifications from '../Notifications/Notifications';
import clsx from 'clsx';
const NavbarButton = styled(Button)({
  padding: '15px 0',
});

type Anchor = 'right';

const menuItems = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: null,
    authenticated: false,
  },
  {
    item: 'My Jobs',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },

  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource: string;
  item: string | JSX.Element;
}> = ({ resource, item }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <NavLink className={classes.navbarItem} to={resource}>
        {item}
      </NavLink>
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { loggedInUser, profile, logout } = useAuth();
  const getProfileId = profile?._id;
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const filterMenuItems = menuItems.filter((item) => item?.canView?.includes(profile?.type || 'pet_owner'));

  const renderMenuItems = () => {
    return (
      <>
        {loggedInUser && <Notifications />}
        {filterMenuItems.map((menu) => {
          if (menu.authenticated) {
            return loggedInUser && <MenuItem key={menu.resource} {...menu} />;
          } else {
            return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
          }
        })}
      </>
    );
  };

  return (
    <Grid className={clsx(classes.navbar)} container>
      <Grid xs={2} md={6} item>
        <NavLink to="/dashboard">
          <img className={classes.navbarLogoLg} style={{ width: 180 }} src={lovingSitterLogo} />
          <img className={classes.navbarLogoSm} src={lovingSitterLogoSm} />
        </NavLink>
      </Grid>
      <Grid xs={10} md={6} item>
        <Grid container alignItems="center" gap={2} justifyContent="flex-end">
          {renderMenuItems()}

          {loggedInUser && profile && (
            <>
              <IconButton
                size="large"
                aria-label="account profile picture"
                aria-controls="menu-navbar"
                arais-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <img style={{ width: 50 }} src={`https://robohash.org/${loggedInUser.email}`} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                disableAutoFocusItem
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </DropdownMenuItem>
                <Divider />
                <DropdownMenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </DropdownMenuItem>
              </Menu>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Navbar };

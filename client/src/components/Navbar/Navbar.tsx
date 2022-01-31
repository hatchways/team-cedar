import React, { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
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
  Drawer,
  Box,
  List,
  ListItem,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import lovingSitterLogoSm from '../../images/logoSm.svg';
import { useStyles } from './useStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

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
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
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
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = React.useState({
    right: false,
  });
  const { loggedInUser, logout } = useAuth();
  const open = Boolean(anchorEl);

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

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const renderMenuItems = () => {
    // TODO: conditionally render based on profile type
    return menuItems.map((menu) => {
      if (menu.authenticated) {
        return loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      } else {
        return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      }
    });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Grid className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)} container>
      <Grid xs={4} md={6} item>
        <img className={classes.navbarLogoLg} style={{ width: 180 }} src={lovingSitterLogo} />
        <img className={classes.navbarLogoSm} src={lovingSitterLogoSm} />
      </Grid>
      <Grid xs={8} md={6} item>
        <Grid container alignItems="center" gap={2} justifyContent="flex-end">
          {renderMenuItems()}
          {loggedInUser && (
            <Grid xs={2} item className={classes.navbarLogoLg}>
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
            </Grid>
          )}
        </Grid>
        <Grid container alignItems="center" gap={2} justifyContent="flex-end">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            className={classes.navbarLogoSm}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('right', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Navbar };

import * as React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/Auth/authSlice';
export interface HeaderProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export function Header(props: HeaderProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

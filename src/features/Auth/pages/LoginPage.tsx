import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    box: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleLoginClick = () => {
    // TODO: Get username + pwd from login form
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.box}>
        <Typography variant="h5" component="h1">
          student management
        </Typography>
        <Box mt={4}>
          {isLogging && <CircularProgress color="secondary" />}
          <Button onClick={handleLoginClick} fullWidth variant="contained" color="primary">
            Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

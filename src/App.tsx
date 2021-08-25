import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import cityApi from './api/cityApi';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './features/Auth/pages/LoginPage';
import { AdminLayout } from './components/Layout';
import { NotFound, PrivateRoute } from './components/Common';
import { CssBaseline, Button } from '@material-ui/core';
import { useAppDispatch } from './app/hooks';
import { authActions } from './features/Auth/authSlice';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => {
      console.log(res);
    });
  }, []);
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      <CssBaseline />
      <Counter />
      <Button color="primary" onClick={handleLogoutClick}>
        log out
      </Button>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

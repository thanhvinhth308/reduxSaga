import { CssBaseline } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import cityApi from './api/cityApi';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { authActions } from './features/Auth/authSlice';
import LoginPage from './features/Auth/pages/LoginPage';

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
      {/* <Counter /> */}
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

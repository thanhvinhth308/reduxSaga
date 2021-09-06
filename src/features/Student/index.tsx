import React, { useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import { useDispatch } from 'react-redux';
import { cityActions } from '../city/citySlice';

export default function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}

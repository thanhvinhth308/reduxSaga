import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  // console.log('🚀 ~ file: PrivateRoute.tsx ~ line 5 ~ PrivateRoute ~ props', props);
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}

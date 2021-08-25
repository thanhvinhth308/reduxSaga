import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
// import { push } from 'connected-react-router';

function* handleLogin(payload: LoginPayload) {
  try {
    // yield delay(1000);
    console.log('login');
    localStorage.setItem('access_token', 'fake_token');
    // yield put(
    //   authActions.loginSuccess({
    //     id: 1,
    //     name: 'Easy Frontend',
    //   })
    // );

    // redirect to admin page
    // yield put(push('/admin/dashboard'));
  } catch (error) {
    // yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  // yield delay(500);
  console.log('log out');
  localStorage.removeItem('access_token');
  // redirect to login page
  // yield put(push('/login'));
}
export function* authSaga() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      console.log('🚀 ~ file: authSaga.ts ~ line 37 ~ function*authSaga ~ action', action);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

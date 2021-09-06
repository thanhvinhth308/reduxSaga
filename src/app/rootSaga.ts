import { all } from 'redux-saga/effects';
import { authSaga } from '../features/Auth/authSaga';
import citySaga from '../features/city/citySaga';
import counterSaga from '../features/counter/counterSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import studentSaga from '../features/Student/studentSaga';

function* helloSaga() {
  console.log('hello saga');
}
export default function* rootSaga() {
  // console.log('root saga');
  yield all([helloSaga(), authSaga(), counterSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}

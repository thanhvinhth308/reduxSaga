import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import studentReducer from '../features/Student/studentSlice';
import cityReducer from '../features/city/citySlice';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

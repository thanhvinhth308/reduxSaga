import { call, put, takeLatest } from 'redux-saga/effects';
import cityApi from '../../api/cityApi';
import { City } from '../../models/city';
import { ListResponse } from '../../models/common';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('failed to fetch');
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}

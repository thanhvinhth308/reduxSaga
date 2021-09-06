import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import { ListResponse, ListParams } from '../../models/common';
import { studentActions } from './studentSlice';
import studentApi from '../../api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models/student';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('failed to fetch');
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
  console.log('🚀 ~ file: studentSaga.ts ~ line 18 ~ function*handleSearchDebounce ~ action.payload', action.payload);
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudent.type, fetchStudentList);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}

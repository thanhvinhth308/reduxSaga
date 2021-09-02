import { takeLatest, all, call } from 'redux-saga/effects';
import { ListResponse } from '../../models/common';
import { Student } from '../../models/student';
import { dashboardActions, RankingByCity } from './dashboardSlice';
import studentApi from '../../api/studentApi';
import { put } from 'redux-saga/effects';
import { City } from '../../models/city';
import cityApi from '../../api/cityApi';

function* fetchStatistics() {
  const responseList: ListResponse<Student>[] = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  // Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  // Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  // Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('failed to fetch');
    yield put(dashboardActions.fetchFailed());
  }
}

export default function* dashboardSaga() {
  console.log('dashboardSaga');
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models/student';
import { ListParams, ListResponse, PaginationParams } from '../../models/common';
import { RootState } from '../../app/store';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}
const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: { _page: 1, _limit: 15, _totalRows: 15 },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudent(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//actions
export const studentActions = studentSlice.actions;
//selector
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;
//reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;

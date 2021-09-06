import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams } from '../../../models/common';
import { Student } from '../../../models/student';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const classes = useStyles();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const loading = useAppSelector(selectStudentLoading);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudent(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    // console.log('🚀 ~ file: ListPage.tsx ~ line 67 ~ handleSearchChange ~ newFilter', newFilter);
    //nó cứ dispatch action lên nhưng sẽ bị debounce ở saga
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student.id || '');
      // Trigger to re-fetch student list with current filter
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log('failed to fetch student');
    }
  };
  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* filter */}
      <Box>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />

      <Pagination
        color="primary"
        count={Math.ceil(pagination._totalRows / pagination._limit)}
        page={pagination._page}
        onChange={handlePageChange}
      />
    </Box>
  );
}

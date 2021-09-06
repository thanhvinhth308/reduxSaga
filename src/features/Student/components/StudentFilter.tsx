import React, { ChangeEvent, useRef } from 'react';
import { ListParams } from '../../../models/common';
import { City } from '../../../models/city';
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void; //khi thay đổi thì call api liền
  onSearchChange?: (newFilter: ListParams) => void; //khi thay đổi có thể chưa call api liền mà debouce
}

export default function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
  const searchRef = useRef<HTMLInputElement>(); //phải truyền HTMLInputElement vào vì nếu không nó sẽ không hiểu là element và mình k truy cập dc vào các giá trị của element

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    if (!onChange) return;
    const newFilter = { ...filter, _page: 1, city: e.target.value || undefined };
    onChange(newFilter);
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              // value={filter.name_like}
              //khi đầu filter.name_like là undèined nên là uncontrolled component,vì nó lấy state trên redux,mà khi gõ nó chưa kịp cập nhật để render lên
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select labelId="filterByCity" value={filter.city || ''} onChange={handleCityChange} label="Filter by city">
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

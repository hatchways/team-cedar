import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/lab';

interface CustomSearchProps {
  searchData?: string | null;
  setSearchData: (search: string) => void;
}

const CustomSearch = ({ searchData, setSearchData }: CustomSearchProps): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 420 }}>
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search By Location"
        inputProps={{ 'aria-label': 'search by location' }}
        onChange={handleSearchChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={({ inputRef, inputProps, InputProps, value }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {InputProps?.endAdornment}
              <InputBase sx={{ pl: 1 }} ref={inputRef} inputProps={inputProps} />
            </Box>
          )}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default CustomSearch;

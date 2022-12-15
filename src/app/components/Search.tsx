import { Paper, InputBase, IconButton } from '@mui/material';
import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  handleSearch: (value: string) => void
};

function Search(props: Props) {
  const { handleSearch } = props;
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value.toLowerCase());
  };

  const handleKeyPressed = (key: string) => {
    if (key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleSearchButtonPress = () => {
    handleSearch(inputValue);
  };

  const handleClearButtonPress = () => {
    setInputValue('');
    handleSearch('');
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          display: 'flex', alignItems: 'center', width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleInputChange(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => handleKeyPressed(e.key)}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => handleClearButtonPress()}
        >
          <ClearIcon />
        </IconButton>
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => handleSearchButtonPress()}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default Search;

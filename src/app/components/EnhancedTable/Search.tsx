import { InputBase, IconButton, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Root = styled('div')(({ theme }) => ({
  borderRadius: '25px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));

const Icon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Input = styled(InputBase)({
  paddingLeft: '15px',
});

type Props = {
  handleSearch: (value: string) => void
};

function Search(props: Props) {
  const { handleSearch } = props;
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue('');
  }, [handleSearch]);

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
    <Root>
      <Input
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => handleKeyPressed(e.key)}
      />
      <Icon
        type="button"
        aria-label="search"
        onClick={() => handleClearButtonPress()}
      >
        <ClearIcon />
      </Icon>
      <Icon
        type="button"
        aria-label="search"
        onClick={() => handleSearchButtonPress()}
      >
        <SearchIcon />
      </Icon>
    </Root>
  );
}

export default Search;

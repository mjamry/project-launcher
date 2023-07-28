import { IconButton, styled } from '@mui/material';
import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const KeyboardArrowUpIcon = styled(KeyboardArrowDownIcon)({
  transform: 'rotate(180deg)',
});

type Props = {
  onClick: () => void;
};

function CollapseButton(props: Props) {
  const { onClick: onClickHandler } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClickHandler();
  };

  return (
    <IconButton
      aria-label="expand item"
      size="small"
      onClick={handleClick}
    >
      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
}

export default CollapseButton;

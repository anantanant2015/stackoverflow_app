import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const FilterButtons = () => {
  return (
    <ButtonGroup className="filter-buttons" variant="contained" color="primary">
      <Button>Newest</Button>
      <Button>Unanswered</Button>
      <Button>Trending</Button>
    </ButtonGroup>
  );
};

export default FilterButtons;
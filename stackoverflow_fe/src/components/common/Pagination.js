import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = () => {
  return (
    <MuiPagination className="pagination" count={10} color="primary" />
  );
};

export default Pagination;
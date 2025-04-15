import React from 'react';
import { Grid, Pagination, ToggleButtonGroup, ToggleButton, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';




const PaginationControls = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onPerPageChange,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ mt: 2 }}
    >
      {/* Left: Pagination */}
      <Grid item>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
        />
      </Grid>

      {/* Right: Results per page */}
      <Grid item>
        <ToggleButtonGroup variant="outlined" shape="rounded"
          value={rowsPerPage}
          exclusive
          onChange={(e, value) => {
            if (value !== null) onPerPageChange(value);
          }}
          sx={{
            ml: 'auto',
            borderRadius: '5px',
            '& .MuiToggleButton': {
              border: '1px solid #ccc',
              m: 2,
              fontSize: '0.875rem',
              justifyContent: "flex-end",
              alignItems: "center",
            },
            '& .Mui-selected': {
              backgroundColor: 'red',
              color: 'white',
              borderColor: 'red',
              '&:hover': {
                backgroundColor: '#cc0000',
              },
            }
          }}
        >
          {[15, 30, 50].map((value) => (
            <ToggleButton key={value} value={value} sx={{ borderRadius: '5px', margin: '13px' }}>
              {value}
            </ToggleButton>
          ))}
          <Typography variant="body2" sx={{ color: 'text.secondary', margin: '13px' }}>
            per page
          </Typography>
        </ToggleButtonGroup>



      </Grid>
    </Grid>
  );
};

export default PaginationControls;

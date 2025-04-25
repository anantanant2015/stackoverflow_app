import React from "react";
import { TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <TextField
      className="search-bar"
      fullWidth
      label="Search questions..."
      variant="outlined"
    />
  );
};

export default SearchBar;

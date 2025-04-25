import React from "react";
import { Box, List } from "@mui/material";
import Collectives from "../pages/collectives/Collectives";

const RightSidebar = () => {
  return (
    <Box className="sidebar">
      <List>
        <Collectives />
      </List>
    </Box>
  );
};

export default RightSidebar;

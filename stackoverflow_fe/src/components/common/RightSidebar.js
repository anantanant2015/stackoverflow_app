import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Collectives from '../pages/collectives/Collectives';


const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <Box className="sidebar">
      <List>
      <Collectives />
      </List>
    </Box>
  );
};

export default RightSidebar;

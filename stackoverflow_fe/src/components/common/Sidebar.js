import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as QuestionsIcon } from "../../assets/questions.svg";
import { ReactComponent as UsersIcon } from "../../assets/users.svg";
import { ReactComponent as CompaniesIcon } from "../../assets/companies.svg";
import Icon from '@mui/material/Icon';


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <List>
      <ListItem button onClick={() => navigate(`/home`)}><Icon children={<HomeIcon />}></Icon><ListItemText primary="Home" /></ListItem>
        <ListItem button onClick={() => navigate(`/`)}><Icon children={<QuestionsIcon />}></Icon><ListItemText primary="Questions" /></ListItem>
        <ListItem button onClick={() => navigate(`/users`)}><Icon children={<UsersIcon />}></Icon><ListItemText primary="Users" /></ListItem>
        <ListItem button onClick={() => navigate(`/collectives`)}><Icon children={<CompaniesIcon />}></Icon><ListItemText primary="Collectives" /></ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

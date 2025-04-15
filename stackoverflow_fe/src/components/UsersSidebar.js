import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { Avatar, Box, Typography, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const UsersSidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      if (data) {
        setUsers(data.slice(0, 10)); // Fetch top 10 users
      }
    });
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Top Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.user_id} component="a" href={user.link} target="_blank">
            <ListItemAvatar>
              <Avatar src={user.profile_image} alt={user.display_name} />
            </ListItemAvatar>
            <ListItemText
              primary={user.display_name}
              secondary={`Reputation: ${user.reputation}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UsersSidebar;

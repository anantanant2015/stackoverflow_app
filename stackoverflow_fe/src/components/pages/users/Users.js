import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Avatar, Typography, Box, Pagination } from '@mui/material';
import { fetchUsers } from "../../../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('reputation');
  const [page, setPage] = useState(1);

  // const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      if (data) {
        setUsers(data); // Fetch top 10 users
      }
    });
  }, [filter, page]);

  // useEffect(() => {
  //   fetch(`https://api.stackexchange.com/2.3/users?page=${page}&order=desc&sort=${filter}&site=stackoverflow`)
  //     .then(res => res.json())
  //     .then(data => setUsers(data.items || []));
  // }, [filter, page]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Box >
      {/* First Row - Search & Filter Buttons */}
      <Grid >
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={6} >
          {['reputation', 'creation', 'name'].map((option) => (
            <Button
              key={option}
              variant={filter === option ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </Grid>
      </Grid>

      {/* Second Row - User Grid & Top Bar */}
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {users.filter(user => user.display_name.toLowerCase().includes(search.toLowerCase())).slice(0, 6).map(user => (
              <Grid item xs={4} key={user.user_id}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar src={user.profile_image} sx={{ width: 80, height: 80 }} />
                  <Typography variant="h6">{user.display_name}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.location || 'Unknown'}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section - Leaderboard */}
        <Grid item xs={4}>
          <Box borderBottom={1} pb={1} mb={2}>
            <Typography variant="h6">Top Users</Typography>
          </Box>
          {users.slice(6, 12).map(user => (
            <Box key={user.user_id} >
              <Avatar src={user.profile_image} sx={{ width: 40, height: 40 }} />
              <Box ml={2}>
                <Typography>{user.display_name}</Typography>
                <Typography variant="caption">{user.reputation} reputation</Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Third Row - Links & Pagination */}
      <Grid >
        <Grid item>
          <Typography variant="body2" color="primary">Weekly / Monthly / Quarterly Reputation Leagues</Typography>
        </Grid>
        <Grid item>
          <Pagination count={10} page={page} onChange={(e, value) => setPage(value)} color="primary" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;

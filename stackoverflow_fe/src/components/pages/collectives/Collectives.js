import React, { useEffect, useState } from "react";
import { fetchCollectives } from "../../../api";
import { Box, Typography, Paper } from "@mui/material";
import CollectivesCard from "./CollectivesCard";

const Collectives = () => {
  const [collectives, setCollectives] = useState([]);

  useEffect(() => {
    fetchCollectives().then((data) => setCollectives(data || []));
  }, []);

  return (
    <Box>
      {/* Collectives Section */}
      <Paper sx={{ padding: 0, marginBottom: 0 }}>
        <Typography variant="h6">Featured Collectives</Typography>
        {/* <List>
          {collectives.map((collective) => (
            <ListItem key={collective.name}>
              <ListItemText primary={collective.name} secondary={collective.description} />
            </ListItem>
          ))}
        </List> */}
        <CollectivesCard collectives={collectives.slice(0, 3)} />
      </Paper>
    </Box>
  );
};

export default Collectives;

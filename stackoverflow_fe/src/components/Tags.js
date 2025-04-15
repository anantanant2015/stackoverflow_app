import React, { useEffect, useState } from 'react';
import { fetchRelatedTags } from '../../../api';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const Tags = () => {
  const [relatedTags, setRelatedTags] = useState([]);

  useEffect(() => {
    fetchRelatedTags().then(data => setRelatedTags(data || []));
  }, []);

  return (
    <Box>

      {/* Related Tags Section */}
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">Related Tags</Typography>
        <List>
          {relatedTags.map((tag, index) => (
            <ListItem key={index}>
              <ListItemText primary={tag.name} secondary={`Count: ${tag.count}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Tags;

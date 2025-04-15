// CreateQuestion.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Autocomplete,
  Stack
} from '@mui/material';

const API_KEY = 'YOUR_STACKAPPS_KEY';

const CreateQuestion = ({ accessToken }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      if (tagInput.length < 2) return;
      try {
        const res = await axios.get('https://api.stackexchange.com/2.3/tags', {
          params: {
            order: 'desc',
            sort: 'popular',
            inname: tagInput,
            site: 'stackoverflow',
            key: API_KEY
          }
        });
        setSuggestedTags(res.data.items.map(item => item.name));
      } catch (error) {
        console.error('Tag fetch error', error);
      }
    };
    fetchTags();
  }, [tagInput]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim() || selectedTags.length === 0) {
      setMessage({ type: 'error', text: 'All fields including at least one tag are required.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('https://api.stackexchange.com/2.3/questions/add', null, {
        params: {
          key: API_KEY,
          access_token: accessToken,
          site: 'stackoverflow',
          title,
          body,
          tags: selectedTags.join(','),
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setMessage({ type: 'success', text: 'Question created successfully!' });
      setTitle('');
      setBody('');
      setSelectedTags([]);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create question.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ask a Stack Overflow Question
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Body (Markdown supported)"
          fullWidth
          multiline
          minRows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Autocomplete
          multiple
          options={suggestedTags}
          value={selectedTags}
          onChange={(e, newValue) => setSelectedTags(newValue)}
          inputValue={tagInput}
          onInputChange={(e, newInputValue) => setTagInput(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label="Tags (min. 1 required)" placeholder="Add tags" />
          )}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={loading || !accessToken}>
          {loading ? <CircularProgress size={20} /> : 'Submit Question'}
        </Button>

        {message && (
          <Alert severity={message.type}>{message.text}</Alert>
        )}
      </Stack>
    </Box>
  );
};

export default CreateQuestion;

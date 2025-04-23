// SearchQuestions.js
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const API_KEY = "YOUR_STACKAPPS_KEY";

const SearchQuestions = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/search",
        {
          params: {
            order: "desc",
            sort: "relevance",
            intitle: query,
            site: "stackoverflow",
            key: API_KEY,
          },
        },
      );
      setResults(response.data.items);
    } catch (err) {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Search Stack Overflow Questions
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Search Query"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {results.map((item) => (
          <ListItem
            key={item.question_id}
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            divider
          >
            <ListItemText
              primary={item.title}
              secondary={`Score: ${item.score} | Answers: ${item.answer_count}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchQuestions;

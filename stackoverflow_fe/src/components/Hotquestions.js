import React, { useEffect, useState } from "react";
import { fetchHotNetworkQuestions } from "../../../api";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const Hotquestions = () => {
  const [hotQuestions, setHotQuestions] = useState([]);

  useEffect(() => {
    fetchHotNetworkQuestions().then((data) => setHotQuestions(data || []));
  }, []);

  return (
    <Box>
      {/* Hot Network Questions Section */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Hot Network Questions</Typography>
        <List>
          {hotQuestions.map((question) => (
            <ListItem
              key={question.question_id}
              component="a"
              href={question.link}
              target="_blank"
            >
              <ListItemText primary={question.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Hotquestions;

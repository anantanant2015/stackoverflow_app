import { useState } from "react";
import { Box, TextField, Paper, Typography, Button, Link, Grid } from "@mui/material";
import PropTypes from 'prop-types';


export default function SearchInputWithHints({
  value,
  onChange,
  onKeyDown,
  placeholder = "Search StackOverflow...",
  label = "Search StackOverflow..."
}) {
  const [focused, setFocused] = useState(false);

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 600 }}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
      />

      {focused && (
        <Box
          sx={{
            position: "absolute",
            width: "500px",
            top: "calc(100% + 8px)",
            zIndex: 10,
          }}
        >
          <Paper elevation={4} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {[
                  ["[tag]", "search within a tag"],
                  ["user:1234", "search by author"],
                  ['"words here"', "exact phrase"],
                  ['collective:"Name"', "collective content"],
                ].map(([code, desc], idx) => (
                  <Box key={idx} mb={1}>
                    <Typography component="span" fontFamily="monospace" fontWeight="bold" mr={1}>
                      {code}
                    </Typography>
                    <Typography component="span" color="text.secondary">
                      {desc}
                    </Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                {[
                  ["answers:0", "unanswered questions"],
                  ["score:3", "posts with a 3+ score"],
                  ["is:question", "type of post"],
                  ["isaccepted:yes", "search within status"],
                ].map(([code, desc], idx) => (
                  <Box key={idx} mb={1}>
                    <Typography component="span" fontFamily="monospace" fontWeight="bold" mr={1}>
                      {code}
                    </Typography>
                    <Typography component="span" color="text.secondary">
                      {desc}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>

            <Box
              mt={2}
              pt={1}
              borderTop="1px solid #ddd"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button size="small" variant="contained" href="/questions/ask">
                Ask a question
              </Button>
              <Link href="https://stackoverflow.com/help/searching" target="_blank" underline="hover" fontSize="0.875rem">
                Search help
              </Link>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

SearchInputWithHints.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

SearchInputWithHints.defaultProps = {
  onKeyDown: () => { },
  placeholder: 'Search StackOverflow...',
  label: 'Search StackOverflow...',
};

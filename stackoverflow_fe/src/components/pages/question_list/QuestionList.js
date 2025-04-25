import React, { useState, useMemo } from "react";
import QuestionSummary from "./QuestionSummary";
import PaginationControls from "../../common/PaginationControls";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";

const QuestionList = ({ questions = [], pageSize }) => {
  const [filters, setFilters] = useState({
    noAnswers: false,
    noAccepted: false,
    hasBounty: false,
    daysOld: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [showFilter, setShowFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(pageSize || 15);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
    setCurrentPage(1);
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      daysOld: value === "" ? "" : parseInt(value),
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (event, newSort) => {
    if (newSort) {
      setSortBy(newSort);
      setCurrentPage(1);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (sortOption) => {
    if (sortOption) {
      setSortBy(sortOption);
      setCurrentPage(1);
    }
    setAnchorEl(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuestionsPerPageChange = (newPerPage) => {
    setQuestionsPerPage(newPerPage);
    setCurrentPage(1);
  };

  // Always call hooks unconditionally!
  const filteredAndSorted = useMemo(() => {
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (!Array.isArray(questions)) {
      return [];
    }

    return questions
      .filter((q) => {
        if (filters.noAnswers && q.answer_count > 0) return false;
        if (filters.noAccepted && q.is_answered) return false;
        if (filters.hasBounty && !q.bounty_amount) return false;
        if (filters.daysOld !== "" && !isNaN(filters.daysOld)) {
          const ageInSeconds = filters.daysOld * 24 * 60 * 60;
          const threshold = nowInSeconds - ageInSeconds;
          if (q.creation_date < threshold) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.creation_date - a.creation_date;
          case "active":
            return b.last_activity_date - a.last_activity_date;
          case "bountied":
            return (b.bounty_amount || 0) - (a.bounty_amount || 0);
          case "unanswered":
            return a.answer_count - b.answer_count;
          case "frequent":
            return b.view_count - a.view_count;
          case "score":
            return b.score - a.score;
          case "week":
            return b.creation_date - a.creation_date;
          case "month":
            return b.creation_date - a.creation_date;
          case "trending":
            return b.view_count + b.score * 2 - (a.view_count + a.score * 2);
          default:
            return 0;
        }
      });
  }, [filters, questions, sortBy]);

  if (!Array.isArray(questions)) {
    return <Typography color="error">Invalid questions data.</Typography>;
  }

  const totalPages = Math.ceil(filteredAndSorted.length / questionsPerPage);
  const currentPageQuestions = filteredAndSorted.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage,
  );

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Questions</Typography>
        <Button variant="contained">Ask Question</Button>
      </Box>

      {/* Filters & Sort */}
      <Grid
        container
        justifyContent="flex-end"
        spacing={0}
        mb={1}
        sx={{ fontSize: "10px" }}
      >
        <Grid item>
          <ToggleButtonGroup
            value={sortBy}
            exclusive
            onChange={handleSortChange}
            size="small"
          >
            <ToggleButton value="newest" sx={{ border: "none" }}>
              Newest
            </ToggleButton>
            <ToggleButton value="active" sx={{ border: "none" }}>
              Active
            </ToggleButton>
            <ToggleButton value="bountied" sx={{ border: "none" }}>
              Bountied
            </ToggleButton>
            <ToggleButton value="unanswered" sx={{ border: "none" }}>
              Unanswered
            </ToggleButton>
            <ToggleButton
              value="more"
              onClick={handleMenuClick}
              sx={{ border: "none" }}
            >
              <MoreVertIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose()}
          >
            <MenuItem onClick={() => handleMenuClose("frequent")}>
              Frequent
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("score")}>Score</MenuItem>
            <MenuItem onClick={() => handleMenuClose("trending")}>
              Trending
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("week")}>Week</MenuItem>
            <MenuItem onClick={() => handleMenuClose("month")}>Month</MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => setShowFilter(!showFilter)}>
            Filter
          </Button>
        </Grid>
      </Grid>

      {/* Advanced Filters */}
      {showFilter && (
        <Box border={1} borderColor="grey.300" borderRadius={1} p={2} mb={2}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.noAnswers}
                  onChange={handleCheckboxChange}
                  name="noAnswers"
                />
              }
              label="No answers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.noAccepted}
                  onChange={handleCheckboxChange}
                  name="noAccepted"
                />
              }
              label="No accepted answer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hasBounty}
                  onChange={handleCheckboxChange}
                  name="hasBounty"
                />
              }
              label="Has bounty"
            />
            <TextField
              label="Days old"
              type="number"
              value={filters.daysOld}
              onChange={handleDaysChange}
              size="small"
              style={{ width: 100, marginLeft: 16 }}
            />
          </FormGroup>
        </Box>
      )}

      {/* Question Results */}
      {currentPageQuestions.map((question, index) => (
        <QuestionSummary key={index} question={question} />
      ))}

      {/* Pagination */}
      {questions.length > 15 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          perPage={questionsPerPage}
          onPerPageChange={handleQuestionsPerPageChange}
        />
      )}
    </Box>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default QuestionList;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchQuestionById,
  upvoteQuestion,
  downvoteQuestion,
  fetchCommentsOnQuestion,
  postCommentToQuestion,
} from "../../../api";
import {
  Container,
  Typography,
  Chip,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  TextField,
  Button,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PropTypes from "prop-types";

const QuestionDetail = ({ pageSize }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      const data = await fetchQuestionById(id);
      setQuestion(data);
      setVoteCount(data.score);
      setLoading(false);
    };

    const loadComments = async () => {
      const commentData = await fetchCommentsOnQuestion(id);
      setComments(commentData);
    };

    loadQuestion();
    loadComments();
  }, [id]);

  const handleUpvote = async () => {
    const success = await upvoteQuestion(id);
    if (success) {
      setVoteCount((prev) => prev + 1);
      setSnackbar({
        open: true,
        message: "Upvoted successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to upvote.",
        severity: "error",
      });
    }
  };

  const handleDownvote = async () => {
    const success = await downvoteQuestion(id);
    if (success) {
      setVoteCount((prev) => prev - 1);
      setSnackbar({
        open: true,
        message: "Downvoted successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to downvote.",
        severity: "error",
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setPostingComment(true);
    try {
      const result = await postCommentToQuestion(
        id,
        newComment,
        null,
        previewMode,
      );
      if (result && result.items && result.items.length > 0) {
        const newItem = result.items[0];
        setComments((prev) => [...prev, newItem]);
        setNewComment("");
        setSnackbar({
          open: true,
          message: "Comment posted.",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
      setSnackbar({
        open: true,
        message: "Failed to post comment.",
        severity: "error",
      });
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (!question)
    return <Typography variant="h6">Question not found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {question.title}
      </Typography>

      <Box mt={2}>
        {question.tags.map((tag, index) => (
          <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Avatar
          src={question.owner.profile_image}
          alt={question.owner.display_name}
        />
        <Box ml={2}>
          <Typography variant="body2">{question.owner.display_name}</Typography>
          <Typography variant="caption" color="textSecondary">
            Reputation: {question.owner.reputation}
          </Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: question.body }}
        />
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Tooltip title="Upvote">
          <IconButton onClick={handleUpvote} color="primary">
            <ThumbUpIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" sx={{ mx: 1 }}>
          {voteCount}
        </Typography>
        <Tooltip title="Downvote">
          <IconButton onClick={handleDownvote} color="secondary">
            <ThumbDownIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Comments Section */}
      <Box mt={4}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <List>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <ListItem key={comment.comment_id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <span dangerouslySetInnerHTML={{ __html: comment.body }} />
                  }
                  secondary={`— ${comment.owner.display_name}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments available.
            </Typography>
          )}
        </List>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            fullWidth
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            minRows={2}
          />
          <FormControlLabel
            control={
              <Switch
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                color="primary"
              />
            }
            label="Preview Mode"
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={postingComment || !newComment.trim()}
          >
            {previewMode ? "Preview" : "Post"}
          </Button>
        </Box>

        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            minRows={2}
          />

          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={postingComment || !newComment.trim()}
          >
            Post
          </Button>
        </Box>
      </Box>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

QuestionDetail.propTypes = {
  pageSize: PropTypes.number.isRequired,
};

export default QuestionDetail;

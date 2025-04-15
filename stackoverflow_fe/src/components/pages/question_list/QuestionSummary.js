import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Chip,
  Stack,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function QuestionSummary({ question }) {
  const navigate = useNavigate();
  const {
    score,
    answer_count,
    view_count,
    title,
    tags,
    owner,
    creation_date,
    link,
  } = question;

  const creationTime = new Date(creation_date * 1000).toLocaleString();
  const reputation = owner?.reputation?.toLocaleString() ?? '0';

  const truncateHTML = (html, maxLength) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return DOMPurify.sanitize(truncated);
  };



  return (
    <Box
      sx={{
        borderTop: '1px solid #ddd',
        borderRight: 'none',
        borderRadius: 1,
        padding: 2,
        marginBottom: 2,
        backgroundColor: '#fff',
      }}
    >
      {/* Top-level layout */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
        }}
      >
        {/* Left column: votes/answers/views */}
        <Box sx={{ fontSize: '31.02px', minWidth: '80px', textAlign: 'right', flexShrink: 0 }}>
          <Stack spacing={0.5}>
            <Typography variant="body2" >
              <strong>{score}</strong> votes
            </Typography>
            <Typography
              variant="body2"
              sx={{
                ...(question.accepted_answer_id
                  ? {
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '2px 6px',
                  }
                  : question.is_answered
                    ? {
                      border: '1px solid green',
                      color: 'green',
                      borderRadius: '4px',
                      padding: '2px 6px',
                    }
                    : {
                      color: 'text.secondary',
                    }),
              }}
            >
              <strong>{question.answer_count}</strong> answers
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>{view_count}</strong> views
            </Typography>
          </Stack>
        </Box>

        {/* Right column: question content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Title */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: '1rem' }}>
            <Link
              onClick={() => navigate(`/question/${question.question_id}`)}
              underline="hover"
              color="primary"
              target="_blank"
              rel="noopener"
            >
              {title}
            </Link>
          </Typography>

          {/* Description */}
          <Typography variant="body2" sx={{ fontSize: '0.75rem', height: '100%', boxSizing: 'border-box', color: 'text.primary', mb: 1, maxWidth: '100%', overflow: 'scroll' }} dangerouslySetInnerHTML={{ __html: truncateHTML(question.body, 200) }}>
          </Typography>

          {/* Tags and User Info */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              maxWidth: '60%'
            }}
          >
            {/* Tags */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    borderRadius: '4px',
                    height: 24,
                    fontSize: '0.75rem',
                    px: 1,
                    textTransform: 'lowercase',
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </Box>

            {/* Spacer to push user info to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* User Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'right',
                gap: 1,
                mt: { xs: 1, sm: 0 },
              }}
            >
              <Avatar
                src={owner?.profile_image}
                alt={owner?.display_name}
                sx={{ width: 20, height: 20 }}
              />
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                <Link
                  href={owner?.link}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  {owner?.display_name}
                </Link>{' '}
                <span style={{ color: '#999' }}>
                  {reputation} • asked {creationTime}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

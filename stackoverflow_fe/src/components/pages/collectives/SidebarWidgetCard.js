import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Link,
  Stack,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const SidebarWidgetCard = () => {
  const data = {
    blog: [
      {
        title: "From training to inference: The new role of web data in LLMs",
        href: "https://stackoverflow.blog/2025/04/03/from-training-to-inference-the-new-role-of-web-data-in-llms/",
      },
      {
        title: "Is AI a bubble or a revolution? The answer is yes.",
        href: "https://stackoverflow.blog/2025/04/04/is-ai-a-bubble-or-a-revolution-the-answer-is-yes/",
      },
    ],
    meta: [
      {
        title:
          "Changes to reporting for the [status-review] escalation process",
        href: "https://meta.stackexchange.com/questions/407927/changes-to-reporting-for-the-status-review-escalation-process",
        favicon: "favicon-stackexchangemeta",
      },
      {
        title: "Policy: Generative AI (e.g., ChatGPT) is banned",
        href: "https://meta.stackoverflow.com/questions/421831/policy-generative-ai-e-g-chatgpt-is-banned",
        favicon: "favicon-stackoverflowmeta",
      },
      {
        title:
          "A discussion about closed (and potentially useful) posts on Stack Overflow",
        href: "https://meta.stackoverflow.com/questions/433466/a-discussion-about-closed-and-potentially-useful-posts-on-stack-overflow",
        favicon: "favicon-stackoverflowmeta",
      },
    ],
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderColor: "#f4d27b",
        backgroundColor: "#fdf7e7",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box p={1}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#3b4045" }}
          >
            The Overflow Blog
          </Typography>
          <Stack spacing={1} mt={0}>
            {data.blog.map((item, index) => (
              <Box key={index} display="flex" alignItems="flex-start" gap={1}>
                <CreateIcon
                  fontSize="small"
                  sx={{ color: "black", fontSize: "0.75rem", pt: "10px" }}
                />
                <Link
                  href={item.href}
                  target="_blank"
                  underline="hover"
                  color="inherit"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider
          sx={{
            mb: 0,
            borderColor: "#f4d27b",
            backgroundColor: "#fdf7e7",
          }}
        />

        <Box p={1}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#3b4045" }}
          >
            Featured on Meta
          </Typography>
          <Stack spacing={1} mt={0}>
            {data.meta.map((item, index) => (
              <Box key={index} display="flex" alignItems="flex-start" gap={1}>
                <Box
                  className={`favicon ${item.favicon}`}
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    flexShrink: 0,
                  }}
                />
                <Link
                  href={item.href}
                  target="_blank"
                  underline="hover"
                  color="inherit"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SidebarWidgetCard;

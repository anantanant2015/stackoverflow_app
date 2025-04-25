import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

const CollectivesCard = ({ collectives }) => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/collectives");
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#3b4045" }}
          >
            Collectives
          </Typography>
        }
        action={
          <Button variant="text" onClick={handleSeeAll}>
            See all
          </Button>
        }
        sx={{ fontSize: "1rem", pb: "0px", mb: "0px" }}
      />
      <CardContent>
        {collectives.map((collective, index) => (
          <Box key={index} mb={index < 2 ? 2 : 0}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box display="flex" alignItems="center">
                <Avatar alt={collective.name} sx={{ mr: 1 }}>
                  {collective.name?.charAt(0) || "C"}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#3b4045" }}
                  >
                    {collective.name}
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    {collective.members_count ?? "1.2k"} members
                  </Typography>
                </Box>
              </Box>
              <Button variant="outlined" size="small">
                Join
              </Button>
            </Box>
            <Typography
              variant="body2"
              color="text.primary"
              mt={1}
              sx={{ fontSize: "0.75rem" }}
            >
              {truncateText(collective.description, 85)}
            </Typography>
            {index < 2 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

CollectivesCard.propTypes = {
  collectives: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default CollectivesCard;

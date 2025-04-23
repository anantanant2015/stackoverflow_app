import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import exampleImage from "../../assets/header_img.png";
import { styles } from "../styles/styles";
import Icon from "@mui/material/Icon";
import { ReactComponent as InboxIcon } from "../../assets/inbox.svg";
import { ReactComponent as TrophyIcon } from "../../assets/trophy.svg";
import HelpIcon from "@mui/icons-material/Help";
import { ReactComponent as StackIcon } from "../../assets/stack.svg";
import PropTypes from "prop-types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: "solid",
  borderColor: "#babfc5",
  // borderRadius: '5px',
  borderWidth: "1px",
  color: "black",
  minWidth: "12px",
  maxWidth: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch({ q: query.trim() });
    }
  };
  return (
    <Box>
      <Grid container direction="row" sx={styles.header} spacing={0.5}>
        <Grid item>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ m: 2 }}
          ></IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap component="div" sx={styles.logo}>
            <a href="http://localhost:3000">
              <img src={exampleImage} alt="header" />
            </a>
          </Typography>
        </Grid>
        <Grid item>
          <Chip
            label="Products"
            variant="outlined"
            sx={styles.headerItem}
            onClick={() => navigate(`/products`)}
          />
        </Grid>
        <Grid item>
          <Chip
            label="OverflowAI"
            variant="outlined"
            sx={styles.headerItem}
            onClick={() => navigate(`/overflowai`)}
          />
        </Grid>

        <Grid item>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Search StackOverflow..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Search>
        </Grid>

        <Grid item sx={{ margin: 0 }}>
          <Icon>
            <InboxIcon />
          </Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }}>
          <Icon>
            <TrophyIcon />
          </Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }}>
          <Icon>
            <HelpIcon sx={{ color: "black" }} />
          </Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }}>
          <Icon>
            <StackIcon />
          </Icon>
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap component="div">
            <a href="http://localhost:3000">View Details</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired, // or .func if it's optional
};

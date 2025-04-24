import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Grid, Switch, FormControlLabel } from "@mui/material";
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
import CacheSettings from "./CacheSettings";
import LoginButton from "./LoginButton";
import SearchInputWithHints from "./SearchInputWithHints";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cacheEnabled, setCacheEnabled] = useState(false);

  // On mount, read cache enabled state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cacheEnabled");
    setCacheEnabled(stored === "true");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch({ q: query.trim() });
    }
  };

  // Toggle cache and save to localStorage
  const handleCacheToggle = (event) => {
    const enabled = event.target.checked;
    setCacheEnabled(enabled);
    localStorage.setItem("cacheEnabled", enabled.toString());
  };

  return (
    <Box>
      <Grid
        container
        direction="row"
        sx={styles.header}
        spacing={0.5}
        alignItems="center"
      >
        <Grid item>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ m: 2 }}
          />
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

        <Grid item xs>
          <SearchInputWithHints
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>

        {/* Cache toggle switch */}
        <Grid item>
          <FormControlLabel
            control={<Switch checked={cacheEnabled} onChange={handleCacheToggle} />}
            label="Enable Browser Cache"
            sx={styles.headerSwitch}
          />

        </Grid>
        <Grid item>
          <CacheSettings sx={styles.headerSwitch} />
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
          <LoginButton />
        </Grid>
      </Grid>
    </Box>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

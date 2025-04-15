import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import exampleImage from '../../assets/header_img.png';
import { styles } from '../styles/styles';
import Icon from '@mui/material/Icon';
import { ReactComponent as InboxIcon } from "../../assets/inbox.svg";
import { ReactComponent as TrophyIcon } from "../../assets/trophy.svg";
import HelpIcon from '@mui/icons-material/Help';
import { ReactComponent as StackIcon } from "../../assets/stack.svg";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  border: 'solid',
  borderColor: '#babfc5',
  borderRadius: '5px',
  borderWidth: '1px',
  color: 'black',
  minWidth: '12px',
  maxWidth: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Header() {
  return (
    <Box >
      <Grid
        container
        direction="row"
        sx={styles.header}
        spacing={0.5}
      >
        <Grid item  >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ m: 2 }}
          >
          </IconButton>
        </Grid>
        <Grid item  >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={styles.logo}
          >
            <a href="http://localhost:3000" >
              <img src={exampleImage} alt="header" />
            </a>
          </Typography>
        </Grid>
        <Grid item  >
          <Chip label="Products" variant="outlined" sx={styles.headerItem} onClick={() => navigate(`/products`)} />
        </Grid>
        <Grid item  >
          <Chip label="OverflowAI" variant="outlined" sx={styles.headerItem} onClick={() => navigate(`/overflowai`)} />
        </Grid>

        <Grid item  >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Grid>

        <Grid item sx={{ margin: 0 }} >
          <Icon children={<InboxIcon />}></Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }} >
          <Icon children={<TrophyIcon />}></Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }} >
          <Icon children={<HelpIcon sx={{ color: 'black' }} />}></Icon>
        </Grid>
        <Grid item sx={{ margin: 0 }} >
          <Icon children={<StackIcon />}></Icon>
        </Grid>
        <Grid item  >

          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            <a href="http://localhost:3000" >
              View Details
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Box >
  );
}

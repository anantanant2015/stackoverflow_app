import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const ResponsiveLayout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');
  const isTablet = useMediaQuery('(min-width:641px) and (max-width:980px)');
  const isDesktop = useMediaQuery('(min-width:981px) and (max-width:1260px)');

  return (
    <Box>
      {/* Top App Bar */}
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">Responsive Layout</Typography>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar for Desktop, Drawer for Mobile */}
      {isMobile && (
        <>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box width='20%' p={2} bgcolor="lightgray">Left Sidebar (Collapsible)</Box>
        </Drawer>
        <Box width='100%' height='200px' bgcolor="lightblue" >
        Main Content
          </Box>
            <Box  width='100%' height='200px' bgcolor="lightcoral" >
            Right Sidebar
          </Box>
          </>
      )}


      {/* Main Content & Right Sidebar */}

      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
      {!isMobile && isTablet && (
          <>
        <Box width='20%' height='200px' bgcolor="lightgray" >
          Left Sidebar
          </Box>
          <Box width='80%' height='100px' bgcolor="lightblue" >
          Main Content
            </Box>
            <Box width='20%' height='100px' bgcolor="lightblack" >
          p holder
            </Box>
            <Box  width='80%' height='100px' bgcolor="lightcoral" >
            Right Sidebar
          </Box>
            </>
        )}

        {!isMobile && !isTablet && isDesktop && (
          <>
        <Box width='20%' height='200px' bgcolor="lightgray" >
          Left Sidebar
          </Box>
          <Box width='80%' height='200px' bgcolor="lightblue" >
          Main Content
            </Box>
            <Box  width='20%' height='200px' bgcolor="lightcoral" >
            Right Sidebar
          </Box>
            </>
        )}

        {(!isMobile && !isTablet && !isDesktop) && (
          <>
        <Box width='20%' height='200px' bgcolor="lightgray">
          Left Sidebar
          </Box>
          <Box width='60%' height='200px' bgcolor="lightblue" >
          Main Content
            </Box>
            <Box  width='20%' height='200px' bgcolor="lightcoral" >
            Right Sidebar
          </Box>
            </>
        )}
      </Box>

      {/* Footer */}
      <Box mt={4} p={2} bgcolor="gray" color="white" textAlign="center">
        Footer Content
      </Box>
    </Box>
  );
};

export default ResponsiveLayout;

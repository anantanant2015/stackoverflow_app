import React from "react";
import { Box, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#232629", color: "#babfc4", p: 4, mt: 4 }}
    >
      <Grid container spacing={3} justifyContent="center">
        {/* Logo & Main Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="white" gutterBottom>
            Stack Overflow
          </Typography>
          <Box>
            <Link href="#" color="inherit" display="block">
              About
            </Link>
            <Link href="#" color="inherit" display="block">
              Press
            </Link>
            <Link href="#" color="inherit" display="block">
              Work Here
            </Link>
            <Link href="#" color="inherit" display="block">
              Legal
            </Link>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Box>
        </Grid>

        {/* Stack Exchange Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="white" gutterBottom>
            Stack Exchange Network
          </Typography>
          <Box>
            <Link href="#" color="inherit" display="block">
              Technology
            </Link>
            <Link href="#" color="inherit" display="block">
              Science
            </Link>
            <Link href="#" color="inherit" display="block">
              Business
            </Link>
            <Link href="#" color="inherit" display="block">
              Professional
            </Link>
          </Box>
        </Grid>

        {/* Social Media & Other Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" color="white" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <Link href="#" color="inherit" display="block">
              Twitter
            </Link>
            <Link href="#" color="inherit" display="block">
              LinkedIn
            </Link>
            <Link href="#" color="inherit" display="block">
              GitHub
            </Link>
            <Link href="#" color="inherit" display="block">
              Facebook
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Legal Section */}
      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="gray">
          &copy; {new Date().getFullYear()} Stack Exchange Inc. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

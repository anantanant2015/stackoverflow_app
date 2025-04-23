import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
  Drawer,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styles } from "../../styles/styles";
import PropTypes from "prop-types";

const Layout = ({
  appBarContent,
  leftSidebarContent,
  mainContent,
  rightSidebarContent,
  footerContent,
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(styles.layout.mobileViewWidthQuery);
  const isTablet = useMediaQuery(styles.layout.tabletViewWidthQuery);
  const isDesktop = useMediaQuery(styles.layout.desktopViewWidthQuery);

  const Item = styled(Paper)(() => styles.layout.itemTheme);

  return (
    <Box sx={styles.layout.layoutBox.sx}>
      <Grid
        container
        direction={styles.layout.headerContainerDirection}
        spacing={styles.layout.headerContainerSpacing}
        columns={styles.layout.headerContainerColumns}
        sx={styles.layout.headerContainerSx}
      >
        {/* Top App Bar START */}
        <Grid size={styles.layout.headerAppBar.leftSize}></Grid>
        <Grid size={styles.layout.headerAppBar.midSize}>
          <Item sx={styles.layout.headerAppBar.itemSx}>
            <AppBar
              position={styles.layout.headerAppBar.position}
              sx={styles.layout.headerAppBar.appBarSx}
            >
              <Toolbar>
                {isMobile && (
                  <IconButton
                    edge={styles.layout.headerAppBar.iconBtnEdge}
                    color={styles.layout.headerAppBar.iconBtnColor}
                    onClick={() => setDrawerOpen(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant={styles.layout.headerAppBar.typghyVar}>
                  {appBarContent}
                </Typography>
              </Toolbar>
            </AppBar>
          </Item>
        </Grid>
        <Grid size={styles.layout.headerAppBar.rightSize}></Grid>
        {/* Top App Bar END */}

        {/* Left Sidebar for Desktop, Drawer for Mobile */}
        {isMobile && (
          <Box
            display={styles.layout.mobileView.boxDisplay}
            flexDirection={styles.layout.mobileView.boxFlexDirection}
            alignItems={styles.layout.mobileView.boxAlignItems}
            mt={styles.layout.mobileView.boxMt}
            sx={styles.layout.mobileView.boxSx}
          >
            <Grid size={styles.layout.mobileView.leftSize}>
              <Item sx={styles.layout.mobileView.leftSx}>
                <Drawer
                  anchor={styles.layout.mobileView.drawrAnchor}
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <Box
                    width={240}
                    p={2}
                    bgcolor="lightgray"
                    role="presentation"
                  >
                    {leftSidebarContent}
                  </Box>
                </Drawer>
              </Item>
            </Grid>
            <Grid size={styles.layout.mobileView.midSize}>
              <Item sx={styles.layout.mobileView.midSx}>{mainContent}</Item>
            </Grid>
            <Grid size={styles.layout.mobileView.rightSize}>
              <Item sx={styles.layout.mobileView.rightSx}>
                {rightSidebarContent}
              </Item>
            </Grid>
          </Box>
        )}

        {/* Main Content & Right Sidebar for Tablet */}
        {!isMobile && isTablet && (
          <Box
            display={styles.layout.tabletView.boxDisplay}
            flexDirection={styles.layout.tabletView.boxFlexDirection}
            alignItems={styles.layout.tabletView.boxAlignItems}
            mt={styles.layout.tabletView.boxMt}
            sx={styles.layout.tabletView.boxSx}
          >
            <Grid size={styles.layout.tabletView.leftSize}>
              <Item sx={styles.layout.tabletView.leftSx}>
                {leftSidebarContent}
              </Item>
            </Grid>

            <Grid size={styles.layout.tabletView.midSize}>
              <Item sx={styles.layout.tabletView.midSx}>{mainContent}</Item>
            </Grid>
            <Grid size={styles.layout.tabletView.rightSize}>
              <Item sx={styles.layout.tabletView.rightSx}>
                {rightSidebarContent}
              </Item>
            </Grid>
          </Box>
        )}

        {/* Main Content & Right Sidebar for Desktop */}
        {!isMobile && !isTablet && isDesktop && (
          <Box
            display={styles.layout.desktopView.boxDisplay}
            flexDirection={styles.layout.desktopView.boxFlexDirection}
            alignItems={styles.layout.desktopView.boxAlignItems}
            mt={styles.layout.desktopView.boxMt}
            sx={styles.layout.desktopView.boxSx}
          >
            <Grid size={styles.layout.desktopView.leftSize}>
              <Item sx={styles.layout.desktopView.leftSx}>
                {leftSidebarContent}
              </Item>
            </Grid>

            <Grid size={styles.layout.desktopView.midSize}>
              <Item sx={styles.layout.desktopView.midSx}>{mainContent}</Item>
            </Grid>

            <Grid size={styles.layout.desktopView.rightSize}>
              <Item sx={styles.layout.desktopView.rightSx}>
                {rightSidebarContent}
              </Item>
            </Grid>
          </Box>
        )}

        {/* Main Content & Right Sidebar for LargeScreen */}
        {!isMobile && !isTablet && !isDesktop && (
          <Box
            display={styles.layout.largeScreenView.boxDisplay}
            flexDirection={styles.layout.largeScreenView.boxFlexDirection}
            alignItems={styles.layout.largeScreenView.boxAlignItems}
            mt={styles.layout.largeScreenView.boxMt}
            sx={styles.layout.largeScreenView.boxSx}
          >
            <Grid size={styles.layout.largeScreenView.leftSize}>
              <Item sx={styles.layout.largeScreenView.leftSx}>
                {leftSidebarContent}
              </Item>
            </Grid>

            <Grid size={styles.layout.largeScreenView.midSize}>
              <Item sx={styles.layout.largeScreenView.midSx}>
                {mainContent}
              </Item>
            </Grid>

            <Grid size={styles.layout.largeScreenView.rightSize}>
              <Item sx={styles.layout.largeScreenView.rightSx}>
                {rightSidebarContent}
              </Item>
            </Grid>
          </Box>
        )}

        {/* Footer */}
        <Grid size={styles.layout.footer.leftSize}></Grid>
        <Grid size={styles.layout.footer.midSize}>
          <Item sx={styles.layout.footer.sx}>{footerContent}</Item>
        </Grid>
        <Grid size={styles.layout.footer.rightSize}></Grid>
      </Grid>
    </Box>
  );
};

Layout.propTypes = {
  appBarContent: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  mainContent: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  footerContent: PropTypes.node,
};

export default Layout;

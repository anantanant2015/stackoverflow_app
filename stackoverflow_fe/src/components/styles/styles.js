export const styles = {
  layout: {
    layoutBox: { height: "100vh", width: "100vw", overflow: "hidden" },
    itemTheme: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
    },

    mobileViewWidthQuery: "(max-width: 639px)",
    tabletViewWidthQuery: "(min-width: 640px) and (max-width: 980px)",
    desktopViewWidthQuery: "(min-width: 981px) and (max-width: 1260px)",
    largeScreenViewWidthQuery: "(min-width: 1261px)",

    headerContainerDirection: "row",
    headerContainerSpacing: 1,
    headerContainerColumns: 24,

    headerAppBar: {
      leftSize: 2,
      midSize: 20,
      rightSize: 2,
      appBarSx: {
        height: 50,
        backgroundColor: "#f8f9f9",
        boxShadow: "none",
        borderBottom: "1px solid #e4e6e8",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
      },
      appBarToolbarSx: { minHeight: "auto", padding: 0 },
      leftSx: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      midSx: {
        flexGrow: 1,
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      rightSx: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },

    mobileView: {
      boxDisplay: "flex",
      boxFlexDirection: "column",
      boxAlignItems: "center",
      boxMt: 6.5,
      boxSx: { flexGrow: 1, width: "100%" },
      drawrAnchor: "left",
      leftSize: 0,
      midSize: 24,
      rightSize: 0,
      leftSx: { display: "none" },
      midSx: { display: "flex", flexDirection: "column" },
      rightSx: { display: "none" },
    },

    tabletView: {
      boxDisplay: "flex",
      boxFlexDirection: "column",
      boxAlignItems: "center",
      boxMt: 6.5,
      boxSx: { flexGrow: 1, width: "100%" },
      leftSize: 4,
      midSize: 16,
      rightSize: 4,
      leftSx: { display: "block" },
      midSx: { display: "block" },
      rightSx: { display: "block" },
    },

    desktopView: {
      boxDisplay: "flex",
      boxFlexDirection: "row",
      boxAlignItems: "stretch",
      boxMt: 6.5,
      boxSx: { flexGrow: 1, width: "100%" },
      leftSize: 4,
      midSize: 16,
      rightSize: 4,
      leftSx: { display: "block" },
      midSx: { display: "block" },
      rightSx: { display: "block" },
    },

    largeScreenView: {
      boxDisplay: "flex",
      boxFlexDirection: "row",
      boxAlignItems: "stretch",
      boxMt: 6.5,
      boxSx: {
        flexGrow: 1,
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
      },
      leftSize: 3,
      midSize: 18,
      rightSize: 3,
      leftSx: { display: "block" },
      midSx: { display: "block" },
      rightSx: { display: "block" },
    },

    footer: {
      leftSize: 2,
      midSize: 20,
      rightSize: 2,
      sx: {
        height: 40,
        backgroundColor: "#f8f9f9",
        borderTop: "1px solid #e4e6e8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },

  // ✅ Additional styles used in App/Header components
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    height: "100%",
    width: "100%",
    paddingBottom: "56px",
  },

  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 1rem",
  },

  logo: {
    fontWeight: 600,
    color: "#f48024",
    fontSize: "1.2rem",
    textDecoration: "none",
  },

  headerItem: {
    marginLeft: "1rem",
    textTransform: "none",
    fontWeight: 500,
    color: "#555",
    borderColor: "#ccc",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  headerSwitch: {
    color: "black",
  },
};

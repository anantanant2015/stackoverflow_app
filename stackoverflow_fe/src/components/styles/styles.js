
export const styles = {
  layout: {
    itemTheme: { padding: 1 },
    mobileViewWidthQuery: '(max-width:640px)',
    tabletViewWidthQuery: '(min-width:641px) and (max-width:980px)',
    desktopViewWidthQuery: '(min-width:981px) and (max-width:1260px)',
    layoutBox: { sx: { boxShadow: 'none' } },

    headerContainerDirection: 'row',
    headerContainerSpacing: 3,
    headerContainerColumns: 12,
    headerContainerSx: {
      justifyContent: "space-between",
      alignItems: "stretch",
    },
    headerAppBar: {
      leftSize: 'grow', midSize: 12, rightSize: 'grow', itemSx:
      {
        height: '50px', boxSizing: 'border-box'
      },
      appBarSx: { backgroundColor: 'inherit', boxShadow: 'none' },
      position: 'static',
      iconBtnEdge: 'start',
      iconBtnColor: 'inherit',
      typghyVar: 'h6',
      typghyText: 'Responsive Layout'
    },
    mobileView: {
      boxDisplay: 'flex',
      boxFlexDirection: 'column',
      boxAlignItems: 'center',
      boxMt: -5,
      boxSx: { maxWidth: '640px' },
      leftSize: 3,
      midSize: 12,
      rightSize: 12,
      leftSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', },
      midSx: { height: '50%', boxSizing: 'border-box' },
      rightSx: { height: '50%', boxSizing: 'border-box', boxShadow: 'none', pl: '15px' },
      drawrAnchor: 'left',
      drawrText: 'Left Sidebar (Collapsible)'
    },
    tabletView: {
      boxDisplay: 'flex',
      boxFlexDirection: 'row',
      boxAlignItems: 'stretch',
      boxMt: -5,
      boxSx: { maxWidth: '980px' },
      leftSize: 4,
      leftSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', },
      midSize: 8,
      midSx: { height: '50%', boxSizing: 'border-box' },
      rightSize: 8,
      rightSx: { height: '50%', boxSizing: 'border-box', boxShadow: 'none', pl: '15px' }

    },
    desktopView: {
      boxDisplay: 'flex',
      boxFlexDirection: 'row',
      boxAlignItems: 'stretch',
      boxMt: -5,
      boxSx: { maxWidth: '1260px' },
      leftSize: 2,
      midSize: 7,
      rightSize: 3,
      leftSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', },
      midSx: { height: '100%', boxSizing: 'border-box' },
      rightSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', pl: '15px' },

    },
    largeScreenView: {
      boxDisplay: 'flex',
      boxFlexDirection: 'row',
      boxAlignItems: 'stretch',
      boxMt: -5,
      boxSx: { maxWidth: '1260px' },
      leftSize: 2,
      midSize: 7,
      rightSize: 3,
      leftSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', },
      midSx: { height: '100%', boxSizing: 'border-box' },
      rightSx: { height: '100%', boxSizing: 'border-box', boxShadow: 'none', pl: '15px' },
      maxWidth: '1260px'
    },
    footer: {
      leftSize: 'grow', midSize: 12, rightSize: 'grow', sx:
      {
        height: '56px', boxSizing: 'border-box'
      }
    },


    headerContent: { height: '100%', boxSizing: 'border-box' },
    headerContentSize: 12,
    leftSidebarContent: { height: '100%', boxSizing: 'border-box' },
    leftSidebarContentSize: 12,
    mainContent: { height: '100%', boxSizing: 'border-box' },
    mainContentSize: 12,
    rightSidebarContent: { height: '100%', boxSizing: 'border-box' },
    rightSidebarContentSize: 12,
    footerContent: { height: '100%', boxSizing: 'border-box' },
    footerContentSize: 12,
  },
  navItem: {
    backgroundColor: 'var(--_na-item-bg)',
    color: 'var(--_na-item-fc)',
    font: 'unset',
    fontSize: 'unset',
    fontSize: 'var(--_na-item-fs)',
    padding: 'var(--_na-item-p)',
    whiteSpace: 'var(--_na-item-ws)',
    alignItems: 'center',
    border: 'none',
    borderRadius: '1000px',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'flex',
    position: 'relative',
    userSelect: 'auto',
  },

  gridContainer: {
    justifyContent: "flex-start",
    alignItems: "baseline",
    justifyContent: 'space-evenly',
    padding: '65px 25% 0 20%',
  },
  midContent: {
    maxWidth: '60%',
    justifyContent: 'space-evenly',
    alignItems: "stretch",
  },
  sideContent: {
    maxWidth: '20%',
    alignItems: "stretch",
  },
  header: {
    backgroundColor: "#ffffff",
    // background: "inherit",
    display: 'flex',
    height: '56px',
    borderTop: '3px solid #e7700d',
    borderBottom: '1px solid #d6d9dc',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '10',
    width: '100%',
    padding: '0 0 56px 23%',
    color: 'hsl(0, 0.7%, 73.5%))',
    justifyContent: 'flex-start',
    boxShadow: '0',
    alignItems: "center",
  },
  headerContent: {
    height: '56px',
    zIndex: '10',
    justifyContent: 'flex-start',
    alignItems: "flex-start",
  },
  headerItem: {
    color: 'black',
    border: 'none'
  },
  skipLink: {
    display: 'block',
    padding: '10px',
    color: '#000',
    // backgroundColor: '#fff',
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  logo: {
    // display: 'inline-block',
    //   fontSize: '1.5rem',
    //   fontWeight: 'bold',
    //   fontColor: 'hsl(0, 0.7%, 73.5%))',
    //   color: '#bcbbbb', // StackOverflow logo color
    //   textDecoration: 'none',
    // width: '20px',
    // height: '56px',
    // boxSizing: 'border-box',
    marginLeft: '0',
    // width: '150px',
    // height: '30px',
    //   marginTop: '-4px',
    xs: 'none', sm: 'block',
    // justifyContent: 'space-around',
    // alignItems: "flex-start",
  },
  logoGlyph: {
    display: 'inline',
  },
  navigation: {
    listStyle: 'none',
    // display: 'flex',
    margin: '0px',
    padding: '0px',
  },
  navItem: {
    marginRight: '15px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: '20px',
    padding: '5px 10px',
    width: '300px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    flex: '1px',
    padding: '5px',
    fontSize: '14px',
  },
  searchIcon: {
    marginLeft: '5px',
    cursor: 'pointer',
  },
  navMenu: {
    listStyle: 'none',
    // display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    marginLeft: '20px',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    // backgroundColor: '#fff',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    display: 'none',
  },
  menuButtonExpanded: {
    backgroundColor: '#ddd',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '20px',
    // paddingRight: '20px',
    height: '65px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    // padding: '0 24% 0 24%',
  },

}

import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();

const theme = createTheme({
  ...baseTheme,
  palette: {
    primary: {
      light: "#FFEDCE",
      main: "#FFC193",
      dark: "#FF3737",
      contrastText: "#FF8383",
    },
    secondary: {
      light: "#ff7043",
      main: "#D84315",
      dark: "#9b2c0d",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FFEDCE",
      paper: "#FFF3E0",
    },
    text: {
      primary: "#FF8383",
      secondary: "#FF3737",
      disabled: "#FFC193",
      hint: "#FFEDCE",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 10, // Adjust elevation level (0-24)
            transform: 'scale(1.02)', // Slightly enlarge the card
          },
        }
      }
    }
  },
  typography: {
    fontFamily: baseTheme.typography.fontFamily,
    h1: {
      fontWeight: baseTheme.typography.fontWeightBold,
      fontSize: baseTheme.typography.h1.fontSize,
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
      color: "#FF8383",
    },
    h2: {
      fontWeight: 600,
      fontSize: baseTheme.typography.h2.fontSize,
      lineHeight: 1.3,
      letterSpacing: "-0.00833em",
      color: "#FF8383",
    },
    h3: {
      fontWeight: 600,
      fontSize: baseTheme.typography.h3.fontSize,
      lineHeight: 1.4,
      color: "#FF8383",
    },
    body1: {
      fontWeight: baseTheme.typography.fontWeightRegular,
      fontSize: baseTheme.typography.body1.fontSize,
      lineHeight: 1.5,
      color: "#FF8383",
    },
    body2: {
      fontWeight: baseTheme.typography.fontWeightRegular,
      fontSize: baseTheme.typography.button.fontSize,
      lineHeight: 1.43,
      color: "#FF3737",
    },
    button: {
      fontWeight: baseTheme.typography.fontWeightBold,
      fontSize: baseTheme.typography.button.fontSize,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      color: "#FFC193",
    },
    caption: {
      fontWeight: baseTheme.typography.fontWeightRegular,
      fontSize: baseTheme.typography.caption.fontSize,
      color: "#FF8383",
    },
    action: {
        selected: 'transparent',
    }
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none", // shadows[0]
    "0px 1px 3px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12)", // shadows[1]
    "0px 1px 5px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px rgba(0,0,0,0.12)", // shadows[2]
    "0px 1px 8px rgba(0,0,0,0.2), 0px 3px 4px rgba(0,0,0,0.14), 0px 3px 3px rgba(0,0,0,0.12)", // shadows[3]
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px rgba(0,0,0,0.14), 0px 1px 10px rgba(0,0,0,0.12)", // shadows[4]
  ],
});

export default theme;
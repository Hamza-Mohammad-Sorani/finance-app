import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme = (direction: "ltr" | "rtl") => {
  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  };

  return createTheme(themeOptions);
};

export default theme;

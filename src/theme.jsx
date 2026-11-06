import { createTheme } from "@material-ui/core";

export const getCustomTheme = (darkMode) =>
    createTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
                main: "#3f51b5",
            },
            secondary: {
                main: "#f50057",
            },
            background: {
                default: darkMode ? "#121212" : "#f5f5f5",
                paper: darkMode ? "#1e1e1e" : "#ffffff",
            },
        },
    });

export const theme = getCustomTheme(false);
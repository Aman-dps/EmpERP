import { createContext, useState, useMemo, useContext, useEffect, type ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { getTheme } from "../theme";

interface ThemeContextType {
    mode: "light" | "dark";
    toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: "light",
    toggleColorMode: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode") as "light" | "dark";
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === "light" ? "dark" : "light";
                    localStorage.setItem("themeMode", newMode);
                    return newMode;
                });
            },
        }),
        [mode]
    );

    const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

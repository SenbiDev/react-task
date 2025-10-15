import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ childern }) {
    const [ isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "ligth");
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
        value={{ isDarkMode, setIsDarkMode }}
        >
            {childern}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
import { useState, useMemo } from "react";
import { paletteDefs, generateSemanticVars, systemVars } from "../components/ThemeEngine.jsx";
import { fontDefs } from "../constants/fonts.js";
import { styles } from "../components/StyleEngine.jsx";

export const useTheme = () => {
    const [activePalette, setActivePalette] = useState("metallic");
    const [activeStyle, setActiveStyle] = useState("glassmorphism");
    const [activeFont, setActiveFont] = useState("sans");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const previewVars = useMemo(() =>
        generateSemanticVars(activePalette, isDarkMode),
        [activePalette, isDarkMode]
    );

    const systemVarsData = useMemo(() =>
        systemVars,
        []
    );

    const fontConfig = useMemo(() => fontDefs[activeFont], [activeFont]);
    
    const fontVars = useMemo(() => ({
        "--font-family": fontConfig.family,
        "--weight-normal": fontConfig.weightNormal,
        "--weight-bold": fontConfig.weightBold,
    }), [fontConfig]);

  
    const uiStyle = useMemo(() => {
        // Use the background from the current theme's previewVars
        const bgApp = previewVars["--bg-app"] || (isDarkMode ? "#1e293b" : "#ffffff");
        return {
            background: bgApp,
            color: systemVarsData["--sys-text"],
            borderRadius: "16px", // Fixed radius
            border: `1px solid ${systemVarsData["--sys-border"]}`,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // Fixed shadow
            backdropFilter: "none",
            fontFamily: fontConfig.family,
        };
    }, [systemVarsData, fontConfig, isDarkMode, previewVars]);

    const scrollbarThumbColor = isDarkMode
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)";
    
    const scrollbarThumbHover = isDarkMode
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(0, 0, 0, 0.4)";

    return {
        // State
        activePalette,
        setActivePalette,
        activeStyle,
        setActiveStyle,
        activeFont,
        setActiveFont,
        isDarkMode,
        setIsDarkMode,

        // Computed values
        previewVars,
        systemVars: systemVarsData,
        fontVars,
        uiStyle,
        scrollbarThumbColor,
        scrollbarThumbHover,

        // Data
        currentPalette: paletteDefs[activePalette],
        currentFont: fontConfig,
    };
};
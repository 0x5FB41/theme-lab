// Helper to get modal styling based on active theme
export const getAdaptiveModalStyle = (
    activeStyle,
    systemVars,
    paletteDefs,
    activePalette,
    styles,
    isDarkMode,
) => {
    const currentStyleVars = styles[activeStyle].vars;
    const forceDark = styles[activeStyle].forcedScheme === "dark";
    const forceLight = styles[activeStyle].forcedScheme === "light";

    let modalTextColor = systemVars["--sys-text"];
    if (forceDark) modalTextColor = "#ffffff";
    if (forceLight) modalTextColor = "#0f172a";

    let bgOverride = systemVars["--sys-bg"];

    if (
        ["glassmorphism", "holographic", "acrylic", "frutigerAero"].includes(
            activeStyle,
        )
    ) {
        bgOverride = isDarkMode
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.6)";
    }
    if (
        activeStyle === "neon" || activeStyle === "cyberdeck" ||
        activeStyle === "terminal"
    ) {
        bgOverride = "rgba(0, 0, 0, 0.95)";
    }
    if (activeStyle === "minimalism") {
        bgOverride = isDarkMode
            ? "rgba(0,0,0,0.8)"
            : "rgba(255,255,255,0.8)";
    }
    if (activeStyle === "brutalist") bgOverride = systemVars["--sys-bg"];
    if (activeStyle === "claymorphism") bgOverride = "var(--bg-panel)";
    if (activeStyle === "gameboy") {
        bgOverride = paletteDefs[activePalette].primary;
    }
    if (activeStyle === "aurora") {
        bgOverride = isDarkMode
            ? "rgba(0,0,0,0.3)"
            : "rgba(255,255,255,0.2)";
    }
    if (activeStyle === "frutigerAero") {
        bgOverride = styles.frutigerAero.vars["--bg-panel-override"];
    }

    return {
        style: {
            ...currentStyleVars,
            "--bg-panel-override": bgOverride,
            "--backdrop": styles[activeStyle].vars["--backdrop"] ||
                "blur(10px)",
        },
        textColor: modalTextColor,
    };
};
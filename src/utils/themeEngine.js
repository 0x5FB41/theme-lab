import { paletteDefs } from '../constants/palettes.js';
import { styles } from '../constants/styles.js';

export const generateSemanticVars = (paletteKey, isDark) => {
    const p = paletteDefs[paletteKey];
    const isGradient = p.type === "gradient";

    const baseVars = {
        "--accent": p.accent,
        "--logo-glow": isGradient ? p.glow : p.primary,
    };

    const lightSecondary = {
        bg: "#ffffff",
        text: "#0f172a",
        border: "#e2e8f0",
    };
    const darkSecondary = {
        bg: "#1e293b",
        text: "#f8fafc",
        border: "rgba(255,255,255,0.15)",
    };

    if (isDark) {
        return {
            ...baseVars,
            "--primary": isGradient ? p.primary : p.accent,
            "--primary-fg": p.fgForce ? p.fgForce : "#ffffff",
            "--bg-app": "#020617",
            "--bg-panel": "#0f172a",
            "--text-main": "#f8fafc",
            "--text-muted": "#94a3b8",
            "--input-bg": "#1e293b",
            "--input-text": "#f8fafc",
            "--placeholder-color": "#64748b",
            "--border-color": "rgba(255,255,255,0.15)",
            "--sidebar-bg": "rgba(2, 6, 23, 0.98)",
            "--switch-bg": "#1e293b",
            "--switch-thumb": "#020617",
            "--btn-sec-bg": darkSecondary.bg,
            "--btn-sec-text": darkSecondary.text,
            "--btn-sec-border": darkSecondary.border,
        };
    } else {
        return {
            ...baseVars,
            "--primary": p.primary,
            "--primary-fg": p.fgForce ? p.fgForce : "#ffffff",
            "--bg-app": "#f1f5f9",
            "--bg-panel": "#ffffff",
            "--text-main": "#0f172a",
            "--text-muted": "#64748b",
            "--input-bg": "#ffffff",
            "--input-text": "#0f172a",
            "--placeholder-color": "#94a3b8",
            "--border-color": "#e2e8f0",
            "--sidebar-bg": "rgba(255, 255, 255, 0.98)",
            "--switch-bg": "#e2e8f0",
            "--switch-thumb": "#ffffff",
            "--btn-border": "var(--border)",
            "--btn-sec-bg": lightSecondary.bg,
            "--btn-sec-text": lightSecondary.text,
            "--btn-sec-border": lightSecondary.border,
        };
    }
};

export const generateSystemVars = (isDark) => {
    if (isDark) {
        return {
            "--sys-bg": "rgba(2, 6, 23, 0.98)",
            "--sys-border": "rgba(255,255,255,0.1)",
            "--sys-text": "#f8fafc",
            "--sys-text-muted": "#94a3b8",
            "--sys-switch-bg": "#1e293b",
            "--sys-switch-thumb": "#020617",
        };
    } else {
        return {
            "--sys-bg": "rgba(255, 255, 255, 0.98)",
            "--sys-border": "#e2e8f0",
            "--sys-text": "#0f172a",
            "--sys-text-muted": "#64748b",
            "--sys-switch-bg": "#e2e8f0",
            "--sys-switch-thumb": "#ffffff",
        };
    }
};

export const generatePreviewVars = (paletteKey, isDark, styleKey) => {
    const p = paletteDefs[paletteKey];
    const style = styles[styleKey];

    let themeVars = generateSemanticVars(paletteKey, isDark);
    const structuralVars = style.vars;
    const dynamicStyleVars = style.dynamicVars ? style.dynamicVars(isDark) : {};

    // STYLE-SPECIFIC OVERRIDES
    if (styleKey === "gameboy") {
        themeVars["--bg-panel-override"] = p.primary;
        const forcedFg = p.fgForce;
        if (forcedFg) {
            themeVars["--gb-text"] = forcedFg;
            themeVars["--gb-text-muted"] = forcedFg;
        } else {
            if (p.isDark || isDark) {
                themeVars["--gb-text"] = "#ffffff";
                themeVars["--gb-text-muted"] = "rgba(255,255,255,0.7)";
            } else {
                themeVars["--gb-text"] = "#2d1b2e";
                themeVars["--gb-text-muted"] = "rgba(0,0,0,0.6)";
            }
        }
    } else if (styleKey === "cyberdeck") {
        themeVars["--gb-text"] = "#e0f2fe";
        themeVars["--gb-text-muted"] = "rgba(224, 242, 254, 0.6)";
        themeVars["--input-text"] = "#e0f2fe";
        themeVars["--placeholder-color"] = "rgba(224, 242, 254, 0.4)";
        themeVars["--btn-sec-text"] = "#e0f2fe";
        themeVars["--btn-sec-border"] = "rgba(224, 242, 254, 0.3)";
    } else if (styleKey === "glitch") {
        themeVars["--gb-text"] = themeVars["--text-main"];
        themeVars["--gb-text-muted"] = themeVars["--text-muted"];
    } else if (styleKey === "chrome") {
        themeVars["--gb-text"] = "#000000";
        themeVars["--gb-text-muted"] = "#444444";
    } else if (styleKey === "neon") {
        themeVars["--gb-text"] = "#ffffff";
        themeVars["--gb-text-muted"] = "#cccccc";
    } else if (styleKey === "system7") {
        themeVars["--gb-text"] = "#000000";
        themeVars["--gb-text-muted"] = "#333333";
    } else if (styleKey === "frutigerAero") {
        themeVars["--gb-text"] = "#0f172a";
        themeVars["--gb-text-muted"] = "rgba(15, 23, 42, 0.7)";
        themeVars["--input-bg"] = "rgba(255,255,255,0.7)";
        themeVars["--input-text"] = "#0f172a";
    } else {
        themeVars["--gb-text"] = themeVars["--text-main"];
        themeVars["--gb-text-muted"] = themeVars["--text-muted"];
    }

    return { ...themeVars, ...structuralVars, ...dynamicStyleVars };
};
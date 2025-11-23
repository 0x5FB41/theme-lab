import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Activity,
    ArrowRight,
    Ban,
    Box,
    Check,
    ChevronDown,
    ChevronUp,
    Circle,
    CloudRain,
    Coffee,
    Command,
    Cpu,
    Disc,
    Dna,
    Droplet,
    Eye,
    EyeOff,
    FileCode,
    FileText,
    Flame,
    Gamepad2,
    Gem,
    Ghost,
    Globe,
    Grid,
    Grip,
    Hash,
    HeartCrack,
    Hexagon,
    Layers,
    Layout,
    Leaf,
    Lightbulb,
    MapPin,
    Menu,
    Monitor,
    Moon,
    MousePointer2,
    MousePointerClick,
    Network,
    Palette,
    Ruler,
    Scan,
    Search,
    Settings,
    Shield,
    Snowflake,
    Sparkles,
    Square,
    Star,
    Sun,
    Sun as SunIcon,
    Terminal,
    Triangle,
    Type,
    X,
    Zap,
    Zap as ZapIcon,
    ZapOff,
} from "lucide-react";

// --- 1. THEME ENGINE (REFINED & TRIMMED) ---
const paletteDefs = {
    // --- DESIGNER ---
    cat_mocha: {
        name: "Cat Mocha",
        category: "Designer",
        type: "solid",
        primary: "#cba6f7",
        accent: "#f5c2e7",
        isDark: false,
    },
    cat_latte: {
        name: "Cat Latte",
        category: "Designer",
        type: "solid",
        primary: "#8839ef",
        accent: "#7287fd",
        fgForce: "#ffffff",
        isDark: true,
    },
    tokyo: {
        name: "Tokyo",
        category: "Designer",
        type: "solid",
        primary: "#7aa2f7",
        accent: "#bb9af7",
        isDark: true,
    },
    dracula: {
        name: "Dracula",
        category: "Designer",
        type: "solid",
        primary: "#bd93f9",
        accent: "#ff79c6",
        isDark: true,
    },
    nord: {
        name: "Nord",
        category: "Designer",
        type: "solid",
        primary: "#81a1c1",
        accent: "#88c0d0",
        isDark: true,
    },
    monokai: {
        name: "Monokai",
        category: "Designer",
        type: "solid",
        primary: "#a6e22e",
        accent: "#f92672",
        isDark: true,
    },
    matrix: {
        name: "Matrix",
        category: "Designer",
        type: "solid",
        primary: "#00ff41",
        accent: "#008f11",
        fgForce: "#000",
        isDark: false,
    },
    one_dark: {
        name: "One Dark",
        category: "Designer",
        type: "solid",
        primary: "#98c379",
        accent: "#61afef",
        isDark: true,
    },
    gruvbox: {
        name: "Gruvbox",
        category: "Designer",
        type: "solid",
        primary: "#d79921",
        accent: "#fb4934",
        isDark: true,
    },
    solarized: {
        name: "Solarized",
        category: "Designer",
        type: "solid",
        primary: "#b58900",
        accent: "#2aa198",
        isDark: true,
    },
    synth_pop: {
        name: "Synth Pop",
        category: "Designer",
        type: "gradient",
        primary: "linear-gradient(to right, #ff00cc, #333399)",
        accent: "#00ffcc",
        glow: "#ff00cc",
        isDark: true,
    },

    // --- GRADIENTS ---
    vapor: {
        name: "Vapor",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #ff71ce 0%, #01cdfe 100%)",
        accent: "#fffb96",
        glow: "#ff71ce",
        isDark: false,
    },
    gold_rush: {
        name: "Gold Rush",
        category: "Gradient",
        type: "gradient",
        primary:
            "linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%)",
        accent: "#ffd700",
        glow: "#fbf5b7",
        fgForce: "#000",
        isDark: false,
    },
    sunset: {
        name: "Sunset",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #c2410c 0%, #be185d 100%)",
        accent: "#fb923c",
        glow: "#db2777",
        isDark: true,
    },
    oceanic: {
        name: "Oceanic",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%)",
        accent: "#22d3ee",
        glow: "#3b82f6",
        isDark: true,
    },
    hyper: {
        name: "Hyper",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #db2777 0%, #7c3aed 100%)",
        accent: "#f472b6",
        glow: "#8b5cf6",
        isDark: true,
    },
    aurora: {
        name: "Aurora",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #047857 0%, #1d4ed8 100%)",
        accent: "#34d399",
        glow: "#3b82f6",
        isDark: true,
    },
    midnight_g: {
        name: "Midnight G",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #312e81 0%, #020617 100%)",
        accent: "#818cf8",
        glow: "#4f46e5",
        isDark: true,
    },
    cotton: {
        name: "Cotton",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #db2777 0%, #2563eb 100%)",
        accent: "#f472b6",
        glow: "#60a5fa",
        isDark: true,
    },
    obsidian: {
        name: "Obsidian",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #000000 0%, #374151 100%)",
        accent: "#9ca3af",
        glow: "#e5e7eb",
        isDark: true,
    },
    sublime: {
        name: "Sublime",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #e11d48 0%, #4f46e5 100%)",
        accent: "#fb7185",
        glow: "#818cf8",
        isDark: true,
    },
    horizon: {
        name: "Horizon",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #0c4a6e 0%, #a16207 100%)",
        accent: "#38bdf8",
        glow: "#eab308",
        isDark: true,
    },
    cosmic_n: {
        name: "Cosmic",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #d946ef 0%, #4338ca 100%)",
        accent: "#f0abfc",
        glow: "#818cf8",
        isDark: true,
    },
    lush: {
        name: "Lush",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)",
        accent: "#4ade80",
        glow: "#a3e635",
        isDark: true,
    },
    firewatch: {
        name: "Firewatch",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #991b1b 0%, #ea580c 100%)",
        accent: "#f87171",
        glow: "#fb923c",
        isDark: true,
    },
    synthwave: {
        name: "Synth",
        category: "Gradient",
        type: "gradient",
        primary: "linear-gradient(135deg, #2b213a 0%, #ff71ce 100%)",
        accent: "#01cdfe",
        glow: "#ff71ce",
        isDark: true,
    },

    // --- SEASONS ---
    autumn: {
        name: "Autumn",
        category: "Seasons",
        type: "solid",
        primary: "#d35400",
        accent: "#f39c12",
        isDark: true,
    },
    winter: {
        name: "Winter",
        category: "Seasons",
        type: "solid",
        primary: "#2c3e50",
        accent: "#ecf0f1",
        isDark: true,
    },
    spring: {
        name: "Spring",
        category: "Seasons",
        type: "solid",
        primary: "#2ecc71",
        accent: "#f1c40f",
        isDark: true,
    },
    summer: {
        name: "Summer",
        category: "Seasons",
        type: "solid",
        primary: "#e67e22",
        accent: "#e74c3c",
        isDark: true,
    },

    // --- MONOCHROME ---
    zinc: {
        name: "Zinc",
        category: "Monochrome",
        type: "solid",
        primary: "#27272a",
        accent: "#a1a1aa",
        isDark: true,
    },
    slate: {
        name: "Slate",
        category: "Monochrome",
        type: "solid",
        primary: "#1e293b",
        accent: "#94a3b8",
        isDark: true,
    },
    stone: {
        name: "Stone",
        category: "Monochrome",
        type: "solid",
        primary: "#292524",
        accent: "#a8a29e",
        isDark: true,
    },
    ash: {
        name: "Ash",
        category: "Monochrome",
        type: "solid",
        primary: "#52525b",
        accent: "#d4d4d8",
        isDark: true,
    },
    carbon: {
        name: "Carbon",
        category: "Monochrome",
        type: "solid",
        primary: "#171717",
        accent: "#52525b",
        isDark: true,
    },
    void: {
        name: "Void",
        category: "Monochrome",
        type: "solid",
        primary: "#000000",
        accent: "#333333",
        isDark: true,
    },
    platinum: {
        name: "Platinum",
        category: "Monochrome",
        type: "solid",
        primary: "#e5e7eb",
        accent: "#6b7280",
        fgForce: "#000",
        isDark: false,
    },
    ghost: {
        name: "Ghost",
        category: "Monochrome",
        type: "solid",
        primary: "#f3f4f6",
        accent: "#9ca3af",
        fgForce: "#000",
        isDark: false,
    },
    silver: {
        name: "Silver",
        category: "Monochrome",
        type: "solid",
        primary: "#cbd5e1",
        accent: "#64748b",
        fgForce: "#000",
        isDark: false,
    },
    paper: {
        name: "Paper",
        category: "Monochrome",
        type: "solid",
        primary: "#f5f5f4",
        accent: "#78716c",
        fgForce: "#000",
        isDark: false,
    },

    // --- SOFT / PASTEL ---
    iceberg: {
        name: "Iceberg",
        category: "Soft",
        type: "solid",
        primary: "#cffafe",
        accent: "#22d3ee",
        fgForce: "#000",
        isDark: false,
    },
    lavender: {
        name: "Lavender",
        category: "Soft",
        type: "solid",
        primary: "#e9d5ff",
        accent: "#c084fc",
        fgForce: "#000",
        isDark: false,
    },
    rose: {
        name: "Rose",
        category: "Soft",
        type: "solid",
        primary: "#ffe4e6",
        accent: "#fda4af",
        fgForce: "#000",
        isDark: false,
    },
    mint: {
        name: "Mint",
        category: "Soft",
        type: "solid",
        primary: "#d1fae5",
        accent: "#34d399",
        fgForce: "#000",
        isDark: false,
    },
    peach: {
        name: "Peach",
        category: "Soft",
        type: "solid",
        primary: "#ffedd5",
        accent: "#fb923c",
        fgForce: "#000",
        isDark: false,
    },
    sky: {
        name: "Sky",
        category: "Soft",
        type: "solid",
        primary: "#e0f2fe",
        accent: "#38bdf8",
        fgForce: "#000",
        isDark: false,
    },
    cream: {
        name: "Cream",
        category: "Soft",
        type: "solid",
        primary: "#fef3c7",
        accent: "#d97706",
        fgForce: "#000",
        isDark: false,
    },
    lilac: {
        name: "Lilac",
        category: "Soft",
        type: "solid",
        primary: "#fae8ff",
        accent: "#d946ef",
        fgForce: "#000",
        isDark: false,
    },
    matcha: {
        name: "Matcha",
        category: "Soft",
        type: "solid",
        primary: "#dcfce7",
        accent: "#16a34a",
        fgForce: "#000",
        isDark: false,
    },
    baby_blue: {
        name: "Baby Blue",
        category: "Soft",
        type: "solid",
        primary: "#dbeafe",
        accent: "#2563eb",
        fgForce: "#000",
        isDark: false,
    },

    // --- VIBRANT ---
    cyberpunk: {
        name: "Cyberpunk",
        category: "Vibrant",
        type: "solid",
        primary: "#00ffea",
        accent: "#ff00ff",
        fgForce: "#000",
        isDark: true,
    },
    laser: {
        name: "Laser",
        category: "Vibrant",
        type: "solid",
        primary: "#facc15",
        accent: "#eab308",
        fgForce: "#000",
        isDark: false,
    },
    crimson: {
        name: "Crimson",
        category: "Vibrant",
        type: "solid",
        primary: "#991b1b",
        accent: "#ef4444",
        isDark: true,
    },
    pumpkin: {
        name: "Pumpkin",
        category: "Vibrant",
        type: "solid",
        primary: "#ea580c",
        accent: "#f97316",
        isDark: true,
    },
    bumblebee: {
        name: "Bumblebee",
        category: "Vibrant",
        type: "solid",
        primary: "#eab308",
        accent: "#eab308",
        fgForce: "#000",
        isDark: false,
    },
    candy: {
        name: "Candy",
        category: "Vibrant",
        type: "solid",
        primary: "#ec4899",
        accent: "#3b82f6",
        isDark: true,
    },
    rust: {
        name: "Rust",
        category: "Vibrant",
        type: "solid",
        primary: "#7c2d12",
        accent: "#c2410c",
        isDark: true,
    },
    poison: {
        name: "Poison",
        category: "Vibrant",
        type: "solid",
        primary: "#a3e635",
        accent: "#84cc16",
        fgForce: "#000",
        isDark: true,
    },
    hot_pink: {
        name: "Hot Pink",
        category: "Vibrant",
        type: "solid",
        primary: "#db2777",
        accent: "#f472b6",
        isDark: true,
    },
    ultraviolet: {
        name: "Ultra",
        category: "Vibrant",
        type: "solid",
        primary: "#7c3aed",
        accent: "#a78bfa",
        isDark: true,
    },
    electric: {
        name: "Electric",
        category: "Vibrant",
        type: "solid",
        primary: "#2563eb",
        accent: "#3b82f6",
        isDark: true,
    },
    magma: {
        name: "Magma",
        category: "Vibrant",
        type: "solid",
        primary: "#ef4444",
        accent: "#fca5a5",
        isDark: true,
    },

    // --- LUXURY ---
    royal: {
        name: "Royal",
        category: "Luxury",
        type: "solid",
        primary: "#4a0404",
        accent: "#ffd700",
        isDark: true,
    },
    gold: {
        name: "Gold",
        category: "Luxury",
        type: "solid",
        primary: "#b45309",
        accent: "#fcd34d",
        isDark: true,
    },
    metallic: {
        name: "Metallic Red",
        category: "Luxury",
        type: "gradient",
        primary:
            "linear-gradient(135deg, #7f1d1d 0%, #ef4444 50%, #7f1d1d 100%)",
        accent: "#f87171",
        glow: "#ef4444",
        isDark: true,
    },
    marble: {
        name: "Marble",
        category: "Luxury",
        type: "solid",
        primary: "#f8f9fa",
        accent: "#212529",
        fgForce: "#000",
        isDark: false,
    },
};

// --- 2. TYPOGRAPHY ENGINE ---
const fontDefs = {
    sans: {
        name: "Inter",
        family: '"Inter", sans-serif',
        weightNormal: 400,
        weightBold: 600,
    },
    thin: {
        name: "Inter (Light)",
        family: '"Inter", sans-serif',
        weightNormal: 300,
        weightBold: 500,
    },
    poppins: {
        name: "Poppins",
        family: '"Poppins", sans-serif',
        weightNormal: 400,
        weightBold: 600,
    },
    montserrat: {
        name: "Montserrat",
        family: '"Montserrat", sans-serif',
        weightNormal: 400,
        weightBold: 700,
    },
    raleway: {
        name: "Raleway",
        family: '"Raleway", sans-serif',
        weightNormal: 400,
        weightBold: 600,
    },
    quicksand: {
        name: "Quicksand",
        family: '"Quicksand", sans-serif',
        weightNormal: 500,
        weightBold: 700,
    },
    lato: {
        name: "Lato",
        family: '"Lato", sans-serif',
        weightNormal: 400,
        weightBold: 700,
    },
    roboto: {
        name: "Roboto",
        family: '"Roboto", sans-serif',
        weightNormal: 400,
        weightBold: 500,
    },
    open: {
        name: "Open Sans",
        family: '"Open Sans", sans-serif',
        weightNormal: 400,
        weightBold: 600,
    },
    orbitron: {
        name: "Orbitron",
        family: '"Orbitron", sans-serif',
        weightNormal: 500,
        weightBold: 800,
    },
    play: {
        name: "Play",
        family: '"Play", sans-serif',
        weightNormal: 400,
        weightBold: 700,
    },
    archivo: {
        name: "Archivo Black",
        family: '"Archivo Black", sans-serif',
        weightNormal: 400,
        weightBold: 400,
    },
    press: {
        name: "Press Start 2P",
        family: '"Press Start 2P", cursive',
        weightNormal: 400,
        weightBold: 400,
    },
    russo: {
        name: "Russo One",
        family: '"Russo One", sans-serif',
        weightNormal: 400,
        weightBold: 400,
    },
    serif: {
        name: "Playfair Display",
        family: '"Playfair Display", serif',
        weightNormal: 400,
        weightBold: 600,
    },
    merri: {
        name: "Merriweather",
        family: '"Merriweather", serif',
        weightNormal: 300,
        weightBold: 700,
    },
    pt: {
        name: "PT Serif",
        family: '"PT Serif", serif',
        weightNormal: 400,
        weightBold: 700,
    },
    lora: {
        name: "Lora",
        family: '"Lora", serif',
        weightNormal: 400,
        weightBold: 600,
    },
    fira: {
        name: "Fira Code",
        family: '"Fira Code", monospace',
        weightNormal: 400,
        weightBold: 600,
    },
    jetbrains: {
        name: "JetBrains Mono",
        family: '"JetBrains Mono", monospace',
        weightNormal: 400,
        weightBold: 600,
    },
    hack: {
        name: "Hack",
        family: '"Hack", "Dejavu Sans Mono", monospace',
        weightNormal: 400,
        weightBold: 700,
    },
    source: {
        name: "Source Code Pro",
        family: '"Source Code Pro", monospace',
        weightNormal: 400,
        weightBold: 600,
    },
    space: {
        name: "Space Mono",
        family: '"Space Mono", monospace',
        weightNormal: 400,
        weightBold: 700,
    },
    ubuntu: {
        name: "Ubuntu Mono",
        family: '"Ubuntu Mono", monospace',
        weightNormal: 400,
        weightBold: 700,
    },
    inconsol: {
        name: "Inconsolata",
        family: '"Inconsolata", monospace',
        weightNormal: 400,
        weightBold: 700,
    },
    ibm: {
        name: "IBM Plex Mono",
        family: '"IBM Plex Mono", monospace',
        weightNormal: 400,
        weightBold: 600,
    },
};

const particleOptions = [
    { id: "off", name: "Off", icon: Ban },
    { id: "pulse", name: "Pulse", icon: Activity },
    { id: "nodes", name: "Nodes", icon: Network },
    { id: "matrix", name: "Matrix", icon: FileCode },
    { id: "rain", name: "Rain", icon: CloudRain },
    { id: "dust", name: "Dust", icon: Sparkles },
    { id: "snow", name: "Snow", icon: Snowflake },
    { id: "bubbles", name: "Bubbles", icon: Disc },
    { id: "stars", name: "Stars", icon: Star },
    { id: "confetti", name: "Confetti", icon: HeartCrack },
    { id: "fireflies", name: "Fireflies", icon: Flame },
    { id: "grid", name: "Grid", icon: Grip },
    { id: "dna", name: "DNA", icon: Dna },
    { id: "speed", name: "Speed", icon: ZapIcon },
];

const generateSemanticVars = (paletteKey, isDark) => {
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

// --- 3. STYLE ENGINE ---
const styles = {
    glassmorphism: {
        name: "Glassmorphism",
        icon: Ghost,
        vars: {
            "--radius": "24px",
            "--border": "1px solid var(--border-color)",
            "--shadow": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            "--backdrop": "blur(16px) saturate(180%)",
            "--bg-panel-override": "rgba(255, 255, 255, 0.05)",
            "--btn-radius": "12px",
        },
        isGlass: true,
    },
    neumorphism: {
        name: "Neumorphism",
        icon: Box,
        vars: {
            "--radius": "20px",
            "--border": "none",
            "--bg-panel-override": "var(--bg-app)",
            "--shadow": "var(--neu-shadow)",
            "--backdrop": "none",
            "--btn-radius": "12px",
        },
        dynamicVars: (isDark) => ({
            "--neu-shadow": isDark
                ? "5px 5px 10px #0b1221, -5px -5px 10px #1a2842"
                : "9px 9px 18px #d1d5db, -9px -9px 18px #ffffff",
        }),
    },
    frutigerAero: {
        name: "Frutiger Aero",
        icon: CloudRain,
        vars: {
            "--radius": "18px",
            "--border": "1px solid rgba(255, 255, 255, 0.5)",
            "--shadow":
                "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
            "--backdrop": "blur(15px)",
            "--bg-panel-override":
                "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 51%, rgba(255,255,255,0.8) 100%)",
            "--btn-radius": "24px",
            "--text-main": "#0f172a",
            "--input-bg": "rgba(255,255,255,0.7)",
        },
        isGlass: true,
        forceContrast: true,
    },
    solarpunkStyle: {
        name: "Solarpunk",
        icon: Leaf,
        vars: {
            "--radius": "24px 4px 24px 4px",
            "--border": "2px solid var(--primary)",
            "--shadow": "0 10px 20px -5px var(--primary)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "16px 4px 16px 4px",
        },
    },
    system7: {
        name: "System 7",
        icon: Command,
        vars: {
            "--radius": "2px",
            "--border": "2px solid black",
            "--shadow": "4px 4px 0px black",
            "--backdrop": "none",
            "--bg-panel-override": "#ffffff",
            "--text-main": "#000000",
            "--text-muted": "#333333",
            "--btn-radius": "2px",
            "--input-bg": "#ffffff",
            "--font-family": '"Chicago", sans-serif',
        },
        forcedScheme: "light",
        forceContrast: true,
    },
    glitch: {
        name: "Glitch",
        icon: ZapOff,
        vars: {
            "--radius": "0px",
            "--border": "1px solid var(--text-main)",
            "--shadow":
                "3px 3px 0px rgba(255, 0, 0, 0.7), -3px -3px 0px rgba(0, 255, 255, 0.7)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "0px",
            "--btn-border": "2px solid var(--text-main)",
            "--clip-path":
                "polygon(5% 0, 100% 0, 100% 90%, 95% 100%, 0 100%, 0 10%)",
            "--transform": "skew(-1deg)",
        },
        forcedScheme: "dark",
        forceContrast: true,
    },
    chrome: {
        name: "Y2K Chrome",
        icon: Globe,
        vars: {
            "--radius": "16px",
            "--border": "1px solid rgba(255,255,255,0.6)",
            "--shadow":
                "0 15px 35px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.5)",
            "--backdrop": "blur(5px)",
            "--bg-panel-override":
                "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 51%, rgba(255,255,255,0.4) 100%)",
            "--btn-radius": "99px",
            "--input-bg": "rgba(255,255,255,0.4)",
            "--text-main": "#000000",
            "--text-muted": "#333333",
        },
        forceContrast: true,
    },
    cyberdeck: {
        name: "Cyberdeck",
        icon: Cpu,
        vars: {
            "--radius": "2px",
            "--border": "1px solid var(--primary)",
            "--shadow":
                "0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.2)",
            "--backdrop": "blur(10px)",
            "--bg-panel-override":
                "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.98) 100%)",
            "--btn-radius": "2px",
            "--clip-path":
                "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            "--input-bg": "rgba(0,0,0,0.5)",
        },
        forcedScheme: "dark",
        forceContrast: true,
    },
    neon: {
        name: "Neon",
        icon: Lightbulb,
        vars: {
            "--radius": "12px",
            "--border": "2px solid var(--accent)",
            "--shadow": "0 0 15px var(--accent), inset 0 0 15px var(--accent)",
            "--backdrop": "blur(5px)",
            "--bg-panel-override": "rgba(0, 0, 0, 0.8)",
            "--btn-radius": "8px",
            "--text-main": "#ffffff",
            "--text-muted": "#aaaaaa",
        },
        forcedScheme: "dark",
        forceContrast: true,
    },
    slab: {
        name: "Slab",
        icon: Square,
        vars: {
            "--radius": "0px",
            "--border": "8px solid var(--text-main)",
            "--shadow": "12px 12px 0px var(--primary)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "0px",
        },
    },
    holographic: {
        name: "Holographic",
        icon: Scan,
        vars: {
            "--radius": "16px",
            "--border": "1px solid rgba(255, 255, 255, 0.3)",
            "--shadow":
                "0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(255, 0, 255, 0.1)",
            "--backdrop": "blur(20px) hue-rotate(15deg)",
            "--bg-panel-override":
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            "--btn-radius": "8px",
        },
        isGlass: true,
        forcedScheme: "dark",
    },
    acrylic: {
        name: "Acrylic (Win11)",
        icon: Layers,
        vars: {
            "--radius": "8px",
            "--border": "1px solid var(--border-color)",
            "--shadow": "0 4px 24px -1px rgba(0,0,0,0.1)",
            "--backdrop": "blur(20px) saturate(120%)",
            "--bg-panel-override": "rgba(255, 255, 255, 0.3)",
            "--btn-radius": "4px",
        },
        isGlass: true,
    },
    gameboy: {
        name: "Gameboy",
        icon: Gamepad2,
        vars: {
            "--radius": "10px 10px 40px 10px",
            "--border": "3px solid rgba(0,0,0,0.2)",
            "--shadow":
                "5px 5px 15px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.1), inset -2px -2px 5px rgba(0,0,0,0.2)",
            "--backdrop": "none",
            "--btn-radius": "50px",
            "--font-family": '"Press Start 2P", monospace',
            "--input-bg": "#9bbc0f",
            "--input-text": "#0f380f",
            "--placeholder-color": "rgba(15, 56, 15, 0.75)",
            "--shadow-input": "inset 2px 2px 4px rgba(0,0,0,0.6)",
            "--btn-sec-bg": "#9bbc0f",
            "--btn-sec-text": "#0f380f",
            "--btn-sec-border": "none",
            "--btn-sec-shadow": "inset 2px 2px 4px rgba(0,0,0,0.6)",
        },
        forcedScheme: "light",
        forceContrast: true,
    },
    retro95: {
        name: "Retro 95",
        icon: Layout,
        vars: {
            "--radius": "0px",
            "--border": "2px solid transparent",
            "--shadow":
                "inset 2px 2px 0px #ffffff, inset -2px -2px 0px #000000",
            "--backdrop": "none",
            "--bg-panel-override": "var(--retro-bg)",
            "--text-main": "var(--retro-text)",
            "--text-muted": "var(--retro-text-muted)",
            "--btn-radius": "0px",
            "--input-bg": "var(--bg-panel)",
        },
        dynamicVars: (isDark) => ({
            "--retro-bg": isDark ? "#374151" : "#c0c0c0",
            "--retro-text": isDark ? "#ffffff" : "#000000",
            "--retro-text-muted": isDark ? "#d1d5db" : "#404040",
        }),
    },
    claymorphism: {
        name: "Claymorphism",
        icon: Circle,
        vars: {
            "--radius": "32px",
            "--border": "none",
            "--shadow":
                "12px 12px 24px rgba(0,0,0,0.1), inset -8px -8px 8px rgba(0,0,0,0.05), inset 8px 8px 16px rgba(255,255,255,0.4)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "24px",
        },
    },
    skeuomorphism: {
        name: "Skeuomorphism",
        icon: Shield,
        vars: {
            "--radius": "12px",
            "--border": "1px solid var(--border-color)",
            "--shadow":
                "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)",
            "--backdrop": "none",
            "--bg-panel-override":
                "linear-gradient(to bottom, var(--bg-panel), var(--bg-app))",
            "--btn-radius": "6px",
        },
    },
    flat2: {
        name: "Flat 2.0",
        icon: Square,
        vars: {
            "--radius": "8px",
            "--border": "1px solid var(--border-color)",
            "--shadow": "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "6px",
        },
    },
    materialYou: {
        name: "Material You",
        icon: Circle,
        vars: {
            "--radius": "28px",
            "--border": "none",
            "--shadow":
                "0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "999px",
        },
    },
    neobrutalism: {
        name: "Neo-Brutalism",
        icon: Hexagon,
        vars: {
            "--radius": "0px",
            "--border": "3px solid var(--text-main)",
            "--shadow": "6px 6px 0px 0px var(--text-main)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "0px",
        },
    },
    brutalist: {
        name: "Brutalist (Raw)",
        icon: Hash,
        vars: {
            "--radius": "0px",
            "--border": "1px solid var(--text-main)",
            "--shadow": "none",
            "--backdrop": "none",
            "--bg-panel-override": "transparent",
            "--btn-radius": "0px",
            "--font-family": '"Courier New", monospace',
            "--input-bg": "transparent",
        },
    },
    bauhaus: {
        name: "Bauhaus",
        icon: Triangle,
        vars: {
            "--radius": "0px",
            "--border": "4px solid var(--text-main)",
            "--shadow": "10px 10px 0px 0px var(--primary)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "100px",
            "--input-bg": "var(--bg-app)",
        },
    },
    aurora: {
        name: "Aurora",
        icon: Zap,
        vars: {
            "--radius": "24px",
            "--border": "1px solid rgba(255,255,255,0.1)",
            "--shadow": "0 0 60px -5px var(--accent)",
            "--backdrop": "blur(40px)",
            "--bg-panel-override": "rgba(0,0,0,0.3)",
            "--btn-radius": "16px",
        },
        isGlass: true,
    },
    vaporwave: {
        name: "Vaporwave",
        icon: HeartCrack,
        vars: {
            "--radius": "0px",
            "--border": "2px solid var(--accent)",
            "--shadow": "0 0 15px var(--accent)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--vapor-bg)",
            "--text-main": "var(--vapor-text)",
            "--clip-path": "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)",
            "--btn-radius": "0px",
        },
        dynamicVars: (isDark) => ({
            "--vapor-bg": isDark ? "#2b213a" : "#ffffff",
            "--vapor-text": isDark ? "#ff71ce" : "#000000",
        }),
    },
    bento: {
        name: "Bento Grid",
        icon: Grid,
        vars: {
            "--radius": "32px",
            "--border": "1px solid var(--border-color)",
            "--shadow": "0 4px 12px rgba(0,0,0,0.03)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "16px",
        },
    },
    minimalism: {
        name: "Minimalism",
        icon: Droplet,
        vars: {
            "--radius": "0px",
            "--border": "2px solid var(--border-color)",
            "--shadow": "none",
            "--backdrop": "none",
            "--bg-panel-override": "transparent",
            "--btn-radius": "0px",
        },
    },
    terminal: {
        name: "Terminal",
        icon: Terminal,
        vars: {
            "--radius": "0px",
            "--border": "1px solid var(--accent)",
            "--shadow": "0 0 15px var(--accent)",
            "--backdrop": "none",
            "--bg-panel-override": "#000000",
            "--text-main": "var(--accent)",
            "--text-muted": "var(--accent)",
            "--input-bg": "#000000",
            "--btn-radius": "0px",
            "--font-family": '"Fira Code", monospace',
        },
        forcedScheme: "dark",
        forceContrast: true,
    },
    paper: {
        name: "Paper Sketch",
        icon: FileText,
        vars: {
            "--radius": "255px 15px 225px 15px / 15px 225px 15px 255px",
            "--border": "2px solid var(--text-main)",
            "--shadow": "2px 3px 0px rgba(0,0,0,0.1)",
            "--backdrop": "none",
            "--bg-panel-override": "var(--bg-panel)",
            "--btn-radius": "255px 15px 225px 15px / 15px 225px 15px 255px",
        },
    },
};

// --- 4. THEME LOGIC GENERATORS ---

const generateSystemVars = (isDark) => {
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

const generatePreviewVars = (paletteKey, isDark, styleKey) => {
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

// --- 5. PARTICLE ENGINE ---
const ParticleEngine = ({ mode, accentColor, isDarkMode, paletteName }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || mode === "off") return;
        const ctx = canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        // Default accent fallback
        const mainColor = accentColor || (isDarkMode ? 'rgba(100, 255, 218, 0.5)' : '#64748b');
        const contrastColor = mainColor; // Always use the palette color

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // --- MATRIX PARTICLE (TRAIL EFFECT) ---
        class MatrixColumn {
            constructor(x, fontSize) {
                this.x = x;
                this.y = Math.random() * -canvas.height; // Start staggered above
                this.fontSize = fontSize;
                this.speed = Math.random() * 2 + 2;
                this.trailLength = Math.floor(Math.random() * 12 + 8); // 8-20 chars long
                this.chars =
                    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                // Persistent state for characters so they don't flicker frantically
                this.trail = [];
                for (let i = 0; i < this.trailLength; i++) {
                    this.trail[i] = this.chars.charAt(
                        Math.floor(Math.random() * this.chars.length),
                    );
                }

                // Throttling setup
                this.frame = 0;
                this.changeRate = Math.floor(Math.random() * 10) + 5; // Change a char every 5-15 frames
            }
            update() {
                this.y += this.speed;
                this.frame++;

                // Reset if the entire trail has passed the bottom
                if (
                    this.y - (this.trailLength * this.fontSize) > canvas.height
                ) {
                    this.y = Math.random() * -100;
                    this.speed = Math.random() * 2 + 2;
                }

                // VISIBLE CHANGE LOGIC:
                // Only change one random character in the trail occasionally
                // This creates the "decoding" shimmer effect without the chaotic strobe
                if (this.frame % this.changeRate === 0) {
                    const idx = Math.floor(Math.random() * this.trailLength);
                    this.trail[idx] = this.chars.charAt(
                        Math.floor(Math.random() * this.chars.length),
                    );
                }
            }
            draw() {
                ctx.font = `${this.fontSize}px monospace`;

                for (let i = 0; i < this.trailLength; i++) {
                    // Use the persistent character from state
                    const char = this.trail[i];
                    const yPos = this.y - (i * this.fontSize);

                    if (i === 0) {
                        // Head (Bright/White) - The "Cursor"
                        ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = ctx.fillStyle;
                        ctx.fillText(char, this.x, yPos);
                        ctx.shadowBlur = 0;
                    } else {
                        // Trail - The "Code"
                        ctx.fillStyle = contrastColor; // Adapts to palette

                        // Fading opacity up the trail
                        const alpha = 1 - (i / this.trailLength);
                        if (alpha <= 0) continue;

                        ctx.globalAlpha = alpha * 0.8;
                        ctx.fillText(char, this.x, yPos);
                    }
                }
                ctx.globalAlpha = 1.0; // Reset alpha
            }
        }

        // --- PULSE (REAL EKG) PARTICLE ---
        class PulseLine {
            constructor() {
                this.x = 0;
                this.y = canvas.height / 2;
                this.speed = 3;
                this.history = [];
            }
            update() {
                this.x += this.speed;

                if (this.x > canvas.width) {
                    this.x = 0;
                    this.history = [];
                }

                // Real EKG Math: P-QRS-T
                // Cycle length approx 300px
                const t = this.x % 300;
                let offset = 0;

                // Baseline noise
                offset += (Math.random() - 0.5) * 2;

                if (t > 20 && t < 50) {
                    // P Wave (small upward hump)
                    offset -= Math.sin(((t - 20) / 30) * Math.PI) * 15;
                } else if (t > 60 && t < 100) {
                    // QRS Complex
                    if (t < 70) offset += (t - 60) * 2; // Q (small down)
                    else if (t < 85) offset -= (t - 70) * 10; // R (sharp up)
                    else offset += (t - 85) * 8; // S (sharp down)
                } else if (t > 140 && t < 200) {
                    // T Wave (broader upward hump)
                    offset -= Math.sin(((t - 140) / 60) * Math.PI) * 25;
                }

                this.y = (canvas.height / 2) + offset;
                this.history.push({ x: this.x, y: this.y });

                if (this.history.length > 150) this.history.shift();
            }

            draw() {
                ctx.beginPath();
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.lineWidth = 2;
                // ADAPTS TO PALETTE COLOR
                ctx.strokeStyle = contrastColor;
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.strokeStyle;

                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                }
                ctx.stroke();

                // Leading dot
                ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
                ctx.shadowBlur = 15;
                ctx.shadowColor = ctx.strokeStyle;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Particle Classes based on mode
        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = contrastColor;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        class RainDrop {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.vy = Math.random() * 5 + 2;
                this.length = Math.random() * 20 + 10;
            }
            update() {
                this.y += this.vy;
                if (this.y > canvas.height) {
                    this.y = -this.length;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.strokeStyle = contrastColor;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        class DustParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 3;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = isDarkMode ? mainColor : "#64748b";
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        class SnowFlake {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vy = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.y += this.vy;
                this.x += this.vx;
                if (this.y > canvas.height) {
                    this.y = -5;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = isDarkMode ? "#ffffff" : "#94a3b8";
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        class Bubble {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.vy = Math.random() * 2 + 1;
                this.size = Math.random() * 5 + 2;
                this.wobble = Math.random() * Math.PI * 2;
            }
            update() {
                this.y -= this.vy;
                this.x += Math.sin(this.wobble) * 0.5;
                this.wobble += 0.05;
                if (this.y < -10) {
                    this.y = canvas.height + 10;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.strokeStyle = contrastColor;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        class StarParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.opacity = Math.random();
                this.speed = Math.random() * 0.02;
            }
            update() {
                this.opacity += this.speed;
                if (this.opacity > 1 || this.opacity < 0) this.speed *= -1;
            }
            draw() {
                let starColor = mainColor;
                if (isDarkMode) {
                    if (
                        ["ink", "carbon", "zinc", "slate", "stone"].includes(
                            paletteName,
                        )
                    ) starColor = "#ffffff";
                } else {
                    if (
                        ["ghost", "platinum", "silver", "iceberg", "lavender"]
                            .includes(paletteName)
                    ) starColor = "#1e293b";
                }
                ctx.fillStyle = starColor;
                ctx.globalAlpha = Math.abs(this.opacity);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        class ConfettiParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 5 + 2;
                this.vy = Math.random() * 3 + 1;
                this.vx = Math.random() * 2 - 1;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.2;
            }
            update() {
                this.y += this.vy;
                this.x += this.vx;
                this.rotation += this.rotationSpeed;
                if (this.y > canvas.height) {
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    -this.size / 2,
                    -this.size / 2,
                    this.size,
                    this.size,
                );
                ctx.restore();
            }
        }

        class FireflyParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random();
                this.dOpacity = 0.01;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.opacity += this.dOpacity;
                if (this.opacity > 1 || this.opacity < 0.2) this.dOpacity *= -1;
            }
            draw() {
                const color = isDarkMode ? "#eaff00" : "#d97706";
                ctx.fillStyle = color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
                ctx.shadowBlur = 0;
            }
        }

        class GridLine {
            constructor(y) {
                this.y = y;
                this.speed = 0.5;
            }
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.strokeStyle = contrastColor;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.3;
                const alpha = this.y / canvas.height;
                ctx.globalAlpha = alpha * 0.3;
                ctx.beginPath();
                ctx.moveTo(0, this.y);
                ctx.lineTo(canvas.width, this.y);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        class DNAParticle {
            constructor(id, total) {
                this.id = id;
                this.total = total;
                this.angle = (id / total) * Math.PI * 8;
                this.y = (id / total) * canvas.height;
                this.speed = 0.02;
                this.amplitude = 100;
            }
            update() {
                this.angle += this.speed;
                this.y -= 0.5;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                const centerX = canvas.width / 2;
                const x1 = centerX + Math.sin(this.angle) * this.amplitude;
                const x2 = centerX +
                    Math.sin(this.angle + Math.PI) * this.amplitude;

                ctx.fillStyle = contrastColor;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(x1, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x2, this.y, 3, 0, Math.PI * 2);
                ctx.fill();

                if (this.id % 5 === 0) {
                    ctx.strokeStyle = contrastColor;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(x1, this.y);
                    ctx.lineTo(x2, this.y);
                    ctx.stroke();
                }
            }
        }

        class SpeedParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * canvas.width;
                this.speed = 10;
            }
            update() {
                this.z -= this.speed;
                if (this.z <= 0) {
                    this.z = canvas.width;
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }
            draw() {
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                const sx = (this.x - cx) * (canvas.width / this.z) + cx;
                const sy = (this.y - cy) * (canvas.width / this.z) + cy;
                const size = (1 - this.z / canvas.width) * 3;

                ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
                ctx.globalAlpha = 1 - this.z / canvas.width;
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            let pCount = 0;

            if (mode === "nodes") {
                pCount = Math.floor((canvas.width * canvas.height) / 15000);
                for (let i = 0; i < pCount; i++) particles.push(new Node());
            } else if (mode === "rain") {
                pCount = Math.floor(canvas.width / 10);
                for (let i = 0; i < pCount; i++) particles.push(new RainDrop());
            } else if (mode === "dust") {
                pCount = 150;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new DustParticle());
                }
            } else if (mode === "snow") {
                pCount = 200;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new SnowFlake());
                }
            } else if (mode === "bubbles") {
                pCount = 80;
                for (let i = 0; i < pCount; i++) particles.push(new Bubble());
            } else if (mode === "stars") {
                pCount = 300;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new StarParticle());
                }
            } else if (mode === "confetti") {
                pCount = 100;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new ConfettiParticle());
                }
            } else if (mode === "fireflies") {
                pCount = 50;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new FireflyParticle());
                }
            } else if (mode === "grid") {
                const lines = canvas.height / 40;
                for (let i = 0; i < lines; i++) {
                    particles.push(new GridLine(i * 40));
                }
            } else if (mode === "dna") {
                pCount = 100;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new DNAParticle(i, pCount));
                }
            } else if (mode === "speed") {
                pCount = 200;
                for (let i = 0; i < pCount; i++) {
                    particles.push(new SpeedParticle());
                }
            } else if (mode === "matrix") {
                const fontSize = 16;
                const columns = canvas.width / fontSize;
                for (let i = 0; i < columns; i++) {
                    particles.push(new MatrixColumn(i * fontSize, fontSize));
                }
            } else if (mode === "pulse") {
                particles.push(new PulseLine());
            }
        };

        const animate = () => {
            // TRAIL EFFECTS FOR MATRIX/PULSE
            if (mode === "matrix" || mode === "pulse") {
                // Matrix needs less blur (higher opacity clear) to be readable
                // Pulse benefits from more blur (lower opacity clear) for the "scope" feel
                const alpha = mode === "matrix" ? 0.25 : 0.1;
                ctx.fillStyle = isDarkMode
                    ? `rgba(0, 0, 0, ${alpha})`
                    : `rgba(255, 255, 255, ${alpha})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            // Special static draw for Grid verticals
            if (mode === "grid") {
                const cols = canvas.width / 40;
                ctx.strokeStyle = contrastColor;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.1;
                for (let i = 0; i < cols; i++) {
                    ctx.beginPath();
                    ctx.moveTo(i * 40, 0);
                    ctx.lineTo(i * 40 + (i - cols / 2) * 100, canvas.height);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1.0;
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // NetSec Connections logic
                if (mode === "nodes") {
                    for (let j = i; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120) {
                            ctx.strokeStyle = contrastColor;
                            ctx.globalAlpha = isDarkMode ? 0.4 : 0.4;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                            ctx.globalAlpha = 1.0;
                        }
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mode, accentColor, isDarkMode, paletteName]);

    if (mode === "off") return null;
    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-60"
        />
    );
};

// --- 6. UI COMPONENTS ---

// Helper to get modal styling based on active theme
const getAdaptiveModalStyle = (
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

// MODAL PALETTE SELECTOR
const PaletteModal = (
    {
        isOpen,
        onClose,
        activePalette,
        setActivePalette,
        paletteDefs,
        systemVars,
        activeStyle,
        styles,
        isDarkMode,
    },
) => {
    const [searchQuery, setSearchQuery] = useState("");

    if (!isOpen) return null;

    const groupedPalettes = Object.entries(paletteDefs).reduce(
        (acc, [key, def]) => {
            if (
                searchQuery &&
                !def.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) return acc;
            if (!acc[def.category]) acc[def.category] = [];
            acc[def.category].push({ key, ...def });
            return acc;
        },
        {},
    );

    const { style: modalStyle, textColor } = getAdaptiveModalStyle(
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col transition-all transform scale-100 shadow-2xl"
                style={{
                    background: modalStyle["--bg-panel-override"],
                    color: textColor,
                    borderRadius: modalStyle["--radius"],
                    border: modalStyle["--border"],
                    boxShadow: modalStyle["--shadow"],
                    backdropFilter: modalStyle["--backdrop"],
                    fontFamily: modalStyle["--font-family"],
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-inherit"
                    style={{
                        borderColor: styles[activeStyle].forcedScheme === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : systemVars["--sys-border"],
                    }}
                >
                    <div className="flex items-center gap-3 w-full max-w-md">
                        <Search size={20} className="opacity-50" />
                        <input
                            type="text"
                            placeholder="Search palettes..."
                            className="w-full bg-transparent outline-none text-lg font-medium placeholder-opacity-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            style={{ color: textColor }}
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    {Object.entries(groupedPalettes).map((
                        [category, palettes],
                    ) => (
                        <div key={category} className="mb-8 last:mb-0">
                            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 border-b border-current pb-1 inline-block">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {palettes.map((p) => {
                                    const isActive = activePalette === p.key;
                                    return (
                                        <button
                                            key={p.key}
                                            onClick={() => {
                                                setActivePalette(p.key);
                                                onClose();
                                            }}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all group border ${
                                                isActive
                                                    ? "ring-2 ring-offset-1 ring-current shadow-lg scale-105 font-bold"
                                                    : "border-transparent hover:bg-white/10 hover:border-current/20"
                                            }`}
                                            style={{
                                                background: isActive
                                                    ? p.primary
                                                    : "transparent",
                                                color: isActive
                                                    ? (p.fgForce || (p.isDark
                                                        ? "#fff"
                                                        : "#000"))
                                                    : textColor,
                                                opacity: isActive ? 1 : 0.8,
                                            }}
                                        >
                                            <div
                                                className="w-full h-8 rounded-md shadow-sm transition-transform group-hover:scale-105"
                                                style={{
                                                    background: p.primary,
                                                    border:
                                                        "1px solid rgba(0,0,0,0.1)",
                                                }}
                                            />
                                            <div className="text-center w-full overflow-hidden">
                                                <div className="text-xs truncate">
                                                    {p.name}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- ADAPTIVE STYLE MODAL ---
const StyleModal = (
    {
        isOpen,
        onClose,
        activeStyle,
        setActiveStyle,
        styles,
        systemVars,
        paletteDefs,
        activePalette,
        isDarkMode,
    },
) => {
    if (!isOpen) return null;

    const { style: modalStyle, textColor } = getAdaptiveModalStyle(
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col transition-all transform scale-100 shadow-2xl"
                style={{
                    background: modalStyle["--bg-panel-override"],
                    color: textColor,
                    borderRadius: modalStyle["--radius"],
                    border: modalStyle["--border"],
                    boxShadow: modalStyle["--shadow"],
                    backdropFilter: modalStyle["--backdrop"],
                    fontFamily: modalStyle["--font-family"],
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-inherit"
                    style={{
                        borderColor: styles[activeStyle].forcedScheme === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : systemVars["--sys-border"],
                    }}
                >
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Layout size={24} /> Select Interface Style
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(styles).map(([key, style]) => {
                            const isActive = activeStyle === key;
                            const Icon = style.icon;

                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveStyle(key);
                                        onClose();
                                    }}
                                    className={`
                                        relative p-4 rounded-xl border transition-all flex flex-col items-center gap-3 group text-center
                                        ${
                                        isActive
                                            ? "ring-2 ring-current scale-[1.02]"
                                            : "hover:bg-white/10 hover:border-current/30"
                                    }
                                    `}
                                    style={{
                                        borderColor: isActive
                                            ? "currentColor"
                                            : "transparent",
                                        background: isActive
                                            ? "rgba(128,128,128,0.2)"
                                            : "transparent",
                                        color: textColor,
                                    }}
                                >
                                    <div
                                        className="p-3 rounded-full bg-current text-inverse-current opacity-90 group-hover:scale-110 transition-transform"
                                        style={{
                                            color: isActive
                                                ? "var(--bg-panel)"
                                                : textColor,
                                            background: isActive
                                                ? textColor
                                                : "rgba(128,128,128,0.2)",
                                        }}
                                    >
                                        <Icon
                                            size={24}
                                            style={{
                                                color: isActive
                                                    ? "var(--bg-panel)"
                                                    : "currentColor",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">
                                            {style.name}
                                        </div>
                                        <div className="text-[10px] opacity-60 mt-1">
                                            {style.isGlass
                                                ? "Translucent"
                                                : "Solid"}
                                            {style.forceContrast
                                                ? " • High Contrast"
                                                : ""}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ADAPTIVE PARTICLE MODAL ---
const ParticleModal = (
    {
        isOpen,
        onClose,
        activeParticleMode,
        setActiveParticleMode,
        particleOptions,
        styles,
        systemVars,
        paletteDefs,
        activePalette,
        activeStyle,
        isDarkMode,
    },
) => {
    if (!isOpen) return null;

    const { style: modalStyle, textColor } = getAdaptiveModalStyle(
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col transition-all transform scale-100 shadow-2xl"
                style={{
                    background: modalStyle["--bg-panel-override"],
                    color: textColor,
                    borderRadius: modalStyle["--radius"],
                    border: modalStyle["--border"],
                    boxShadow: modalStyle["--shadow"],
                    backdropFilter: modalStyle["--backdrop"],
                    fontFamily: modalStyle["--font-family"],
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="p-4 border-b flex items-center justify-between sticky top-0 z-10 bg-inherit"
                    style={{
                        borderColor: styles[activeStyle].forcedScheme === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : systemVars["--sys-border"],
                    }}
                >
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles size={24} /> Select Particle Engine
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {particleOptions.map((opt) => {
                            const isActive = activeParticleMode === opt.id;
                            const Icon = opt.icon;

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => {
                                        setActiveParticleMode(opt.id);
                                        onClose();
                                    }}
                                    className={`
                                        relative p-4 rounded-xl border transition-all flex flex-col items-center gap-3 group text-center
                                        ${
                                        isActive
                                            ? "ring-2 ring-current scale-[1.02]"
                                            : "hover:bg-white/10 hover:border-current/30"
                                    }
                                    `}
                                    style={{
                                        borderColor: isActive
                                            ? "currentColor"
                                            : "transparent",
                                        // Consistent light background for active state to ensure icon visibility
                                        background: isActive
                                            ? "rgba(128,128,128,0.2)"
                                            : "transparent",
                                        color: textColor,
                                    }}
                                >
                                    <div
                                        className="p-3 rounded-full bg-current text-inverse-current opacity-90 group-hover:scale-110 transition-transform"
                                        style={{
                                            color: isActive
                                                ? "var(--bg-panel)"
                                                : textColor,
                                            background: isActive
                                                ? textColor
                                                : "rgba(128,128,128,0.2)",
                                        }}
                                    >
                                        <Icon
                                            size={24}
                                            style={{
                                                color: isActive
                                                    ? "var(--bg-panel)"
                                                    : "currentColor",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">
                                            {opt.name}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- CUSTOM FONT DROPDOWN ---
const FontSelect = (
    {
        activeFont,
        setActiveFont,
        fontDefs,
        systemVars,
        styles,
        activeStyle,
        isDarkMode,
        paletteDefs,
        activePalette,
    },
) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Re-use adaptive styling logic for the dropdown list to match other modals/theme
    const { style: modalStyle, textColor } = getAdaptiveModalStyle(
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                style={{
                    background: "transparent",
                    borderColor: systemVars["--sys-border"],
                    color: "inherit",
                    fontFamily: fontDefs[activeFont].family,
                }}
            >
                <span className="truncate">{fontDefs[activeFont].name}</span>
                <div className="opacity-50 ml-2">
                    {isOpen
                        ? <ChevronUp size={16} />
                        : <ChevronDown size={16} />}
                </div>
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden flex flex-col shadow-2xl max-h-60"
                    style={{
                        background: modalStyle["--bg-panel-override"],
                        color: textColor,
                        borderRadius: modalStyle["--radius"], // Match theme radius
                        border: modalStyle["--border"],
                        boxShadow: modalStyle["--shadow"],
                        backdropFilter: modalStyle["--backdrop"],
                    }}
                >
                    <div className="overflow-y-auto custom-scroll flex-1 p-1">
                        {Object.entries(fontDefs).map(([key, font]) => {
                            const isActive = activeFont === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveFont(key);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full text-left px-4 py-3 rounded-md transition-colors flex items-center justify-between
                                        ${
                                        isActive
                                            ? "bg-white/10 font-bold"
                                            : "hover:bg-white/5 opacity-80 hover:opacity-100"
                                    }
                                    `}
                                    style={{ fontFamily: font.family }}
                                >
                                    <span>{font.name}</span>
                                    {isActive && <Check size={14} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const RezidentLogo = ({ size = 40, forceColor }) => (
    <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
    >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                fill="currentColor"
                className="opacity-20"
            />
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M4 9H20"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M4 15H20"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M10 3V21"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M2 12H6L8 7L11 16L14 9L16 12H22"
                stroke={forceColor || "var(--logo-glow)"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    filter: forceColor
                        ? "none"
                        : "drop-shadow(0 0 2px var(--logo-glow))",
                }}
            />
        </svg>
    </div>
);

const LoginCard = ({ forceContrast, activeStyle }) => {
    const [showPassword, setShowPassword] = useState(false);

    let headerColor = "var(--text-main)";
    let labelColor = "var(--text-muted)";

    if (["gameboy", "cyberdeck", "glitch"].includes(activeStyle)) {
        headerColor = "var(--gb-text)";
        labelColor = "var(--gb-text-muted)";
    } else if (activeStyle === "neon") {
        headerColor = "#ffffff";
        labelColor = "#aaaaaa";
    } else if (activeStyle === "frutigerAero") {
        headerColor = "#0f172a";
        labelColor = "rgba(15, 23, 42, 0.7)";
    } else if (activeStyle === "system7") {
        headerColor = "#000";
        labelColor = "#333";
    }

    return (
        <div
            className="relative w-full max-w-md p-8 transition-all duration-500"
            style={{
                background: "var(--bg-panel-override, var(--bg-panel))",
                borderRadius: "var(--radius)",
                border: "var(--border)",
                boxShadow: "var(--shadow)",
                backdropFilter: "var(--backdrop)",
                clipPath: "var(--clip-path, none)",
                fontFamily: "var(--font-family, inherit)",
                transform: "var(--transform, none)",
            }}
        >
            <div className="text-center mb-8 flex flex-col items-center">
                <div
                    className="mb-4 transition-colors duration-300"
                    style={{ color: headerColor }}
                >
                    <RezidentLogo
                        size={64}
                        forceColor={[
                                "gameboy",
                                "cyberdeck",
                                "glitch",
                                "system7",
                            ].includes(activeStyle)
                            ? "var(--gb-text)"
                            : null}
                    />
                </div>
                <h2
                    className="text-3xl tracking-tight transition-colors duration-300"
                    style={{
                        color: headerColor,
                        fontWeight: "var(--weight-bold)",
                    }}
                >
                    r<span
                        style={{
                            color:
                                ["gameboy", "cyberdeck", "glitch", "system7"]
                                        .includes(activeStyle)
                                    ? "var(--gb-text)"
                                    : "var(--accent)",
                        }}
                    >
                        EZ
                    </span>ident
                </h2>
                <p
                    style={{
                        color: labelColor,
                        fontWeight: "var(--weight-normal)",
                    }}
                    className="text-sm mt-2"
                >
                    Your resident life, made{" "}
                    <span
                        style={{
                            color:
                                ["gameboy", "cyberdeck", "glitch", "system7"]
                                        .includes(activeStyle)
                                    ? "var(--gb-text)"
                                    : "var(--accent)",
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        EZier
                    </span>.
                </p>
            </div>

            <div className="space-y-5">
                <div className="space-y-1">
                    <label
                        className="text-xs uppercase tracking-wider ml-1"
                        style={{
                            color: labelColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="afif@rezident.app"
                        className="w-full px-4 py-3 outline-none transition-all duration-300 dynamic-placeholder"
                        style={{
                            background: "var(--input-bg)",
                            borderRadius: "var(--btn-radius)",
                            border: activeStyle === "frutigerAero"
                                ? "1px solid rgba(255,255,255,0.5)"
                                : "1px solid var(--border-color)",
                            color: "var(--input-text)",
                            boxShadow: "var(--shadow-input, none)",
                            fontWeight: "var(--weight-normal)",
                        }}
                    />
                </div>

                <div className="space-y-1">
                    <label
                        className="text-xs uppercase tracking-wider ml-1"
                        style={{
                            color: labelColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 outline-none transition-all duration-300 pr-10 dynamic-placeholder"
                            style={{
                                background: "var(--input-bg)",
                                borderRadius: "var(--btn-radius)",
                                border: activeStyle === "frutigerAero"
                                    ? "1px solid rgba(255,255,255,0.5)"
                                    : "1px solid var(--border-color)",
                                color: "var(--input-text)",
                                fontWeight: "var(--weight-normal)",
                                boxShadow: "var(--shadow-input, none)",
                            }}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 transition-colors"
                            style={{ color: "var(--input-text)", opacity: 0.6 }}
                        >
                            {showPassword
                                ? <Eye size={18} />
                                : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer"
                            style={{
                                borderColor: labelColor,
                                borderRadius: "4px",
                            }}
                        >
                        </div>
                        <span
                            style={{
                                color: labelColor,
                                fontWeight: "var(--weight-normal)",
                            }}
                        >
                            Remember me
                        </span>
                    </div>
                    <a
                        href="#"
                        style={{
                            color:
                                ["gameboy", "cyberdeck", "glitch", "system7"]
                                        .includes(activeStyle)
                                    ? "var(--gb-text)"
                                    : "var(--accent)",
                            fontWeight: "var(--weight-bold)",
                        }}
                        className="hover:underline"
                    >
                        Forgot?
                    </a>
                </div>

                <button
                    className="w-full py-3.5 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden relative"
                    style={{
                        background: "var(--primary)",
                        color: "var(--primary-fg)",
                        borderRadius: "var(--btn-radius)",
                        boxShadow: "var(--shadow)",
                        border: "var(--btn-border)",
                        fontWeight: "var(--weight-bold)",
                        backgroundClip: "padding-box",
                        backgroundOrigin: "border-box",
                    }}
                >
                    Sign In
                    <ArrowRight size={18} />
                </button>

                <div className="relative flex py-2 items-center">
                    <div
                        className="flex-grow border-t"
                        style={{ borderColor: "var(--border-color)" }}
                    >
                    </div>
                    <span
                        className="flex-shrink-0 mx-4 text-xs uppercase"
                        style={{
                            color: labelColor,
                            fontWeight: "var(--weight-normal)",
                        }}
                    >
                        Or continue with
                    </span>
                    <div
                        className="flex-grow border-t"
                        style={{ borderColor: "var(--border-color)" }}
                    >
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {["Google", "Notion"].map((provider) => (
                        <button
                            key={provider}
                            className="flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:opacity-80"
                            style={{
                                background: "var(--btn-sec-bg)",
                                border: "var(--btn-sec-border)",
                                borderRadius: "var(--btn-radius)",
                                color: "var(--btn-sec-text)",
                                fontWeight: "var(--weight-normal)",
                                boxShadow: "var(--btn-sec-shadow, none)",
                            }}
                        >
                            {provider === "Google"
                                ? (
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                )
                                : (
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                                        alt="Notion"
                                        className="w-4 h-4"
                                    />
                                )}
                            <span className="text-sm">{provider}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 7. MAIN APP ---

export default function App() {
    const [activePalette, setActivePalette] = useState("metallic");
    const [activeStyle, setActiveStyle] = useState("glassmorphism");
    const [activeFont, setActiveFont] = useState("sans");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showConfig, setShowConfig] = useState(true);
    // MODIFIED: Pulse is now default
    const [activeParticleMode, setActiveParticleMode] = useState("pulse");
    const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
    const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
    const [isParticleModalOpen, setIsParticleModalOpen] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) setShowConfig(false);
    }, []);

    const previewVars = generatePreviewVars(
        activePalette,
        isDarkMode,
        activeStyle,
    );
    const systemVars = generateSystemVars(isDarkMode);
    const fontConfig = fontDefs[activeFont];
    const fontVars = {
        "--font-family": fontConfig.family,
        "--weight-normal": fontConfig.weightNormal,
        "--weight-bold": fontConfig.weightBold,
    };

    const currentStyleVars = styles[activeStyle].vars;

    const uiStyle = {
        background: systemVars["--sys-bg"],
        color: systemVars["--sys-text"],
        borderRadius: currentStyleVars["--radius"],
        border: currentStyleVars["--border"] !== "none"
            ? currentStyleVars["--border"]
            : `1px solid ${systemVars["--sys-border"]}`,
        boxShadow: currentStyleVars["--shadow"],
        backdropFilter: styles[activeStyle].vars["--backdrop"] || "none",
        fontFamily: currentStyleVars["--font-family"],
        ...(activeStyle === "gameboy" && {
            background: paletteDefs[activePalette].primary,
            color: paletteDefs[activePalette].fgForce ||
                (isDarkMode ? "#fff" : "#000"),
        }),
        ...(activeStyle === "retro95" &&
            { background: isDarkMode ? "#374151" : "#c0c0c0" }),
    };

    // Scrollbar colors using RGBA for guaranteed visibility in dark mode contexts
    const scrollbarThumbColor = isDarkMode
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)";
    const scrollbarThumbHover = isDarkMode
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(0, 0, 0, 0.4)";
    const CurrentStyleIcon = styles[activeStyle].icon;

    // Use useMemo or simple calculation since particleOptions is now global/top-level
    const CurrentParticleIcon =
        particleOptions.find((p) => p.id === activeParticleMode)?.icon || Ban;

    return (
        <div
            className="min-h-screen w-full relative overflow-hidden flex font-sans transition-colors duration-500"
            style={{ ...previewVars, ...fontVars }}
        >
            <style>
                {`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background-color: ${scrollbarThumbColor};
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover { background-color: ${scrollbarThumbHover}; }
        
        .dynamic-placeholder::placeholder {
          color: var(--placeholder-color) !important;
          opacity: 1;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Raleway:wght@400;600&family=Quicksand:wght@500;700&family=Lato:wght@400;700&family=Roboto:wght@400;500&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@400;600&family=Merriweather:wght@300;700&family=PT+Serif:wght@400;700&family=Fira+Code:wght@400;600&family=JetBrains+Mono:wght@400;600&family=Source+Code+Pro:wght@400;600&family=Space+Mono:wght@400;700&family=Ubuntu+Mono:wght@400;700&family=Inconsolata:wght@400;700&family=Oswald:wght@400;500&family=Press+Start+2P&family=Orbitron:wght@500;800&family=Play:wght@400;700&family=Archivo+Black&family=Russo+One&family=Lora:wght@400;600&family=IBM+Plex+Mono:wght@400;600&family=Poppins:wght@400;600&family=Montserrat:wght@400;700&display=swap');
        @font-face {
            font-family: 'Chicago';
            src: url('https://db.onlinewebfonts.com/t/6d32b8006f04e23d72b4e3d837964715.woff2') format('woff2');
        }
      `}
            </style>

            {/* BACKGROUND LAYER */}
            <div
                className="absolute inset-0 z-0 transition-colors duration-500"
                style={{ background: "var(--bg-app)" }}
            >
                <ParticleEngine
                    mode={activeParticleMode}
                    accentColor={previewVars["--accent"]}
                    isDarkMode={isDarkMode}
                    paletteName={activePalette}
                />

                {(activeStyle === "glassmorphism" ||
                    activeStyle === "aurora") && (
                    <>
                        <div
                            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[100px] animate-pulse"
                            style={{ background: "var(--logo-glow)" }}
                        >
                        </div>
                        <div
                            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[100px] animate-pulse delay-700"
                            style={{ background: "var(--accent)" }}
                        >
                        </div>
                    </>
                )}
                {(activeStyle === "cyberpunk" || activeStyle === "bento" ||
                    activeStyle === "terminal") && (
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "radial-gradient(var(--text-main) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    >
                    </div>
                )}
                {activeStyle === "retro95" && (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: isDarkMode ? "#1a1a1a" : "#008080",
                        }}
                    >
                    </div>
                )}
                {activeStyle === "system7" && (
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(45deg, #ccc 0, #ccc 1px, transparent 0, transparent 50%)",
                            backgroundSize: "4px 4px",
                        }}
                    >
                    </div>
                )}
                {activeStyle === "acrylic" && (
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                        }}
                    >
                    </div>
                )}
                {activeStyle === "frutigerAero" && (
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage:
                                "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
                        }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent">
                        </div>
                    </div>
                )}
            </div>

            {/* CONFIGURATOR SIDEBAR */}
            <div
                className={`
            fixed top-0 left-0 h-full z-50 transition-transform duration-300 w-80 max-w-[85vw] overflow-y-auto flex flex-col
            ${showConfig ? "translate-x-0" : "-translate-x-full"}
        `}
                style={uiStyle}
            >
                <div className="p-6 space-y-8 flex-grow">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Settings size={18} /> Theme Engine
                        </h3>
                        <button
                            onClick={() => setShowConfig(false)}
                            className="p-2 rounded-full hover:bg-black/5"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* 0. Mode Switcher */}
                    <div
                        className="p-1 rounded-full flex relative cursor-pointer border h-12"
                        style={{
                            background: systemVars["--sys-switch-bg"],
                            borderColor: systemVars["--sys-border"],
                        }}
                    >
                        <div
                            className="absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-300 z-0"
                            style={{
                                left: isDarkMode ? "50%" : "4px",
                                width: "calc(50% - 4px)",
                                background: systemVars["--sys-switch-thumb"],
                            }}
                        />
                        <button
                            onClick={() => setIsDarkMode(false)}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-xs font-bold transition-colors ${
                                !isDarkMode
                                    ? "text-slate-800"
                                    : "text-slate-400"
                            }`}
                            style={{
                                color: !isDarkMode
                                    ? systemVars["--sys-text"]
                                    : systemVars["--sys-text-muted"],
                            }}
                        >
                            <Sun size={14} /> LIGHT
                        </button>
                        <button
                            onClick={() => setIsDarkMode(true)}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-xs font-bold transition-colors ${
                                isDarkMode ? "text-white" : "text-slate-400"
                            }`}
                            style={{
                                color: isDarkMode
                                    ? systemVars["--sys-text"]
                                    : systemVars["--sys-text-muted"],
                            }}
                        >
                            <Moon size={14} /> DARK
                        </button>
                    </div>

                    {/* 1. Palette Selector - TRIGGERS MODAL */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">
                                1. Palette
                            </label>
                        </div>
                        <button
                            onClick={() => setIsPaletteModalOpen(true)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={{
                                background: "transparent",
                                borderColor: systemVars["--sys-border"],
                                color: "inherit",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-6 h-6 rounded-full border shadow-sm"
                                    style={{
                                        background:
                                            paletteDefs[activePalette].primary,
                                        borderColor: "rgba(0,0,0,0.1)",
                                    }}
                                />
                                <span className="font-bold text-sm">
                                    {paletteDefs[activePalette].name}
                                </span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    {/* 2. Style Selector - NOW TRIGGERS MODAL */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest mb-3 block opacity-60">
                            2. Style
                        </label>
                        <button
                            onClick={() => setIsStyleModalOpen(true)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={{
                                background: "transparent",
                                borderColor: systemVars["--sys-border"],
                                color: "inherit",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <CurrentStyleIcon size={20} />
                                <span className="font-bold text-sm">
                                    {styles[activeStyle].name}
                                </span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    {/* 3. Font Selector - CUSTOM DROPDOWN */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest mb-3 block opacity-60">
                            3. Typography
                        </label>
                        <FontSelect
                            activeFont={activeFont}
                            setActiveFont={setActiveFont}
                            fontDefs={fontDefs}
                            systemVars={systemVars}
                            styles={styles}
                            activeStyle={activeStyle}
                            isDarkMode={isDarkMode}
                            paletteDefs={paletteDefs}
                            activePalette={activePalette}
                        />
                    </div>

                    {/* 4. Particle Engine Selector - TRIGGERS MODAL */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest mb-3 block opacity-60">
                            4. Particle Engine
                        </label>
                        <button
                            onClick={() => setIsParticleModalOpen(true)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={{
                                background: "transparent",
                                borderColor: systemVars["--sys-border"],
                                color: "inherit",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <CurrentParticleIcon size={20} />
                                <span className="font-bold text-sm">
                                    {particleOptions.find((p) =>
                                        p.id === activeParticleMode
                                    )?.name || "Off"}
                                </span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* FLOATING TOGGLE */}
            {!showConfig && (
                <button
                    onClick={() => setShowConfig(true)}
                    className="fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
                    style={{
                        background: paletteDefs[activePalette].primary,
                        color: isDarkMode ? "#fff" : "#000",
                        ...uiStyle,
                    }}
                >
                    <Settings size={24} />
                    <span className="font-bold text-sm pr-1 hidden md:block">
                        CUSTOMIZE
                    </span>
                </button>
            )}

            <PaletteModal
                isOpen={isPaletteModalOpen}
                onClose={() => setIsPaletteModalOpen(false)}
                activePalette={activePalette}
                setActivePalette={setActivePalette}
                paletteDefs={paletteDefs}
                systemVars={systemVars}
                activeStyle={activeStyle}
                styles={styles}
                isDarkMode={isDarkMode}
            />

            <StyleModal
                isOpen={isStyleModalOpen}
                onClose={() => setIsStyleModalOpen(false)}
                activeStyle={activeStyle}
                setActiveStyle={setActiveStyle}
                styles={styles}
                systemVars={systemVars}
                paletteDefs={paletteDefs}
                activePalette={activePalette}
                isDarkMode={isDarkMode}
            />

            <ParticleModal
                isOpen={isParticleModalOpen}
                onClose={() => setIsParticleModalOpen(false)}
                activeParticleMode={activeParticleMode}
                setActiveParticleMode={setActiveParticleMode}
                particleOptions={particleOptions}
                styles={styles}
                systemVars={systemVars}
                paletteDefs={paletteDefs}
                activePalette={activePalette}
                activeStyle={activeStyle}
                isDarkMode={isDarkMode}
            />

            <div
                className={`
        flex-grow relative z-10 flex items-center justify-center p-4 transition-all duration-300
        ${showConfig ? "md:pl-80" : ""}
      `}
            >
                <LoginCard
                    forceContrast={styles[activeStyle].forceContrast}
                    activeStyle={activeStyle}
                />
            </div>
        </div>
    );
}

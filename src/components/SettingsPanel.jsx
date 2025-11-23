import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, Settings, Sun, Moon, X, Ban, Type } from "lucide-react";
import { getAdaptiveModalStyle, styles } from './StyleEngine.jsx';
import { paletteDefs, generateSemanticVars } from './ThemeEngine.jsx';
import { particleOptions } from './ParticleSystem.jsx';
import { fontDefs } from '../constants/fonts.js';

// FONT SELECT COMPONENT - EXACT COPY FROM ORIGINAL
const FontSelect = React.memo(({
    activeFont,
    setActiveFont,
    fontDefs,
    systemVars,
    styles,
    activeStyle,
    isDarkMode,
    paletteDefs,
    activePalette
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const { style: modalStyle, textColor } = getAdaptiveModalStyle(
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    );

    const handleFontSelect = useCallback((fontKey) => {
        setActiveFont(fontKey);
        setIsOpen(false);
    }, [setActiveFont]);

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const dropdownButtonStyle = useMemo(() => ({
        background: "transparent",
        borderColor: systemVars["--border-color"],
        color: systemVars["--text-main"],
        borderRadius: styles[activeStyle].vars["--radius"],
        border: `1px solid ${systemVars["--border-color"]}`,
        boxShadow: "none",
        fontFamily: fontDefs[activeFont].family,
    }), [systemVars, styles, activeStyle, fontDefs, activeFont]);

    const dropdownStyle = useMemo(() => ({
        background: isDarkMode ? "#1f2937" : "#ffffff",
        borderColor: systemVars["--border-color"],
        borderRadius: styles[activeStyle].vars["--radius"],
        border: `1px solid ${systemVars["--border-color"]}`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        backdropFilter: "none",
    }), [isDarkMode, systemVars, styles, activeStyle]);

    const itemStyle = useMemo(() => (isActive) => ({
        color: isDarkMode ? "#f9fafb" : "#111827",
        borderColor: isDarkMode ? "#374151" : "#d1d5db",
        fontFamily: fontDefs[activeFont].family,
    }), [isDarkMode, fontDefs, activeFont]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                style={dropdownButtonStyle}
            >
                <div className="flex items-center gap-3">
                    <Type size={20} />
                    <span className="font-bold text-sm">
                        {fontDefs[activeFont].name}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-2 rounded-lg shadow-2xl border overflow-hidden max-h-60"
                    style={dropdownStyle}
                >
                    <div className="overflow-y-auto custom-scroll max-h-60">
                        {Object.entries(fontDefs).map(([key, font]) => (
                            <button
                                key={key}
                                onClick={() => handleFontSelect(key)}
                                className={`w-full px-4 py-3 text-left font-medium transition-colors border-b last:border-b-0 ${
                                    activeFont === key ? "bg-current/10" : "hover:bg-white/10"
                                }`}
                                style={itemStyle(activeFont === key)}
                            >
                                {font.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

// MAIN SETTINGS PANEL - EXACT COPY FROM ORIGINAL
export const SettingsPanel = React.memo(({
    showConfig,
    setShowConfig,
    activePalette,
    setActivePalette,
    activeStyle,
    setActiveStyle,
    activeFont,
    setActiveFont,
    activeParticleMode,
    setActiveParticleMode,
    isDarkMode,
    setIsDarkMode,
    isPaletteModalOpen,
    setIsPaletteModalOpen,
    isStyleModalOpen,
    setIsStyleModalOpen,
    isParticleModalOpen,
    setIsParticleModalOpen,
    particleOptions,
    paletteDefs,
    styles,
    systemVars,
    uiStyle,
}) => {
    if (!showConfig) return null;

    const CurrentStyleIcon = useMemo(() => styles[activeStyle].icon, [styles, activeStyle]);
    const CurrentParticleIcon = useMemo(
        () => particleOptions.find((p) => p.id === activeParticleMode)?.icon || Ban,
        [particleOptions, activeParticleMode]
    );

    // Get theme-responsive variables for proper contrast
    const semanticVars = useMemo(() => 
        generateSemanticVars(activePalette, isDarkMode),
        [activePalette, isDarkMode]
    );

    const handleModeToggle = useCallback((setDarkMode) => {
        setIsDarkMode(setDarkMode);
    }, [setIsDarkMode]);

    const handleConfigClose = useCallback(() => {
        setShowConfig(false);
    }, [setShowConfig]);

    const handlePaletteModalToggle = useCallback(() => {
        setIsPaletteModalOpen(true);
    }, [setIsPaletteModalOpen]);

    const handleStyleModalToggle = useCallback(() => {
        setIsStyleModalOpen(true);
    }, [setIsStyleModalOpen]);

    const handleParticleModalToggle = useCallback(() => {
        setIsParticleModalOpen(true);
    }, [setIsParticleModalOpen]);

    const sidebarStyle = useMemo(() => ({
        ...uiStyle,
        transform: showConfig ? "translateX(0)" : "translateX(-100%)",
    }), [uiStyle, showConfig]);

    const modeToggleStyle = useMemo(() => ({
        background: isDarkMode ? "#1e293b" : "#e2e8f0",
        borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "#e2e8f0",
    }), [isDarkMode]);

    const modeSliderStyle = useMemo(() => ({
        left: isDarkMode ? "50%" : "4px",
        width: "calc(50% - 4px)",
        background: isDarkMode ? "#020617" : "#ffffff",
    }), [isDarkMode]);

    const buttonStyle = useMemo(() => ({
        background: "transparent",
        borderColor: semanticVars["--border-color"],
        color: semanticVars["--text-main"],
        borderRadius: styles[activeStyle].vars["--radius"],
        border: `1px solid ${semanticVars["--border-color"]}`,
        boxShadow: "none",
        fontFamily: fontDefs[activeFont].family,
    }), [semanticVars, styles, activeStyle, fontDefs, activeFont]);

    const labelStyle = useMemo(() => ({
        color: semanticVars["--text-main"],
    }), [semanticVars]);

    const lightButtonStyle = useMemo(() => ({
        color: !isDarkMode ? "#0f172a" : "#64748b",
    }), [isDarkMode]);

    const darkButtonStyle = useMemo(() => ({
        color: isDarkMode ? "#f8fafc" : "#64748b",
    }), [isDarkMode]);

    const particleName = useMemo(() => 
        particleOptions.find((p) => p.id === activeParticleMode)?.name || "Off",
        [particleOptions, activeParticleMode]
    );

    return (
        <>
            {/* MOBILE OVERLAY FOR CLICK-OUTSIDE-TO-CLOSE */}
            {showConfig && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={handleConfigClose}
                />
            )}

            {/* CONFIGURATOR SIDEBAR */}
            <div
                className={`
                    fixed top-0 left-0 h-full z-50 transition-transform duration-300 w-64 sm:w-72 md:w-80 max-w-[90vw] sm:max-w-[85vw] overflow-y-auto flex flex-col
                `}
                style={sidebarStyle}
            >
                <div className="p-6 space-y-8 flex-grow">
                    <div className="flex items-center justify-between">
                        <h3
                            className="font-bold flex items-center gap-2"
                            style={labelStyle}
                        >
                            <Settings size={18} style={labelStyle} /> Theme Engine
                        </h3>
                        <button
                            onClick={handleConfigClose}
                            className="p-2 rounded-full hover:bg-black/5"
                            style={labelStyle}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* 0. Mode Switcher */}
                    <div
                        className="p-1 rounded-full flex relative cursor-pointer border h-12"
                        style={modeToggleStyle}
                    >
                        <div
                            className="absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-300 z-0"
                            style={modeSliderStyle}
                        />
                        <button
                            onClick={() => handleModeToggle(false)}
                            className="flex-1 relative z-10 flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                            style={lightButtonStyle}
                        >
                            <Sun size={18} /> LIGHT
                        </button>
                        <button
                            onClick={() => handleModeToggle(true)}
                            className="flex-1 relative z-10 flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                            style={darkButtonStyle}
                        >
                            <Moon size={18} /> DARK
                        </button>
                    </div>

                    {/* 1. Palette Selector - TRIGGERS MODAL */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label
                                className="text-xs font-bold uppercase tracking-widest opacity-80"
                                style={labelStyle}
                            >
                                1. Palette
                            </label>
                        </div>
                        <button
                            onClick={handlePaletteModalToggle}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={buttonStyle}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-6 h-6 rounded-full border shadow-sm"
                                    style={{
                                        background: paletteDefs[activePalette].primary,
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
                        <label
                            className="text-xs font-bold uppercase tracking-widest mb-3 block"
                            style={labelStyle}
                        >
                            2. Style
                        </label>
                        <button
                            onClick={handleStyleModalToggle}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={buttonStyle}
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
                        <label
                            className="text-xs font-bold uppercase tracking-widest mb-3 block"
                            style={labelStyle}
                        >
                            3. Typography
                        </label>
                        <FontSelect
                            activeFont={activeFont}
                            setActiveFont={setActiveFont}
                            fontDefs={fontDefs}
                            systemVars={semanticVars}
                            styles={styles}
                            activeStyle={activeStyle}
                            isDarkMode={isDarkMode}
                            paletteDefs={paletteDefs}
                            activePalette={activePalette}
                        />
                    </div>

                    {/* 4. Particle Selector - TRIGGERS MODAL */}
                    <div>
                        <label
                            className="text-xs font-bold uppercase tracking-widest mb-3 block"
                            style={labelStyle}
                        >
                            4. Particle
                        </label>
                        <button
                            onClick={handleParticleModalToggle}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:shadow-md"
                            style={buttonStyle}
                        >
                            <div className="flex items-center gap-3">
                                <CurrentParticleIcon size={20} />
                                <span className="font-bold text-sm">
                                    {particleName}
                                </span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
});

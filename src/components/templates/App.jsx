import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Settings } from "lucide-react";
import { ParticleEngine } from "../organisms/ParticleEngine.jsx";
import { LoginCard } from "../molecules/LoginCard.jsx";
import { useTheme } from "../../hooks/useTheme.js";
import { usePaletteModal, useStyleModal, useParticleModal } from "../../hooks/useModal.js";
import { usePerformanceMonitor, useBundleSizeMonitor } from "../../hooks/usePerformanceMonitor.js";
import { ErrorBoundary } from "../ErrorBoundary.jsx";

// Import the actual functional components
import { SettingsPanel } from "../SettingsPanel.jsx";
import { PaletteModal, StyleModal, ParticleModal } from "../Modals.jsx";
import { styles } from "../StyleEngine.jsx";
import { paletteDefs } from "../ThemeEngine.jsx";
import { particleOptions } from "../ParticleSystem.jsx";

const App = React.memo(() => {
    const {
        activePalette,
        setActivePalette,
        activeStyle,
        setActiveStyle,
        activeFont,
        setActiveFont,
        isDarkMode,
        setIsDarkMode,
        previewVars,
        systemVars,
        fontVars,
        uiStyle,
        scrollbarThumbColor,
        scrollbarThumbHover,
        currentPalette,
        currentFont,
    } = useTheme();

    const {
        isOpen: isPaletteModalOpen,
        closeModal: closePaletteModal,
        toggleModal: togglePaletteModal,
    } = usePaletteModal();

    const {
        isOpen: isStyleModalOpen,
        closeModal: closeStyleModal,
        toggleModal: toggleStyleModal,
    } = useStyleModal();

    const {
        isOpen: isParticleModalOpen,
        closeModal: closeParticleModal,
        toggleModal: toggleParticleModal,
    } = useParticleModal();

    // Performance monitoring
    usePerformanceMonitor('App');
    useBundleSizeMonitor();

    const [showConfig, setShowConfig] = useState(true);
    const [activeParticleMode, setActiveParticleMode] = useState("pulse");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Memoize responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setShowConfig(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setShowConfig]);

    // Memoize computed styles for better performance
    const computedStyles = useMemo(() => ({
        ...previewVars,
        ...fontVars,
        ...styles[activeStyle].vars,
        ...(styles[activeStyle].dynamicVars && styles[activeStyle].dynamicVars(isDarkMode)),
        // Performance optimizations for glassmorphism
        ...(activeStyle === 'glassmorphism' && {
            '--backdrop': isMobile ? 'blur(4px) saturate(100%)' : styles[activeStyle].vars['--backdrop'],
            'willChange': 'backdrop-filter',
            'transform': 'translateZ(0)' // Hardware acceleration
        })
    }), [previewVars, fontVars, activeStyle, isDarkMode, isMobile]);

    // Memoize font loading style string
    const fontLoadingStyle = useMemo(() => `
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
        /* Additional fonts loaded dynamically as needed */
        @font-face {
            font-family: 'Chicago';
            src: local('Chicago'), local('System'), sans-serif;
            font-weight: normal;
            font-style: normal;
        }

        @keyframes subtle-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
        }
    `, [scrollbarThumbColor, scrollbarThumbHover]);

    // Memoize modal close handlers
    const handlePaletteModalClose = useCallback(() => {
        closePaletteModal();
    }, [closePaletteModal]);

    const handleStyleModalClose = useCallback(() => {
        closeStyleModal();
    }, [closeStyleModal]);

    const handleParticleModalClose = useCallback(() => {
        closeParticleModal();
    }, [closeParticleModal]);

    const handleConfigToggle = useCallback((open) => {
        open ? togglePaletteModal() : closePaletteModal();
    }, [togglePaletteModal, closePaletteModal]);

    return (
        <ErrorBoundary>
            <div
                className="min-h-screen w-full relative overflow-hidden flex font-sans transition-colors duration-500"
                style={computedStyles}
            >
                <style>
                    {fontLoadingStyle}
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
                        activeStyle={activeStyle}
                    />

                    {/* Background effects based on style - optimized for performance */}
                    {(activeStyle === "glassmorphism" ||
                        activeStyle === "aurora") && (
                        <>
                            <div
                                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[40px] transition-opacity duration-1000"
                                style={{
                                    background: isDarkMode ? "var(--logo-glow)" : "var(--accent)",
                                    animation: "subtle-pulse 4s ease-in-out infinite"
                                }}
                            />
                            <div
                                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[40px] transition-opacity duration-1000"
                                style={{
                                    background: isDarkMode ? "var(--accent)" : "var(--logo-glow)",
                                    animation: "subtle-pulse 4s ease-in-out infinite 2s"
                                }}
                            />
                        </>
                    )}
                </div>

                {/* CONTENT LAYER - FIXED WITH FLEX-GROW */}
                <div className={`flex-grow relative z-10 flex items-center justify-center p-4 transition-all duration-300 ${
                    showConfig ? "md:pl-80" : ""
                }`}>
                    <LoginCard
                        forceContrast={styles[activeStyle].forceContrast}
                        activeStyle={activeStyle}
                    />
                </div>

                {/* SETTINGS PANEL - FIXED POSITIONED SIDEBAR */}
                <SettingsPanel
                    showConfig={showConfig}
                    activeStyle={activeStyle}
                    setActiveStyle={setActiveStyle}
                    activePalette={activePalette}
                    setActivePalette={setActivePalette}
                    activeFont={activeFont}
                    setActiveFont={setActiveFont}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    activeParticleMode={activeParticleMode}
                    setActiveParticleMode={setActiveParticleMode}
                    isPaletteModalOpen={isPaletteModalOpen}
                    setIsPaletteModalOpen={handleConfigToggle}
                    isStyleModalOpen={isStyleModalOpen}
                    setIsStyleModalOpen={(open) => open ? toggleStyleModal() : closeStyleModal()}
                    isParticleModalOpen={isParticleModalOpen}
                    setIsParticleModalOpen={(open) => open ? toggleParticleModal() : closeParticleModal()}
                    particleOptions={particleOptions}
                    paletteDefs={paletteDefs}
                    styles={styles}
                    systemVars={systemVars}
                    uiStyle={uiStyle}
                    setShowConfig={setShowConfig}
                />

                {/* FLOATING TOGGLE */}
                {!showConfig && (
                    <button
                        onClick={() => setShowConfig(true)}
                        className="fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 sm:p-3 md:p-4"
                        style={{
                            background: paletteDefs[activePalette].primary,
                            color: paletteDefs[activePalette].fgForce ||
                                   (paletteDefs[activePalette].isDark ? "#ffffff" : "#000000"),
                            backdropFilter: activeStyle === 'glassmorphism' ? 'blur(12px)' : 'none',
                            border: activeStyle === 'glassmorphism' ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}` : 'none',
                        }}
                    >
                        <Settings size={24} />
                        <span className="font-bold text-sm pr-1 hidden md:block">
                            CUSTOMIZE
                        </span>
                    </button>
                )}

                {/* MODALS */}
                <PaletteModal
                    isOpen={isPaletteModalOpen}
                    onClose={handlePaletteModalClose}
                    activePalette={activePalette}
                    setActivePalette={setActivePalette}
                    systemVars={systemVars}
                    paletteDefs={paletteDefs}
                    activeStyle={activeStyle}
                    styles={styles}
                    isDarkMode={isDarkMode}
                />

                <StyleModal
                    isOpen={isStyleModalOpen}
                    onClose={handleStyleModalClose}
                    activeStyle={activeStyle}
                    setActiveStyle={setActiveStyle}
                    systemVars={systemVars}
                    paletteDefs={paletteDefs}
                    activePalette={activePalette}
                    styles={styles}
                    isDarkMode={isDarkMode}
                />

                <ParticleModal
                    isOpen={isParticleModalOpen}
                    onClose={handleParticleModalClose}
                    activeParticleMode={activeParticleMode}
                    setActiveParticleMode={setActiveParticleMode}
                    systemVars={systemVars}
                    paletteDefs={paletteDefs}
                    activePalette={activePalette}
                    activeStyle={activeStyle}
                    styles={styles}
                    particleOptions={particleOptions}
                    isDarkMode={isDarkMode}
                />
            </div>
        </ErrorBoundary>
    );
});

export default App;
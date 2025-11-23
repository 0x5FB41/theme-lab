import React, { useState, useEffect } from "react";
import { ParticleEngine } from "../organisms/ParticleEngine.jsx";
import { LoginCard } from "../molecules/LoginCard.jsx";
import { useTheme } from "../../hooks/useTheme.js";
import { usePaletteModal, useStyleModal, useParticleModal } from "../../hooks/useModal.js";

// Import the actual functional components
import { SettingsPanel } from "../SettingsPanel.jsx";
import { PaletteModal, StyleModal, ParticleModal } from "../Modals.jsx";
import { styles } from "../StyleEngine.jsx";
import { paletteDefs } from "../ThemeEngine.jsx";
import { particleOptions } from "../ParticleSystem.jsx";

export default function App() {
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

    const [showConfig, setShowConfig] = useState(true);
    const [activeParticleMode, setActiveParticleMode] = useState("pulse");

    useEffect(() => {
        if (window.innerWidth < 768) setShowConfig(false);
    }, []);

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

                {/* Background effects based on style */}
                {(activeStyle === "glassmorphism" ||
                    activeStyle === "aurora") && (
                    <>
                        <div
                            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[100px] animate-pulse"
                            style={{ background: "var(--logo-glow)" }}
                        />
                        <div
                            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[100px] animate-pulse delay-700"
                            style={{ background: "var(--accent)" }}
                        />
                    </>
                )}
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <LoginCard
                    forceContrast={false}
                    activeStyle={activeStyle}
                />
            </div>

            {/* SETTINGS PANEL */}
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
                setIsPaletteModalOpen={(open) => open ? togglePaletteModal() : closePaletteModal()}
                isStyleModalOpen={isStyleModalOpen}
                setIsStyleModalOpen={(open) => open ? toggleStyleModal() : closeStyleModal()}
                isParticleModalOpen={isParticleModalOpen}
                setIsParticleModalOpen={(open) => open ? toggleParticleModal() : closeParticleModal()}
                particleOptions={particleOptions}
                paletteDefs={paletteDefs}
                styles={styles}
                systemVars={systemVars}
                setShowConfig={setShowConfig}
            />

            {/* CUSTOMIZE BUTTON - Only show when settings panel is hidden */}
            {!showConfig && (
                <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="fixed bottom-6 left-6 px-4 py-3 rounded-lg border transition-all hover:shadow-md z-20"
                    style={{
                        background: "var(--bg-panel)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        borderRadius: styles[activeStyle].vars["--radius"],
                        border: styles[activeStyle].vars["--border"],
                        boxShadow: styles[activeStyle].vars["--shadow"],
                        fontFamily: styles[activeStyle].vars["--font-family"],
                    }}
                >
                    <span className="font-medium">⚙️ Customize</span>
                </button>
            )}

            {/* MODALS */}
            <PaletteModal
                isOpen={isPaletteModalOpen}
                onClose={closePaletteModal}
                activePalette={activePalette}
                setActivePalette={setActivePalette}
                activeStyle={activeStyle}
                styles={styles}
                paletteDefs={paletteDefs}
                isDarkMode={isDarkMode}
            />

            <StyleModal
                isOpen={isStyleModalOpen}
                onClose={closeStyleModal}
                activeStyle={activeStyle}
                setActiveStyle={setActiveStyle}
                systemVars={systemVars}
                styles={styles}
                isDarkMode={isDarkMode}
            />

            <ParticleModal
                isOpen={isParticleModalOpen}
                onClose={closeParticleModal}
                activeParticleMode={activeParticleMode}
                setActiveParticleMode={setActiveParticleMode}
                particleOptions={particleOptions}
                isDarkMode={isDarkMode}
            />
        </div>
    );
}
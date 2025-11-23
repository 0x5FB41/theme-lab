import React, { useState, useEffect, useCallback } from "react";
import { X, Search, Layout, Sparkles } from "lucide-react";
import { getAdaptiveModalStyle } from './StyleEngine.jsx';

// PALETTE MODAL WITH FIXED TEXT CONTRAST
export const PaletteModal = ({
    isOpen,
    onClose,
    activePalette,
    setActivePalette,
    systemVars,
    paletteDefs,
    activeStyle,
    styles,
    isDarkMode,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Handle backdrop click - only close if clicking directly on backdrop
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

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
            onClick={handleBackdropClick}
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
                            : "rgba(0,0,0,0.1)",
                    }}
                >
                    <div className="flex items-center gap-3 w-full max-w-md">
                        <Search size={20} style={{ opacity: 0.5 }} />
                        <input
                            type="text"
                            placeholder="Search palettes..."
                            className="w-full bg-transparent outline-none text-lg font-medium placeholder-opacity-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                color: textColor,
                                placeholderColor: `${textColor}88`
                            }}
                        />
                    </div>
                    <button
                        onClick={onClose}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        style={{
                            color: textColor,
                            touchAction: 'manipulation'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    {Object.entries(groupedPalettes).map((
                        [category, palettes],
                    ) => (
                        <div key={category} className="mb-8 last:mb-0">
                            <h3
                                className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4 border-b border-current pb-1 inline-block"
                                style={{ color: textColor }}
                            >
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
                                                    ? (p.type === "gradient"
                                                        ? p.primary
                                                        : p.primary)
                                                    : "transparent",
                                                backgroundClip: p.type === "gradient" ? "padding-box" : "border-box",
                                                WebkitBackgroundClip: p.type === "gradient" ? "padding-box" : "border-box",
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
                                                    backgroundClip: p.type === "gradient" ? "padding-box" : "border-box",
                                                    WebkitBackgroundClip: p.type === "gradient" ? "padding-box" : "border-box",
                                                    border: p.type === "gradient"
                                                        ? "1px solid rgba(255,255,255,0.2)"
                                                        : "1px solid rgba(0,0,0,0.1)",
                                                }}
                                            />
                                            <div className="text-center w-full overflow-hidden">
                                                <div className="text-xs truncate" style={{ color: 'inherit' }}>
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

// STYLE MODAL WITH FIXED TEXT CONTRAST
export const StyleModal = ({
    isOpen,
    onClose,
    activeStyle,
    setActiveStyle,
    systemVars,
    paletteDefs,
    activePalette,
    styles,
    isDarkMode,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Handle backdrop click - only close if clicking directly on backdrop
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filteredStyles = Object.entries(styles).filter(([key, def]) => {
        if (searchQuery && !def.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

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
            onClick={handleBackdropClick}
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
                            : "rgba(0,0,0,0.1)",
                    }}
                >
                    <div className="flex items-center gap-3 w-full">
                        <Search size={20} style={{ opacity: 0.5 }} />
                        <input
                            type="text"
                            placeholder="Search styles..."
                            className="w-full bg-transparent outline-none text-lg font-medium placeholder-opacity-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                color: textColor,
                                placeholderColor: `${textColor}88`
                            }}
                        />
                    </div>
                    <button
                        onClick={onClose}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        style={{
                            color: textColor,
                            touchAction: 'manipulation'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredStyles.map(([key, style]) => {
                            const Icon = style.icon;
                            const isActive = activeStyle === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveStyle(key);
                                        onClose();
                                    }}
                                    className={`p-4 rounded-xl border transition-all group ${
                                        isActive
                                            ? "ring-2 ring-current shadow-lg scale-105 font-bold"
                                            : "border-transparent hover:bg-white/10 hover:border-current/20"
                                    }`}
                                    style={{
                                        background: isActive
                                            ? "var(--accent)"
                                            : "transparent",
                                        color: isActive
                                            ? (paletteDefs[activePalette]?.fgForce ||
                                                (paletteDefs[activePalette]?.isDark
                                                    ? "#fff"
                                                    : "#000"))
                                            : textColor,
                                        borderColor: isActive
                                            ? "var(--accent)"
                                            : systemVars["--sys-border"],
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-2 mb-2">
                                        <Icon size={24} style={{ color: 'inherit' }} />
                                        <span className="font-semibold text-center" style={{ color: 'inherit' }}>
                                            {style.name}
                                        </span>
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

// PARTICLE MODAL WITH FIXED TEXT CONTRAST
export const ParticleModal = ({
    isOpen,
    onClose,
    activeParticleMode,
    setActiveParticleMode,
    particleOptions,
    systemVars,
    paletteDefs,
    activePalette,
    activeStyle,
    styles,
    isDarkMode,
}) => {
    // Handle backdrop click - only close if clicking directly on backdrop
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

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
            onClick={handleBackdropClick}
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
                            : "rgba(0,0,0,0.1)",
                    }}
                >
                    <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: textColor }}>
                        <Sparkles size={24} /> Select Particle
                    </h2>
                    <button
                        onClick={onClose}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        style={{
                            color: textColor,
                            touchAction: 'manipulation'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {particleOptions.map((option) => {
                            const Icon = option.icon;
                            const isActive = activeParticleMode === option.id;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setActiveParticleMode(option.id);
                                        onClose();
                                    }}
                                    className={`p-3 rounded-xl border transition-all group ${
                                        isActive
                                            ? "ring-2 ring-current shadow-lg scale-105 font-bold"
                                            : "border-transparent hover:bg-white/10 hover:border-current/20"
                                    }`}
                                    style={{
                                        background: isActive
                                            ? "var(--accent)"
                                            : "transparent",
                                        color: isActive
                                            ? (paletteDefs[activePalette]?.fgForce ||
                                                (paletteDefs[activePalette]?.isDark
                                                    ? "#fff"
                                                    : "#000"))
                                            : textColor,
                                        borderColor: isActive
                                            ? "var(--accent)"
                                            : systemVars["--sys-border"],
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon size={24} style={{ color: 'inherit' }} />
                                        <span className="text-xs font-medium text-center" style={{ color: 'inherit' }}>
                                            {option.name}
                                        </span>
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
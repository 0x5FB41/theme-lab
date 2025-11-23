import {
    Ghost, Box, Layers, Zap, Terminal, Gamepad2, CloudRain, Leaf, Command, ZapOff, Globe, Cpu,
    Lightbulb, Scan, Square, Circle, Hash, Triangle, FileText, Grid, Droplet, HeartCrack, Disc,
    Star, Activity, Network, FileCode, Snowflake, Sparkles, Flame, Dna, Grip
} from "lucide-react";

export const styles = {
    glassmorphism: {
        name: 'Glassmorphism',
        icon: Ghost,
        vars: {
            '--radius': '24px',
            '--border': '1px solid var(--border-color)',
            '--shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            '--backdrop': 'blur(8px) saturate(120%)',
            '--bg-panel-override': 'rgba(255, 255, 255, 0.05)',
            '--btn-radius': '12px'
        },
        isGlass: true
    },
    neumorphism: {
        name: 'Neumorphism',
        icon: Box,
        vars: {
            '--radius': '20px',
            '--border': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--shadow': 'var(--neu-shadow)',
            '--backdrop': 'none',
            '--btn-radius': '12px'
        },
        dynamicVars: (isDark) => ({
            '--neu-shadow': isDark ? '5px 5px 10px #0b1221, -5px -5px 10px #1a2842' : '9px 9px 18px #d1d5db, -9px -9px 18px #ffffff'
        })
    },
    frutigerAero: {
        name: 'Frutiger Aero',
        icon: CloudRain,
        vars: {
            '--radius': '18px',
            '--border': '1px solid rgba(255, 255, 255, 0.5)',
            '--shadow': '0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
            '--backdrop': 'blur(15px)',
            '--bg-panel-override': 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 51%, rgba(255,255,255,0.8) 100%)',
            '--btn-radius': '24px',
            '--text-main': '#0f172a',
            '--input-bg': 'rgba(255,255,255,0.7)'
        },
        isGlass: true,
        forceContrast: true
    },
    solarpunkStyle: {
        name: 'Solarpunk',
        icon: Flame,
        vars: {
            '--radius': '24px 4px 24px 4px',
            '--border': '2px solid var(--primary)',
            '--shadow': '0 10px 20px -5px var(--primary)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '16px 4px 16px 4px'
        }
    },
    system7: {
        name: 'System 7',
        icon: Command,
        vars: {
            '--radius': '2px',
            '--border': '2px solid black',
            '--shadow': '4px 4px 0px black',
            '--backdrop': 'none',
            '--bg-panel-override': '#ffffff',
            '--text-main': '#000000',
            '--text-muted': '#333333',
            '--btn-radius': '2px',
            '--input-bg': '#ffffff',
            '--font-family': '"Chicago", sans-serif'
        },
        forcedScheme: 'light',
        forceContrast: true
    },
    glitch: {
        name: 'Glitch',
        icon: ZapOff,
        vars: {
            '--radius': '0px',
            '--border': '1px solid var(--text-main)',
            '--shadow': '3px 3px 0px rgba(255, 0, 0, 0.7), -3px -3px 0px rgba(0, 255, 255, 0.7)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '0px',
            '--btn-border': '2px solid var(--text-main)',
            '--clip-path': 'polygon(5% 0, 100% 0, 100% 90%, 95% 100%, 0 100%, 0 10%)',
            '--transform': 'skew(-1deg)'
        },
        forcedScheme: 'dark',
        forceContrast: true
    },
    chrome: {
        name: 'Y2K Chrome',
        icon: Globe,
        vars: {
            '--radius': '16px',
            '--border': '1px solid rgba(255,255,255,0.6)',
            '--shadow': '0 15px 35px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.5)',
            '--backdrop': 'blur(5px)',
            '--bg-panel-override': 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 51%, rgba(255,255,255,0.4) 100%)',
            '--btn-radius': '99px',
            '--input-bg': 'rgba(255,255,255,0.4)',
            '--text-main': '#000000',
            '--text-muted': '#333333'
        },
        forceContrast: true
    },
    cyberdeck: {
        name: 'Cyberdeck',
        icon: Cpu,
        vars: {
            '--radius': '2px',
            '--border': '1px solid var(--primary)',
            '--shadow': '0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.2)',
            '--backdrop': 'blur(10px)',
            '--bg-panel-override': 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.98) 100%)',
            '--btn-radius': '2px',
            '--clip-path': 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            '--input-bg': 'rgba(0,0,0,0.5)'
        },
        forcedScheme: 'dark',
        forceContrast: true
    },
    neon: {
        name: 'Neon',
        icon: Lightbulb,
        vars: {
            '--radius': '12px',
            '--border': '2px solid var(--accent)',
            '--shadow': '0 0 15px var(--accent), inset 0 0 15px var(--accent)',
            '--backdrop': 'blur(5px)',
            '--bg-panel-override': 'rgba(0, 0, 0, 0.8)',
            '--btn-radius': '8px',
            '--text-main': '#ffffff',
            '--text-muted': '#aaaaaa'
        },
        forcedScheme: 'dark',
        forceContrast: true
    },
    slab: {
        name: 'Slab',
        icon: Square,
        vars: {
            '--radius': '0px',
            '--border': '8px solid var(--text-main)',
            '--shadow': '12px 12px 0px var(--primary)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '0px'
        }
    },
    holographic: {
        name: 'Holographic',
        icon: Scan,
        vars: {
            '--radius': '16px',
            '--border': '1px solid rgba(255, 255, 255, 0.3)',
            '--shadow': '0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(255, 0, 255, 0.1)',
            '--backdrop': 'blur(20px) hue-rotate(15deg)',
            '--bg-panel-override': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            '--btn-radius': '8px'
        },
        isGlass: true,
        forcedScheme: 'dark'
    },
    acrylic: {
        name: 'Acrylic (Win11)',
        icon: Layers,
        vars: {
            '--radius': '8px',
            '--border': '1px solid var(--border-color)',
            '--shadow': '0 4px 24px -1px rgba(0,0,0,0.1)',
            '--backdrop': 'blur(20px) saturate(120%)',
            '--bg-panel-override': 'rgba(255, 255, 255, 0.3)',
            '--btn-radius': '4px'
        },
        isGlass: true
    },
    gameboy: {
        name: 'Gameboy',
        icon: Gamepad2,
        vars: {
            '--radius': '10px 10px 40px 10px',
            '--border': '3px solid rgba(0,0,0,0.2)',
            '--shadow': '5px 5px 15px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.1), inset -2px -2px 5px rgba(0,0,0,0.2)',
            '--backdrop': 'none',
            '--btn-radius': '50px',
            '--font-family': '"Press Start 2P", monospace',
            '--input-bg': '#9bbc0f',
            '--input-text': '#0f380f',
            '--placeholder-color': 'rgba(15, 56, 15, 0.75)',
            '--shadow-input': 'inset 2px 2px 4px rgba(0,0,0,0.6)',
            '--btn-sec-bg': '#9bbc0f',
            '--btn-sec-text': '#0f380f',
            '--btn-sec-border': 'none',
            '--btn-sec-shadow': 'inset 2px 2px 4px rgba(0,0,0,0.6)'
        },
        forcedScheme: 'light',
        forceContrast: true
    },
    retro95: {
        name: 'Retro 95',
        icon: Terminal,
        vars: {
            '--radius': '0px',
            '--border': '2px solid transparent',
            '--shadow': 'inset 2px 2px 0px #ffffff, inset -2px -2px 0px #000000',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--retro-bg)',
            '--text-main': 'var(--retro-text)',
            '--text-muted': 'var(--retro-text-muted)',
            '--btn-radius': '0px',
            '--input-bg': 'var(--bg-panel)'
        },
        dynamicVars: (isDark) => ({
            '--retro-bg': isDark ? '#374151' : '#c0c0c0',
            '--retro-text': isDark ? '#ffffff' : '#000000',
            '--retro-text-muted': isDark ? '#d1d5db' : '#404040'
        })
    },
    claymorphism: {
        name: 'Claymorphism',
        icon: Circle,
        vars: {
            '--radius': '32px',
            '--border': 'none',
            '--shadow': '12px 12px 24px rgba(0,0,0,0.1), inset -8px -8px 8px rgba(0,0,0,0.05), inset 8px 8px 16px rgba(255,255,255,0.4)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '24px'
        }
    },
    skeuomorphism: {
        name: 'Skeuomorphism',
        icon: Layers,
        vars: {
            '--radius': '12px',
            '--border': '1px solid var(--border-color)',
            '--shadow': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)',
            '--backdrop': 'none',
            '--bg-panel-override': 'linear-gradient(to bottom, var(--bg-panel), var(--bg-app))',
            '--btn-radius': '6px'
        }
    },
    flat2: {
        name: 'Flat 2.0',
        icon: Square,
        vars: {
            '--radius': '8px',
            '--border': '1px solid var(--border-color)',
            '--shadow': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '6px'
        }
    },
    materialYou: {
        name: 'Material You',
        icon: Circle,
        vars: {
            '--radius': '28px',
            '--border': 'none',
            '--shadow': '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '999px'
        }
    },
    neobrutalism: {
        name: 'Neo-Brutalism',
        icon: Hash,
        vars: {
            '--radius': '0px',
            '--border': '3px solid var(--text-main)',
            '--shadow': '6px 6px 0px 0px var(--text-main)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '0px'
        }
    },
    brutalist: {
        name: 'Brutalist (Raw)',
        icon: Hash,
        vars: {
            '--radius': '0px',
            '--border': '1px solid var(--text-main)',
            '--shadow': 'none',
            '--backdrop': 'none',
            '--bg-panel-override': 'transparent',
            '--btn-radius': '0px',
            '--font-family': '"Courier New", monospace',
            '--input-bg': 'transparent'
        }
    },
    bauhaus: {
        name: 'Bauhaus',
        icon: Triangle,
        vars: {
            '--radius': '0px',
            '--border': '4px solid var(--text-main)',
            '--shadow': '10px 10px 0px 0px var(--primary)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '100px',
            '--input-bg': 'var(--bg-app)'
        }
    },
    aurora: {
        name: 'Aurora',
        icon: Zap,
        vars: {
            '--radius': '24px',
            '--border': '1px solid rgba(255,255,255,0.1)',
            '--shadow': '0 0 60px -5px var(--accent)',
            '--backdrop': 'blur(40px)',
            '--bg-panel-override': 'rgba(0,0,0,0.3)',
            '--btn-radius': '16px'
        },
        isGlass: true
    },
    vaporwave: {
        name: 'Vaporwave',
        icon: HeartCrack,
        vars: {
            '--radius': '0px',
            '--border': '2px solid var(--accent)',
            '--shadow': '0 0 15px var(--accent)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--vapor-bg)',
            '--text-main': 'var(--vapor-text)',
            '--clip-path': 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
            '--btn-radius': '0px'
        },
        dynamicVars: (isDark) => ({
            '--vapor-bg': isDark ? '#2b213a' : '#ffffff',
            '--vapor-text': isDark ? '#ff71ce' : '#000000'
        })
    },
    bento: {
        name: 'Bento Grid',
        icon: Grid,
        vars: {
            '--radius': '32px',
            '--border': '1px solid var(--border-color)',
            '--shadow': '0 4px 12px rgba(0,0,0,0.03)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '16px'
        }
    },
    minimalism: {
        name: 'Minimalism',
        icon: Droplet,
        vars: {
            '--radius': '0px',
            '--border': '2px solid var(--border-color)',
            '--shadow': 'none',
            '--backdrop': 'none',
            '--bg-panel-override': 'transparent',
            '--btn-radius': '0px'
        }
    },
    terminal: {
        name: 'Terminal',
        icon: Terminal,
        vars: {
            '--radius': '0px',
            '--border': '1px solid var(--accent)',
            '--shadow': '0 0 15px var(--accent)',
            '--backdrop': 'none',
            '--bg-panel-override': '#000000',
            '--text-main': 'var(--accent)',
            '--text-muted': 'var(--accent)',
            '--input-bg': '#000000',
            '--btn-radius': '0px',
            '--font-family': '"Fira Code", monospace'
        },
        forcedScheme: 'dark',
        forceContrast: true
    },
    paper: {
        name: 'Paper Sketch',
        icon: FileText,
        vars: {
            '--radius': '255px 15px 225px 15px / 15px 225px 15px 255px',
            '--border': '2px solid var(--text-main)',
            '--shadow': '2px 3px 0px rgba(0,0,0,0.1)',
            '--backdrop': 'none',
            '--bg-panel-override': 'var(--bg-panel)',
            '--btn-radius': '255px 15px 225px 15px / 15px 225px 15px 255px'
        }
    }
};

export const getAdaptiveModalStyle = (() => {
    // Cache for computed styles to avoid recalculation
    const styleCache = new Map();
    const maxCacheSize = 50;

    return (
        activeStyle,
        systemVars,
        paletteDefs,
        activePalette,
        styles,
        isDarkMode,
    ) => {
        // Create cache key
        const cacheKey = `${activeStyle}-${activePalette}-${isDarkMode}-${JSON.stringify(systemVars)}`;
        
        // Check cache first
        if (styleCache.has(cacheKey)) {
            return styleCache.get(cacheKey);
        }

        const currentStyleVars = styles[activeStyle].vars;
        const forceDark = styles[activeStyle].forcedScheme === 'dark';
        const forceLight = styles[activeStyle].forcedScheme === 'light';

        // Memoized helper function to calculate contrasting text color
        const getContrastingTextColor = ((bgColor, isDarkForced, isLightForced, defaultDarkText, defaultLightText) => {
            if (isDarkForced) return '#ffffff';
            if (isLightForced) return '#0f172a';

            // Handle null/undefined background colors
            if (!bgColor) {
                return isDarkMode ? '#ffffff' : '#000000';
            }

            // Optimized luminance calculation with lookup for common colors
            const commonColors = {
                '#ffffff': 1.0, '#fff': 1.0, '#000000': 0.0, '#000': 0.0,
                '#f8fafc': 0.98, '#1f2937': 0.18, '#111827': 0.11, '#f9fafb': 0.98
            };

            if (commonColors[bgColor.toLowerCase()]) {
                return commonColors[bgColor.toLowerCase()] > 0.5 ? '#0f172a' : '#ffffff';
            }

            // Handle hex colors
            if (bgColor.startsWith('#')) {
                const hex = bgColor.slice(1);
                if (hex.length === 3) {
                    const r = parseInt(hex[0] + hex[0], 16) / 255;
                    const g = parseInt(hex[1] + hex[1], 16) / 255;
                    const b = parseInt(hex[2] + hex[2], 16) / 255;
                    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 0.5 ? '#0f172a' : '#ffffff';
                } else if (hex.length === 6) {
                    const r = parseInt(hex.substr(0, 2), 16) / 255;
                    const g = parseInt(hex.substr(2, 2), 16) / 255;
                    const b = parseInt(hex.substr(4, 2), 16) / 255;
                    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 0.5 ? '#0f172a' : '#ffffff';
                }
            }

            // Handle rgba colors
            if (bgColor.includes('rgba')) {
                const matches = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (matches) {
                    const r = parseInt(matches[1]) / 255;
                    const g = parseInt(matches[2]) / 255;
                    const b = parseInt(matches[3]) / 255;
                    const a = matches[4] ? parseFloat(matches[4]) : 1;
                    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                    return (luminance * a + (1 - a) * 1.0) > 0.5 ? '#0f172a' : '#ffffff';
                }
            }

            // Fallback for complex strings
            return 0.5 > 0.5 ? '#0f172a' : '#ffffff';
        });

        // Optimized style calculation with lookup table for common combinations
        const getStyleConfig = (style, darkMode) => {
            const configs = {
                'glassmorphism': { 
                    lightBg: 'rgba(255, 255, 255, 0.6)', 
                    darkBg: 'rgba(0, 0, 0, 0.6)' 
                },
                'holographic': { 
                    lightBg: 'rgba(255, 255, 255, 0.6)', 
                    darkBg: 'rgba(0, 0, 0, 0.6)' 
                },
                'acrylic': { 
                    lightBg: 'rgba(255, 255, 255, 0.6)', 
                    darkBg: 'rgba(0, 0, 0, 0.6)' 
                },
                'neon': { bg: 'rgba(0, 0, 0, 0.95)', text: '#ffffff' },
                'cyberdeck': { bg: 'rgba(0, 0, 0, 0.95)', text: '#ffffff' },
                'terminal': { bg: '#000000', text: '#00ff00' },
                'minimalism': { 
                    lightBg: 'rgba(255,255,255,0.8)', 
                    darkBg: 'rgba(0,0,0,0.8)' 
                },
                'brutalist': { bg: systemVars['--sys-bg'] },
                'claymorphism': { 
                    lightBg: '#f8fafc', 
                    darkBg: '#1e293b' 
                },
                'retro95': { 
                    lightBg: '#c0c0c0', 
                    darkBg: '#374151' 
                },
                'neumorphism': { 
                    lightBg: '#ffffff', 
                    darkBg: '#0f172a' 
                }
            };

            const config = configs[style];
            if (config) {
                if (config.bg) {
                    return { bg: config.bg, text: config.text || (darkMode ? '#ffffff' : '#000000') };
                }
                return { 
                    bg: darkMode ? config.darkBg : config.lightBg, 
                    text: null // Calculate dynamically
                };
            }

            // Default for other styles
            return { 
                bg: darkMode ? '#1f2937' : '#ffffff', 
                text: null 
            };
        };

        const config = getStyleConfig(activeStyle, isDarkMode);
        let bgOverride = config.bg;
        let modalTextColor = config.text;

        // Special cases that need more complex handling
        if (activeStyle === 'frutigerAero') {
            bgOverride = isDarkMode ? 'rgba(200, 220, 240, 0.85)' : styles.frutigerAero.vars['--bg-panel-override'];
            modalTextColor = '#0f172a';
        } else if (activeStyle === 'gameboy') {
            bgOverride = paletteDefs[activePalette].primary;
            const gameboyPalette = paletteDefs[activePalette];
            modalTextColor = gameboyPalette.fgForce || (gameboyPalette.isDark ? '#ffffff' : '#000000');
        } else if (activeStyle === 'aurora') {
            bgOverride = styles.aurora.vars['--bg-panel-override'];
            modalTextColor = '#ffffff';
        } else if (!modalTextColor) {
            modalTextColor = getContrastingTextColor(bgOverride, forceDark, forceLight, systemVars['--sys-text'], systemVars['--sys-text']);
        }

        // Apply forced scheme overrides if specified
        if (forceDark) modalTextColor = '#ffffff';
        if (forceLight) modalTextColor = '#0f172a';

        const result = {
            style: {
                ...currentStyleVars,
                '--bg-panel-override': bgOverride,
                '--backdrop': styles[activeStyle].vars['--backdrop'] || 'blur(10px)',
            },
            textColor: modalTextColor
        };

        // Cache the result (limit cache size)
        if (styleCache.size >= maxCacheSize) {
            const firstKey = styleCache.keys().next().value;
            styleCache.delete(firstKey);
        }
        styleCache.set(cacheKey, result);

        return result;
    };
})();;;
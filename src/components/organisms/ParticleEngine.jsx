import React, { useEffect, useRef } from "react";

export const ParticleEngine = ({ mode, accentColor, isDarkMode, paletteName, activeStyle }) => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef();
    const lastFrameTime = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || mode === "off") return;

        const ctx = canvas.getContext("2d", {
            alpha: false,
            desynchronized: true, // Better performance and smoother rendering
            willReadFrequently: false // Optimization since we don't read pixels back
        });

        let particles = [];

        // Enable maximum quality image smoothing for smooth graphics rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Set better canvas rendering hints for smooth graphics
        ctx.textRenderingOptimization = 'optimizeLegibility';
        ctx.textBaseline = 'top';

        // Default accent fallback
        const mainColor = accentColor || (isDarkMode ? 'rgba(100, 255, 218, 0.5)' : '#64748b');
        const contrastColor = mainColor;

        const resize = () => {
            // Always use full screen for better Matrix experience
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.transform = 'none';
        };

        // --- OPTIMIZED MATRIX PARTICLE ---
        class MatrixColumn {
            constructor(x, fontSize) {
                this.x = x;
                this.fontSize = fontSize;
                const isMobile = window.innerWidth < 768;

                // Mobile-optimized settings
                this.speed = Math.random() * 3 + (isMobile ? 8 : 6);
                this.trailLength = isMobile ?
                    Math.floor(Math.random() * 8 + 12) : // Shorter trails on mobile
                    Math.floor(Math.random() * 15 + 20); // Longer trails on desktop

                this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
                this.katakanaChars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";

                // Pre-generate trail for performance
                this.trail = new Array(this.trailLength);
                this.trailOpacity = new Array(this.trailLength);

                for (let i = 0; i < this.trailLength; i++) {
                    this.trail[i] = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
                    this.trailOpacity[i] = i === 0 ? 1.0 : (1 - (i / this.trailLength)) * 0.6;
                }

                this.y = Math.random() * -canvas.height;
                this.frame = 0;
                this.changeRate = Math.floor(Math.random() * (isMobile ? 12 : 8)) + (isMobile ? 6 : 4);

                // Cache katakana character for head to avoid random generation on every draw
                this.currentHeadChar = this.katakanaChars.charAt(Math.floor(Math.random() * this.katakanaChars.length));
                this.headChangeCounter = 0;
            }

            update() {
                this.y += this.speed;
                this.frame++;

                // Reset if entire trail has passed
                if (this.y - (this.trailLength * this.fontSize) > canvas.height) {
                    this.y = Math.random() * -100;
                }

                // Update characters less frequently
                if (this.frame % this.changeRate === 0) {
                    const idx = Math.floor(Math.random() * this.trailLength);
                    this.trail[idx] = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
                    // Update opacity for new character
                    this.trailOpacity[idx] = idx === 0 ? 1.0 : (1 - (idx / this.trailLength)) * 0.5;
                }

                // Update head character less frequently to avoid random generation
                this.headChangeCounter++;
                if (this.headChangeCounter >= 45) { // Even slower head changes
                    this.currentHeadChar = this.katakanaChars.charAt(Math.floor(Math.random() * this.katakanaChars.length));
                    this.headChangeCounter = 0;
                }
            }

            draw() {
                const isMobile = window.innerWidth < 768;

                ctx.font = `${this.fontSize}px 'Courier New', monospace`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';

                // Set text rendering for crisp characters
                ctx.fillStyle = '#000000';
                ctx.globalAlpha = 0;
                ctx.fillText('', 0, 0); // Trigger font rendering initialization

                for (let i = 0; i < this.trailLength; i++) {
                    let char;
                    if (i === 0) {
                        // Head - use cached katakana
                        char = this.currentHeadChar;
                    } else {
                        char = this.trail[i];
                    }

                    const yPos = this.y - (i * this.fontSize);

                    // Skip if outside canvas - optimized bounds checking
                    if (yPos < -this.fontSize || yPos > canvas.height + this.fontSize) continue;

                    const opacity = this.trailOpacity[i];
                    if (opacity <= 0) continue;

                    if (i === 0) {
                        // Head - extra crisp rendering
                        ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
                        ctx.globalAlpha = Math.min(1.0, opacity);

                        if (isMobile) {
                            // Simpler rendering on mobile
                            ctx.fillText(char, this.x, yPos);
                        } else {
                            // Pixel-perfect positioning on desktop
                            ctx.save();
                            const pixelX = Math.round(this.x);
                            const pixelY = Math.round(yPos);
                            ctx.translate(pixelX, pixelY);
                            ctx.fillText(char, 0, 0);
                            ctx.restore();
                        }
                    } else {
                        // Trail - uses theme accent color with mobile optimization
                        ctx.fillStyle = mainColor;
                        ctx.globalAlpha = opacity * (isMobile ? 0.5 : 0.7); // Reduced opacity on mobile
                        ctx.fillText(char, this.x, yPos);
                    }
                }
                ctx.globalAlpha = 1.0;
            }
        }

        // --- PULSE (REAL EKG) PARTICLE ---
        class PulseLine {
            constructor() {
                this.x = 0;
                this.y = canvas.height / 2;
                this.speed = 8;
                this.history = [];
                this.maxHistory = 30; // Longer trail for better visual
                this.time = 0;
                this.energy = 0; // For dynamic intensity
                this.lastSpike = 0;
                this.intensity = 1.0;
            }

            update() {
                this.time += 0.1;
                this.x += this.speed;

                // Enhanced realistic EKG with dynamic energy
                const cycleTime = this.time % 12;
                let y = canvas.height / 2;
                let intensity = 1.0;

                // P-wave (gentle upward deflection)
                if (cycleTime >= 0 && cycleTime < 2) {
                    const t = cycleTime / 2;
                    y += Math.sin(t * Math.PI) * 15;
                    intensity = 0.7;
                }
                // PR segment (flat line)
                else if (cycleTime >= 2 && cycleTime < 3) {
                    y += 0;
                    intensity = 0.4;
                }
                // Q-wave (small downward deflection)
                else if (cycleTime >= 3 && cycleTime < 3.5) {
                    const t = (cycleTime - 3) / 0.5;
                    y += Math.sin(t * Math.PI) * -10;
                    intensity = 0.5;
                }
                // R-wave (large upward spike - most prominent)
                else if (cycleTime >= 3.5 && cycleTime < 4.5) {
                    const t = (cycleTime - 3.5) / 1;
                    y += Math.sin(t * Math.PI) * 120; // Larger spike
                    intensity = 1.0;
                    this.lastSpike = Date.now();
                    this.energy = 1.0;
                }
                // S-wave (downward deflection)
                else if (cycleTime >= 4.5 && cycleTime < 5.5) {
                    const t = (cycleTime - 4.5) / 1;
                    y += Math.sin(t * Math.PI) * -40;
                    intensity = 0.8;
                }
                // ST segment (flat line after spike)
                else if (cycleTime >= 5.5 && cycleTime < 6.5) {
                    y += 0;
                    intensity = 0.6;
                }
                // T-wave (rounded upward deflection)
                else if (cycleTime >= 6.5 && cycleTime < 9) {
                    const t = (cycleTime - 6.5) / 2.5;
                    y += Math.sin(t * Math.PI) * 25;
                    intensity = 0.9;
                }
                // Baseline (return to normal)
                else {
                    y += 0;
                    intensity = 0.3;
                }

                // Add subtle cardiac rhythm variations
                const rhythmVariation = Math.sin(this.time * 0.02) * 3;
                y += rhythmVariation;

                // Add micro-tremor for realism
                const microNoise = (Math.random() - 0.5) * 1.5;
                y += microNoise;

                this.y = y;
                this.intensity = intensity;

                // Store enhanced history point
                this.history.push({
                    x: this.x,
                    y: this.y,
                    intensity: intensity,
                    time: Date.now()
                });

                // Maintain optimal trail length
                while (this.history.length > this.maxHistory) {
                    this.history.shift();
                }

                // Reset when off screen
                if (this.x > canvas.width + 100) {
                    this.x = -100;
                    this.history = [];
                    this.time = 0;
                }

                // Decay energy over time
                this.energy *= 0.98;
            }

            draw() {
                if (this.history.length < 2) return;

                // Enable premium anti-aliasing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;

                // Create multi-layered visual effect

                // Layer 1: Main pulse line with dynamic thickness
                ctx.beginPath();
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.lineWidth = 4 + (this.intensity * 2);
                ctx.miterLimit = 10;

                // Enhanced gradient with intensity variation
                const gradient = ctx.createLinearGradient(
                    this.history[0].x, 0,
                    this.x, 0
                );

                // Dynamic color based on energy and intensity
                const mainColorEnhanced = this.adjustColorIntensity(mainColor, this.intensity);

                gradient.addColorStop(0, mainColorEnhanced + '00');      // Transparent start
                gradient.addColorStop(0.3, mainColorEnhanced + '22');      // Fade in
                gradient.addColorStop(0.7, mainColorEnhanced + '66');      // Peak intensity
                gradient.addColorStop(0.9, mainColorEnhanced + 'AA');      // Strong trail
                gradient.addColorStop(1, mainColorEnhanced);               // Full color at tip

                ctx.strokeStyle = gradient;

                // Draw smooth path with enhanced curve interpolation
                ctx.moveTo(this.history[0].x, this.history[0].y);

                for (let i = 1; i < this.history.length; i++) {
                    const point = this.history[i];
                    const pointIntensity = point.intensity || 0.5;

                    if (i < this.history.length - 1) {
                        const nextPoint = this.history[i + 1];
                        const prevPoint = this.history[i - 1];

                        // Advanced cubic Bezier with intensity consideration
                        const tension = 0.3 + (pointIntensity * 0.2);
                        const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
                        const cp1y = prevPoint.y + (point.y - prevPoint.y) * tension;
                        const cp2x = point.x + (nextPoint.x - point.x) * (1 - tension);
                        const cp2y = point.y + (nextPoint.y - point.y) * (1 - tension);

                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }

                ctx.stroke();

                // Layer 2: Enhanced glow effect
                this.drawGlowEffect();

                // Layer 3: Dynamic pulse point with energy visualization
                this.drawPulsePoint();

                // Layer 4: Trailing sparkles for high energy moments
                if (this.energy > 0.7) {
                    this.drawTrailingSparks();
                }

                ctx.globalAlpha = 1.0;
            }

            adjustColorIntensity(color, intensity) {
                // Parse hex color and apply intensity
                const hex = color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);

                // Enhance brightness based on intensity
                const enhancement = 0.5 + (intensity * 0.5);
                const newR = Math.min(255, Math.floor(r + (255 - r) * enhancement));
                const newG = Math.min(255, Math.floor(g + (255 - g) * enhancement * 0.4));
                const newB = Math.min(255, Math.floor(b + (255 - b) * enhancement * 0.4));

                return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
            }

            drawGlowEffect() {
                const glowSize = 12 + Math.sin(Date.now() * 0.003) * 6;
                const glowGradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, glowSize
                );

                const glowColor = this.adjustColorIntensity(mainColor, this.intensity);
                glowGradient.addColorStop(0, glowColor + '66');
                glowGradient.addColorStop(0.5, glowColor + '33');
                glowGradient.addColorStop(1, 'transparent');

                ctx.fillStyle = glowGradient;
                ctx.globalAlpha = 0.7 + (this.energy * 0.3);
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }

            drawPulsePoint() {
                const baseSize = 6 + Math.sin(Date.now() * 0.008) * 4;
                const pulseSize = baseSize + (this.energy * 6);
                const color = this.adjustColorIntensity(mainColor, this.intensity);

                // Outer glow ring
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize + 4, 0, Math.PI * 2);
                ctx.stroke();

                // Main pulse point with anti-aliasing
                ctx.fillStyle = color;
                ctx.globalAlpha = 1.0;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();

                // Bright white core
                const coreGradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, pulseSize
                );
                coreGradient.addColorStop(0, isDarkMode ? '#ffffff' : '#ffffff');
                coreGradient.addColorStop(0.7, color);
                coreGradient.addColorStop(1, color);

                ctx.fillStyle = coreGradient;
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize * 0.8, 0, Math.PI * 2);
                ctx.fill();
            }

            drawTrailingSparks() {
                const numSparks = 4;
                for (let i = 0; i < numSparks; i++) {
                    const offset = i * 12;
                    if (this.history.length > offset) {
                        const sparkPoint = this.history[this.history.length - 1 - offset];
                        const sparkSize = 1.5 + (Math.random() * 2.5);
                        const sparkleOpacity = (1 - (offset / 48)) * this.energy;

                        // Spark glow
                        const sparkGradient = ctx.createRadialGradient(
                            sparkPoint.x, sparkPoint.y, 0,
                            sparkPoint.x, sparkPoint.y, sparkSize * 4
                        );
                        sparkGradient.addColorStop(0, '#ffffff');
                        sparkGradient.addColorStop(0.2, mainColor);
                        sparkGradient.addColorStop(1, 'transparent');

                        ctx.fillStyle = sparkGradient;
                        ctx.globalAlpha = sparkleOpacity * 0.8;
                        ctx.beginPath();
                        ctx.arc(sparkPoint.x, sparkPoint.y, sparkSize * 4, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }

        // Simplified particle classes for better performance
        class SimpleParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around canvas
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = contrastColor;
                ctx.globalAlpha = this.opacity;
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
                this.opacity = Math.random() * 0.5 + 0.3;
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
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        class SnowFlake {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vy = Math.random() * 1 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.4 + 0.2;
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
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        // --- DNA PARTICLE ---
        class DNAStrand {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.baseY = canvas.height / 2;
                this.amplitude = Math.random() * 100 + 50;
                this.frequency = Math.random() * 0.02 + 0.01;
                this.phase = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 2 + 1;
                this.pairs = [];
                const pairCount = Math.floor(Math.random() * 8) + 12;

                for (let i = 0; i < pairCount; i++) {
                    this.pairs.push({
                        offset: i * 20,
                        nucleotide: Math.floor(Math.random() * 4)
                    });
                }
            }

            update() {
                this.x += this.speed;
                this.phase += 0.05;

                // Update nucleotides occasionally
                if (Math.random() < 0.02) {
                    const idx = Math.floor(Math.random() * this.pairs.length);
                    this.pairs[idx].nucleotide = Math.floor(Math.random() * 4);
                }

                // Reset when off screen
                if (this.x > canvas.width + 100) {
                    this.x = -200;
                    this.pairs.forEach(pair => {
                        pair.nucleotide = Math.floor(Math.random() * 4);
                    });
                }
            }

            draw() {
                const nucleotides = ['A', 'T', 'G', 'C'];
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f'];

                this.pairs.forEach(pair => {
                    const yOffset = Math.sin(this.phase + (pair.offset * 0.1)) * this.amplitude;

                    // Top nucleotide
                    const topY = this.baseY + yOffset - pair.offset;
                    const bottomY = this.baseY + yOffset + pair.offset;

                    // Connection line
                    ctx.strokeStyle = contrastColor;
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(this.x, topY);
                    ctx.lineTo(this.x, bottomY);
                    ctx.stroke();

                    // Top nucleotide
                    ctx.fillStyle = colors[pair.nucleotide];
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.arc(this.x, topY, 4, 0, Math.PI * 2);
                    ctx.fill();

                    // Bottom nucleotide (complementary)
                    ctx.fillStyle = colors[3 - pair.nucleotide];
                    ctx.beginPath();
                    ctx.arc(this.x, bottomY, 4, 0, Math.PI * 2);
                    ctx.fill();

                    // Text labels
                    ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
                    ctx.font = "10px monospace";
                    ctx.globalAlpha = 0.9;
                    ctx.textAlign = "center";
                    ctx.fillText(nucleotides[pair.nucleotide], this.x, topY - 8);
                    ctx.fillText(nucleotides[3 - pair.nucleotide], this.x, bottomY + 15);
                });

                ctx.globalAlpha = 1.0;
            }
        }

        // --- NODES WITH CONNECTIONS ---
        class Node {
            constructor(allNodes) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 4 + 3;
                this.allNodes = allNodes;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.glowIntensity = Math.random() * 0.5 + 0.5;
                this.nodeType = Math.random() < 0.3 ? 'primary' : 'secondary'; // Different node types
                this.connectionPulse = 0;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulsePhase += 0.05;
                this.glowIntensity = 0.5 + Math.sin(this.pulsePhase) * 0.3;
                this.connectionPulse = (this.connectionPulse + 0.03) % (Math.PI * 2);

                // Gentle wandering motion
                this.vx += (Math.random() - 0.5) * 0.1;
                this.vy += (Math.random() - 0.5) * 0.1;

                // Speed limiting
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 2) {
                    this.vx = (this.vx / speed) * 2;
                    this.vy = (this.vy / speed) * 2;
                }

                // Bounce off walls with dampening
                if (this.x < this.radius || this.x > canvas.width - this.radius) {
                    this.vx = -this.vx * 0.8;
                    this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
                }
                if (this.y < this.radius || this.y > canvas.height - this.radius) {
                    this.vy = -this.vy * 0.8;
                    this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
                }
            }

            draw() {
                // Draw enhanced connections to nearby nodes
                this.drawConnections();

                // Draw enhanced node
                this.drawNode();
            }

            drawConnections() {
                this.allNodes.forEach(otherNode => {
                    if (otherNode === this) return;

                    const dx = this.x - otherNode.x;
                    const dy = this.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Enhanced connection range and visual effects
                    if (distance < 200 && distance > 0) {
                        const opacity = 1 - (distance / 200);
                        const connectionStrength = opacity * this.glowIntensity;

                        // Multi-layered connection effect
                        this.drawConnectionLine(this.x, this.y, otherNode.x, otherNode.y, connectionStrength, distance);
                    }
                });
            }

            drawConnectionLine(x1, y1, x2, y2, strength, distance) {
                // Connection glow effect
                const glowSize = 3 + strength * 2;
                const connectionGradient = ctx.createLinearGradient(x1, y1, x2, y2);
                
                const baseColor = this.nodeType === 'primary' ? mainColor : contrastColor;
                connectionGradient.addColorStop(0, baseColor + Math.floor(opacity * 0xFF).toString(16));
                connectionGradient.addColorStop(0.5, baseColor + Math.floor(opacity * 0xAA).toString(16));
                connectionGradient.addColorStop(1, baseColor + Math.floor(opacity * 0xFF).toString(16));

                // Outer glow line
                ctx.strokeStyle = connectionGradient;
                ctx.lineWidth = glowSize;
                ctx.globalAlpha = strength * 0.3;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                // Core connection line
                ctx.strokeStyle = baseColor;
                ctx.lineWidth = 1 + strength;
                ctx.globalAlpha = strength * 0.7;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                // Energy pulse along connection
                if (this.connectionPulse < Math.PI) {
                    const pulseX = x1 + (x2 - x1) * (this.connectionPulse / Math.PI);
                    const pulseY = y1 + (y2 - y1) * (this.connectionPulse / Math.PI);
                    
                    const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
                    pulseGradient.addColorStop(0, '#ffffff');
                    pulseGradient.addColorStop(0.3, baseColor);
                    pulseGradient.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = pulseGradient;
                    ctx.globalAlpha = strength * 0.8;
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.globalAlpha = 1.0;
            }

            drawNode() {
                const nodeColor = this.nodeType === 'primary' ? mainColor : contrastColor;
                const pulseSize = this.radius + Math.sin(this.pulsePhase) * 1.5;

                // Outermost glow halo
                const haloGradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, pulseSize * 4
                );
                haloGradient.addColorStop(0, nodeColor + '44');
                haloGradient.addColorStop(0.5, nodeColor + '22');
                haloGradient.addColorStop(1, 'transparent');

                ctx.fillStyle = haloGradient;
                ctx.globalAlpha = this.glowIntensity * 0.4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize * 4, 0, Math.PI * 2);
                ctx.fill();

                // Middle glow ring
                ctx.strokeStyle = nodeColor;
                ctx.lineWidth = 2;
                ctx.globalAlpha = this.glowIntensity * 0.6;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize + 4, 0, Math.PI * 2);
                ctx.stroke();

                // Main node body with gradient
                const nodeGradient = ctx.createRadialGradient(
                    this.x - pulseSize * 0.3, this.y - pulseSize * 0.3, 0,
                    this.x, this.y, pulseSize
                );
                
                if (this.nodeType === 'primary') {
                    nodeGradient.addColorStop(0, '#ffffff');
                    nodeGradient.addColorStop(0.3, nodeColor);
                    nodeGradient.addColorStop(1, this.adjustColorBrightness(nodeColor, -30));
                } else {
                    nodeGradient.addColorStop(0, this.adjustColorBrightness(nodeColor, 40));
                    nodeGradient.addColorStop(0.7, nodeColor);
                    nodeGradient.addColorStop(1, this.adjustColorBrightness(nodeColor, -20));
                }

                ctx.fillStyle = nodeGradient;
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();

                // Inner bright core for primary nodes
                if (this.nodeType === 'primary') {
                    const coreGradient = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, pulseSize * 0.6
                    );
                    coreGradient.addColorStop(0, '#ffffff');
                    coreGradient.addColorStop(0.5, nodeColor + 'AA');
                    coreGradient.addColorStop(1, 'transparent');

                    ctx.fillStyle = coreGradient;
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, pulseSize * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Subtle edge highlight
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.3 * this.glowIntensity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, -Math.PI / 4, Math.PI / 4);
                ctx.stroke();

                ctx.globalAlpha = 1.0;
            }

            adjustColorBrightness(color, percent) {
                // Parse hex color
                const hex = color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);

                // Adjust brightness
                const factor = (100 + percent) / 100;
                const newR = Math.min(255, Math.max(0, Math.floor(r * factor)));
                const newG = Math.min(255, Math.max(0, Math.floor(g * factor)));
                const newB = Math.min(255, Math.max(0, Math.floor(b * factor)));

                return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
            }
        }

        // --- GRID LINES ---
        class GridLine {
            constructor(isHorizontal) {
                this.isHorizontal = isHorizontal;
                this.position = isHorizontal ? Math.random() * canvas.height : Math.random() * canvas.width;
                this.speed = Math.random() * 2 + 0.5;
                this.thickness = Math.random() * 2 + 1; // Thicker lines
                this.opacity = Math.random() * 0.4 + 0.2; // Higher opacity
                this.glowIntensity = 0;
                this.color = this.getGridColor();
            }

            getGridColor() {
                // Use theme colors with palette awareness
                const colors = [
                    mainColor,           // Theme accent color
                    contrastColor,      // Theme contrast color
                    isDarkMode ? '#ffffff' : '#000000',
                    isDarkMode ? '#00ffff' : '#008888',
                    isDarkMode ? '#ff00ff' : '#880088'
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                if (this.isHorizontal) {
                    this.position += this.speed;
                    if (this.position > canvas.height) {
                        this.position = -10;
                        this.color = this.getGridColor(); // New color on reset
                    }
                } else {
                    this.position += this.speed;
                    if (this.position > canvas.width) {
                        this.position = -10;
                        this.color = this.getGridColor(); // New color on reset
                    }
                }

                // Enhanced pulsing glow effect
                this.glowIntensity = Math.sin(Date.now() * 0.002 + this.position * 0.01) * 0.5 + 0.5;
            }

            draw() {
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.thickness;
                ctx.globalAlpha = this.opacity * (0.6 + this.glowIntensity * 0.4); // Higher base opacity

                // Enhanced glow effect
                if (this.glowIntensity > 0.6) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = this.color;
                }

                ctx.beginPath();
                if (this.isHorizontal) {
                    ctx.moveTo(0, this.position);
                    ctx.lineTo(canvas.width, this.position);
                } else {
                    ctx.moveTo(this.position, 0);
                    ctx.lineTo(this.position, canvas.height);
                }
                ctx.stroke();

                // Add bright spots at intersections for terminal effect
                if (Math.random() < 0.1 && this.glowIntensity > 0.8) {
                    ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
                    ctx.globalAlpha = 0.8;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = ctx.fillStyle;

                    if (this.isHorizontal) {
                        // Add dots along horizontal lines
                        for (let x = 0; x < canvas.width; x += 50) {
                            if (Math.random() < 0.3) {
                                ctx.beginPath();
                                ctx.arc(x + Math.random() * 20, this.position, 2, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }
                    }
                }

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;
            }
        }

        // --- SPEED LINES ---
        class SpeedParticle {
             constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * canvas.width;
                this.speed = 10;
                this.color = this.getPaletteColor();
             }

             getPaletteColor() {
                 // Use palette colors or fallback to contrast color
                 const colors = [
                     contrastColor,
                     isDarkMode ? '#ffffff' : '#000000',
                     isDarkMode ? '#00ff00' : '#008800',
                     isDarkMode ? '#ff00ff' : '#880088'
                 ];
                 return colors[Math.floor(Math.random() * colors.length)];
             }

             update() {
                 this.z -= this.speed;
                 if (this.z <= 0) {
                     this.z = canvas.width;
                     this.x = Math.random() * canvas.width;
                     this.y = Math.random() * canvas.height;
                     this.color = this.getPaletteColor(); // Get new color on reset
                 }
             }

             draw() {
                 const cx = canvas.width / 2;
                 const cy = canvas.height / 2;
                 const sx = (this.x - cx) * (canvas.width / this.z) + cx;
                 const sy = (this.y - cy) * (canvas.width / this.z) + cy;
                 const size = (1 - this.z / canvas.width) * 3;
                 const opacity = (1 - this.z / canvas.width);

                 // Main particle with palette color
                 ctx.fillStyle = this.color;
                 ctx.globalAlpha = opacity;
                 ctx.beginPath();
                 ctx.arc(sx, sy, size, 0, Math.PI * 2);
                 ctx.fill();

                 // Add trailing effect
                 const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4);
                 gradient.addColorStop(0, this.color);
                 gradient.addColorStop(0.5, this.color + '44');
                 gradient.addColorStop(1, 'transparent');

                 ctx.fillStyle = gradient;
                 ctx.globalAlpha = opacity * 0.3;
                 ctx.beginPath();
                 ctx.arc(sx, sy, size * 4, 0, Math.PI * 2);
                 ctx.fill();

                 ctx.globalAlpha = 1.0;
             }
        }

        // --- DNA PARTICLE (ORIGINAL STYLE) ---
        class DNAParticle {
            constructor(id, total) {
                this.id = id;
                this.total = total;
                this.angle = (id / total) * Math.PI * 8;
                this.y = (id / total) * canvas.height;
                this.speed = 0.02;
                this.amplitude = 120; // Increased amplitude for more visibility
            }
            update() {
                this.angle += this.speed;
                this.y -= 0.5;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                const centerX = canvas.width / 2;
                const x1 = centerX + Math.sin(this.angle) * this.amplitude;
                const x2 = centerX + Math.sin(this.angle + Math.PI) * this.amplitude;

                // Brighter particles for better visibility
                ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
                ctx.globalAlpha = 0.9;
                ctx.beginPath();
                ctx.arc(x1, this.y, 4, 0, Math.PI * 2); // Larger particles
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x2, this.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Connection lines with better visibility
                if (this.id % 3 === 0) { // More frequent connections
                    ctx.strokeStyle = isDarkMode ? '#ffffff' : '#000000';
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.4; // Higher opacity for connections
                    ctx.beginPath();
                    ctx.moveTo(x1, this.y);
                    ctx.lineTo(x2, this.y);
                    ctx.stroke();
                }

                // Add glow effect for terminal and dark styles
                if (isDarkMode) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = isDarkMode ? '#ffffff' : '#000000';
                    ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath();
                    ctx.arc(x1, this.y, 8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(x2, this.y, 8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                ctx.globalAlpha = 1.0;
            }
        }

        // --- BUBBLE ---
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

        // --- STAR PARTICLE ---
        class StarParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = 0;
                this.targetSize = Math.random() * 3 + 1;
                this.opacity = 0;
                this.targetOpacity = Math.random() * 0.8 + 0.2;
                this.growing = true;
                this.twinkleSpeed = Math.random() * 0.02 + 0.01;
                this.lifespan = Math.random() * 300 + 200; // Random lifespan
                this.age = 0;
            }

            update() {
                this.age++;

                // Growth animation
                if (this.growing) {
                    this.size += (this.targetSize - this.size) * 0.1;
                    this.opacity += (this.targetOpacity - this.opacity) * 0.1;

                    if (Math.abs(this.size - this.targetSize) < 0.1) {
                        this.growing = false;
                    }
                } else {
                    // Twinkle effect
                    this.opacity = this.targetOpacity + Math.sin(Date.now() * this.twinkleSpeed) * 0.3;
                    this.opacity = Math.max(0.1, Math.min(1, this.opacity));
                }

                // Reset when lifespan is reached
                if (this.age > this.lifespan) {
                    this.opacity -= 0.05;
                    if (this.opacity <= 0) {
                        this.reset();
                    }
                }

                // Occasionally reposition for more dynamic effect
                if (Math.random() < 0.001) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }

            draw() {
                let starColor = mainColor;
                if (isDarkMode) {
                    if (['ink', 'carbon', 'zinc', 'slate', 'stone'].includes(paletteName)) starColor = '#ffffff';
                } else {
                    if (['ghost', 'platinum', 'silver', 'iceberg', 'lavender'].includes(paletteName)) starColor = '#1e293b';
                }

                // Draw star with glow effect
                ctx.fillStyle = starColor;
                ctx.globalAlpha = Math.abs(this.opacity);

                // Main star
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add glow for larger stars
                if (this.size > 2) {
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                    gradient.addColorStop(0, starColor);
                    gradient.addColorStop(0.3, starColor + '44'); // Add transparency
                    gradient.addColorStop(1, 'transparent');

                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = Math.abs(this.opacity) * 0.5;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.globalAlpha = 1.0;
            }
        }

        // --- CONFETTI PARTICLE ---
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
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        // --- FIREFLY PARTICLE ---
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
                const color = isDarkMode ? '#eaff00' : '#d97706';
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

        const init = () => {
            particles = [];
            let pCount = 0;

            // Particle counts matching original implementation
            if (mode === "nodes") {
                pCount = Math.floor((canvas.width * canvas.height) / 15000);
                for (let i = 0; i < pCount; i++) particles.push(new SimpleParticle());
            } else if (mode === "dna") {
                pCount = 100;
                for (let i = 0; i < pCount; i++) particles.push(new DNAParticle(i, pCount));
            } else if (mode === "grid") {
                const lines = canvas.height / 40;
                for (let i = 0; i < lines; i++) particles.push(new GridLine(i * 40));
            } else if (mode === "speed") {
                pCount = 200;
                for (let i = 0; i < pCount; i++) particles.push(new SpeedParticle());
            } else if (mode === "rain") {
                pCount = Math.floor(canvas.width / 10);
                for (let i = 0; i < pCount; i++) particles.push(new RainDrop());
            } else if (mode === "dust" || mode === "snow") {
                pCount = mode === "snow" ? 200 : 150;
                for (let i = 0; i < pCount; i++) {
                    particles.push(mode === "snow" ? new SnowFlake() : new SimpleParticle());
                }
            } else if (mode === "bubbles") {
                pCount = 80;
                for (let i = 0; i < pCount; i++) particles.push(new Bubble());
            } else if (mode === "stars") {
                pCount = 300;
                for (let i = 0; i < pCount; i++) particles.push(new StarParticle());
            } else if (mode === "confetti") {
                pCount = 100;
                for (let i = 0; i < pCount; i++) particles.push(new ConfettiParticle());
            } else if (mode === "fireflies") {
                pCount = 50;
                for (let i = 0; i < pCount; i++) particles.push(new FireflyParticle());
            } else if (mode === "matrix") {
                // Responsive matrix settings with bigger fonts
                const isMobile = window.innerWidth < 768;
                const fontSize = isMobile ? 24 : 36; // Much bigger fonts for better visibility
                const columnSpacing = fontSize * 1.1; // Tighter spacing for denser effect
                const columns = Math.floor(canvas.width / columnSpacing);

                // Use all columns for better Matrix coverage
                for (let i = 0; i < columns; i++) {
                    particles.push(new MatrixColumn(i * columnSpacing, fontSize));
                }
            } else if (mode === "pulse") {
                particles.push(new PulseLine());
            }
        };

        // Performance-optimized animation loop with mobile and glassmorphism optimizations
        const animate = (currentTime) => {
            // Adaptive frame rate based on device and style
            const isMobile = window.innerWidth < 768;
            const isGlassmorphism = activeStyle === 'glassmorphism';

            // Optimized frame rate for smooth Matrix animation
            let frameSkip = 16; // 60fps
            if (isMobile && isGlassmorphism && mode === 'matrix') {
                frameSkip = 20; // 50fps - smoother than 30fps
            } else if (isMobile) {
                frameSkip = 16; // Full 60fps for better mobile experience
            }

            if (currentTime - lastFrameTime.current < frameSkip) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime.current = currentTime;

            // Optimized trail effects with glassmorphism performance consideration
            if (mode === "matrix" || mode === "pulse") {
                // Reduce trail intensity for glassmorphism to improve performance
                const baseAlpha = mode === "matrix" ? 0.25 : 0.1;
                const glassmorphismReduction = window.innerWidth < 768 ? 0.5 : 0.75;
                const alpha = baseAlpha * glassmorphismReduction;

                // Use more efficient clearing method for better performance
                ctx.fillStyle = isDarkMode
                    ? `rgba(0, 0, 0, ${alpha})`
                    : `rgba(255, 255, 255, ${alpha})`;

                // Always clear full canvas to prevent dark residue buildup
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
                    ctx.lineTo(i * 40 + (i - cols/2) * 100, canvas.height);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1.0;
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            // NodeSec Connections logic
            if (mode === "nodes") {
                for (let i = 0; i < particles.length; i++) {
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

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        init();
        animate(0);

        return () => {
            window.removeEventListener("resize", resize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mode, accentColor, isDarkMode, paletteName]);

    if (mode === "off") return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                willChange: 'transform', // Optimize for animations
                opacity: 0.7 // Slightly more visible but still subtle
            }}
            role="img"
            aria-label={`${mode} particle animation background effect`}
            aria-hidden="true"
        />
    );
};
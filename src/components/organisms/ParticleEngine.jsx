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
                this.speed = 6;
                this.history = [];
                this.maxHistory = 25; // Slightly longer for smoother animation
            }

            update() {
                this.x += this.speed;

                if (this.x > canvas.width) {
                    this.x = 0;
                    this.history = [];
                }

                // Extended EKG Math with longer cycle
                const t = this.x % 500; // Longer cycle for more dramatic effect
                let offset = 0;

                // P Wave (small upward hump)
                if (t > 30 && t < 80) {
                    offset -= Math.sin(((t - 30) / 50) * Math.PI) * 20;
                }
                // QRS Complex (more dramatic)
                else if (t > 100 && t < 180) {
                    if (t < 120) offset += (t - 100) * 3; // Q (sharp down)
                    else if (t < 150) offset -= (t - 120) * 15; // R (sharp up - bigger)
                    else offset += (t - 150) * 12; // S (sharp down)
                }
                // T Wave (broader upward hump)
                else if (t > 240 && t < 340) {
                    offset -= Math.sin(((t - 240) / 100) * Math.PI) * 35; // Bigger T wave
                }

                this.y = (canvas.height / 2) + offset;
                this.history.push({ x: this.x, y: this.y });

                if (this.history.length > this.maxHistory) this.history.shift();
            }

            draw() {
                if (this.history.length < 2) return;

                // Enable anti-aliasing for smooth graphics
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Clean drawing context - no shadows to prevent residue
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;

                // Draw the smooth EKG trace with better anti-aliasing
                ctx.beginPath();
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.lineWidth = 3; // Slightly thicker for better visibility and anti-aliasing
                ctx.miterLimit = 10; // Prevent sharp joins

                // Create smooth gradient for the trail effect
                if (this.history.length > 2) {
                    const gradient = ctx.createLinearGradient(
                        this.history[0].x, 0,
                        this.x, 0
                    );
                    gradient.addColorStop(0, mainColor + '00'); // Fully transparent at start
                    gradient.addColorStop(0.6, mainColor + '44'); // Semi-transparent middle
                    gradient.addColorStop(0.85, mainColor + '88'); // Near-full opacity
                    gradient.addColorStop(1, mainColor); // Full opacity at current position
                    ctx.strokeStyle = gradient;
                } else {
                    ctx.strokeStyle = mainColor;
                }

                // Draw the continuous path with smooth curves
                ctx.moveTo(this.history[0].x, this.history[0].y);

                for (let i = 1; i < this.history.length; i++) {
                    const point = this.history[i];

                    // Use cubic Bezier curves for maximum smoothness
                    if (i < this.history.length - 1) {
                        const nextPoint = this.history[i + 1];
                        const prevPoint = this.history[i - 1];

                        // Calculate control points for smooth cubic Bezier
                        const cp1x = prevPoint.x + (point.x - prevPoint.x) * 0.25;
                        const cp1y = prevPoint.y + (point.y - prevPoint.y) * 0.25;
                        const cp2x = point.x + (nextPoint.x - point.x) * 0.75;
                        const cp2y = point.y + (nextPoint.y - point.y) * 0.75;

                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }

                ctx.stroke();

                // Smooth leading dot with anti-aliasing
                const pulseSize = 4 + Math.sin(Date.now() * 0.006) * 2; // Smoother, more prominent pulse
                ctx.fillStyle = mainColor;
                ctx.globalAlpha = 1.0;

                // Draw with anti-aliased edges
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();

                // Add subtle anti-aliased outline for better visibility
                ctx.strokeStyle = mainColor + '44';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
                ctx.stroke();

                // Add very subtle trailing glow with anti-aliasing
                const glowGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseSize + 8);
                glowGradient.addColorStop(0, mainColor + '66');
                glowGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = glowGradient;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, pulseSize + 8, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1.0;
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
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 3 + 2;
                this.allNodes = allNodes;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < this.radius || this.x > canvas.width - this.radius) {
                    this.vx = -this.vx;
                }
                if (this.y < this.radius || this.y > canvas.height - this.radius) {
                    this.vy = -this.vy;
                }

                // Keep within bounds
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }

            draw() {
                // Draw connections to nearby nodes
                this.allNodes.forEach(otherNode => {
                    if (otherNode === this) return;

                    const dx = this.x - otherNode.x;
                    const dy = this.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150 && distance > 0) {
                        const opacity = 1 - (distance / 150);
                        ctx.strokeStyle = contrastColor;
                        ctx.lineWidth = 1;
                        ctx.globalAlpha = opacity * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                });

                // Draw node
                ctx.fillStyle = contrastColor;
                ctx.globalAlpha = 0.8;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();

                // Inner glow
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
                gradient.addColorStop(0, contrastColor);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1.0;
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
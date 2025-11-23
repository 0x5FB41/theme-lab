import React, { useEffect, useRef, useState } from "react";
import { Ban, Activity, Network, FileCode, CloudRain, Sparkles, Snowflake, Disc, Star, HeartCrack, Flame, Grip, Dna, Zap as ZapIcon } from "lucide-react";

export const particleOptions = [
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

export const ParticleSystem = ({ mode, accentColor, isDarkMode, paletteName }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let time = 0;

        class Particle {
            constructor(type, x, y) {
                this.type = type;
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = type === "binary" || type === "matrix" ? Math.random() * 2 + 1 : (Math.random() - 0.5) * 2;
                this.size = Math.random() * 3 + 1;
                this.char = type === "binary" ? (Math.random() > 0.5 ? "1" : "0") : (type === "matrix" ? String.fromCharCode(0x30A0 + Math.random() * 96) : "");
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.005;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.rotation += this.rotationSpeed;

                if (this.type === "pulse") {
                    this.size = 2 + Math.sin(time * 0.05 + this.x * 0.01) * 1.5;
                    this.vy *= 0.99;
                }

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) {
                    if (this.type === "binary" || this.type === "matrix") {
                        this.y = -10;
                        this.x = Math.random() * canvas.width;
                        this.life = 1;
                    } else {
                        this.vy *= -1;
                    }
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life * 0.8;
                ctx.fillStyle = accentColor || "#4f46e5";
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                switch (this.type) {
                    case "binary":
                    case "matrix":
                        ctx.font = `${this.size * 4}px 'Courier New', monospace`;
                        ctx.fillText(this.char, 0, 0);
                        break;
                    case "sparkle":
                        ctx.strokeStyle = accentColor;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(0, -this.size * 2);
                        ctx.lineTo(this.size, this.size);
                        ctx.lineTo(-this.size, this.size);
                        ctx.closePath();
                        ctx.stroke();
                        break;
                    case "ghost":
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.3, 0, Math.PI * 2);
                        ctx.arc(this.size * 0.3, -this.size * 0.3, this.size * 0.3, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case "rain":
                        ctx.strokeStyle = accentColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(0, this.size * 4);
                        ctx.stroke();
                        break;
                    case "bubble":
                        ctx.strokeStyle = accentColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
                        ctx.stroke();
                        break;
                    case "hexagon":
                        ctx.beginPath();
                        for (let i = 0; i < 6; i++) {
                            const angle = (Math.PI / 3) * i;
                            const x = Math.cos(angle) * this.size * 2;
                            const y = Math.sin(angle) * this.size * 2;
                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.closePath();
                        ctx.fill();
                        break;
                    case "triangle":
                        ctx.beginPath();
                        ctx.moveTo(0, -this.size * 2);
                        ctx.lineTo(-this.size * 2, this.size * 2);
                        ctx.lineTo(this.size * 2, this.size * 2);
                        ctx.closePath();
                        ctx.fill();
                        break;
                    case "star":
                        ctx.beginPath();
                        for (let i = 0; i < 5; i++) {
                            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                            const outerX = Math.cos(angle) * this.size * 2;
                            const outerY = Math.sin(angle) * this.size * 2;
                            const innerAngle = angle + Math.PI / 5;
                            const innerX = Math.cos(innerAngle) * this.size;
                            const innerY = Math.sin(innerAngle) * this.size;
                            if (i === 0) ctx.moveTo(outerX, outerY);
                            else ctx.lineTo(outerX, outerY);
                            ctx.lineTo(innerX, innerY);
                        }
                        ctx.closePath();
                        ctx.fill();
                        break;
                    case "heart":
                        ctx.beginPath();
                        ctx.moveTo(0, this.size);
                        ctx.bezierCurveTo(-this.size * 2, -this.size, -this.size * 2, -this.size * 2, 0, -this.size);
                        ctx.bezierCurveTo(this.size * 2, -this.size * 2, this.size * 2, -this.size, 0, this.size);
                        ctx.fill();
                        break;
                    case "sun":
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                        ctx.fill();
                        for (let i = 0; i < 8; i++) {
                            const angle = (Math.PI / 4) * i;
                            ctx.beginPath();
                            ctx.moveTo(Math.cos(angle) * this.size, Math.sin(angle) * this.size);
                            ctx.lineTo(Math.cos(angle) * this.size * 2, Math.sin(angle) * this.size * 2);
                            ctx.stroke();
                        }
                        break;
                    case "zap":
                        ctx.beginPath();
                        ctx.moveTo(-this.size, -this.size * 2);
                        ctx.lineTo(0, -this.size * 0.5);
                        ctx.lineTo(-this.size * 0.5, 0);
                        ctx.lineTo(this.size * 0.5, this.size * 2);
                        ctx.lineTo(0, this.size * 0.5);
                        ctx.lineTo(this.size * 0.5, 0);
                        ctx.closePath();
                        ctx.fill();
                        break;
                    default:
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }

                ctx.restore();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            if (mode === "pulse") {
                if (particles.length < 50) {
                    particles.push(new Particle("pulse"));
                }
            } else if (mode !== "off") {
                if (Math.random() < 0.1) {
                    particles.push(new Particle(mode));
                }
            }

            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("resize", handleResize);
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
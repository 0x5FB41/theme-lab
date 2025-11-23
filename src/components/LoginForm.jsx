import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = ({ styles, activeStyle, systemVars }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text)" }}
                >
                    Username
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:shadow-lg focus:outline-none dynamic-placeholder"
                    style={{
                        background: "var(--bg-panel)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        borderRadius: styles[activeStyle].vars["--radius"],
                        border: styles[activeStyle].vars["--border"],
                        boxShadow: styles[activeStyle].vars["--shadow"],
                        fontFamily: styles[activeStyle].vars["--font-family"],
                    }}
                    placeholder="Enter your username"
                />
            </div>

            <div>
                <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text)" }}
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 pr-12 rounded-lg border transition-all focus:shadow-lg focus:outline-none dynamic-placeholder"
                        style={{
                            background: "var(--bg-panel)",
                            borderColor: "var(--border)",
                            color: "var(--text)",
                            borderRadius: styles[activeStyle].vars["--radius"],
                            border: styles[activeStyle].vars["--border"],
                            boxShadow: styles[activeStyle].vars["--shadow"],
                            fontFamily: styles[activeStyle].vars["--font-family"],
                        }}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
                        style={{ color: "var(--text)" }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <button
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{
                    background: "var(--accent)",
                    color: "var(--accent-text)",
                    borderRadius: styles[activeStyle].vars["--radius"],
                    border: styles[activeStyle].vars["--border"],
                    boxShadow: styles[activeStyle].vars["--shadow"],
                    fontFamily: styles[activeStyle].vars["--font-family"],
                }}
            >
                Sign In
            </button>

            <div className="flex items-center justify-between text-sm" style={{ color: "var(--text)" }}>
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                </label>
                <a href="#" className="hover:underline">
                    Forgot password?
                </a>
            </div>
        </div>
    );
};
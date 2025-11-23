import React, { useState, useCallback, useMemo } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { RezidentLogo } from "../atoms/RezidentLogo.jsx";
import PropTypes from 'prop-types';

export const LoginCard = React.memo(({ forceContrast, activeStyle }) => {
    const [showPassword, setShowPassword] = useState(false);

    const memoizedColors = useMemo(() => {
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

        return { headerColor, labelColor };
    }, [activeStyle]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        // Handle form submission
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe');

        console.log('Form submitted:', { email, password, rememberMe });
        // Add actual authentication logic here
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handlePasswordRecovery = useCallback((e) => {
        e.preventDefault();
        // Handle password recovery
    }, []);

    const accentColor = useMemo(() => {
        return ["gameboy", "cyberdeck", "glitch", "system7"].includes(activeStyle)
            ? "var(--gb-text)"
            : "var(--accent)";
    }, [activeStyle]);

    const cardStyle = useMemo(() => ({
        background: "var(--bg-panel-override, var(--bg-panel))",
        borderRadius: "var(--radius)",
        border: "var(--border)",
        boxShadow: "var(--shadow)",
        backdropFilter: "var(--backdrop)",
        clipPath: "var(--clip-path, none)",
        fontFamily: "var(--font-family, inherit)",
        transform: "var(--transform, none)",
    }), []);

    const headerStyle = useMemo(() => ({
        color: memoizedColors.headerColor,
        fontWeight: "var(--weight-bold)",
    }), [memoizedColors]);

    const labelStyle = useMemo(() => ({
        color: memoizedColors.labelColor,
        fontWeight: "var(--weight-normal)",
    }), [memoizedColors]);

    const inputStyle = useMemo(() => ({
        background: "var(--input-bg)",
        borderRadius: "var(--btn-radius)",
        border: activeStyle === "frutigerAero"
            ? "1px solid rgba(255,255,255,0.5)"
            : "1px solid var(--border-color)",
        color: "var(--input-text)",
        boxShadow: "var(--shadow-input, none)",
        fontWeight: "var(--weight-normal)",
    }), [activeStyle]);

    const checkboxStyle = useMemo(() => ({
        borderColor: memoizedColors.labelColor,
        borderRadius: "4px",
        backgroundColor: "var(--input-bg)",
        color: "var(--input-text)",
    }), [memoizedColors]);

    const buttonStyle = useMemo(() => ({
        background: "var(--primary)",
        color: "var(--primary-fg)",
        borderRadius: "var(--btn-radius)",
        boxShadow: "var(--shadow)",
        border: "var(--btn-border)",
        fontWeight: "var(--weight-bold)",
        backgroundClip: "padding-box",
        backgroundOrigin: "border-box",
    }), []);

    const secondaryButtonStyle = useMemo(() => ({
        background: "var(--btn-sec-bg)",
        border: "var(--btn-sec-border)",
        borderRadius: "var(--btn-radius)",
        color: "var(--btn-sec-text)",
        fontWeight: "var(--weight-normal)",
        boxShadow: "var(--btn-sec-shadow, none)",
    }), []);

    return (
        <div
            className="relative w-full max-w-md p-4 sm:p-6 md:p-8 transition-all duration-500"
            style={cardStyle}
        >
            <header className="text-center mb-8 flex flex-col items-center">
                <div
                    className="mb-4 transition-colors duration-300"
                    style={{ color: memoizedColors.headerColor }}
                    role="img"
                    aria-label="rEZident Logo"
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
                <h1
                    className="text-3xl tracking-tight transition-colors duration-300"
                    style={headerStyle}
                >
                    r<span style={{ color: accentColor }}>EZ</span>ident
                </h1>
                <p style={labelStyle} className="text-sm mt-2">
                    Your resident life, made{" "}
                    <span
                        style={{
                            color: accentColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        EZier
                    </span>.
                </p>
            </header>

            <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label
                        htmlFor="email-input"
                        className="text-xs uppercase tracking-wider ml-1"
                        style={{
                            color: memoizedColors.labelColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        Email
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        name="email"
                        placeholder="afif@rezident.app"
                        aria-describedby="email-description"
                        autoComplete="email"
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition-all duration-300 dynamic-placeholder text-sm sm:text-base"
                        style={inputStyle}
                    />
                    <span id="email-description" className="sr-only">
                        Enter your email address to sign in to your account
                    </span>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="password-input"
                        className="text-xs uppercase tracking-wider ml-1"
                        style={{
                            color: memoizedColors.labelColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            aria-describedby="password-description password-visibility-help"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 outline-none transition-all duration-300 pr-10 dynamic-placeholder text-sm sm:text-base"
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            aria-pressed={showPassword}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-3.5 transition-colors"
                            style={{ color: "var(--input-text)", opacity: 0.6 }}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword
                                ? <Eye size={18} />
                                : <EyeOff size={18} />}
                        </button>
                    </div>
                    <span id="password-description" className="sr-only">
                        Enter your password to sign in to your account
                    </span>
                    <span id="password-visibility-help" className="sr-only">
                        Use the show password button to toggle password visibility
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            name="rememberMe"
                            className="w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer"
                            style={checkboxStyle}
                            aria-describedby="remember-description"
                        />
                        <label
                            htmlFor="remember-me"
                            className="cursor-pointer"
                            style={labelStyle}
                        >
                            Remember me
                        </label>
                    </div>
                    <span id="remember-description" className="sr-only">
                        Check this box to remain signed in on this device
                    </span>
                    <button
                        type="button"
                        onClick={handlePasswordRecovery}
                        style={{
                            color: accentColor,
                            fontWeight: "var(--weight-bold)",
                        }}
                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2"
                        aria-label="Reset your password"
                    >
                        Forgot?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3.5 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-1 sm:gap-2 overflow-hidden relative text-sm sm:text-base"
                    style={buttonStyle}
                >
                    Sign In
                    <ArrowRight size={18} />
                </button>

                <div className="relative flex py-2 items-center">
                    <div
                        className="flex-grow border-t"
                        style={{ borderColor: "var(--border-color)" }}
                    />
                    <span
                        className="flex-shrink-0 mx-4 text-xs uppercase"
                        style={labelStyle}
                    >
                        Or continue with
                    </span>
                    <div
                        className="flex-grow border-t"
                        style={{ borderColor: "var(--border-color)" }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {["Google", "Notion"].map((provider) => (
                        <button
                            key={provider}
                            className="flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:opacity-80"
                            style={secondaryButtonStyle}
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
            </form>
        </div>
    );
});

LoginCard.propTypes = {
    forceContrast: PropTypes.bool,
    activeStyle: PropTypes.string.isRequired
};

LoginCard.defaultProps = {
    forceContrast: false
};
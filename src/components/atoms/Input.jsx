import React from "react";
import { Eye, EyeOff } from "lucide-react";

export const TextInput = ({ 
    label, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    activeStyle, 
    labelColor,
    showPasswordToggle = false,
    className = ""
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const actualType = type === "password" && showPassword ? "text" : type;
    
    return (
        <div className={`space-y-1 ${className}`}>
            <label
                className="text-xs uppercase tracking-wider ml-1"
                style={{
                    color: labelColor,
                    fontWeight: "var(--weight-bold)",
                }}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type={actualType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-4 py-3 outline-none transition-all duration-300 dynamic-placeholder ${
                        showPasswordToggle ? "pr-10" : ""
                    }`}
                    style={{
                        background: "var(--input-bg)",
                        borderRadius: "var(--btn-radius)",
                        border: activeStyle === "frutigerAero"
                            ? "1px solid rgba(255,255,255,0.5)"
                            : "1px solid var(--border-color)",
                        color: "var(--input-text)",
                        fontWeight: "var(--weight-normal)",
                        boxShadow: "var(--shadow-input, none)",
                    }}
                />
                {showPasswordToggle && type === "password" && (
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 transition-colors"
                        style={{ color: "var(--input-text)", opacity: 0.6 }}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export const Button = ({ 
    children, 
    variant = "primary", 
    onClick, 
    className = "", 
    disabled = false,
    style = {}
}) => {
    const baseStyle = {
        transition: "all 0.3s",
        fontWeight: "var(--weight-bold)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
    };

    const variantStyles = {
        primary: {
            background: "var(--primary)",
            color: "var(--primary-fg)",
            borderRadius: "var(--btn-radius)",
            boxShadow: "var(--shadow)",
            border: "var(--btn-border)",
            backgroundClip: "padding-box",
            backgroundOrigin: "border-box",
        },
        secondary: {
            background: "var(--btn-sec-bg)",
            border: "var(--btn-sec-border)",
            borderRadius: "var(--btn-radius)",
            color: "var(--btn-sec-text)",
            fontWeight: "var(--weight-normal)",
            boxShadow: "var(--btn-sec-shadow, none)",
        },
        ghost: {
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--btn-radius)",
            color: "var(--text-main)",
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden relative ${className}`}
            style={{
                ...baseStyle,
                ...variantStyles[variant],
                ...style
            }}
        >
            {children}
        </button>
    );
};
export const RezidentLogo = ({ size = 40, forceColor }) => (
    <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
    >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                fill="currentColor"
                className="opacity-20"
            />
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M4 9H20"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M4 15H20"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M10 3V21"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.5"
            />
            <path
                d="M2 12H6L8 7L11 16L14 9L16 12H22"
                stroke={forceColor || "var(--logo-glow)"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    filter: forceColor
                        ? "none"
                        : "drop-shadow(0 0 2px var(--logo-glow))",
                }}
            />
        </svg>
    </div>
);
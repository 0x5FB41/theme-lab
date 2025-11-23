import React from "react";

export const SocialButtons = ({ styles, activeStyle }) => {
    const googleSignIn = () => {
        console.log("Google Sign In clicked");
        // Add your Google OAuth implementation here
    };

    const notionSignIn = () => {
        console.log("Notion Sign In clicked");
        // Add your Notion OAuth implementation here
    };

    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div
                        className="w-full border-t"
                        style={{ borderColor: "var(--border)" }}
                    />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span
                        className="px-2 bg-inherit font-medium"
                        style={{
                            backgroundColor: "var(--bg-app)",
                            color: "var(--text)",
                        }}
                    >
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={googleSignIn}
                    className="flex-1 flex items-center justify-center px-4 py-3 border rounded-lg font-medium transition-all hover:shadow-md hover:scale-[1.02]"
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
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google
                </button>

                <button
                    onClick={notionSignIn}
                    className="flex-1 flex items-center justify-center px-4 py-3 border rounded-lg font-medium transition-all hover:shadow-md hover:scale-[1.02]"
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
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.514.326-.327.513zm.893 3.28v13.906c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046 1.121-.56 1.121-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.606.047-.933.42-.933 1.027zm13.729.28c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84c-1.12 0-1.448-.7-1.682-1.354v-8.354c0-.514.187-1.027.794-1.168l2.33-.373c.093 0 .28.047.373.327l4.764 7.279V8.47l-1.215-.139c-.093-.42.094-.887.514-.934zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.747l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.681 1.726l-15.458.934c-.98.047-1.448-.046-1.962-.7L1.12 18.454C.373 17.476 0 16.726 0 15.84V2.666c0-.839.374-1.54 1.936-1.631z"/>
                    </svg>
                    Notion
                </button>
            </div>
        </div>
    );
};
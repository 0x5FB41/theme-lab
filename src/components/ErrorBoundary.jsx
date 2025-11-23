import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to console and state
        console.error('Error Boundary caught an error:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // You could also log to an error reporting service here
        // logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            return (
                <div 
                    className="min-h-screen w-full flex items-center justify-center p-4"
                    style={{
                        background: 'var(--bg-app)',
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-family, system-ui, -apple-system, sans-serif)'
                    }}
                >
                    <div 
                        className="max-w-md w-full p-8 rounded-lg border text-center"
                        style={{
                            background: 'var(--bg-panel)',
                            borderColor: 'var(--border-color)',
                            borderRadius: 'var(--radius)',
                            boxShadow: 'var(--shadow)'
                        }}
                    >
                        <h1 
                            className="text-2xl font-bold mb-4"
                            style={{ color: 'var(--text-main)' }}
                        >
                            Something went wrong
                        </h1>
                        <p 
                            className="mb-6"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            We're sorry, but something unexpected happened. Please refresh the page and try again.
                        </p>
                        
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details 
                                className="text-left mb-6 p-4 rounded border"
                                style={{
                                    borderColor: 'var(--border-color)',
                                    background: 'var(--input-bg)',
                                    color: 'var(--input-text)',
                                    fontSize: '0.875em'
                                }}
                            >
                                <summary 
                                    className="font-semibold cursor-pointer mb-2"
                                    style={{ color: 'var(--text-main)' }}
                                >
                                    Error Details (Development Only)
                                </summary>
                                <pre className="whitespace-pre-wrap overflow-auto max-h-40">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 rounded-lg transition-colors"
                            style={{
                                background: 'var(--primary)',
                                color: 'var(--primary-fg)',
                                borderColor: 'var(--btn-border)',
                                borderRadius: 'var(--btn-radius)',
                                fontWeight: 'var(--weight-bold)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.opacity = '0.8';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.opacity = '1';
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
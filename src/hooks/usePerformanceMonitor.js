import { useEffect, useRef } from 'react';

// Performance monitoring hook for optimizing component performance
export const usePerformanceMonitor = (componentName, enabled = process.env.NODE_ENV === 'development') => {
    const renderCount = useRef(0);
    const lastRenderTime = useRef(Date.now());
    const mountTime = useRef(Date.now());

    useEffect(() => {
        renderCount.current++;
        const now = Date.now();
        const timeSinceLastRender = now - lastRenderTime.current;
        const timeSinceMount = now - mountTime.current;

        if (enabled) {
            console.log(`[Performance] ${componentName}:`, {
                render: renderCount.current,
                timeSinceLastRender: `${timeSinceLastRender}ms`,
                timeSinceMount: `${timeSinceMount}ms`
            });

            // Warn about performance issues
            if (timeSinceLastRender < 16) {
                console.warn(`[Performance Warning] ${componentName}: Very fast re-render (${timeSinceLastRender}ms) - consider adding memoization`);
            }
        }

        lastRenderTime.current = now;
    });

    return {
        renderCount: renderCount.current,
        mountTime: mountTime.current,
        timeSinceMount: Date.now() - mountTime.current
    };
};

// Bundle size monitoring
export const useBundleSizeMonitor = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            // Monitor bundle size in development
            const checkBundleSize = () => {
                const scripts = document.querySelectorAll('script[src*="/src/"]');
                scripts.forEach(script => {
                    if (script.src) {
                        console.log(`[Bundle] Script loaded: ${script.src.split('/').pop()}`);
                    }
                });
            };

            // Check after a short delay to ensure scripts are loaded
            const timeoutId = setTimeout(checkBundleSize, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, []);
};

// Performance optimization utilities
export const performanceUtils = {
    // Debounce function for optimizing frequent operations
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for rate-limiting operations
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Measure function execution time
    measure: (fn, label) => {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`[Performance] ${label}: ${end - start}ms`);
        return result;
    }
};
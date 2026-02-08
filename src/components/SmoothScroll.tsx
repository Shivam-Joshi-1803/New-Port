import { useEffect } from 'react';

export default function SmoothScroll() {
    useEffect(() => {
        // Scroll to top on page load/refresh
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);

    return null;
}

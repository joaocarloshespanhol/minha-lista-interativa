export const sendEvent = ({ action, params }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, params);
    }
};
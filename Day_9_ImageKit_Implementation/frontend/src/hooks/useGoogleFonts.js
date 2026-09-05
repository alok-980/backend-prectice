const FONT_LINK_ID = 'user-form-fonts';

export const useGoogleFonts = () => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(FONT_LINK_ID)) return;

    const link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    link.href =
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
};
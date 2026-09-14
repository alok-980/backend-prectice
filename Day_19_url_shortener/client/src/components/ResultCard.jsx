import React from 'react';
import LinkCard from './LinkCard';

/**
 * Appears once, right after a URL is shortened - just the new link and a
 * copy button, per spec. Reuses LinkCard's markup instead of duplicating it,
 * but passes no `onDelete` or metadata so those parts simply don't render.
 */
const ResultCard = ({ shortUrl, shortCode }) => {
    if (!shortUrl) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-4 animate-fadeIn">
            <LinkCard shortUrl={shortUrl} shortCode={shortCode} highlight />
        </div>
    );
};

export default ResultCard;
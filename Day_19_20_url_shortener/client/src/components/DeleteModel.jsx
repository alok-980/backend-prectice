import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable inline error banner. Renders nothing when there's no message,
 * so callers can pass `error` straight through without an extra guard.
 */
const DeleteModel = ({ message, className = '' }) => {
    if (!message) return null;

    return (
        <div
            role="alert"
            className={`flex items-center gap-2 text-xs font-medium text-red-400 bg-red-500/5 p-3 rounded-lg border border-red-500/10 ${className}`}
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
        </div>
    );
};

export default DeleteModel;
import React, { useState } from 'react';
import { Copy, Check, Trash2, ExternalLink, Link2, MousePointerClick, Calendar } from 'lucide-react';

const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * One row for a shortened link. Shared by ResultCard (just the link + copy)
 * and UrlList (link + clicks + date + copy + delete), so both stay in sync
 * with a single markup source instead of two near-identical components.
 */
const LinkCard = ({ shortUrl, shortCode, longUrl, clicks, createdAt, onDelete, isDeleting = false, highlight = false }) => {
    const [copied, setCopied] = useState(false);
    const date = formatDate(createdAt);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard access can be denied by the browser; not worth surfacing as an error.
        }
    };

    return (
        <div
            className={`p-[1px] rounded-2xl shadow-lg transition-all duration-300 group bg-gradient-to-r ${highlight
                    ? 'from-indigo-500 via-purple-500 to-pink-500'
                    : 'from-indigo-500/20 via-purple-500/20 to-pink-500/20 hover:from-indigo-500/50 hover:via-purple-500/50 hover:to-pink-500/50'
                }`}
        >
            <div className="bg-slate-900/90 backdrop-blur-xl p-4 sm:p-5 rounded-[15px] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <Link2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                            {shortCode}
                        </span>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-semibold text-slate-100 hover:text-indigo-400 transition-colors truncate flex items-center gap-1.5 mt-0.5 group/link"
                        >
                            {shortUrl}
                            <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100 transition-opacity shrink-0" />
                        </a>
                        {longUrl && <p className="text-xs text-slate-500 truncate mt-1">{longUrl}</p>}
                        {(clicks !== undefined || date) && (
                            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                                {clicks !== undefined && (
                                    <span className="flex items-center gap-1">
                                        <MousePointerClick className="w-3 h-3" />
                                        {clicks} {clicks === 1 ? 'click' : 'clicks'}
                                    </span>
                                )}
                                {date && (
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {date}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end border-t border-slate-800/60 pt-3 sm:pt-0 sm:border-0">
                    <button
                        onClick={handleCopy}
                        className={`flex-1 sm:flex-none px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 select-none min-w-[120px] shadow-md
              ${copied
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-950 text-slate-200 border border-slate-800 hover:border-slate-700 hover:text-white active:scale-[0.98]'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 text-slate-400" />
                                <span>Copy link</span>
                            </>
                        )}
                    </button>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(shortCode)}
                            disabled={isDeleting}
                            aria-label="Delete link"
                            className="p-3 bg-slate-950 hover:bg-red-950/30 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-500/20 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
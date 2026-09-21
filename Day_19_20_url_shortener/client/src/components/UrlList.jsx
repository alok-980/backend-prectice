import React from 'react';
import { ListOrdered } from 'lucide-react';
import LinkCard from './LinkCard';
import LinkCardSkeleton from './LinkCardSkeleton';
import DeleteModel from './DeleteModel';

/**
 * All links with clicks, date, copy, and delete. Purely presentational -
 * fetching and the "refresh when you come back to the tab" behavior live in
 * App.jsx, which owns the data and passes it down as props.
 */
const UrlList = ({ links, isLoading, error, deletingCode, onDelete }) => {

    console.log(links);
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
            {links.length > 0 && (
                <div className="flex items-center gap-2 px-1 mb-2">
                    <ListOrdered className="w-4 h-4 text-slate-500" />
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Your links ({links.length})
                    </h4>
                </div>
            )}

            <DeleteModel message={error} />

            {isLoading ? (
                <div className="space-y-3">
                    <LinkCardSkeleton />
                    <LinkCardSkeleton />
                    <LinkCardSkeleton />
                </div>
            ) : links.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-dashed border-slate-800/80">
                    <p className="text-sm text-slate-500">No links shortened yet. Your history will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {links?.map((link) => (
                        <LinkCard
                            key={link.shortCode}
                            shortUrl={'http://localhost:3000/' + link.shortCode}
                            shortCode={link.shortCode}
                            longUrl={link.longUrl}
                            clicks={link.clicks}
                            createdAt={link.createdAt}
                            onDelete={onDelete}
                            isDeleting={deletingCode === link.shortCode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UrlList;
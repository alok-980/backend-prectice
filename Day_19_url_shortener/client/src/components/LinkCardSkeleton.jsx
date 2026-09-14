import React from 'react';

const LinkCardSkeleton = () => (
    <div className="p-[1px] rounded-2xl bg-slate-800/50">
        <div className="bg-slate-900/60 p-4 sm:p-5 rounded-[15px] border border-white/5 flex items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-4 flex-1">
                <div className="w-11 h-11 bg-slate-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-20 bg-slate-800 rounded" />
                    <div className="h-4 w-3/5 bg-slate-800 rounded" />
                </div>
            </div>
            <div className="w-[120px] h-11 bg-slate-800 rounded-xl hidden sm:block" />
        </div>
    </div>
);

export default LinkCardSkeleton;
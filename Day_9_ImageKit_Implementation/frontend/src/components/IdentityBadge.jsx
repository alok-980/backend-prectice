import React from 'react';
import { UserPlus } from 'lucide-react';

const IdentityBadge = () => (
    <div className="absolute -top-6 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-violet-500 to-teal-400 shadow-[0_8px_24px_rgba(124,92,252,0.45)]">
        <UserPlus size={20} className="text-white" strokeWidth={2.25} />
    </div>
);

export default IdentityBadge;
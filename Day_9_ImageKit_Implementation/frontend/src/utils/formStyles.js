export const baseInputClass =
    'w-full bg-transparent text-sm text-violet-50 placeholder:text-violet-200/35 outline-none';

export const shellClass = (hasError) =>
    `flex items-center gap-3 rounded-xl border px-3.5 py-2.5 backdrop-blur-sm transition-colors duration-200 ${hasError
        ? 'border-amber-400/60 bg-amber-400/[0.06]'
        : 'border-white/10 bg-white/[0.04] focus-within:border-violet-400/60 focus-within:bg-white/[0.06]'
    }`;
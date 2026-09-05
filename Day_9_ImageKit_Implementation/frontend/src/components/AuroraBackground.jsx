import React from 'react';

const AuroraBackground = () => (
    <>
        <div
            className="pointer-events-none absolute inset-0"
            style={{
                background:
                    'radial-gradient(120% 100% at 15% 0%, #241B3D 0%, #0B0A17 55%), #0B0A17',
            }}
        />
        <div className="pointer-events-none absolute -top-32 -left-28 h-80 w-80 rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="pointer-events-none absolute top-8 -right-20 h-72 w-72 rounded-full bg-teal-400/20 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-[100px]" />
        <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
                backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '42px 42px',
            }}
        />
    </>
);

export default AuroraBackground;
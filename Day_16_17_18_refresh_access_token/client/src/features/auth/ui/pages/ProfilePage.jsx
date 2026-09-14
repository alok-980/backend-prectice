import React, { useContext, useEffect } from 'react';
import { authContext } from '../../../../app/context/authContext';
import { useAuth } from '../../hooks/useAuth'
import { User, Mail, Shield, Radio, Terminal, Settings2, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useContext(authContext);
  const { fetchProfile } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [])

  // Fallback data in case context properties are initially loading
  const userData = {
    name: user?.name || "Anonymous Operator",
    email: user?.email || "unknown@node.network",
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07080a] px-4 py-12 font-mono overflow-hidden selection:bg-cyan-500 selection:text-black">

      {/* Decorative Cyber Grid & Radial Background Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-transparent blur-[140px] pointer-events-none"></div>

      {/* Main Glass Profile Card Container */}
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

        {/* Tech Accent Corner Highlights */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-700 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zinc-700 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-zinc-700 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-700 rounded-br-2xl"></div>

        {/* Dynamic Header Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[10px] tracking-widest text-cyan-400 uppercase font-bold">
              <Terminal className="h-3 w-3" />
              <span>CORE_PROFILE_LOADED</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
              <Radio className="h-2.5 w-2.5 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Operator Initial Avatar Block */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-fuchsia-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Operator Card
              </h2>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                UID // {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information Stack */}
        <div className="space-y-4">

          {/* Identity Row */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-950/60">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-zinc-900 p-2 text-fuchsia-400">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">01 // Verified Name</p>
                <p className="text-sm font-semibold text-zinc-200 truncate font-sans mt-0.5">{userData.name}</p>
              </div>
            </div>
          </div>

          {/* Communication Routing Row */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-950/60">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-zinc-900 p-2 text-cyan-400">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">02 // Communication Route</p>
                <p className="text-sm font-semibold text-zinc-200 truncate font-sans mt-0.5">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Clearance Level Indicator */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-950/60">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-zinc-900 p-2 text-zinc-400">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">03 // System Permission</p>
                <p className="text-sm font-semibold text-zinc-400 truncate mt-0.5">Root-Level Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Frame */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200 active:scale-[0.98]">
            <Settings2 className="h-4 w-4" />
            <span>Config</span>
          </button>

          <button className="flex items-center justify-center space-x-2 rounded-xl border border-red-950/40 bg-red-950/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 active:scale-[0.98]">
            <LogOut className="h-4 w-4" />
            <span>Disconnect</span>
          </button>
        </div>

        {/* Tech Environment Summary Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-zinc-800/80 pt-5 text-[10px] text-zinc-600">
          <span>SECURE_SESSION // ESTABLISHED</span>
          <span>NODE_01</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

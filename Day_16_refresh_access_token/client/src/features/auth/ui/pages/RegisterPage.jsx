import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Lock, Eye, EyeOff, Terminal, ShieldCheck, Cpu } from 'lucide-react';

const RegisterPage = () => {

    const { showPassword, setShowPassword, register, handleSubmit, handleRegister, errors } = useAuth()

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#07080a] px-4 py-12 font-mono overflow-hidden selection:bg-fuchsia-500 selection:text-white">

            {/* Premium Decorative Grid & Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-transparent blur-[140px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[140px] pointer-events-none"></div>

            {/* Main Glass Dashboard Card */}
            <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                {/* Decorative Corner Borders */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-700 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zinc-700 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-zinc-700 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-700 rounded-br-2xl"></div>

                {/* Header Section */}
                <div className="mb-10 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[10px] tracking-widest text-fuchsia-400 uppercase font-bold">
                            <Terminal className="h-3 w-3 animate-pulse" />
                            <span>AUTH_MODULE_INIT</span>
                        </div>
                        <div className="flex space-x-1.5">
                            <span className="h-2 w-2 rounded-full bg-zinc-700"></span>
                            <span className="h-2 w-2 rounded-full bg-zinc-700"></span>
                            <span className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                        Access Granted<span className="text-cyan-400">.</span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        Provision a secure development identity across our node network.
                    </p>
                </div>

                {/* Form Element */}
                <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>

                    {/* Name Field */}
                    <div className="relative group">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-focus-within:text-fuchsia-400 transition-colors">
                                01 // Operator Name
                            </label>
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors">
                                <User className="h-4 w-4" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder="e.g., Ada Lovelace"
                                {...register('name', { required: 'Name parameter required' })}
                                className={`w-full rounded-xl border bg-zinc-950/40 pl-11 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 font-sans ${errors.name
                                    ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                                    : 'border-zinc-800/80 focus:border-fuchsia-500 focus:bg-zinc-950/80 focus:shadow-[0_0_15px_rgba(217,70,239,0.1)]'
                                    }`}
                            />
                        </div>
                        {errors.name && (
                            <span className="mt-2 text-[11px] text-red-400 flex items-center tracking-wide">
                                <span className="mr-1.5 text-xs">⚠️</span> {errors.name.message}
                            </span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-focus-within:text-cyan-400 transition-colors">
                                02 // Core Email
                            </label>
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
                                <Mail className="h-4 w-4" />
                            </div>
                            <input
                                id="email"
                                type="text"
                                placeholder="operator@domain.dev"
                                {...register('email', {
                                    required: 'Email parameter required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid syntax for email sequence',
                                    },
                                })}
                                className={`w-full rounded-xl border bg-zinc-950/40 pl-11 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 font-sans ${errors.email
                                    ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                                    : 'border-zinc-800/80 focus:border-cyan-500 focus:bg-zinc-950/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <span className="mt-2 text-[11px] text-red-400 flex items-center tracking-wide">
                                <span className="mr-1.5 text-xs">⚠️</span> {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-focus-within:text-fuchsia-400 transition-colors">
                                03 // Passphrase
                            </label>
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors">
                                <Lock className="h-4 w-4" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••"
                                {...register('password', {
                                    required: 'Password parameter required',
                                    minLength: {
                                        value: 6,
                                        message: 'String length requirement not met (min: 6)',
                                    },
                                })}
                                className={`w-full rounded-xl border bg-zinc-950/40 pl-11 pr-12 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 font-sans ${errors.password
                                    ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                                    : 'border-zinc-800/80 focus:border-fuchsia-500 focus:bg-zinc-950/80 focus:shadow-[0_0_15px_rgba(217,70,239,0.1)]'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="mt-2 text-[11px] text-red-400 flex items-center tracking-wide">
                                <span className="mr-1.5 text-xs">⚠️</span> {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* High-Impact Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 p-[1px] font-bold transition-all duration-300 active:scale-[0.98] shadow-[0_0_30px_rgba(217,70,239,0.15)] focus:outline-none"
                        >
                            {/* Button Mask Layer for Hover Text Animation */}
                            <div className="relative flex items-center justify-center space-x-2 rounded-xl bg-zinc-950 px-4 py-3.5 text-xs uppercase tracking-widest text-zinc-200 transition-colors group-hover:bg-transparent group-hover:text-white">
                                <Cpu className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                                <span>Initialize Deployment</span>
                            </div>
                        </button>
                    </div>
                </form>

                {/* Advanced Tech System Matrix Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-zinc-800/60 pt-4 text-[10px] text-zinc-600">
                    <span>LOC // STACK.01</span>
                    <span>SECURED ENG_</span>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link2, ArrowRight } from 'lucide-react';
import DeleteModel from './DeleteModel';

const URL_PATTERN = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

/**
 * Input + Shorten button. Shows "Shortening…" while the request is in
 * flight and the error message below the field, per spec. The heading now
 * lives in the App-level hero, so this component only handles the form.
 *
 * `onShorten(longUrl)` does the actual API call in the parent - this
 * component just awaits it and surfaces an error if it rejects.
 */
const ShortenForm = ({ onShorten }) => {
    const [submitError, setSubmitError] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onChange' });

    const onSubmit = async ({ longUrl }) => {
        setSubmitError(null);
        try {
            await onShorten(longUrl);
            reset();
        } catch (err) {
            setSubmitError(err?.response?.data?.message || 'Could not shorten that URL. Please try again.');
        }
    };

    const fieldError = errors.longUrl?.message || submitError;

    return (
        <div className="w-full max-w-2xl mx-auto p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/20">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-[15px] border border-white/10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div className="relative flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-200">
                                <Link2 className="w-5 h-5" />
                            </div>
                            <input
                                type="url"
                                placeholder="Paste a long URL here..."
                                {...register('longUrl', {
                                    required: 'Please enter a URL',
                                    maxLength: { value: 2048, message: 'URL is too long' },
                                    pattern: {
                                        value: URL_PATTERN,
                                        message: 'Enter a valid URL starting with http:// or https://',
                                    },
                                })}
                                className={`w-full pl-12 pr-4 py-4 bg-slate-950 text-slate-100 placeholder-slate-500 text-sm rounded-xl border transition-all duration-300 outline-none
                  ${fieldError
                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-950/10'
                                        : 'border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-700'
                                    }`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 whitespace-nowrap min-w-[150px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Shortening…
                                </>
                            ) : (
                                <>
                                    Shorten
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>

                    <DeleteModel message={fieldError} />
                </form>
            </div>
        </div>
    );
};

export default ShortenForm;
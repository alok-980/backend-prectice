import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

import AuroraBackground from './components/AuroraBackground';
import IdentityBadge from './components/IdentityBadge';
import FormField from './components/FormField';
import PhotoUploadField from './PhotoUploadField';
import { useGoogleFonts } from './hooks/useGoogleFonts';
import { baseInputClass, shellClass } from './utils/formStyles';
import { axiosInstance } from './config/axiosInstance';

const App = () => {
  useGoogleFonts();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const imageFile = watch('image');
  const imageName = imageFile && imageFile.length > 0 ? imageFile[0].name : null;

  const handleSubmitUser = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();

      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('address', data.address)
      formData.append('image', data.image[0])

      let res = await axiosInstance.post('/create', formData)
      console.log(res.data.message);
      reset();
      navigate('/users')
    } catch (error) {
      console.log('form submission error: ', error);
    }
  };

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AuroraBackground />

      <div className="relative w-full max-w-2xl">
        <IdentityBadge />

        <form
          onSubmit={handleSubmit(handleSubmitUser)}
          noValidate
          className="relative flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-8 py-7 pt-9 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-300/80">
              <Sparkles size={11} />
              New member
            </span>
            <h1
              className="text-xl font-semibold text-violet-50"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Create your profile
            </h1>
          </div>

          {/* Row 1 — name */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First name" icon={User} error={errors.firstName}>
              <div className={shellClass(errors.firstName)}>
                <input
                  type="text"
                  placeholder="Ada"
                  className={baseInputClass}
                  {...register('firstName', { required: 'Required' })}
                />
              </div>
            </FormField>
            <FormField label="Last name" icon={User} error={errors.lastName}>
              <div className={shellClass(errors.lastName)}>
                <input
                  type="text"
                  placeholder="Lovelace"
                  className={baseInputClass}
                  {...register('lastName', { required: 'Required' })}
                />
              </div>
            </FormField>
          </div>

          {/* Row 2 — contact */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Email address" icon={Mail} error={errors.email}>
              <div className={shellClass(errors.email)}>
                <input
                  type="email"
                  placeholder="ada@example.com"
                  className={baseInputClass}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
              </div>
            </FormField>
            <FormField label="Phone number" icon={Phone} error={errors.phone}>
              <div className={shellClass(errors.phone)}>
                <input
                  type="number"
                  placeholder="98765 43210"
                  className={`${baseInputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  {...register('phone', {
                    required: 'Phone is required',
                    minLength: { value: 7, message: 'Too short' },
                  })}
                />
              </div>
            </FormField>
          </div>

          {/* Row 3 — address + photo */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Address" icon={MapPin} error={errors.address}>
              <div className={shellClass(errors.address)}>
                <input
                  type="text"
                  placeholder="221B Baker Street"
                  className={baseInputClass}
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
            </FormField>
            <PhotoUploadField
              register={register}
              error={errors.image}
              fileName={imageName}
            />
          </div>

          <button
            type="submit"
            className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 via-violet-500 to-teal-400 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,92,252,0.35)] transition-transform duration-200 active:scale-[0.98] cursor-pointer"
          >
            <span className="relative z-10">Create account</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </button>

          <p className="text-center text-[11px] text-violet-200/40">
            By continuing you agree to our terms and privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;
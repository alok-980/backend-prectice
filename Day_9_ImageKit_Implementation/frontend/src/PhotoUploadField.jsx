import React from 'react';
import { ImagePlus } from 'lucide-react';
import FormField from './components/FormField';
import { shellClass } from './utils/formStyles';

const PhotoUploadField = ({ register, error, fileName }) => (
    <FormField label="Profile photo" icon={ImagePlus} error={error}>
        <label className={`${shellClass(error)} cursor-pointer justify-between`}>
            <span
                className={`truncate text-sm ${fileName ? 'text-violet-50' : 'text-violet-200/35'
                    }`}
            >
                {fileName || 'Upload a photo'}
            </span>
            <span className="shrink-0 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-violet-100/80">
                Browse
            </span>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register('image', { required: 'Please add a photo' })}
            />
        </label>
    </FormField>
);

export default PhotoUploadField;